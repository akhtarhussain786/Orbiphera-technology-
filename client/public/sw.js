// Orbiphera Progressive Web App Service Worker
const CACHE_NAME = 'orbiphera-pwa-v1'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/site.webmanifest',
  '/logo.png',
  '/logo-full.png',
  '/favicon.ico'
]

// Install event - precache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-cache partial failure:', err)
      })
    })
  )
  self.skipWaiting()
})

// Activate event - clean up legacy caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - Network first with cache fallback for dynamic content
self.addEventListener('fetch', (event) => {
  const request = event.request

  // Only handle GET requests
  if (request.method !== 'GET') return

  // Skip API, admin, and chrome extensions
  const url = new URL(request.url)
  if (url.pathname.startsWith('/api') || url.protocol.startsWith('chrome-extension')) {
    return
  }

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache)
          })
        }
        return networkResponse
      })
      .catch(() => {
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse
          if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/')
          }
        })
      })
  )
})


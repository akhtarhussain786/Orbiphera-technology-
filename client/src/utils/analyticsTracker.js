/**
 * Orbiphera Real Human Visitor Analytics Tracker
 * Lightweight (~2.5KB), Privacy-Compliant, Non-blocking Beacon Engine
 * Features: Anonymous Visitor ID, 30-min Inactivity Sessioning, Client-Side Bot Signals, Heartbeat Ping
 */

const STORAGE_KEYS = {
  VISITOR_ID: '_op_vid',
  SESSION_ID: '_op_sid',
  SESSION_TIME: '_op_sid_time'
}

const SESSION_INACTIVITY_LIMIT_MS = 30 * 60 * 1000 // 30 minutes

// Helper to generate cryptographically safe anonymous UUID
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 1. Get or Create Persistent Anonymous Visitor ID
export function getOrCreateVisitorId() {
  if (typeof window === 'undefined') return ''
  try {
    let vid = localStorage.getItem(STORAGE_KEYS.VISITOR_ID)
    if (!vid || vid.length < 10) {
      vid = `vid_${generateUUID()}`
      localStorage.setItem(STORAGE_KEYS.VISITOR_ID, vid)
    }
    return vid
  } catch (_) {
    return `vid_${generateUUID()}`
  }
}

// 2. Get or Create Session with 30-min Inactivity Expiration
export function getOrCreateSessionId() {
  if (typeof window === 'undefined') return ''
  try {
    const now = Date.now()
    const lastActivity = parseInt(sessionStorage.getItem(STORAGE_KEYS.SESSION_TIME) || '0', 10)
    let sid = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID)

    if (!sid || !lastActivity || (now - lastActivity > SESSION_INACTIVITY_LIMIT_MS)) {
      sid = `sid_${generateUUID()}`
      sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sid)
    }

    sessionStorage.setItem(STORAGE_KEYS.SESSION_TIME, now.toString())
    return sid
  } catch (_) {
    return `sid_${generateUUID()}`
  }
}

// 3. Extract UTM Campaign Parameters
export function parseUtmParams() {
  if (typeof window === 'undefined') return {}
  try {
    const params = new URLSearchParams(window.location.search)
    return {
      source: params.get('utm_source') || '',
      medium: params.get('utm_medium') || '',
      campaign: params.get('utm_campaign') || '',
      term: params.get('utm_term') || '',
      content: params.get('utm_content') || ''
    }
  } catch (_) {
    return {}
  }
}

// 4. Collect Client-Side Automation & Headless Verification Signals
export function collectClientSignals() {
  if (typeof window === 'undefined') return {}
  const nav = window.navigator || {}

  return {
    webdriver: Boolean(nav.webdriver),
    screenZero: window.screen.width === 0 || (window.outerWidth === 0 && window.outerHeight === 0),
    fakeChrome: nav.userAgent.includes('Chrome') && !window.chrome,
    languagesLength: nav.languages ? nav.languages.length : 0,
    pluginsLength: nav.plugins ? nav.plugins.length : 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  }
}

// Last sent beacon deduplication
let lastTrackedPath = ''
let lastTrackedTime = 0

/**
 * 5. Track Page View Beacon (Asynchronous, Non-blocking)
 */
export function trackPageViewBeacon(pathname, title) {
  if (typeof window === 'undefined') return

  // Skip tracking for admin console pages to avoid self-counting administrator navigation
  if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/api/admin'))) {
    return
  }

  const now = Date.now()
  if (lastTrackedPath === pathname && (now - lastTrackedTime < 2500)) {
    return // Avoid duplicate fires on fast re-renders
  }
  lastTrackedPath = pathname
  lastTrackedTime = now

  const visitorId = getOrCreateVisitorId()
  const sessionId = getOrCreateSessionId()
  const utm = parseUtmParams()
  const clientSignals = collectClientSignals()

  const payload = {
    visitorId,
    sessionId,
    path: pathname || window.location.pathname || '/',
    fullUrl: window.location.href,
    title: title || document.title || 'Orbiphera Technologies',
    referrer: document.referrer || 'Direct',
    screen: `${window.screen.width}x${window.screen.height}`,
    clientSignals,
    utm
  }

  const jsonStr = JSON.stringify(payload)
  const endpoint = '/api/analytics/track'

  // Attempt non-blocking sendBeacon first
  if (navigator.sendBeacon) {
    try {
      const blob = new Blob([jsonStr], { type: 'application/json' })
      const sent = navigator.sendBeacon(endpoint, blob)
      if (sent) return
    } catch (_) {}
  }

  // Fallback to fetch with keepalive: true
  try {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonStr,
      keepalive: true,
      credentials: 'omit'
    }).catch(() => {})
  } catch (_) {}
}

/**
 * 6. Heartbeat Ping: Keeps Active Sessions Alive in Real-Time
 */
export function sendHeartbeat(seconds = 30) {
  if (typeof window === 'undefined') return
  if (document.hidden) return // Don't heartbeat when tab is in background

  const sessionId = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID)
  const visitorId = localStorage.getItem(STORAGE_KEYS.VISITOR_ID)
  if (!sessionId) return

  // Update last activity in session storage
  sessionStorage.setItem(STORAGE_KEYS.SESSION_TIME, Date.now().toString())

  const payload = JSON.stringify({
    sessionId,
    visitorId,
    seconds
  })

  const endpoint = '/api/analytics/heartbeat'

  if (navigator.sendBeacon) {
    try {
      const blob = new Blob([payload], { type: 'application/json' })
      if (navigator.sendBeacon(endpoint, blob)) return
    } catch (_) {}
  }

  try {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
      credentials: 'omit'
    }).catch(() => {})
  } catch (_) {}
}

/**
 * Universal Dynamic API Endpoint Resolver
 * Automatically resolves to same-origin `/api` in production (e.g. https://orbiphera.in/api)
 * or uses Vite's proxy in development.
 */
export const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim()
  }
  return '/api'
}

export const API_URL = getApiUrl()
export default API_URL

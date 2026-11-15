import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageViewBeacon, sendHeartbeat } from '../utils/analyticsTracker'

export function useAnalyticsTracker() {
  const location = useLocation()
  const heartbeatTimerRef = useRef(null)

  // Track page view on route transitions
  useEffect(() => {
    // Small delay to allow document.title or SeoHead to settle
    const timer = setTimeout(() => {
      const fullPath = location.pathname + location.search
      trackPageViewBeacon(fullPath, document.title)
    }, 120)

    return () => clearTimeout(timer)
  }, [location.pathname, location.search])

  // Periodic heartbeat every 30 seconds for live active visitor counting
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    // Send heartbeat every 30 seconds while page is open
    heartbeatTimerRef.current = setInterval(() => {
      sendHeartbeat(30)
    }, 30000)

    // Also send heartbeat on visibility change if user returns to tab
    const handleVisibility = () => {
      if (!document.hidden) {
        sendHeartbeat(15)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])
}


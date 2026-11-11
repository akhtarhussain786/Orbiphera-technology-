import React, { createContext, useContext, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SmoothScrollContext = createContext(null)

export const useSmoothScroll = () => useContext(SmoothScrollContext)

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    // Do not initialize Lenis in admin panel routes to prevent layout interference with admin tables/inputs
    if (location.pathname.startsWith('/admin')) {
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false
    })

    lenisRef.current = lenis

    // Synchronize Lenis scroll with GSAP ScrollTrigger and notify components
    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('lenis-scroll', { detail: e }))
      }
    })

    // Drive Lenis through GSAP ticker for locked 60fps frame synchronization
    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Scroll to top or anchor on route change
  useEffect(() => {
    if (lenisRef.current) {
      if (location.hash) {
        const target = document.querySelector(location.hash)
        if (target) {
          lenisRef.current.scrollTo(target, { offset: -90, duration: 1.2 })
          return
        }
      }
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }

    // Refresh ScrollTrigger after DOM re-renders on route navigation
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => clearTimeout(timer)
  }, [location.pathname, location.hash])

  const scrollTo = (target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -80, duration: 1.2, ...options })
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}


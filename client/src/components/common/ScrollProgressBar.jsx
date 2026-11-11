import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { useSmoothScroll } from './SmoothScrollProvider'

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const smoothScroll = useSmoothScroll()

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)))
      }
      setShowScrollTop(window.scrollY > 450)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToTop = () => {
    if (smoothScroll?.scrollTo) {
      smoothScroll.scrollTo(0, { duration: 1.4 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Top 2.5px Crimson Red Progress Line */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#E50914] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(229,9,20,0.85)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Scroll-To-Top Button (Midnight Black + Crimson Red hover, desktop/tablet only) */}
      <button
        onClick={handleScrollToTop}
        aria-label="Scroll back to top"
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#121214]/90 backdrop-blur-md border border-white/10 text-white shadow-[0_8px_25px_rgba(0,0,0,0.8)] hidden sm:flex items-center justify-center transition-all duration-300 hover:bg-[#E50914] hover:text-white hover:border-[#E50914] hover:scale-110 active:scale-95 cursor-pointer ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-4 h-4 stroke-[2.5]" />
      </button>
    </>
  )
}

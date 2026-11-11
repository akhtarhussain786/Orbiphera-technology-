import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import BrandLogo from './BrandLogo'
import { useSettings } from '../../context/SettingsContext'

export default function Preloader({ onComplete }) {
  const { settings } = useSettings()
  const brandTitle = settings?.preloaderTitle || settings?.siteName || 'Yatharth Technologies'
  const brandSubtitle = settings?.preloaderSubtitle || settings?.tagline || 'IT Software Development Agency'

  const getLoadingStatus = (p) => {
    if (p < 25) return 'INITIALIZING CORE SYSTEMS'
    if (p < 55) return 'LOADING PACKAGES & MODULES'
    if (p < 80) return 'SYNCING SECURE SERVICES'
    if (p < 98) return 'OPTIMIZING PERFORMANCE'
    return 'READY TO LAUNCH'
  }
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === 'undefined') return false
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const alreadyVisited = sessionStorage.getItem('yatharth_has_loaded')
    return !prefersReduced && !alreadyVisited
  })

  const [percent, setPercent] = useState(0)
  const preloaderRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!shouldRender) {
      if (onComplete) onComplete()
      return
    }

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 6
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setPercent(100)

        // Exit transition
        const tl = gsap.timeline({
          onComplete: () => {
            sessionStorage.setItem('yatharth_has_loaded', 'true')
            setShouldRender(false)
            if (onComplete) onComplete()
          }
        })

        if (contentRef.current && preloaderRef.current) {
          tl.to(contentRef.current, {
            opacity: 0,
            y: -25,
            duration: 0.4,
            ease: 'power2.in'
          }).to(
            preloaderRef.current,
            {
              yPercent: -100,
              duration: 0.75,
              ease: 'power4.inOut'
            },
            '-=0.1'
          )
        } else {
          sessionStorage.setItem('yatharth_has_loaded', 'true')
          setShouldRender(false)
          if (onComplete) onComplete()
        }
      } else {
        setPercent(progress)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [shouldRender, onComplete])

  if (!shouldRender) return null

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[999999] bg-[#0B0B0C] flex flex-col items-center justify-center p-6 text-white overflow-hidden select-none"
    >
      <div ref={contentRef} className="flex flex-col items-center max-w-sm w-full space-y-6 text-center">
        {/* Brand Emblem with Subtle Crimson Halo */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#E50914]/30 rounded-full blur-2xl scale-150 animate-pulse" />
          <BrandLogo size="lg" showText={false} disableHover={true} theme="dark" />
        </div>

        {/* Brand Title (Dynamic from Website Settings & Admin Panel) */}
        <div className="space-y-1">
          <h2 className="text-sm sm:text-base font-black tracking-[0.2em] uppercase text-white font-mono">
            {brandTitle}
          </h2>
          <p className="text-[11px] font-mono font-medium text-[#FF2A36] tracking-wider uppercase">
            {brandSubtitle}
          </p>
        </div>

        {/* Minimal Progress Bar & Percentage */}
        <div className="w-56 space-y-2 pt-2">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E50914] rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(229,9,20,0.65)]"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-mono text-slate-400">
            <span className="uppercase tracking-wider transition-all duration-150 text-slate-300">
              {getLoadingStatus(percent)}
            </span>
            <span className="font-bold text-[#FF2A36]">{percent}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

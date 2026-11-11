import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { 
  ArrowRight, 
  Play, 
  Rocket, 
  Users, 
  ShieldCheck, 
  Headphones, 
  Sparkles,
  X
} from 'lucide-react'
import { 
  gsap, 
  initMagneticHover, 
  initCounter, 
  initPulseGlow, 
  prefersReducedMotion 
} from '../utils/motion'
import InteractiveDotGrid from '../components/hero/InteractiveDotGrid'

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef(null)
  const badgeRef = useRef(null)
  const headlineRef = useRef(null)
  const descRef = useRef(null)
  const ctaGroupRef = useRef(null)
  const techGroupRef = useRef(null)
  const glowRef = useRef(null)
  const statsBarRef = useRef(null)
  const primaryBtnRef = useRef(null)
  const secondaryBtnRef = useRef(null)

  const [showDemoModal, setShowDemoModal] = useState(false)

  // Magnetic button hover
  useEffect(() => {
    const cleanPrimary = initMagneticHover(primaryBtnRef.current, 0.25)
    const cleanSecondary = initMagneticHover(secondaryBtnRef.current, 0.2)
    return () => {
      cleanPrimary()
      cleanSecondary()
    }
  }, [])

  // GSAP Cinematic Hero Timeline Entrance
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // 1. Ambient Background Glow subtle pulse
      if (glowRef.current) {
        initPulseGlow(glowRef.current)
      }

      // 2. Synchronized Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Small Badge Entrance
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.85, y: -10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.65 }
        )
      }

      // Headline Word-by-Word Reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hero-word')
        tl.fromTo(
          words,
          { opacity: 0, yPercent: 90 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.75,
            stagger: 0.045,
            ease: 'power3.out'
          },
          '-=0.3'
        )

        // Highlight Glow Bloom
        const highlight = headlineRef.current.querySelector('.hero-highlight')
        if (highlight) {
          tl.fromTo(
            highlight,
            { filter: 'drop-shadow(0 0 0px rgba(229, 9, 20,0))' },
            {
              filter: 'drop-shadow(0 0 25px rgba(229, 9, 20,0.45))',
              duration: 0.8,
              ease: 'power2.out'
            },
            '-=0.4'
          )
        }
      }

      // Description Fade Up
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.4'
        )
      }

      // CTA Buttons Stagger
      if (ctaGroupRef.current) {
        const buttons = ctaGroupRef.current.children
        tl.fromTo(
          buttons,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)'
          },
          '-=0.35'
        )
      }

      // Tech Badges Stagger
      if (techGroupRef.current) {
        const badges = techGroupRef.current.querySelectorAll('.tech-pill')
        tl.fromTo(
          badges,
          { opacity: 0, y: 15, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out'
          },
          '-=0.3'
        )
      }

      // Stats Bar Entrance & Counter Animation
      if (statsBarRef.current) {
        tl.fromTo(
          statsBarRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.2'
        )

        const countEls = statsBarRef.current.querySelectorAll('.stat-counter')
        countEls.forEach((el) => {
          const target = el.getAttribute('data-target')
          if (target) {
            initCounter(el, target, 1.8)
          }
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const techBadges = [
    { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' }
  ]

  const stats = [
    {
      icon: Rocket,
      value: '3x',
      label: 'Faster Delivery',
      desc: 'Sprint-based agile velocity'
    },
    {
      icon: Users,
      value: '200+',
      label: 'Happy Clients',
      desc: 'Verified enterprise founders'
    },
    {
      icon: ShieldCheck,
      value: '99.9%',
      label: 'Uptime Guarantee',
      desc: 'High-availability SLA'
    },
    {
      icon: Headphones,
      value: '24/7',
      label: 'Dedicated Support',
      desc: 'Direct architecture access'
    }
  ]

  return (
    <section
      ref={heroRef}
      className="relative pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-28 overflow-hidden bg-[#0B0B0C] text-white selection:bg-[#E50914] selection:text-white"
    >
      {/* =========================================================================
          HERO BACKGROUND EFFECTS: Interactive Dot-Grid Canvas + Central Pulsing Crimson Glow
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Interactive Mouse-Reactive Dot Grid Canvas */}
        <InteractiveDotGrid />

        {/* Central Crimson Red Radial Glow Lighting */}
        <div
          ref={glowRef}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-[#E50914]/14 rounded-full blur-[140px]"
        />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[#E50914]/7 rounded-full blur-[130px]" />
        <div className="absolute -bottom-20 inset-x-0 h-40 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 space-y-16 sm:space-y-20">
        
        {/* =====================================================================
            CENTERED HERO CONTENT
            ===================================================================== */}
        <div className="max-w-4xl mx-auto text-center space-y-7 flex flex-col items-center">
          
          {/* Small Badge: IT SOFTWARE DEVELOPMENT AGENCY • SIWAN, BIHAR */}
          <div ref={badgeRef} className="inline-block">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#121214] border border-[#E50914]/30 shadow-[0_0_20px_rgba(229,9,20,0.2)] transition-all hover:border-[#E50914]">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[#FF2A36]">
                #1 Website &amp; Software Company in Siwan, Bihar
              </span>
            </div>
          </div>

          {/* Main Headline with Word-by-Word Masked Reveal */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl lg:text-[68px] xl:text-[74px] font-black text-white tracking-tight leading-[1.06] max-w-4xl mx-auto"
          >
            <span className="inline-block overflow-hidden py-1">
              <span className="hero-word inline-block">Building&nbsp;</span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="hero-word inline-block">Digital&nbsp;</span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="hero-word inline-block">Solutions&nbsp;</span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="hero-word inline-block">That&nbsp;</span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="hero-word inline-block">Drive&nbsp;</span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="hero-word hero-highlight inline-block text-[#FF2A36]">
                Business&nbsp;Growth.
              </span>
            </span>
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            We design and develop powerful websites, mobile applications, enterprise software and business management systems for businesses in Siwan, Bihar, and across India.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaGroupRef} className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {/* Primary: Start Your Project (Crimson Red #E50914) */}
            <div ref={primaryBtnRef} className="inline-block">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-full bg-[#E50914] hover:bg-[#CC0813] text-white text-base font-black transition-all duration-200 flex items-center space-x-2.5 shadow-[0_0_25px_rgba(229,9,20,0.45)] hover:shadow-[0_0_35px_rgba(229,9,20,0.65)] cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </motion.a>
            </div>

            {/* Secondary: Watch Demo */}
            <div ref={secondaryBtnRef} className="inline-block">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowDemoModal(true)}
                className="px-7 py-4 rounded-full bg-[#121214] text-white border border-white/20 text-base font-bold hover:bg-white/10 hover:border-[#E50914]/40 transition-all shadow-xs flex items-center space-x-2 cursor-pointer group"
              >
                <Play className="w-4 h-4 fill-[#E50914] text-[#E50914] group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </motion.button>
            </div>
          </div>

          {/* Supported Technology Badges Row (Centered) */}
          <div ref={techGroupRef} className="pt-6 space-y-3 flex flex-col items-center">
            <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              <span>Our Technologies:</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl">
              {techBadges.map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="tech-pill flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[#121214] border border-white/10 hover:border-[#E50914]/50 hover:bg-[#E50914]/5 transition-colors group cursor-default"
                >
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="w-4 h-4 object-contain group-hover:scale-110 transition-transform" 
                    loading="lazy"
                  />
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================================
            COMPANY STATS SECTION (Horizontal Bar at Bottom of Hero)
            ===================================================================== */}
        <div
          ref={statsBarRef}
          className="rounded-3xl bg-[#121214]/90 backdrop-blur-xl border border-white/10 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className={`flex items-center space-x-4 ${idx > 0 ? 'pt-4 lg:pt-0 lg:pl-8' : ''}`}>
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-12 h-12 rounded-2xl bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center text-[#FF2A36] shrink-0 shadow-[0_0_15px_rgba(229,9,20,0.2)] transition-transform"
                  >
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </motion.div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-1">
                      <span className="stat-counter" data-target={stat.value}>{stat.value}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">
                      {stat.label}
                    </span>
                    <span className="text-[11px] text-slate-400 block leading-tight">
                      {stat.desc}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* Watch Demo Modal with Framer Motion Backdrop */}
      {showDemoModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl bg-[#121214] border border-[#E50914]/30 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse" />
                <h3 className="text-base font-bold text-white">Yatharth IT Solutions - System Walkthrough</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E50914] hover:text-white flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
              <iframe
                src="https://www.youtube-nocookie.com/embed/joiyb6c_Ry4?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0"
                title="Yatharth IT Solutions Showcase"
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

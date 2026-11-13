import React, { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  Database,
  Smartphone
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'
import BrandLogo from '../components/common/BrandLogo'
import { gsap, initHeaderReveal, initCounter, prefersReducedMotion } from '../utils/motion'

export default function CompanyAbout() {
  const { settings } = useSettings()
  const sectionRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)
  const statsContainerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const brandName = settings?.siteName || 'Yatharth IT Solutions'

  const highlights = [
    { title: 'Clean Architecture First', desc: 'Codebases engineered with strict modularity, automated testing, and long-term maintainability.' },
    { title: 'Cross-Platform Focus', desc: 'Unified Flutter mobile engineering and high-performance React web applications.' },
    { title: 'Enterprise Data Security', desc: 'Strict OWASP protocols, encrypted communications, and role-based permissions (RBAC).' },
    { title: 'Quantifiable ROI', desc: 'We measure engineering success by system uptime, user adoption, and business growth.' }
  ]

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Left text reveal
      if (leftColRef.current) {
        initHeaderReveal(leftColRef.current)
      }

      // Right visual card entry from right
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 45, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      }

      // Counter numbers in stats
      if (statsContainerRef.current) {
        const counters = statsContainerRef.current.querySelectorAll('.about-counter')
        counters.forEach((el) => {
          const target = el.getAttribute('data-target')
          if (target) {
            initCounter(el, target, 1.8)
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="scroll-mt-28 py-10 sm:py-16 lg:py-24 bg-[#0B0B0C] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-[#E50914]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Column (7 cols) */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-6">
            <div className="reveal-item inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT OUR COMPANY</span>
            </div>

            <h2 className="reveal-item text-4xl sm:text-5xl lg:text-[48px] font-black text-white tracking-tight leading-[1.08]">
              Architecting software for <br />
              <span className="text-[#E50914] relative inline-block">
                forward-thinking teams.
              </span>
            </h2>

            <div className="reveal-item space-y-4 text-base text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white font-bold">{brandName}</strong> is the premier website and software development company headquartered in <strong className="text-[#E50914]">Siwan, Bihar</strong>. We specialize in engineering robust mobile applications, bespoke web platforms, enterprise ERP &amp; CRM systems, and cloud APIs for local and pan-India enterprises.
              </p>
              <p>
                From empowering Siwan retail shops, schools, and hospitals with modern digital systems to deploying scalable SaaS for national clients, our senior software architects partner closely with founders to turn business goals into fast, reliable software solutions.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="reveal-item grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {highlights.map((h, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  className="p-4 rounded-2xl bg-[#121214] border border-white/10 space-y-1 hover:border-[#E50914]/50 transition-colors shadow-sm"
                >
                  <div className="flex items-center space-x-2 text-white font-bold text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#E50914] flex-shrink-0" />
                    <span>{h.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                    {h.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="reveal-item pt-2">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <a
                  href="#contact"
                  className="px-7 py-3.5 sm:py-4 rounded-full bg-[#E50914] hover:bg-[#b5e028] text-white text-sm sm:text-base font-black transition-all inline-flex items-center space-x-2 shadow-[0_0_20px_rgba(229, 9, 20,0.3)] cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right Visual Column (5 cols) */}
          <div ref={rightColRef} className="lg:col-span-5 relative">
            <div className="relative mx-auto bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_16px_50px_rgba(0,0,0,0.9)] space-y-5">
              <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
                <BrandLogo theme="dark" size="lg" showText={true} />
              </div>

              {/* Mission Statement */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E50914] block">
                  Our Engineering Mission
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-[#E50914] pl-3 font-medium">
                  &ldquo;To build software that empowers enterprises with absolute reliability, operational agility, and sustainable competitive advantage through modern digital engineering.&rdquo;
                </p>
              </div>

              {/* Core Competencies Matrix */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                  Primary Technology Disciplines
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                    <span className="text-white font-bold block flex items-center space-x-1">
                      <Smartphone className="w-3.5 h-3.5 text-[#E50914] inline mr-1" />
                      Mobile OS
                    </span>
                    Flutter (iOS &amp; Android)
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                    <span className="text-white font-bold block flex items-center space-x-1">
                      <Code2 className="w-3.5 h-3.5 text-[#E50914] inline mr-1" />
                      Web Platforms
                    </span>
                    React &amp; Node.js
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                    <span className="text-white font-bold block flex items-center space-x-1">
                      <Database className="w-3.5 h-3.5 text-[#E50914] inline mr-1" />
                      Enterprise Data
                    </span>
                    MySQL &amp; PostgreSQL
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                    <span className="text-white font-bold block flex items-center space-x-1">
                      <Layers className="w-3.5 h-3.5 text-[#E50914] inline mr-1" />
                      Infrastructure
                    </span>
                    APIs &amp; Cloud Clusters
                  </div>
                </div>
              </div>

              {/* Footer SLA with Counter */}
              <div ref={statsContainerRef} className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center text-[#E50914] font-semibold">
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-[#E50914]" />
                  NDA &amp; IP Ownership
                </span>
                <span className="font-mono text-white text-[11px] font-bold">
                  <span className="about-counter text-[#E50914]" data-target="100%">100%</span> Client Owned
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

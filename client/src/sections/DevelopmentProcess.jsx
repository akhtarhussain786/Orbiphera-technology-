import React, { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { 
  Compass, 
  Palette, 
  Code2, 
  CheckCircle2, 
  Rocket, 
  Sparkles
} from 'lucide-react'
import { gsap, initHeaderReveal, prefersReducedMotion } from '../utils/motion'

const STEPS = [
  {
    num: '01',
    title: 'Understand Requirements',
    phase: 'ALIGN & ARCHITECT',
    icon: Compass,
    desc: 'In-depth consultation to map out business goals, functional user stories, system architecture blueprint, and technical roadmap.',
    deliverable: 'SRS Document & Architecture Plan'
  },
  {
    num: '02',
    title: 'Planning & UI/UX Design',
    phase: 'PROTOTYPE & VALIDATE',
    icon: Palette,
    desc: 'Crafting responsive user interfaces, modular design tokens, interactive Figma prototypes, and validated screen journeys.',
    deliverable: 'Figma UI Prototypes & Tokens'
  },
  {
    num: '03',
    title: 'Development & Integration',
    phase: 'SPRINT & DELIVER',
    icon: Code2,
    desc: 'Clean, modular engineering with Flutter, React, PHP/Laravel, Node.js, indexed MySQL databases, and secure REST APIs.',
    deliverable: 'Live Staging Builds & CI/CD'
  },
  {
    num: '04',
    title: 'Testing & QA',
    phase: 'SECURITY & HARDENING',
    icon: CheckCircle2,
    desc: 'Rigorous cross-device testing, performance audits, OWASP security checks, and user acceptance testing (UAT).',
    deliverable: 'Zero-Defect QA Audit Report'
  },
  {
    num: '05',
    title: 'Deployment & Support',
    phase: 'LAUNCH & EVOLVE',
    icon: Rocket,
    desc: 'Smooth cloud deployment, database migration, staff handover training, and dedicated continuous SLA maintenance support.',
    deliverable: 'Live Deployment & Support SLA'
  }
]

export default function DevelopmentProcess() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const timelineRef = useRef(null)
  const progressLineRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        initHeaderReveal(headerRef.current)
      }

      // Connecting progression line scroll scrub
      if (progressLineRef.current && timelineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { width: '0%' },
          {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              end: 'bottom 80%',
              scrub: 0.8
            }
          }
        )
      }

      // Staggered reveal for step cards
      if (timelineRef.current) {
        const cards = timelineRef.current.querySelectorAll('.step-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="scroll-mt-28 py-10 sm:py-16 lg:py-24 bg-[#0F0F11] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E50914]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-14 sm:mb-16 space-y-4">
          <div className="reveal-item inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>5-STEP PROVEN METHODOLOGY</span>
          </div>

          <h2 className="reveal-item text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.12]">
            Our Development{' '}
            <span className="text-[#E50914] relative inline-block">
              Process.
            </span>
          </h2>

          <p className="reveal-item text-base sm:text-lg text-slate-300 leading-relaxed">
            A structured, transparent 5-step engineering sequence guaranteeing predictable milestones, on-time delivery, and production-grade code.
          </p>
        </div>

        {/* 5-Step Process Timeline Grid */}
        <div ref={timelineRef} className="relative">
          {/* Horizontal connecting line on desktop */}
          <div className="hidden xl:block absolute top-[28px] left-12 right-12 h-[2px] bg-white/10 z-0">
            <div
              ref={progressLineRef}
              className="h-full bg-gradient-to-r from-[#E50914] via-white to-[#E50914] shadow-[0_0_15px_rgba(229, 9, 20,0.8)]"
              style={{ width: '0%' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10">
            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.num}
                  whileHover={shouldReduceMotion ? {} : { y: -6 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="step-card rounded-2xl sm:rounded-3xl p-6 bg-[#121214] border border-white/10 hover:border-[#E50914] hover:shadow-[0_20px_50px_rgba(229, 9, 20,0.18)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Step Number + Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[#E50914] text-white font-mono font-black text-xs flex items-center justify-center shadow-[0_0_15px_rgba(229, 9, 20,0.3)] group-hover:scale-105 transition-transform">
                        {step.num}
                      </div>
                      <motion.div 
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white transition-colors"
                      >
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </motion.div>
                    </div>

                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E50914] mb-1">
                      {step.phase}
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[#E50914] transition-colors mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-slate-300 font-semibold flex items-center space-x-1">
                    <span className="text-[#E50914]">✓</span>
                    <span className="truncate">{step.deliverable}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

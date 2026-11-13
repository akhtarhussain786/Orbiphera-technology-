import React, { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { 
  Code2, 
  Cpu, 
  Smartphone, 
  ShieldCheck, 
  Clock, 
  Headphones, 
  Sparkles,
  CheckCircle2
} from 'lucide-react'
import { gsap, initHeaderReveal, initStaggerCards, prefersReducedMotion } from '../utils/motion'

const PILLARS = [
  {
    icon: Code2,
    title: 'Custom-Built Solutions',
    desc: 'Zero generic templates or restrictive site builders. Every application is custom-coded to match your exact business rules, workflows, and database models.',
    badge: '100% Bespoke'
  },
  {
    icon: Cpu,
    title: 'Modern Technologies',
    desc: 'Engineered with proven, high-performance tech stacks: Flutter, React, Node.js, PHP, Laravel, and MySQL for rapid responsiveness and zero tech debt.',
    badge: 'Battle-Tested'
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    desc: 'Flawlessly optimized across phones, tablets, and desktops. Fast load speeds, fluid touch interactions, and pixel-perfect rendering on any screen size.',
    badge: 'Mobile-First'
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Scalable Applications',
    desc: 'Built with enterprise-grade security, encrypted data transfer, input sanitization, and decoupled modular architectures that scale as your users grow.',
    badge: 'Bank-Grade'
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    desc: 'Transparent sprint-based milestones with live staging environments, weekly demonstration updates, and strict adherence to agreed project timelines.',
    badge: 'Sprint Agility'
  },
  {
    icon: Headphones,
    title: 'Dedicated Technical Support',
    desc: 'Direct communication with the technical specialists who coded your system. Guaranteed SLA uptime monitoring, automated backups, and ongoing maintenance.',
    badge: 'Direct Support'
  }
]

export default function WhyChooseUs() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        initHeaderReveal(headerRef.current)
      }

      if (gridRef.current) {
        initStaggerCards(gridRef.current, '.pillar-card', {
          y: 40,
          stagger: 0.08,
          duration: 0.75
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="why-us" 
      className="scroll-mt-28 py-10 sm:py-16 lg:py-24 bg-[#0F0F11] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/3 w-[550px] h-[350px] bg-[#E50914]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-8 sm:mb-14 space-y-3 sm:space-y-4">
          <div className="reveal-item inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR COMPETITIVE ADVANTAGE</span>
          </div>

          <h2 className="reveal-item text-2xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.12]">
            Why Businesses Choose{' '}
            <span className="text-[#E50914] relative inline-block">
              Yatharth IT Solutions.
            </span>
          </h2>

          <p className="reveal-item text-base sm:text-lg text-slate-300 leading-relaxed">
            We operate as your dedicated engineering arm — delivering robust architectures, complete code ownership, and responsive post-launch partnership.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {PILLARS.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="pillar-card rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-[#121214] border border-white/10 hover:border-[#E50914] hover:shadow-[0_20px_50px_rgba(229, 9, 20,0.18)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="w-12 h-12 rounded-xl bg-white/5 border border-[#E50914]/30 flex items-center justify-center text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white transition-colors duration-300 shadow-xs"
                    >
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </motion.div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E50914]/10 text-[#E50914] border border-[#E50914]/30">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#E50914] transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center space-x-1.5 text-xs text-white font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Verified Agency Standard</span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

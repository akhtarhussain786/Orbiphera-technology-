import React, { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Dumbbell,
  Building2,
  Hotel,
  Rocket,
  Sparkles,
  CheckCircle2
} from 'lucide-react'
import { gsap, initHeaderReveal, initStaggerCards, prefersReducedMotion } from '../utils/motion'

const INDUSTRIES = [
  {
    title: 'Education & Institutes',
    desc: 'Campus management systems, online admissions, student portals, fee reconciliation, and automated exam report cards.',
    icon: GraduationCap,
    highlights: ['Student Portals', 'Automated Fees', 'Exam Grading']
  },
  {
    title: 'Healthcare & Hospitals',
    desc: 'OPD queue management, electronic health records (EHR), multi-department billing, and doctor appointment scheduling.',
    icon: HeartPulse,
    highlights: ['EHR Records', 'OPD Queues', 'Pharmacy Billing']
  },
  {
    title: 'Retail & E-commerce',
    desc: 'Custom headless storefronts, multi-currency checkout, dynamic inventory synchronization, and order notifications.',
    icon: ShoppingBag,
    highlights: ['Online Stores', 'Inventory Sync', 'Payment Gateways']
  },
  {
    title: 'Fitness & Gyms',
    desc: 'Member subscription tracking, biometric turnstile integration, personal trainer slots, and automated renewal alerts.',
    icon: Dumbbell,
    highlights: ['Member Plans', 'Biometric Access', 'Trainer Schedules']
  },
  {
    title: 'Corporate Businesses',
    desc: 'Workforce management, GPS geo-fenced mobile attendance, automated payroll, role-based access, and approval workflows.',
    icon: Building2,
    highlights: ['EMS Attendance', 'Payroll Engine', 'Staff RBAC']
  },
  {
    title: 'Hospitality & Dining',
    desc: 'Room reservation engines, restaurant POS, kitchen order ticketing (KOT), guest feedback, and table management.',
    icon: Hotel,
    highlights: ['Room Booking', 'Restaurant POS', 'Billing & KOT']
  },
  {
    title: 'Startups & Scaleups',
    desc: 'Rapid MVP engineering, scalable SaaS multi-tenant backends, cross-platform Flutter apps, and technical advisory.',
    icon: Rocket,
    highlights: ['Rapid MVP', 'SaaS Multi-Tenant', 'API Backends']
  }
]

export default function IndustriesSection() {
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
        initStaggerCards(gridRef.current, '.industry-card', {
          y: 35,
          stagger: 0.07,
          duration: 0.75
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="industries" 
      className="scroll-mt-28 py-16 sm:py-24 bg-[#0F0F11] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-[#E50914]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-14 sm:mb-16 space-y-4">
          <div className="reveal-item inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DOMAIN EXPERTISE</span>
          </div>

          <h2 className="reveal-item text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.12]">
            Industries We{' '}
            <span className="text-[#E50914] relative inline-block">
              Empower With Tech.
            </span>
          </h2>

          <p className="reveal-item text-base sm:text-lg text-slate-300 leading-relaxed">
            Tailored software architectures designed for specific regulatory standards, customer workflows, and operational scales.
          </p>
        </div>

        {/* 7 Industries Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon
            return (
              <motion.div
                key={ind.title}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="industry-card rounded-2xl sm:rounded-3xl p-6 bg-[#121214] border border-white/10 hover:border-[#E50914]/60 hover:shadow-[0_20px_50px_rgba(229, 9, 20,0.18)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white transition-colors duration-300 mb-4 shadow-sm"
                  >
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </motion.div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#E50914] transition-colors mb-2">
                    {ind.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                    {ind.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1.5">
                  {ind.highlights.map((h) => (
                    <div key={h} className="flex items-center space-x-1.5 text-xs text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

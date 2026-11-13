import React, { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { 
  Globe, 
  Smartphone, 
  Layers, 
  Users, 
  Target, 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { gsap, initHeaderReveal, initStaggerCards, prefersReducedMotion } from '../utils/motion'

const SERVICES = [
  {
    id: 'website-development',
    title: 'Website Development',
    badge: 'High Conversion',
    icon: Globe,
    desc: 'Bespoke corporate websites, high-conversion landing pages, and responsive e-commerce portals engineered for speed and SEO rankings.',
    features: [
      'Business & Corporate Websites',
      'E-commerce & Dynamic Stores',
      'High-Conversion Landing Pages',
      'Custom Web Applications',
      'PHP, Laravel & React Architectures'
    ],
    link: '/custom-development?service=website'
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    badge: 'Cross-Platform',
    icon: Smartphone,
    desc: 'Native and cross-platform mobile apps for Android and iOS using Flutter, connected to real-time cloud backends and REST APIs.',
    features: [
      'Android & iOS Applications',
      'Flutter Cross-Platform Development',
      'Enterprise Business Mobile Apps',
      'Biometric & GPS Telemetry',
      'Secure REST & WebSocket APIs'
    ],
    link: '/custom-development?service=mobile'
  },
  {
    id: 'erp-software-development',
    title: 'ERP Software Development',
    badge: 'Mission-Critical',
    icon: Layers,
    desc: 'Comprehensive Enterprise Resource Planning systems engineered to streamline multi-branch operations, finance, and supply chain.',
    features: [
      'Institute & Academy ERP',
      'School & College Management Systems',
      'Hospital & Healthcare Clinic ERP',
      'Inventory & Warehouse Logistics',
      'Finance, Billing & GST Accounting'
    ],
    link: '/software?category=erp'
  },
  {
    id: 'ems-employee-management',
    title: 'EMS – Employee Management System',
    badge: 'Workforce OS',
    icon: Users,
    desc: 'Smart workforce administration with GPS geo-fenced attendance, automated monthly payroll, role-based access, and leave workflows.',
    features: [
      'GPS & Geo-Fenced Mobile Attendance',
      'Automated Salary & Payroll Engine',
      'Leave Approval & Shift Rosters',
      'Live Employee Tracking & Visits',
      'Role-Based Granular Access (RBAC)'
    ],
    link: '/software?category=ems'
  },
  {
    id: 'crm-development',
    title: 'CRM Development',
    badge: 'Sales Acceleration',
    icon: Target,
    desc: 'Intelligent Customer Relationship Management platforms designed to capture leads, automate customer follow-ups, and track deal closures.',
    features: [
      'Omnichannel Customer & Lead Tracking',
      'Automated Follow-Up & WhatsApp Alerts',
      'Sales Pipeline Stages & Quotas',
      'Live Performance Dashboards',
      'Detailed Analytics & Exportable Reports'
    ],
    link: '/custom-development?service=crm'
  },
  {
    id: 'custom-software-development',
    title: 'Custom Software Development',
    badge: 'Tailored Logic',
    icon: Code2,
    desc: 'Tailored enterprise software and automated backend architectures solving unique operational bottlenecks with zero third-party license lock-in.',
    features: [
      'End-to-End Business Automation',
      'Multi-Tenant SaaS Products',
      'High-Concurrency PHP & MySQL Platforms',
      'Third-Party API & Cloud Integrations',
      'Full Source Code Ownership'
    ],
    link: '/custom-development?service=custom'
  }
]

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        initHeaderReveal(headerRef.current)
      }

      // Staggered cards reveal
      if (gridRef.current) {
        initStaggerCards(gridRef.current, '.service-card', {
          y: 40,
          stagger: 0.09,
          duration: 0.8
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id="services" 
      className="scroll-mt-28 py-10 sm:py-16 lg:py-24 bg-[#0F0F11] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-[#E50914]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-8 sm:mb-14 space-y-3 sm:space-y-4">
          <div className="reveal-item inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR CORE SERVICES</span>
          </div>

          <h2 className="reveal-item text-2xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.12]">
            Engineering End-to-End Software{' '}
            <span className="text-[#E50914] relative inline-block">
              For Growing Businesses.
            </span>
          </h2>

          <p className="reveal-item text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
            From modern responsive websites and cross-platform Flutter mobile applications to robust enterprise ERP, EMS and CRM suites — we engineer scalable software tailored to your workflows.
          </p>
        </div>

        {/* 6 Services Grid: 3 columns x 2 rows */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7 items-stretch">
          {SERVICES.map((srv) => {
            const Icon = srv.icon
            return (
              <motion.div
                key={srv.id}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="service-card flex flex-col justify-between rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-[#121214] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(229, 9, 20,0.18)] hover:border-[#E50914] transition-all duration-300 group"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <motion.div 
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="w-12 h-12 rounded-xl bg-white/5 border border-[#E50914]/30 flex items-center justify-center text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white transition-colors duration-300 shadow-xs"
                    >
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </motion.div>
                    <span className="text-[11px] font-bold text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/30 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                      {srv.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#E50914] transition-colors mb-2.5">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">
                    {srv.desc}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 py-3 border-t border-white/10 mb-5">
                    {srv.features.map((feat) => (
                      <div key={feat} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Link */}
                <div className="pt-4 border-t border-white/10">
                  <Link
                    to={srv.link}
                    className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#E50914] group-hover:text-white transition-colors"
                  >
                    <span>Explore Service Specifications</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

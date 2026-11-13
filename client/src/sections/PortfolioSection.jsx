import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { gsap, initHeaderReveal, prefersReducedMotion } from '../utils/motion'

const PROJECTS = [
  {
    id: 'medflow-hms',
    title: 'MedFlow Clinical Workflow & Hospital ERP',
    category: 'ERP & EMS',
    desc: 'Multi-branch healthcare management platform automating OPD patient queues, electronic health records, pharmacy billing, and physician round notes.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop&q=80',
    link: '/software',
    isLive: false
  },
  {
    id: 'eduprime-campus',
    title: 'EduPrime Multi-Campus Academic Operating System',
    category: 'ERP & EMS',
    desc: 'Comprehensive school and academy management ERP with online enrollment portals, automated fee collection, biometric attendance, and report cards.',
    tech: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=500&fit=crop&q=80',
    link: '/templates/eduprime-education-institute',
    isLive: false
  },
  {
    id: 'fleettrack-mobile',
    title: 'FleetPulse Workforce & GPS Tracking App',
    category: 'Mobile Applications',
    desc: 'Cross-platform mobile application with geo-fenced attendance, real-time vehicle route tracking, and offline data synchronization.',
    tech: ['Flutter', 'Firebase', 'Dart', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=500&fit=crop&q=80',
    link: '/custom-development',
    isLive: false
  },
  {
    id: 'omnicrm-sales',
    title: 'OmniTrade B2B Sales & Pipeline CRM',
    category: 'Custom Software',
    desc: 'High-speed sales CRM with automated follow-ups, quotation generator, deal stage analytics, and role-based permissions.',
    tech: ['React', 'Node.js', 'MySQL', 'REST API'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80',
    link: '/software',
    isLive: false
  },
  {
    id: 'shopsphere-store',
    title: 'ShopSphere High-Speed E-Commerce Portal',
    category: 'Websites',
    desc: 'Modern dynamic online store with sub-second page loads, custom inventory sync, multi-currency checkout, and order notification webhooks.',
    tech: ['React', 'Node.js', 'MySQL', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=500&fit=crop&q=80',
    link: '/templates',
    isLive: false
  },
  {
    id: 'fitpro-gym',
    title: 'FitPro Gym & Studio Management System',
    category: 'ERP & EMS',
    desc: 'Member management software with automated renewal WhatsApp alerts, turnstile gate biometric access, and personal trainer booking.',
    tech: ['PHP', 'Laravel', 'MySQL', 'REST API'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop&q=80',
    link: '/software',
    isLive: false
  }
]

const CATEGORIES = ['All', 'Websites', 'Mobile Applications', 'ERP & EMS', 'Custom Software']

export default function PortfolioSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        initHeaderReveal(headerRef.current)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="scroll-mt-28 py-10 sm:py-16 lg:py-24 bg-[#0B0B0C] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#E50914]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="reveal-item inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROVEN DELIVERABLES</span>
            </div>

            <h2 className="reveal-item text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.12]">
              Portfolio &amp;{' '}
              <span className="text-[#E50914] relative inline-block">
                Completed Work.
              </span>
            </h2>

            <p className="reveal-item text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore custom websites, mobile applications, and enterprise ERP/EMS platforms engineered for clients across multiple business sectors.
            </p>
          </div>

          {/* Category Filter Pills with smooth active pill animation */}
          <div className="reveal-item flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#121214] border border-white/10 shadow-lg">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'text-[#0B0B0C]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeFilterPill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-[#E50914] rounded-xl shadow-[0_0_15px_rgba(229, 9, 20,0.35)] -z-10"
                  />
                )}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid with smooth Layout Animation */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-[#121214] border border-white/10 overflow-hidden hover:border-[#E50914]/60 hover:shadow-[0_20px_50px_rgba(229, 9, 20,0.18)] transition-all duration-300 group"
              >
                <div>
                  {/* Screenshot Container */}
                  <div className="relative aspect-[16/10] bg-[#0B0B0C] overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/20 to-transparent" />
                    
                    <span className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0B0B0C]/90 backdrop-blur-md text-[#E50914] border border-[#E50914]/30">
                      {proj.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#E50914] transition-colors mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                      {proj.desc}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono font-semibold text-[#E50914]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 border-t border-white/10 mt-2">
                  <Link
                    to={proj.link}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#E50914] group-hover:text-white transition-colors pt-3"
                  >
                    <span>View Project Architecture</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}

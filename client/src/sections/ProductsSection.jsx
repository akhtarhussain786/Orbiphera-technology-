import React, { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import axios from 'axios'
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Laptop,
  Eye
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { gsap, initHeaderReveal, initStaggerCards, prefersReducedMotion } from '../utils/motion'

const DEFAULT_PRODUCTS = [
  {
    id: 'erp-system',
    title: 'ERP Management System',
    category: 'ENTERPRISE ERP',
    badge: 'Multi-Branch & Finance',
    desc: 'Centralized enterprise platform streamlining multi-branch inventory, accounts, GST invoicing, supply chain, and staff permissions.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=480&fit=crop&q=80',
    features: [
      'Automated GST & Invoicing Engine',
      'Multi-Warehouse Inventory Tracking',
      'Real-Time Balance Sheet & P&L Ledgers',
      'Granular Role-Based Access (RBAC)'
    ],
    detailsLink: '/software',
    demoLink: '/request-demo?product=erp',
    isActive: true
  },
  {
    id: 'ems-workforce',
    title: 'Employee Management System (EMS)',
    category: 'WORKFORCE & PAYROLL',
    badge: 'GPS & Attendance OS',
    desc: 'Smart workforce administration featuring GPS geo-fenced mobile attendance, automated monthly payroll calculations, and leave approvals.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=480&fit=crop&q=80',
    features: [
      'GPS Geo-Fenced Mobile Punch In/Out',
      'Automated Salary, PF & Tax Computation',
      'Shift Rosters & Leave Workflows',
      'Live Field Staff Tracking & Reports'
    ],
    detailsLink: '/software',
    demoLink: '/request-demo?product=ems',
    isActive: true
  },
  {
    id: 'institute-management',
    title: 'Institute & School Management Software',
    category: 'EDUCATION & ACADEMICS',
    badge: 'Campus Operating System',
    desc: 'End-to-end campus software managing student admissions, automated fee reconciliation, class schedules, exams, and parent communications.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=480&fit=crop&q=80',
    features: [
      'Online Admissions & Verification',
      'Automated Fee Dues & Payment Links',
      'Exam Result Cards & Grade Ledgers',
      'Student & Guardian Mobile Apps'
    ],
    detailsLink: '/templates/eduprime-education-institute',
    demoLink: '/request-demo?product=institute',
    isActive: true
  },
  {
    id: 'gym-management',
    title: 'Gym & Fitness Management Software',
    category: 'HEALTH & FITNESS',
    badge: 'Membership Portal',
    desc: 'Fitness studio and gym administration system managing member subscriptions, trainer slots, biometric turnstile integration, and POS.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=480&fit=crop&q=80',
    features: [
      'Member Plans, Renewals & WhatsApp Alerts',
      'Biometric Machine & QR Access Integration',
      'Trainer Booking & Class Schedules',
      'POS Billing for Supplements & Passes'
    ],
    detailsLink: '/software',
    demoLink: '/request-demo?product=gym',
    isActive: true
  },
  {
    id: 'custom-business-suite',
    title: 'Custom Business Software Solutions',
    category: 'BESPOKE AUTOMATION',
    badge: 'Tailored SaaS Architecture',
    desc: 'Bespoke corporate management portals engineered specifically for proprietary workflows, custom APIs, high-volume database queries, and zero license lock-in.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=480&fit=crop&q=80',
    features: [
      'Tailored Business Logic & Custom Dashboards',
      'MySQL, PostgreSQL & MongoDB Clusters',
      'Third-Party Payment & SMS Gateways',
      'Full Source Code & 100% Data Ownership'
    ],
    detailsLink: '/custom-development',
    demoLink: '/request-demo?product=custom',
    isActive: true
  }
]

export default function ProductsSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const [products, setProducts] = useState(DEFAULT_PRODUCTS)
  const [title, setTitle] = useState('Our Products & Digital Solutions.')
  const [subtitle, setSubtitle] = useState('Production-ready enterprise software systems designed for rapid deployment, high data integrity, and intuitive day-to-day operations.')
  const [badgeText, setBadgeText] = useState('TURNKEY SOFTWARE SUITES')
  const [exploreButtonText, setExploreButtonText] = useState('Explore All Software')
  const [exploreButtonLink, setExploreButtonLink] = useState('/software')
  const [isSectionActive, setIsSectionActive] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const SERVER_HOST = API_URL.replace('/api', '')

  // Fetch dynamic products from Admin / Content API
  useEffect(() => {
    let isMounted = true
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/content/products_showcase`)
        if (isMounted && res.data?.success && res.data.section) {
          const sec = res.data.section
          if (sec.title) setTitle(sec.title)
          if (sec.subtitle) setSubtitle(sec.subtitle)
          if (sec.isActive !== undefined) setIsSectionActive(sec.isActive)
          if (sec.data?.badgeText) setBadgeText(sec.data.badgeText)
          if (sec.data?.exploreButtonText) setExploreButtonText(sec.data.exploreButtonText)
          if (sec.data?.exploreButtonLink) setExploreButtonLink(sec.data.exploreButtonLink)
          
          if (Array.isArray(sec.data?.products) && sec.data.products.length > 0) {
            const activeOnly = sec.data.products.filter(p => p.isActive !== false)
            if (activeOnly.length > 0) {
              setProducts(activeOnly)
            }
          }
        }
      } catch {
        // Fallback silently to default
      }
    }

    fetchProducts()
    return () => {
      isMounted = false
    }
  }, [API_URL])

  // GSAP Entrance Animations
  useEffect(() => {
    if (prefersReducedMotion() || !isSectionActive) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        initHeaderReveal(headerRef.current)
      }

      if (gridRef.current) {
        initStaggerCards(gridRef.current, '.product-card', {
          y: 40,
          stagger: 0.1,
          duration: 0.8
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [products, isSectionActive])

  if (!isSectionActive) {
    return null
  }

  const formatImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=480&fit=crop&q=80'
    if (img.startsWith('http://') || img.startsWith('https://')) return img
    return `${SERVER_HOST}${img}`
  }

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="scroll-mt-28 py-16 sm:py-24 bg-[#0B0B0C] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-[#E50914]/7 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="reveal-item inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#FF2A36]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{badgeText}</span>
            </div>

            <h2 className="reveal-item text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.12]">
              {title.includes('Products &') ? (
                <>
                  Our Products &amp;{' '}
                  <span className="text-[#FF2A36] relative inline-block">
                    {title.replace(/.*Products\s*&\s*/i, '')}
                  </span>
                </>
              ) : (
                <span className="text-white">{title}</span>
              )}
            </h2>

            <p className="reveal-item text-base sm:text-lg text-slate-300 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="reveal-item flex-shrink-0">
            <Link
              to={exploreButtonLink || '/software'}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-[#121214] border border-white/10 hover:border-[#E50914] text-xs font-bold uppercase tracking-wider text-white hover:text-[#FF2A36] transition-all"
            >
              <span>{exploreButtonText || 'Explore All Software'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {products.map((prod) => (
            <motion.div
              key={prod.id || prod.title}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="product-card flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-[#121214] border border-white/10 overflow-hidden hover:border-[#E50914] hover:shadow-[0_20px_50px_rgba(229,9,20,0.25)] transition-all duration-300 group"
            >
              <div>
                {/* Visual Header / Mockup Preview */}
                <div className="relative aspect-[16/10] bg-[#0B0B0C] overflow-hidden">
                  <img
                    src={formatImageUrl(prod.image)}
                    alt={prod.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=480&fit=crop&q=80'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/40 to-transparent" />
                  
                  {/* Category & Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    {prod.category && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0B0B0C]/85 backdrop-blur-md text-white border border-white/10 truncate max-w-[50%]">
                        {prod.category}
                      </span>
                    )}
                    {prod.badge && (
                      <span className="text-[10px] font-mono font-bold text-white px-2.5 py-1 rounded-md bg-[#E50914] shadow-xs truncate max-w-[50%]">
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white tracking-tight drop-shadow-sm">
                      {prod.title}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6">
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                    {prod.desc}
                  </p>

                  {/* Key Features Checklist */}
                  {Array.isArray(prod.features) && prod.features.length > 0 && (
                    <div className="space-y-2 py-3 border-t border-white/10">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF2A36] font-mono block">
                        Core Features:
                      </span>
                      {prod.features.map((feat, fIdx) => (
                        <div key={`${feat}-${fIdx}`} className="flex items-start space-x-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: View Details & Request Demo */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <Link
                  to={prod.detailsLink || '/software'}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-bold text-white hover:bg-[#E50914]/10 hover:text-[#FF2A36] hover:border-[#E50914]/40 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </Link>

                <Link
                  to={prod.demoLink || '/request-demo'}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#E50914] hover:bg-[#CC0813] text-center text-xs font-black text-white transition-colors flex items-center justify-center space-x-1 shadow-[0_0_15px_rgba(229,9,20,0.4)]"
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Request Demo</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

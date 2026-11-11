import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '../../context/SettingsContext'
import BrandLogo from './BrandLogo'
import { initMagneticHover, gsap, prefersReducedMotion } from '../../utils/motion'
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Code2,
  Smartphone,
  Globe,
  Layers,
  Sparkles,
  Bot,
  FileText,
  Target,
  BarChart3,
  Building2,
  Dumbbell
} from 'lucide-react'

export default function Navbar() {
  const { settings } = useSettings()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)

  const location = useLocation()
  const servicesRef = useRef(null)
  const productsRef = useRef(null)
  const ctaBtnRef = useRef(null)
  const navContainerRef = useRef(null)
  const servicesTimeoutRef = useRef(null)
  const productsTimeoutRef = useRef(null)

  // Navbar GSAP Entrance on Initial Page Load
  useEffect(() => {
    if (navContainerRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        navContainerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      )
    }
  }, [])

  useEffect(() => {
    const closeDropdowns = () => {
      setIsServicesOpen(false)
      setIsProductsOpen(false)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      closeDropdowns()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', closeDropdowns, { passive: true })
    window.addEventListener('touchmove', closeDropdowns, { passive: true })
    window.addEventListener('lenis-scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', closeDropdowns)
      window.removeEventListener('touchmove', closeDropdowns)
      window.removeEventListener('lenis-scroll', handleScroll)
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const cleanupMagnetic = initMagneticHover(ctaBtnRef.current, 0.25)
    return () => cleanupMagnetic()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsServicesOpen(false)
      }
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setIsProductsOpen(false)
      }
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsServicesOpen(false)
        setIsProductsOpen(false)
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsServicesOpen(false)
    setIsProductsOpen(false)
  }, [location.pathname, location.hash])

  const megaServices = [
    { title: 'Website Development', desc: 'Custom portals, dynamic stores & landing pages', href: '/#services', icon: Globe },
    { title: 'Mobile App Development', desc: 'Android, iOS & Flutter cross-platform apps', href: '/#services', icon: Smartphone },
    { title: 'ERP Software Development', desc: 'Institute, hospital & inventory management', href: '/#services', icon: Layers },
    { title: 'EMS – Employee Management', desc: 'GPS attendance, tracking & automated payroll', href: '/#services', icon: Target },
    { title: 'CRM Development', desc: 'Lead pipelines, tracking & sales analytics', href: '/#services', icon: BarChart3 },
    { title: 'Custom Software Solutions', desc: 'Bespoke business automation & secure APIs', href: '/#services', icon: Code2 }
  ]

  const productItems = [
    { title: 'ERP Management System', desc: 'Multi-branch inventory, accounts & GST ledgers', href: '/#products', icon: Sparkles },
    { title: 'Employee Management (EMS)', desc: 'Mobile geo-fenced attendance & payroll', href: '/#products', icon: Bot },
    { title: 'Institute & School Software', desc: 'Admissions, fees, exams & student portal', href: '/#products', icon: FileText },
    { title: 'Gym & Fitness Software', desc: 'Membership subscriptions, turnstile gate & POS', href: '/#products', icon: Dumbbell },
    { title: 'Custom Business Suite', desc: 'Bespoke enterprise workflows & cloud database', href: '/#products', icon: Building2 }
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? 'pointer-events-auto py-2 sm:py-2.5 px-3 sm:px-6 lg:px-8 bg-[#0B0B0C]/92 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.85)]'
          : 'pointer-events-none pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8 bg-transparent'
        }`}
    >
      <nav
        ref={navContainerRef}
        className={`pointer-events-auto relative mx-auto max-w-7xl transition-all duration-300 ease-out flex items-center justify-between gap-3 sm:gap-6 ${isScrolled
            ? 'bg-transparent py-0.5 px-1 sm:px-2'
            : 'bg-[#0B0B0C]/80 backdrop-blur-xl border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.5)] py-2.5 sm:py-3 px-4 sm:px-6 rounded-full'
          }`}
      >
        {/* Company Logo on Left */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0" aria-label="Orbiphera Technology Home">
            <BrandLogo
              theme="dark"
              size="md"
              showText={true}
              textClassName="text-sm sm:text-base font-black text-white tracking-tight whitespace-nowrap"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-xs xl:text-[13px] font-semibold text-white">
          {/* Home (Active with Crimson highlight) */}
          <Link
            to="/"
            className="px-3 xl:px-3.5 py-1.5 rounded-full text-[#FF2A36] font-bold hover:bg-[#E50914]/10 transition-colors whitespace-nowrap relative"
          >
            <span>Home</span>
            <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E50914] rounded-full" />
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            ref={servicesRef}
            onMouseEnter={() => {
              if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current)
              setIsServicesOpen(true)
              setIsProductsOpen(false)
            }}
            onMouseLeave={() => {
              servicesTimeoutRef.current = setTimeout(() => {
                setIsServicesOpen(false)
              }, 180)
            }}
          >
            <button
              type="button"
              onClick={() => {
                setIsServicesOpen(!isServicesOpen)
                setIsProductsOpen(false)
              }}
              className={`flex items-center space-x-1 px-3 xl:px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer ${isServicesOpen ? 'text-[#FF2A36] bg-[#E50914]/10 font-bold' : 'text-white hover:text-[#FF2A36] hover:bg-white/5'
                }`}
            >
              <span>Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-[#FF2A36]' : ''}`} />
            </button>

            {/* Services Dropdown Mega Menu */}
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full -left-12 lg:-left-28 xl:-left-36 mt-3 w-[680px] max-w-[calc(100vw-2rem)] bg-[#121214] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/10 z-50 text-left overflow-hidden p-6 before:absolute before:-top-4 before:inset-x-0 before:h-4 before:content-['']"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#FF2A36]">
                      CORE IT DEVELOPMENT SERVICES
                    </span>
                    <a
                      href="#services"
                      onClick={() => setIsServicesOpen(false)}
                      className="text-[11px] text-slate-400 hover:text-[#FF2A36] flex items-center space-x-1"
                    >
                      <span>View all 6 services</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {megaServices.map((it) => {
                      const Icon = it.icon
                      return (
                        <a
                          key={it.title}
                          href={it.href}
                          onClick={() => setIsServicesOpen(false)}
                          className="flex items-start space-x-3 p-3 rounded-2xl bg-white/[0.03] hover:bg-[#E50914]/10 border border-transparent hover:border-[#E50914]/30 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-white/5 group-hover:bg-[#E50914] flex items-center justify-center text-[#FF2A36] group-hover:text-white transition-colors shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white group-hover:text-[#FF2A36] block transition-colors">
                              {it.title}
                            </span>
                            <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                              {it.desc}
                            </span>
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Products Dropdown */}
          <div
            className="relative"
            ref={productsRef}
            onMouseEnter={() => {
              if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current)
              setIsProductsOpen(true)
              setIsServicesOpen(false)
            }}
            onMouseLeave={() => {
              productsTimeoutRef.current = setTimeout(() => {
                setIsProductsOpen(false)
              }, 180)
            }}
          >
            <button
              type="button"
              onClick={() => {
                setIsProductsOpen(!isProductsOpen)
                setIsServicesOpen(false)
              }}
              className={`flex items-center space-x-1 px-3 xl:px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer ${isProductsOpen ? 'text-[#FF2A36] bg-[#E50914]/10 font-bold' : 'text-white hover:text-[#FF2A36] hover:bg-white/5'
                }`}
            >
              <span>Products</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProductsOpen ? 'rotate-180 text-[#FF2A36]' : ''}`} />
            </button>

            {/* Products Dropdown Menu */}
            <AnimatePresence>
              {isProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full -left-12 lg:-left-20 mt-3 w-80 bg-[#121214] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 z-50 text-left overflow-hidden p-3 before:absolute before:-top-4 before:inset-x-0 before:h-4 before:content-['']"
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-[#FF2A36]">
                    Featured Digital Solutions
                  </div>
                  <div className="space-y-1">
                    {productItems.map((prod) => {
                      const Icon = prod.icon
                      return (
                        <a
                          key={prod.title}
                          href={prod.href}
                          onClick={() => setIsProductsOpen(false)}
                          className="flex items-start space-x-2.5 p-2.5 rounded-xl hover:bg-[#E50914]/10 group transition-all"
                        >
                          <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#FF2A36] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-white group-hover:text-[#FF2A36] block">
                              {prod.title}
                            </span>
                            <span className="text-[10px] text-slate-400 leading-tight block">
                              {prod.desc}
                            </span>
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Portfolio */}
          <a
            href="/#work"
            className="px-3 xl:px-3.5 py-1.5 rounded-full text-white hover:text-[#FF2A36] hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Portfolio
          </a>

          {/* About Us */}
          <a
            href="/#why-us"
            className="px-3 xl:px-3.5 py-1.5 rounded-full text-white hover:text-[#FF2A36] hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            About Us
          </a>

          {/* Contact */}
          <a
            href="#contact"
            className="px-3 xl:px-3.5 py-1.5 rounded-full text-white hover:text-[#FF2A36] hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Contact
          </a>
        </div>

        {/* Right Action: Get a Quote CTA Button (Crimson Red #E50914, desktop/tablet only; mobile has full CTA in menu drawer) */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 flex-shrink-0">
          <div ref={ctaBtnRef} className="hidden sm:inline-block flex-shrink-0">
            <a
              href="#contact"
              className="whitespace-nowrap inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-[#E50914] hover:bg-[#CC0813] text-white text-xs sm:text-[13px] font-black transition-all shadow-[0_0_20px_rgba(229,9,20,0.45)] hover:shadow-[0_0_30px_rgba(229,9,20,0.65)] group flex-shrink-0 cursor-pointer"
            >
              <span className="whitespace-nowrap">Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform stroke-[2.5] flex-shrink-0" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-[#E50914] hover:text-white flex items-center justify-center text-white border border-white/10 transition-colors active:scale-95 cursor-pointer flex-shrink-0"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden pointer-events-auto mx-3 sm:mx-6 mt-2 p-5 bg-[#0B0B0C]/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#FF2A36] block px-2">Navigation</span>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-2 text-xs font-bold text-white hover:text-[#FF2A36]">Home</Link>
              <a href="/#services" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-2 text-xs font-bold text-white hover:text-[#FF2A36]">Services</a>
              <a href="/#products" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-2 text-xs font-bold text-white hover:text-[#FF2A36]">Products</a>
              <a href="/#work" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-2 text-xs font-bold text-white hover:text-[#FF2A36]">Portfolio</a>
              <a href="/#why-us" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-2 text-xs font-bold text-white hover:text-[#FF2A36]">About Us</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-2 text-xs font-bold text-white hover:text-[#FF2A36]">Contact</a>
            </div>

            <div className="pt-2 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#E50914] text-white text-xs font-black flex items-center justify-center space-x-1.5 shadow-[0_0_20px_rgba(229,9,20,0.45)]"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

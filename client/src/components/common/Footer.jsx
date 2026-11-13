import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import BrandLogo from './BrandLogo'
import { 
  Linkedin, 
  Instagram, 
  Facebook, 
  ShieldCheck, 
  Star, 
  MessageSquare, 
  Mail, 
  Send 
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useSettings } from '../../context/SettingsContext'
import { useSmoothScroll } from './SmoothScrollProvider'
import { gsap, initHeaderReveal, initStaggerCards, prefersReducedMotion } from '../../utils/motion'

export default function Footer() {
  const { settings } = useSettings()
  const smoothScroll = useSmoothScroll()
  const footerRef = useRef(null)
  const topRowRef = useRef(null)
  const middleGridRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)

  const brandName = settings?.siteName || 'Orbiphera Technologies'
  const contactEmail = settings?.contactEmail || 'contact@orbiphera.in'
  const contactPhone = settings?.contactPhone || '+91 98765 43210'

  const rawPhone = contactPhone.replace(/[^0-9]/g, '')
  const whatsappNumber = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello ${brandName}, I would like to consult with your engineering team.`
  )}`

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (topRowRef.current) {
        gsap.fromTo(
          topRowRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: topRowRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        )
      }

      if (middleGridRef.current) {
        initStaggerCards(middleGridRef.current, '.footer-col', {
          y: 25,
          stagger: 0.08,
          duration: 0.7
        })
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid work email.')
      return
    }
    setSubscribing(true)
    setTimeout(() => {
      toast.success('Subscribed! You will receive our monthly engineering digest.')
      setEmail('')
      setSubscribing(false)
    }, 600)
  }

  const columns = [
    {
      title: 'OUR SERVICES',
      links: [
        { name: 'Website Development', href: '/#services' },
        { name: 'Mobile App Development', href: '/#services' },
        { name: 'ERP Software Development', href: '/#services' },
        { name: 'EMS – Employee Management', href: '/#services' },
        { name: 'CRM Development', href: '/#services' },
        { name: 'Custom Software Solutions', href: '/#services' }
      ]
    },
    {
      title: 'DIGITAL PRODUCTS',
      links: [
        { name: 'ERP Management System', href: '/#products' },
        { name: 'Employee Management (EMS)', href: '/#products' },
        { name: 'Institute Management Software', href: '/#products' },
        { name: 'Gym Management Software', href: '/#products' },
        { name: 'Custom Business Solutions', href: '/#products' }
      ]
    },
    {
      title: 'HOW WE WORK',
      links: [
        { name: 'Why Choose Us (6 Pillars)', href: '/#why-us' },
        { name: 'About Our Company', href: '/#about' },
        { name: '5-Step Workflow Process', href: '/#process' },
        { name: 'Completed Portfolio', href: '/#work' },
        { name: 'Industries We Serve', href: '/#industries' },
        { name: 'Direct Architecture Team', href: '/#team' }
      ]
    },
    {
      title: 'COMPANY & CONTACT',
      links: [
        { name: 'Client Reviews & Testimonials', href: '/#reviews' },
        { name: 'Frequently Asked Questions', href: '/#faq' },
        { name: 'Request Free Consultation', href: '#contact' },
        { name: 'WhatsApp Technical Support', href: whatsappUrl }
      ]
    }
  ]

  const scrollToTop = () => {
    if (smoothScroll?.scrollTo) {
      smoothScroll.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer 
      ref={footerRef}
      className="bg-[#0B0B0C] text-white border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#E50914]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-24 sm:pb-12 relative z-10">
        
        {/* Top Row: Brand Info + Compact Newsletter Subscription Box */}
        <div ref={topRowRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-start">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group" aria-label="Orbiphera Technologies">
              <BrandLogo size="md" showText={true} theme="dark" textClassName="text-white text-base font-black tracking-tight" />
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              We design and develop powerful websites, mobile applications, enterprise software and business management systems that help businesses grow faster.
            </p>

            <div className="space-y-2 text-xs text-slate-400 font-mono">
              <div>
                <strong className="text-[#E50914]">Siwan Head Office: </strong>
                Station Road / Hospital Road, Siwan, Bihar – 841226, India
              </div>
              <div>
                <strong className="text-[#E50914]">Patna Branch: </strong>
                Level 4, Corporate Plaza, Frazer Road, Patna, Bihar – 800001, India
              </div>
              <div>
                <strong className="text-[#E50914]">NCR Delivery Center: </strong>
                Tower B, Sector 62, Noida, Uttar Pradesh – 201309, India
              </div>
            </div>
          </div>

          {/* Compact Newsletter Subscription Box (7 cols) */}
          <div className="lg:col-span-7 bg-[#121214] p-6 rounded-3xl border border-white/10 shadow-lg">
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E50914] flex-shrink-0 mt-0.5">
                <Mail className="w-4 h-4 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Monthly Enterprise Engineering Digest</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Join enterprise founders and CTOs receiving monthly architecture teardowns, ERP insights, and production software updates.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your work email address..."
                className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E50914] focus:bg-white/10 transition-all shadow-inner"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={subscribing}
                className="px-5 py-2.5 rounded-full bg-[#E50914] hover:bg-[#b5e028] text-white text-xs font-black transition-all flex items-center justify-center space-x-1.5 shadow-[0_0_15px_rgba(229, 9, 20,0.3)] flex-shrink-0 disabled:opacity-50 cursor-pointer"
              >
                <span>{subscribing ? 'Joining...' : 'Subscribe'}</span>
                <Send className="w-3.5 h-3.5 stroke-[2]" />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Middle Grid: Contact & Navigation Columns */}
        <div ref={middleGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-12 border-b border-white/10">
          
          {/* Direct Reach (4 cols) */}
          <div className="footer-col lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              DIRECT REACH
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block font-mono">Client Project Inquiries:</span>
                <a href={`mailto:${contactEmail}`} className="text-white font-bold hover:text-[#E50914] transition-colors">
                  {contactEmail}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block font-mono">Phone Consultation:</span>
                <a href={`tel:${contactPhone}`} className="text-white font-bold hover:text-[#E50914] transition-colors">
                  {contactPhone}
                </a>
              </div>
            </div>

            {/* Social Links with aria-labels & Motion hover */}
            <div className="flex items-center space-x-2 pt-2">
              {[
                { href: 'https://linkedin.com', label: 'LinkedIn Profile', icon: Linkedin },
                { href: 'https://instagram.com', label: 'Instagram Profile', icon: Instagram },
                { href: 'https://facebook.com', label: 'Facebook Page', icon: Facebook },
                { href: whatsappUrl, label: 'WhatsApp Technical Consultation', icon: MessageSquare }
              ].map((soc, idx) => {
                const Icon = soc.icon
                return (
                  <motion.a
                    key={idx}
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    whileTap={{ scale: 0.92 }}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#E50914] hover:text-white hover:border-[#E50914] transition-colors shadow-xs"
                    aria-label={soc.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* 4 Navigation Columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {columns.map((col) => (
              <div key={col.title} className="footer-col space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  {col.title}
                </h4>
                <ul className="space-y-2 text-xs">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      {link.href.startsWith('http') ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-[#FF2A36] transition-colors block leading-relaxed"
                        >
                          {link.name}
                        </a>
                      ) : link.href.startsWith('/#') ? (
                        <a
                          href={link.href}
                          className="text-slate-400 hover:text-[#FF2A36] transition-colors block leading-relaxed"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-slate-400 hover:text-[#FF2A36] transition-colors block leading-relaxed"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Local SEO Coverage Banner */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
            <span className="font-semibold text-slate-200">
              #1 Rated Website &amp; Software Development Company in Siwan, Bihar
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 text-center md:text-right">
            <span>Primary Serving Locations: </span>
            <span className="text-[#FF2A36]">Siwan</span> • <span>Gopalganj</span> • <span>Chhapra</span> • <span>Patna</span> • <span>Muzaffarpur</span> • <span>Pan-India</span>
          </div>
        </div>

        {/* Bottom Row: Verified Badges, Legal Links, Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1 text-white font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF2A36]" />
              <span>ISO 27001 Certified Security</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1 text-white font-semibold">
              <Star className="w-3.5 h-3.5 text-[#FF2A36] fill-[#FF2A36]" />
              <span>4.9/5 Enterprise Rating</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link to="/contact" className="hover:text-white underline">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-white underline">
              Terms of Service
            </Link>
            <span>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</span>
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="text-[#FF2A36] hover:underline font-mono inline-flex items-center space-x-1 font-bold cursor-pointer"
            >
              <span>Back to Top ↑</span>
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  )
}

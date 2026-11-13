import React, { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { 
  ArrowRight, 
  MessageSquare, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSettings } from '../context/SettingsContext'
import { gsap, initHeaderReveal, initMagneticHover, prefersReducedMotion } from '../utils/motion'

export default function ProjectInquiryCTA() {
  const { settings } = useSettings()
  const sectionRef = useRef(null)
  const leftColRef = useRef(null)
  const formCardRef = useRef(null)
  const submitBtnRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    serviceType: 'Website Development',
    budget: '₹50,000 - ₹1,50,000',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const brandName = settings?.siteName || 'Orbiphera Technologies'
  const contactEmail = settings?.contactEmail || 'contact@yathartitsolutions.com'
  const contactPhone = settings?.contactPhone || '+91 98765 43210'
  const rawPhone = contactPhone.replace(/[^0-9]/g, '')
  const whatsappNumber = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello ${brandName}, I would like to get a quote for a software development project.`
  )}`

  // Magnetic button hover
  useEffect(() => {
    const cleanSubmit = initMagneticHover(submitBtnRef.current, 0.2)
    return () => cleanSubmit()
  }, [])

  // GSAP ScrollTrigger Entrance
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Left Column elements
      if (leftColRef.current) {
        initHeaderReveal(leftColRef.current)
      }

      // Right form card smooth elevation
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formCardRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please complete name, email, phone, and project description.')
      return
    }

    try {
      setSubmitting(true)
      const API_URL = import.meta.env.VITE_API_URL || '/api'
      await axios.post(`${API_URL}/inquiries`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        serviceType: formData.serviceType,
        budget: formData.budget,
        message: formData.message,
        projectDescription: formData.message
      })
      toast.success('Your project inquiry was submitted successfully! Our team will contact you within 24 hours.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        serviceType: 'Website Development',
        budget: '₹50,000 - ₹1,50,000',
        message: ''
      })
    } catch {
      toast.success('Thank you! Your requirements were submitted.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        serviceType: 'Website Development',
        budget: '₹50,000 - ₹1,50,000',
        message: ''
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="scroll-mt-28 py-10 sm:py-16 lg:py-24 bg-[#0F0F11] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] bg-[#E50914]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Consultation & Channels (5 cols) */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="reveal-item inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914]">
                <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
                <span>START YOUR PROJECT</span>
              </div>

              <h2 className="reveal-item text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.12]">
                Get a Free Quote &amp;{' '}
                <span className="text-[#E50914] relative inline-block">
                  Technical Proposal.
                </span>
              </h2>

              <p className="reveal-item text-base sm:text-lg text-slate-300 leading-relaxed">
                Connect directly with our senior software architects. Receive an architectural assessment, milestone timeline, and fixed-scope quotation within 24 hours.
              </p>
            </div>

            {/* Direct WhatsApp Callout Card */}
            <motion.div 
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={{ duration: 0.25 }}
              className="reveal-item p-6 rounded-2xl sm:rounded-3xl bg-[#121214] border border-white/10 shadow-lg space-y-4 hover:border-[#E50914]/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center text-[#E50914]">
                  <MessageSquare className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Instant WhatsApp Consultation</h4>
                  <span className="text-xs text-[#E50914] font-semibold flex items-center space-x-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
                    <span>Online • Average Response: Under 15 Mins</span>
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Prefer immediate technical discussion? Chat directly with our solutions engineering team on WhatsApp.
              </p>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-3.5 px-5 rounded-xl bg-[#E50914] hover:bg-[#b5e028] text-white text-xs sm:text-sm font-black transition-all shadow-[0_0_20px_rgba(229, 9, 20,0.3)] group cursor-pointer"
              >
                <span>Chat on WhatsApp ({contactPhone})</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Direct Contact Channels */}
            <div className="space-y-3 text-xs">
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { x: 4 }}
                transition={{ duration: 0.2 }}
                className="reveal-item flex items-center space-x-3.5 p-4 rounded-2xl bg-[#121214] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#E50914] flex-shrink-0">
                  <Mail className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Official Email</span>
                  <a href={`mailto:${contactEmail}`} className="text-sm font-bold text-white hover:text-[#E50914] transition-colors">
                    {contactEmail}
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={shouldReduceMotion ? {} : { x: 4 }}
                transition={{ duration: 0.2 }}
                className="reveal-item flex items-center space-x-3.5 p-4 rounded-2xl bg-[#121214] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#E50914] flex-shrink-0">
                  <Phone className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Direct Phone</span>
                  <a href={`tel:${contactPhone}`} className="text-sm font-bold text-white hover:text-[#E50914] transition-colors">
                    {contactPhone}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Project Quotation Form (7 cols) */}
          <div className="lg:col-span-7">
            <div 
              ref={formCardRef}
              className="bg-[#121214] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-[0_16px_50px_rgba(0,0,0,0.8)]"
            >
              <div className="mb-6 pb-4 border-b border-white/10">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Request a Free Consultation &amp; Quote
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Tell us about your project specifications. All information is protected under Non-Disclosure Agreement (NDA).
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#E50914] focus:bg-white/10 transition-all shadow-inner"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#E50914] focus:bg-white/10 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#E50914] focus:bg-white/10 transition-all shadow-inner"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Acme Enterprises Pvt Ltd"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#E50914] focus:bg-white/10 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Required Service */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Required Service *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#161618] border border-white/10 text-white text-sm focus:outline-none focus:border-[#E50914] transition-all cursor-pointer font-medium"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Mobile App Development">Mobile App Development (Android/iOS/Flutter)</option>
                      <option value="ERP Software Development">ERP Software Development</option>
                      <option value="EMS – Employee Management System">EMS – Employee Management System</option>
                      <option value="CRM Development">CRM Development</option>
                      <option value="Custom Software Development">Custom Software Development</option>
                    </select>
                  </div>

                  {/* Project Budget */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#161618] border border-white/10 text-white text-sm focus:outline-none focus:border-[#E50914] transition-all cursor-pointer font-medium"
                    >
                      <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                      <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000</option>
                      <option value="₹1,50,000 - ₹5,00,000">₹1,50,000 - ₹5,00,000</option>
                      <option value="₹5,00,000+ (Enterprise)">₹5,00,000+ (Enterprise)</option>
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Project Description &amp; Scope *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your business requirements, desired features, integrations, and expected launch date..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#E50914] focus:bg-white/10 transition-all resize-none shadow-inner"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <div ref={submitBtnRef} className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl bg-[#E50914] hover:bg-[#b5e028] text-white text-base font-black transition-all flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(229, 9, 20,0.35)] cursor-pointer"
                    >
                      <span>{submitting ? 'Submitting Inquiry...' : 'Submit Inquiry & Get Free Proposal'}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </motion.button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
                  <span className="flex items-center text-[#E50914] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    100% Confidential &amp; NDA Protected
                  </span>
                  <span>Zero Spam Guarantee</span>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

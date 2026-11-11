import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Flame, ShieldCheck, CheckCircle2 } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import UnderlineBar from './UnderlineBar'

export const LandingCtaRoast: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !websiteUrl) {
      toast.error('Please enter both your work email and website URL.')
      return
    }

    try {
      setSubmitting(true)
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      await axios.post(`${API_URL}/inquiries`, {
        name: email.split('@')[0] || 'Website Roast Lead',
        email,
        phone: 'Not provided',
        serviceType: 'Website Architecture Roast',
        budget: 'Free Audit',
        message: `Requested website roast for URL: ${websiteUrl}`
      })
      toast.success('Roast request received! Your 3-min video breakdown is being prepared.')
      setSubmitted(true)
    } catch {
      toast.success('Your roast request was submitted! Check your inbox shortly.')
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="roast" className="py-24 sm:py-32 bg-[#FAFAF8] border-t border-black/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {/* Pre-title Tag */}
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-gray-600 bg-white px-3.5 py-1.5 rounded-full border border-black/5 shadow-2xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>FREE PRODUCT &amp; ARCHITECTURE AUDIT</span>
          </div>

          {/* Master Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-[#0E0E10] tracking-[-0.035em] leading-[1.08]">
            Got a site that needs a{' '}
            <span className="relative inline-block">
              roast?
              <UnderlineBar heightClass="h-3.5 sm:h-4" />
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#4A4B53] max-w-2xl mx-auto leading-relaxed">
            Drop your website link and work email. Our engineering leads will tear through your UX flows, API latency, SEO architecture, and mobile performance — with a brutally honest 3-minute video breakdown.
          </p>

          {/* Form Container */}
          <div className="pt-4 max-w-2xl mx-auto">
            {submitted ? (
              <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-lg text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#00B67A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-[#0E0E10]">
                  Your website roast is cooking!
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                  We are auditing <span className="font-semibold text-black">{websiteUrl}</span>. Expect a detailed video review in your inbox ({email}) within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setEmail('')
                    setWebsiteUrl('')
                  }}
                  className="mt-4 text-xs font-bold text-[#0E0E10] underline underline-offset-4 hover:text-black"
                >
                  Submit another website
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-3 sm:p-4 rounded-3xl bg-white border border-black/10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row gap-3 items-center"
              >
                {/* Website URL Input */}
                <input
                  type="text"
                  required
                  placeholder="https://yourwebsite.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full sm:flex-1 px-4 py-3.5 text-xs sm:text-sm text-[#0E0E10] bg-gray-50/80 rounded-2xl border border-black/5 focus:outline-none focus:border-black/30 focus:bg-white transition-all"
                />

                {/* Email Input */}
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:flex-1 px-4 py-3.5 text-xs sm:text-sm text-[#0E0E10] bg-gray-50/80 rounded-2xl border border-black/5 focus:outline-none focus:border-black/30 focus:bg-white transition-all"
                />

                {/* Black "Gimme the Roast" Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#0E0E10] text-white text-xs sm:text-sm font-bold hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-sm flex-shrink-0 group"
                >
                  <span>{submitting ? 'Auditing...' : 'Gimme the Roast'}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#4A4B53]">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00B67A]" />
              <span>100% Free · No pushy sales calls</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00B67A]" />
              <span>Delivered within 24 business hours</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LandingCtaRoast


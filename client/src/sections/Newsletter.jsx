import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    
    setLoading(true)
    setTimeout(() => {
      toast.success('Subscribed! You will receive early access to new releases.')
      setEmail('')
      setLoading(false)
    }, 800)
  }

  return (
    <section className="py-20 lg:py-28 relative bg-[#FAFAF8] overflow-hidden border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-white border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-center relative overflow-hidden"
        >
          {/* Subtle Ambient Top Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FFE600]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-6 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#FFE600] flex items-center justify-center mx-auto text-[#0F172A] shadow-sm">
              <Mail className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight">
                Stay Ahead of Digital Releases
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Receive weekly drops of newly audited website templates, enterprise software source code, and engineering insights.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email address..."
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-[#0F172A] text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#0F172A] text-white text-xs sm:text-sm font-bold hover:bg-black transition-all flex items-center justify-center space-x-1.5 shadow-sm flex-shrink-0"
              >
                <span>{loading ? 'Joining...' : 'Join Newsletter'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-[#475569] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero spam guarantee. Unsubscribe at any time with 1 click.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Sparkles, 
  Layers, 
  Building2, 
  Wallet, 
  Code, 
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react'
import Button from '../components/ui/Button'

const ProductFinder = () => {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  const [formData, setFormData] = useState({
    need: 'website',
    industry: 'education',
    budget: '5k-10k',
    technology: 'react'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (formData.need) params.append('type', formData.need)
    if (formData.industry) params.append('category', formData.industry)
    if (formData.technology) params.append('tech', formData.technology)
    if (formData.budget) params.append('budget', formData.budget)
    
    navigate(`/marketplace?${params.toString()}`)
  }

  return (
    <section className="py-20 lg:py-28 relative bg-[#F8F7F4] overflow-hidden border-t border-[#E5E7EB]">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#1558C9]/15 via-[#FFC800]/10 to-[#1558C9]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-semibold text-[#FFC800]">
            <Filter className="w-3.5 h-3.5" />
            <span>Smart Product Discovery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight">
            Find the Perfect <span className="text-[#FFC800]">Digital Solution</span>
          </h2>

          <p className="text-base sm:text-lg text-[#475569] font-normal leading-relaxed">
            Select your requirements below and our architecture engine will instantly filter matching templates and software.
          </p>
        </div>

        {/* Discovery Glass Matrix */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-3xl bg-white backdrop-blur-2xl border border-[#E5E7EB] shadow-[0_24px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(255,200,0,0.08)] relative overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FFC800]/10 rounded-full blur-3xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field 1: What do you need? */}
              <div className="space-y-2.5">
                <label className="flex items-center text-xs font-bold uppercase tracking-wider text-[#111827] space-x-2">
                  <Layers className="w-4 h-4 text-[#FFC800]" />
                  <span>Product Category Type</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.need}
                    onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border border-[#E5E7EB] rounded-2xl text-[#111827] text-sm focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-all cursor-pointer appearance-none"
                  >
                    <option value="website">Ready Website Template (Landing / Multi-Page)</option>
                    <option value="software">Enterprise Software & Management ERP</option>
                    <option value="custom">Bespoke Custom Web Engineering</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#475569]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Field 2: Target Industry */}
              <div className="space-y-2.5">
                <label className="flex items-center text-xs font-bold uppercase tracking-wider text-[#111827] space-x-2">
                  <Building2 className="w-4 h-4 text-[#FFC800]" />
                  <span>Target Industry</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border border-[#E5E7EB] rounded-2xl text-[#111827] text-sm focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-all cursor-pointer appearance-none"
                  >
                    <option value="education">Education, Schools & Online LMS</option>
                    <option value="healthcare">Hospital, Clinics & Telemedicine</option>
                    <option value="hospitality">Hotels, Luxury Resorts & Homestays</option>
                    <option value="retail">E-commerce, D2C & Multi-Vendor</option>
                    <option value="business">Corporate, SaaS & Tech Agencies</option>
                    <option value="real-estate">Real Estate & Property Portals</option>
                    <option value="food">Restaurants, Cafes & Cloud Kitchen</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#475569]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Field 3: Budget Range */}
              <div className="space-y-2.5">
                <label className="flex items-center text-xs font-bold uppercase tracking-wider text-[#111827] space-x-2">
                  <Wallet className="w-4 h-4 text-[#FFC800]" />
                  <span>Investment Budget</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border border-[#E5E7EB] rounded-2xl text-[#111827] text-sm focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-all cursor-pointer appearance-none"
                  >
                    <option value="under-5k">Starter (Under ₹5,000)</option>
                    <option value="5k-10k">Growth (₹5,000 - ₹10,000)</option>
                    <option value="10k-25k">Commercial ERP (₹10,000 - ₹25,000)</option>
                    <option value="25k-plus">Enterprise Custom (₹25,000+)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#475569]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Field 4: Preferred Tech Stack */}
              <div className="space-y-2.5">
                <label className="flex items-center text-xs font-bold uppercase tracking-wider text-[#111827] space-x-2">
                  <Code className="w-4 h-4 text-[#FFC800]" />
                  <span>Technology Preference</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.technology}
                    onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border border-[#E5E7EB] rounded-2xl text-[#111827] text-sm focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-all cursor-pointer appearance-none"
                  >
                    <option value="react">React 18 + Tailwind CSS (Recommended)</option>
                    <option value="node">Full-Stack MERN (React + Node + MongoDB)</option>
                    <option value="vite">Vite + Modern Frontend</option>
                    <option value="any">Any Modern Production Architecture</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#475569]">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-[#475569]">
                <CheckCircle2 className="w-4 h-4 text-[#FFC800]" />
                <span>Instant match across 150+ audited software assets</span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={Search}
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Find Matching Products
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductFinder

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, MessageSquare, CheckCircle2, Cpu } from 'lucide-react'
import Button from '../components/ui/Button'

const CustomDevCTA = () => {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-20 lg:py-28 relative bg-[#F8F7F4] overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#111827] text-white border border-gray-800 shadow-2xl overflow-hidden"
        >
          {/* Subtle Golden Amber Ambient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC800]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-[#FFC800]">
                <Cpu className="w-3.5 h-3.5" />
                <span>Bespoke Engineering Division</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Have a Complex Idea That <br className="hidden sm:inline" />
                <span className="text-[#FFC800]">Doesn't Fit a Template?</span>
              </h2>

              <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-2xl">
                Our senior software architects build tailor-made enterprise web applications, specialized CRM systems, custom APIs, and high-load platforms engineered around your exact specifications.
              </p>

              {/* Guarantees Row */}
              <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start text-xs text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Fixed-Price Milestone Contracts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% IP & Source Handover</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sprint-Based Agile Commits</span>
                </div>
              </div>
            </div>

            {/* Right Action CTAs (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3.5 sm:flex-row lg:flex-col justify-center">
              <button
                onClick={() => navigate('/request-quote')}
                className="w-full py-4 px-6 rounded-2xl bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/contact')}
                icon={MessageSquare}
                iconPosition="left"
                className="w-full text-center"
              >
                Talk to an Architect
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CustomDevCTA

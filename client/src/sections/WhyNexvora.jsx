import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { 
  ShieldCheck, 
  Code2, 
  BookOpen, 
  RefreshCw, 
  Headphones, 
  FileCode,
  Sparkles,
  CheckCircle2
} from 'lucide-react'
import { useSettings } from '../context/SettingsContext'

const valueProps = [
  {
    icon: Code2,
    title: 'Production-Ready Codebase',
    description: 'Zero spaghetti code. Built using strict React component conventions, clean Tailwind utility patterns, and industry-standard architecture.'
  },
  {
    icon: FileCode,
    title: 'Full Source & IP Ownership',
    description: 'Get full access to all unminified source code, assets, and database schemas with no recurring royalty fees or restrictive locks.'
  },
  {
    icon: RefreshCw,
    title: 'Lifetime Bug Fixes & Updates',
    description: 'Continuous improvements, security patches, and framework compatibility updates delivered directly to your account dashboard.'
  },
  {
    icon: BookOpen,
    title: 'Exhaustive Setup Documentation',
    description: 'Step-by-step installation guides, environment configurations, and deployment playbooks for Vercel, AWS, Hostinger, and Docker.'
  },
  {
    icon: Headphones,
    title: '24/7 Solution Architect Support',
    description: 'Direct access to experienced full-stack engineers for configuration assistance, code customizations, and third-party integrations.'
  },
  {
    icon: ShieldCheck,
    title: 'Commercial Multi-Use Licensing',
    description: 'Transparent commercial licensing designed for agencies, enterprises, and startups looking to ship fast without legal friction.'
  }
]

const WhyNexvora = () => {
  const { settings } = useSettings()
  const shouldReduceMotion = useReducedMotion()

  const brandName = settings?.siteName || 'Yatharth IT Solutions'

  const containerVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="py-20 lg:py-28 relative bg-[#F8F7F4] overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#1558C9]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-semibold text-[#FFC800]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Marketplace Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight">
            Why Choose <span className="text-[#FFC800]">{brandName}</span>?
          </h2>

          <p className="text-base sm:text-lg text-[#475569] font-normal leading-relaxed">
            We bridge the gap between expensive custom agencies and fragile DIY templates by delivering verified, enterprise-grade software.
          </p>
        </div>

        {/* 6 Value Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? {} : "hidden"}
          whileInView={shouldReduceMotion ? {} : "visible"}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {valueProps.map((prop, idx) => {
            const IconComp = prop.icon
            return (
              <motion.div 
                key={prop.title} 
                variants={itemVariants}
                className="h-full"
              >
                <div className="h-full p-8 rounded-3xl bg-white backdrop-blur-xl border border-[#E5E7EB] hover:border-[#FFC800]/40 hover:bg-[#F3F4F6] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(255,200,0,0.12)] flex flex-col justify-between group">
                  <div className="space-y-5">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#FFC800] group-hover:scale-110 group-hover:bg-[#FFC800]/15 group-hover:border-[#FFC800]/40 transition-all duration-300 shadow-[0_0_15px_rgba(255,200,0,0.12)]">
                      <IconComp className="w-6 h-6" />
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-lg font-bold text-[#111827] tracking-tight group-hover:text-[#FFC800] transition-colors mb-2">
                        {prop.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center space-x-2 text-[11px] text-[#475569] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC800]" />
                    <span>Included with every license</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyNexvora

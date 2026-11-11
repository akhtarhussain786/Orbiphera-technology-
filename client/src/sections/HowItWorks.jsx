import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { 
  Search, 
  Eye, 
  CreditCard, 
  Download, 
  Rocket, 
  Sparkles, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  Layers,
  ArrowRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

const productSteps = [
  {
    step: '01',
    title: 'Explore & Compare',
    subtitle: 'Browse curated marketplace catalogs filtered by industry, business model, and technology stack.',
    icon: Search
  },
  {
    step: '02',
    title: 'Inspect Live Demos',
    subtitle: 'Test interactive live demos, evaluate component architecture, and review included commercial features.',
    icon: Eye
  },
  {
    step: '03',
    title: '100% Secure Checkout',
    subtitle: 'Pay securely using encrypted payment gateways (Razorpay, Stripe, Cards, UPI) with instant invoice generation.',
    icon: CreditCard
  },
  {
    step: '04',
    title: 'Instant Code Download',
    subtitle: 'Immediately download the complete source code, license key, environment configs, and setup documentation.',
    icon: Download
  },
  {
    step: '05',
    title: 'Deploy & Scale with SLA',
    subtitle: 'Launch on your cloud server (Vercel, AWS, Hostinger, VPS) backed by our dedicated developer warranty.',
    icon: Rocket
  }
]

const customSteps = [
  {
    step: '01',
    title: 'Consultation & Scope',
    subtitle: 'Share your business goals, user stories, and architectural specifications with our lead engineers.',
    icon: MessageSquare
  },
  {
    step: '02',
    title: 'System Blueprint',
    subtitle: 'We draft a comprehensive technical roadmap, DB schemas, timeline milestones, and guaranteed fixed pricing.',
    icon: FileText
  },
  {
    step: '03',
    title: 'Agile Engineering Sprints',
    subtitle: 'Watch your product come to life in bi-weekly staging builds with continuous code commits.',
    icon: Layers
  },
  {
    step: '04',
    title: 'Security & QA Testing',
    subtitle: 'Rigorous penetration testing, multi-device viewport audits, and Core Web Vitals optimization.',
    icon: CheckCircle2
  },
  {
    step: '05',
    title: 'Handover & Production SLA',
    subtitle: 'Complete IP code handover, cloud deployment, staff training, and ongoing 24/7 technical care.',
    icon: Rocket
  }
]

const HowItWorks = () => {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()
  const [activeTab, setActiveTab] = useState('products')

  const steps = activeTab === 'products' ? productSteps : customSteps

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
    <section className="py-20 lg:py-28 relative bg-[#F8F7F4] text-[#111827] overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FFC800]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E6B400]" />
            <span>Streamlined Workflow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight">
            How It Works —{' '}
            <span className="relative inline-block">
              Frictionless Execution
              <span className="absolute -bottom-1 left-0 w-full h-3.5 bg-[#FFC800] -z-10 rounded-sm" />
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#475569] font-normal leading-relaxed">
            From discovering ready digital assets to launching custom enterprise platforms, experience a seamless journey.
          </p>

          {/* Mode Switcher */}
          <div className="pt-3 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#F3F4F6] border border-[#E5E7EB]">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'products'
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#111827]'
                }`}
              >
                Ready Digital Products
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'custom'
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#111827]'
                }`}
              >
                Custom Development Journey
              </button>
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial={shouldReduceMotion ? {} : "hidden"}
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          {steps.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative p-6 rounded-3xl bg-white border border-[#E5E7EB] hover:border-gray-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-6 group"
              >
                {/* Step Header */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-[#111827] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-[#111827] font-mono">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#111827] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="w-full h-1 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFC800] rounded-full w-2/3 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(activeTab === 'products' ? '/marketplace' : '/request-quote')}
            icon={ArrowRight}
            iconPosition="right"
          >
            {activeTab === 'products' ? 'Browse Full Catalog' : 'Initiate Your Project Blueprint'}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

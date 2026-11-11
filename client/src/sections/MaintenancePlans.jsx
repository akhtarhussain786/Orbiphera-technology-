import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Check, X, Sparkles, ShieldCheck, ArrowRight, Zap } from 'lucide-react'
import Button from '../components/ui/Button'

const plans = [
  {
    name: 'Starter Care',
    price: 4999,
    period: '/year',
    popular: false,
    description: 'Essential deployment assistance and routine health updates for single-domain websites.',
    features: [
      { text: 'Initial cloud deployment setup', included: true },
      { text: 'Quarterly dependency & security updates', included: true },
      { text: 'Standard email support (48hr SLA)', included: true },
      { text: 'Basic uptime monitoring telemetry', included: true },
      { text: 'Automated weekly cloud backups', included: false },
      { text: 'Priority hotfix developer emergency line', included: false },
      { text: 'Monthly feature iteration allowance', included: false }
    ]
  },
  {
    name: 'Growth Care',
    price: 11999,
    period: '/year',
    popular: true,
    description: 'Comprehensive technical maintenance and performance optimization for scaling businesses.',
    features: [
      { text: 'Full cloud deployment on Vercel/AWS/VPS', included: true },
      { text: 'Monthly dependency & framework updates', included: true },
      { text: 'Automated weekly cloud database backups', included: true },
      { text: 'Speed audit & Core Web Vitals optimization', included: true },
      { text: 'Priority WhatsApp & email support (12hr SLA)', included: true },
      { text: '3 hours/month custom tweak allowance', included: true },
      { text: 'Dedicated solution architect reviews', included: false }
    ]
  },
  {
    name: 'Enterprise Care',
    price: 24999,
    period: '/year',
    popular: false,
    description: 'Dedicated devops, real-time database monitoring, and fast SLA for mission-critical software.',
    features: [
      { text: 'Multi-environment deployment (Prod/Staging)', included: true },
      { text: 'Bi-weekly security audits & penetration checks', included: true },
      { text: 'Daily automated off-site database backups', included: true },
      { text: '24/7 Priority Emergency Hotline (2hr SLA)', included: true },
      { text: '8 hours/month active development allowance', included: true },
      { text: 'Dedicated Technical Account Manager', included: true },
      { text: 'Custom API integration support', included: true }
    ]
  }
]

const MaintenancePlans = () => {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="pricing" className="py-20 lg:py-28 relative bg-[#F8F7F4] overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#1558C9]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-semibold text-[#FFC800]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dedicated Maintenance & SLA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight">
            Keep Your Platform <span className="text-[#FFC800]">Fast, Secure & Scalable</span>
          </h2>

          <p className="text-base sm:text-lg text-[#475569] font-normal leading-relaxed">
            Optional annual care plans to ensure your software remains updated, hardened against vulnerabilities, and always performing at its peak.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <div 
                className={`h-full p-8 sm:p-9 rounded-3xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  plan.popular
                    ? 'bg-white border-2 border-[#FFC800] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(255,200,0,0.2)] lg:-translate-y-2'
                    : 'bg-white border border-[#E5E7EB] hover:border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Popular Ribbon */}
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-[#FFC800] text-[#111827] text-[10px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(255,200,0,0.4)] flex items-center space-x-1">
                      <Zap className="w-3 h-3 fill-current" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Pricing */}
                  <div>
                    <h3 className="text-xl font-bold text-[#111827] tracking-tight">{plan.name}</h3>
                    <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">{plan.description}</p>
                    
                    <div className="mt-5 flex items-baseline space-x-1.5">
                      <span className="text-3xl sm:text-4xl font-black text-[#111827]">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#475569] font-mono">{plan.period}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-6 border-t border-[#E5E7EB]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#111827]/50 block">
                      What's Included
                    </span>
                    <ul className="space-y-2.5 text-xs">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          {feature.included ? (
                            <Check className="w-4 h-4 text-[#FFC800] flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-4 h-4 text-[#111827]/20 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? 'text-[#111827]' : 'text-[#111827]/30'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8 mt-8 border-t border-[#E5E7EB]">
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="md"
                    onClick={() => navigate(`/contact?plan=${encodeURIComponent(plan.name)}`)}
                    className="w-full"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Select {plan.name}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MaintenancePlans

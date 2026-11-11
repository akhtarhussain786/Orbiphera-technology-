import React, { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, ArrowUpRight, ShieldCheck, Zap, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { initMagneticHover } from '../utils/motion'

const MODELS = [
  {
    id: 'fixed-scope',
    name: 'Fixed Scope',
    badge: 'CLEAR DELIVERABLES',
    popular: false,
    headline: 'Definitive milestones for predictable scope & cost',
    desc: 'Best for new MVPs, standalone web/mobile applications, or system redesigns with clear, documented requirements.',
    features: [
      'Documented technical specifications & architecture blueprint',
      'Guaranteed fixed budget with milestone-based billing',
      'Strict delivery deadline & phase sign-offs',
      '30-day post-launch warranty & bug-fix coverage',
      'Dedicated project manager & weekly demo sprints'
    ],
    billing: 'Milestone-based',
    commitment: '3 to 12 weeks typical'
  },
  {
    id: 'dedicated-team',
    name: 'Dedicated Team',
    badge: 'MOST POPULAR',
    popular: true,
    headline: 'Autonomous senior squad integrated with your workflow',
    desc: 'Best for funded startups and scaling enterprises needing vetted full-stack, cloud, and QA talent working exclusively on their roadmap.',
    features: [
      'Dedicated senior full-stack, mobile & DevOps engineers',
      'Direct communication via Slack/Teams & daily standups',
      'Flexible sprint adjustments with zero change-order friction',
      'Full source code IP ownership transferred continuously',
      'Instant scale-up or scale-down with 30-day notice'
    ],
    billing: 'Monthly sprint cycles',
    commitment: '3+ months recommended'
  },
  {
    id: 'retainer-sla',
    name: 'Care & Retainer',
    badge: 'CONTINUOUS SLA',
    popular: false,
    headline: 'Proactive maintenance, DevOps & feature velocity',
    desc: 'Best for live applications requiring high-uptime monitoring, security compliance, dependency upgrades, and iterative improvements.',
    features: [
      '24/7 cloud health telemetry & automated incident alerts',
      'Guaranteed SLA response times (sub-2 hour critical response)',
      'Monthly security vulnerability patching & OS dependency audits',
      'Dedicated development hours reserved for priority backlog tasks',
      'Quarterly architectural performance & database tuning'
    ],
    billing: 'Predictable monthly retainer',
    commitment: '6 or 12-month agreement'
  }
]

export default function EngagementModels() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="engagement" className="scroll-mt-28 py-16 sm:py-24 bg-[#FDFBF7] border-t border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-[#111827]">
            <span className="w-5 h-1.5 bg-[#F5B700] rounded-full inline-block" />
            <span>ENGAGEMENT MODELS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#111827] tracking-tight leading-[1.08]">
            Flexible models. <br />
            <span className="relative inline-block isolate px-1">
              <span className="relative z-10">Zero ambiguity.</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#F5B700] rounded-xs z-0 pointer-events-none" />
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            Choose the engagement structure that aligns with your capital efficiency, engineering timeline, and internal team capabilities.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {MODELS.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                m.popular
                  ? 'bg-white border-2 border-[#F5B700] shadow-[0_16px_45px_rgba(245,183,0,0.14)] lg:-translate-y-2'
                  : 'bg-white border border-[#E5E7EB] shadow-[0_4px_16px_rgba(17,24,39,0.03)] hover:shadow-[0_12px_32px_rgba(17,24,39,0.08)] hover:border-[#111827]'
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      m.popular
                        ? 'bg-[#F5B700] text-[#111827] shadow-xs'
                        : 'bg-[#FDFBF7] text-[#4B5563] border border-[#E5E7EB]'
                    }`}
                  >
                    {m.badge}
                  </span>
                  <span className="text-xs font-mono text-[#4B5563] font-semibold">{m.commitment}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight mb-2">
                  {m.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#111827] mb-3 leading-snug">
                  {m.headline}
                </p>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6 pb-6 border-b border-[#E5E7EB]">
                  {m.desc}
                </p>

                {/* Features Checklist */}
                <div className="space-y-3 mb-8">
                  {m.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#111827]">
                      <div className="w-4 h-4 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#4B5563]">Billing Terms:</span>
                  <span className="font-bold text-[#111827]">{m.billing}</span>
                </div>

                <Link
                  to="/contact"
                  className={`w-full py-3.5 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center space-x-2 group ${
                    m.popular
                      ? 'bg-[#F5B700] hover:bg-[#D9A200] text-[#111827] shadow-[0_4px_16px_rgba(245,183,0,0.3)]'
                      : 'bg-white hover:bg-[#111827] text-[#111827] hover:text-white border-2 border-[#111827]'
                  }`}
                >
                  <span>Select {m.name}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { gsap, initHeaderReveal, initStaggerCards, prefersReducedMotion } from '../utils/motion'

export const FAQ_ITEMS = [
  {
    question: 'Which is the best website development company in Siwan, Bihar?',
    answer: 'Orbiphera Technologies is recognized as the leading website and software development company in Siwan, Bihar. We engineer custom business websites, high-speed e-commerce stores, Android & iOS mobile applications, and enterprise ERPs with 99.9% uptime, modern UI/UX design, and dedicated local support.'
  },
  {
    question: 'How much does professional website development cost in Siwan?',
    answer: 'Professional website design and development in Siwan typically starts from ₹15,000 for standard business websites to ₹45,000+ for custom dynamic platforms, e-commerce stores, and enterprise management systems. All projects include 100% source code ownership, zero recurring template fees, and transparent milestone-based delivery.'
  },
  {
    question: 'Can I meet your engineering team in Siwan for an in-person consultation?',
    answer: 'Yes, absolutely! We are headquartered in Siwan, Bihar. You can schedule an in-person discovery session at our office, call our direct engineering helpline (+91 98765 43210), or connect instantly via WhatsApp for a live demonstration.'
  },
  {
    question: 'How do you structure project contracts and intellectual property (IP) code ownership?',
    answer: 'All intellectual property, custom algorithms, application schemas, and source code belong 100% to you. We sign mutual Non-Disclosure Agreements (NDAs) prior to scoping, and all repository access is transferred directly to your organization on milestone completion.'
  },
  {
    question: 'What is your typical project timeline from architecture scoping to production launch?',
    answer: 'A standard MVP or core SaaS platform typically delivers within 6 to 10 weeks, organized into transparent two-week agile sprints. Enterprise ERP or complex multi-tenant platforms span 12 to 16 weeks with weekly staging demos on real devices.'
  },
  {
    question: 'How do we track progress during the development build phase?',
    answer: 'You have direct access to our technical architects through Slack, weekly video standups, and shared sprint boards. Every two weeks, we deploy an audited staging build to a preview environment so you can test features before production merge.'
  },
  {
    question: 'Do you build custom ERPs for healthcare, education, and retail businesses?',
    answer: 'Yes. We specialize in building custom, high-velocity business operating systems including MedFlow Clinic HMS (Hospital Management), EduPrime Institute OS (Campus ERP), OmniCRM Enterprise, and ShopSphere Retail engines.'
  },
  {
    question: 'Can you work with our existing codebase or take over legacy software?',
    answer: 'Yes. We start by conducting a comprehensive architectural, security, and dependency audit. We then identify technical debt, decouple bloated monoliths into modular APIs, and refactor the codebase without interrupting live business operations.'
  },
  {
    question: 'What tech stack do you recommend for high-performance applications?',
    answer: 'Our core production stack centers on TypeScript, React, Next.js, Node.js microservices, Python for AI/data workflows, and PostgreSQL/Redis for reliable low-latency databases. For mobile, we build natively using Flutter & Dart or React Native.'
  },
  {
    question: 'What level of post-launch SLA support, maintenance, and bug fixing do you provide?',
    answer: 'Every project includes a 30-day post-launch warranty covering any bugs or unexpected behavior. Beyond launch, we offer dedicated monthly Care & Retainer agreements covering 24/7 uptime monitoring, security patches, framework upgrades, and feature iterations.'
  },
  {
    question: 'How do your engagement models work (Fixed Scope vs Dedicated Team)?',
    answer: 'Fixed Scope is ideal for well-defined MVPs and feature releases with guaranteed delivery dates and milestone payments. Dedicated Teams provide autonomous senior engineers billed on flexible monthly sprint cycles for fast-growing roadmaps.'
  }
]

export default function FAQ() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const listRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        initHeaderReveal(headerRef.current)
      }

      if (listRef.current) {
        initStaggerCards(listRef.current, '.faq-card', {
          y: 25,
          stagger: 0.06,
          duration: 0.65
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="faq" 
      className="scroll-mt-28 py-10 sm:py-16 lg:py-24 bg-[#0B0B0C] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[#E50914]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-8 sm:mb-12 space-y-3">
          <div className="reveal-item inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914] bg-[#121214] px-3 py-1 rounded-full border border-[#E50914]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
            <span>COMMON QUESTIONS</span>
          </div>

          <h2 className="reveal-item text-3xl sm:text-5xl lg:text-[48px] font-black text-white tracking-tight leading-[1.08]">
            Frequently asked <br />
            <span className="text-[#E50914] relative inline-block">
              questions.
            </span>
          </h2>

          <p className="reveal-item text-base sm:text-lg text-slate-300">
            Clear answers about our software engineering engagement, code ownership, and deployment standards.
          </p>
        </div>

        {/* Accordion Container */}
        <div ref={listRef} className="space-y-3.5">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="faq-card rounded-2xl border border-white/10 bg-[#121214] overflow-hidden transition-all duration-200 hover:border-[#E50914]/40 shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 focus-visible:ring-2 focus-visible:ring-[#E50914] transition-colors cursor-pointer group"
                >
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#E50914] tracking-tight leading-snug transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isOpen ? 'bg-[#E50914] text-white' : 'bg-white/5 text-[#E50914]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Award, ShieldCheck, Star, ExternalLink, CheckCircle } from 'lucide-react'

const CREDIBILITY_ITEMS = [
  {
    id: 'iso-27001',
    name: 'ISO/IEC 27001:2022',
    category: 'Information Security Management',
    year: 'Certified 2023–2026',
    issuer: 'International Organization for Standardization',
    badge: 'Verified ISO Audit',
    proofText: 'Certificate #ISMS-IND-9821',
    link: 'https://www.iso.org/standard/27001',
    isSecurity: true
  },
  {
    id: 'clutch-top-dev',
    name: 'Top Software Developers 2025',
    category: 'Custom Software & Mobile Apps',
    year: '2025',
    issuer: 'Clutch Global',
    badge: 'Top Rated Agency',
    proofText: 'Verified B2B Client Reviews',
    link: 'https://clutch.co'
  },
  {
    id: 'trustpilot-excellent',
    name: 'Trustpilot Excellent Rating (4.9 / 5)',
    category: 'Client Satisfaction Benchmark',
    year: '2024–2025',
    issuer: 'Trustpilot Global',
    badge: '4.9 ★ Rating',
    proofText: 'Based on 50+ verified project reviews',
    link: 'https://www.trustpilot.com'
  },
  {
    id: 'goodfirms-leader',
    name: 'Top Web & Mobile App Company',
    category: 'Full-Stack Development',
    year: '2024',
    issuer: 'GoodFirms Research',
    badge: 'Top Performer',
    proofText: 'Recognized for Technical Delivery',
    link: 'https://www.goodfirms.co'
  },
  {
    id: 'techbehemoths-2024',
    name: 'TechBehemoths Excellence Award',
    category: 'React & Cloud Engineering',
    year: '2024',
    issuer: 'TechBehemoths',
    badge: 'Category Winner',
    proofText: 'Evaluated among top IT agencies',
    link: 'https://techbehemoths.com'
  },
  {
    id: 'microsoft-partner',
    name: 'Microsoft Solutions Partner',
    category: 'Azure Cloud & AI Engineering',
    year: 'Active Partner',
    issuer: 'Microsoft Partner Network',
    badge: 'Certified Cloud Squad',
    proofText: 'Enterprise Cloud Architecture',
    link: 'https://partner.microsoft.com'
  }
]

export default function RecognitionSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="recognition" className="scroll-mt-28 py-16 sm:py-24 bg-white border-t border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-[#111827]">
            <span className="w-5 h-1.5 bg-[#F5B700] rounded-full inline-block" />
            <span>CREDIBILITY &amp; CERTIFICATIONS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[50px] font-extrabold text-[#111827] tracking-tight leading-[1.08]">
            Recognised for engineering.{' '}
            <span className="relative inline-block isolate px-1">
              <span className="relative z-10">Audited</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#F5B700] rounded-xs z-0 pointer-events-none" />
            </span> <br />
            for enterprise security.
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563]">
            Independently verified certifications, security audits, and client reviews backed by third-party proof.
          </p>
        </div>

        {/* Unified 3-Column Credibility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {CREDIBILITY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E7EB] flex flex-col justify-between hover:border-[#F5B700] hover:shadow-[0_8px_24px_rgba(17,24,39,0.06)] transition-all group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold font-mono text-[#92400E] bg-[#FEF3C7] border border-[#FDE68A]/70 px-2.5 py-0.5 rounded-full uppercase">
                    {item.year}
                  </span>
                  <div className="flex items-center space-x-1 text-[#047857] text-xs font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Award / Certification Name */}
                <h3 className="text-xl font-bold text-[#111827] tracking-tight mb-1">
                  {item.name}
                </h3>
                <p className="text-xs font-medium text-[#4B5563] uppercase tracking-wider mb-3">
                  {item.category}
                </p>

                {/* Issuer & Audit Proof */}
                <div className="p-3 rounded-2xl bg-[#FDFBF7] border border-[#E5E7EB] space-y-1 mb-4">
                  <div className="text-xs text-[#4B5563]">
                    <span className="font-semibold text-[#111827]">Issuer: </span>
                    {item.issuer}
                  </div>
                  <div className="text-xs text-[#111827] font-mono font-medium">
                    {item.proofText}
                  </div>
                </div>
              </div>

              {/* Direct Verification Link */}
              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#111827]">
                  {item.badge}
                </span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-[#111827] hover:text-[#D9A200] transition-colors group-hover:translate-x-0.5"
                >
                  <span>View Proof</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

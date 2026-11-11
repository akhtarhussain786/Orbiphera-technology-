import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Award, ShieldCheck, CheckCircle2, TrendingUp, Cpu, Globe } from 'lucide-react'
import { RECOGNITIONS } from '../../data/landing'
import UnderlineBar from './UnderlineBar'

export const LandingRecognition: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  const words = [
    'Trusted',
    'by',
    'enterprise',
    'leaders',
    'and',
    'fast-growing',
    'startups.',
    'Backed',
    'by',
    'rigorous',
    'software',
    'engineering.'
  ]

  const getIcon = (id: string) => {
    switch (id) {
      case 'rec-1':
        return Award
      case 'rec-2':
        return TrendingUp
      case 'rec-3':
        return CheckCircle2
      case 'rec-4':
        return Cpu
      case 'rec-5':
        return ShieldCheck
      case 'rec-6':
        return Globe
      default:
        return Award
    }
  }

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...RECOGNITIONS, ...RECOGNITIONS]

  return (
    <section id="recognition" className="py-20 sm:py-28 bg-[#FAFAF8] border-t border-black/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Pre-tag */}
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-gray-500 mb-6">
          <span className="w-5 h-1.5 bg-[#FFE600] rounded-full inline-block" />
          <span>PROVEN TRACK RECORD</span>
        </div>

        {/* Scroll-linked Word-by-Word Color Reveal Heading */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.035em] leading-[1.2] flex flex-wrap gap-x-3 gap-y-1">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={shouldReduceMotion ? { color: '#0E0E10' } : { color: '#D1D5DB' }}
                whileInView={{ color: '#0E0E10' }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.04,
                  ease: 'easeOut'
                }}
                className="inline-block relative"
              >
                {word}
                {word === 'engineering.' && (
                  <UnderlineBar heightClass="h-2.5 sm:h-3" delay={words.length * 0.04} />
                )}
              </motion.span>
            ))}
          </h2>
        </div>
      </div>

      {/* Infinite Badge Marquee with Edge Fade (Pauses on Hover) */}
      <div className="landing-marquee relative w-full overflow-hidden py-4">
        {/* Left Gradient Edge Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAFAF8] to-transparent z-10 pointer-events-none" />
        {/* Right Gradient Edge Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAFAF8] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="landing-marquee-track flex space-x-5 px-4">
          {marqueeItems.map((item, idx) => {
            const Icon = getIcon(item.id)
            return (
              <div
                key={`${item.id}-${idx}`}
                className="group flex items-center space-x-3.5 px-6 py-4 rounded-2xl bg-white border border-black/10 shadow-2xs hover:shadow-md transition-all duration-300 hover:border-black/25 flex-shrink-0 cursor-default"
              >
                {/* Grayscale Icon -> Color on Hover */}
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#FFE600] flex items-center justify-center text-gray-400 group-hover:text-[#0E0E10] transition-colors duration-300 flex-shrink-0">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0E0E10] block tracking-tight">
                    {item.name}
                  </span>
                  <div className="flex items-center space-x-2 text-[11px] text-gray-500">
                    <span>{item.category}</span>
                    <span>·</span>
                    <span className="font-mono font-semibold text-[#00B67A]">{item.metric}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LandingRecognition


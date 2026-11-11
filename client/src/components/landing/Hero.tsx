import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import UnderlineBar from './UnderlineBar'

export const LandingHero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const rotatingWords = ['ships.', 'scales.']

  useEffect(() => {
    if (shouldReduceMotion) return
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  const currentWord = rotatingWords[wordIndex]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section id="hero" className="relative min-h-[92svh] flex items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden bg-[#FAFAF8]">
      {/* Blurred Drifting Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Amber / Yellow Blob (Top-Right) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 25, 0],
                  y: [0, -20, 0]
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -right-32 w-[650px] h-[550px] bg-gradient-to-br from-[#FFE600]/30 via-[#FED7AA]/30 to-transparent rounded-full blur-[110px]"
        />

        {/* Soft Lavender / Cyan Blob (Bottom-Left) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -20, 0],
                  y: [0, 25, 0]
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -left-32 w-[580px] h-[500px] bg-gradient-to-tr from-[#E0F4FB]/35 via-[#E0E7FF]/30 to-transparent rounded-full blur-[120px]"
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 sm:space-y-8"
        >
          {/* Pre-title Monospace Tag */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-gray-600 bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-black/5 shadow-2xs">
              <span className="w-5 h-1.5 bg-[#FFE600] rounded-full inline-block" />
              <span>AI-NATIVE PRODUCT DEVELOPMENT</span>
            </div>
          </motion.div>

          {/* Master Headline with Rotating Word */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-medium text-[#0E0E10] tracking-[-0.035em] leading-[1.04]">
              We build software that{' '}
              <br className="hidden sm:inline" />
              <span className="relative inline-block min-w-[210px] sm:min-w-[280px] text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={shouldReduceMotion ? { opacity: 1 } : { y: 28, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { y: -28, opacity: 0, filter: 'blur(8px)' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block relative z-10 text-[#0E0E10]"
                  >
                    {currentWord}
                    <UnderlineBar heightClass="h-3 sm:h-4" delay={0.1} />
                  </motion.span>
                </AnimatePresence>

                {/* Up-Right Yellow Accent Arrows */}
                <span className="absolute -top-3 sm:-top-5 -right-8 sm:-right-12 select-none inline-block pointer-events-none">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path d="M14 4H28V18" stroke="#FFE600" strokeWidth="4.5" strokeLinecap="square" strokeLinejoin="miter" />
                    <rect x="6" y="20" width="5" height="5" fill="#FFE600" />
                    <path d="M6 12H13V19" stroke="#FFE600" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-[#4A4B53] max-w-2xl mx-auto leading-relaxed font-normal"
          >
            A product team building custom websites, web and mobile apps, MVPs and AI features, from the first prototype through to production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <a
              href="#roast"
              className="px-8 py-4 rounded-full bg-[#0E0E10] text-white text-sm sm:text-base font-bold hover:bg-black transition-all flex items-center space-x-2 shadow-[0_4px_20px_rgba(14,14,16,0.18)] hover:shadow-[0_8px_30px_rgba(14,14,16,0.28)] group"
            >
              <span>Start a build</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#roast"
              className="text-sm sm:text-base font-bold text-[#0E0E10] underline underline-offset-8 decoration-gray-300 hover:decoration-black transition-all py-2"
            >
              Get a free website roast
            </a>
          </motion.div>

          {/* Trustpilot-style Stars Row */}
          <motion.div
            variants={itemVariants}
            className="pt-8 sm:pt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#4A4B53]"
          >
            <div className="flex items-center space-x-2">
              <div className="flex text-[#00B67A] space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#00B67A]" />
                ))}
              </div>
              <span className="font-bold text-[#0E0E10]">Excellent on Trustpilot</span>
            </div>

            <span className="hidden sm:inline text-gray-300">|</span>

            <span className="font-medium">
              Trusted by businesses across 12+ countries
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default LandingHero


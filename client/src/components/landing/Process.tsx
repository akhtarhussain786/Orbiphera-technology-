import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PROCESS_PHASES } from '../../data/landing'
import UnderlineBar from './UnderlineBar'

export const LandingProcess: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="process" className="py-20 sm:py-28 bg-[#FAFAF8] border-t border-black/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-gray-500">
            <span className="w-5 h-1.5 bg-[#FFE600] rounded-full inline-block" />
            <span>HOW WE WORK</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-medium text-[#0E0E10] tracking-[-0.035em] leading-[1.08]">
            Four phases, <br />
            <span className="relative inline-block">
              no surprises.
              <UnderlineBar heightClass="h-3.5 sm:h-4" />
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#4A4B53] leading-relaxed pt-1">
            The same sequence on every build, so you always know what is happening and what comes next.
          </p>
        </div>

        {/* Horizontal Timeline Container */}
        <div className="relative">
          {/* Continuous Connecting Line that draws on scroll */}
          <div className="hidden lg:block absolute top-[16px] left-0 right-0 h-[2px] bg-black/10 -z-0">
            <motion.div
              initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-[#0E0E10] origin-left"
            />
          </div>

          {/* 4 Phases Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 relative z-10">
            {PROCESS_PHASES.map((phase, idx) => (
              <motion.div
                key={phase.number}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="space-y-6"
              >
                {/* Yellow Ribbon Flag Badge that pops in */}
                <motion.div
                  initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: idx * 0.18 + 0.2
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-[#FFE600] text-[#0E0E10] text-xs font-black font-mono shadow-xs pb-1"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
                  >
                    {phase.number}
                  </div>
                </motion.div>

                {/* Main Phase Title */}
                <h3 className="text-2xl sm:text-3xl font-medium text-[#0E0E10] tracking-tight">
                  {phase.title}
                </h3>

                {/* Sub-steps */}
                <div className="space-y-4 pt-1">
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0E0E10]">
                      {phase.sub1.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4A4B53] leading-relaxed">
                      {phase.sub1.desc}
                    </p>
                  </div>

                  {phase.sub2 && (
                    <div className="space-y-1 pt-3 border-t border-black/5">
                      <h4 className="text-xs sm:text-sm font-bold text-[#0E0E10]">
                        {phase.sub2.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#4A4B53] leading-relaxed">
                        {phase.sub2.desc}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingProcess


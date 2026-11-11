import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { DISCIPLINES } from '../../data/landing'
import UnderlineBar from './UnderlineBar'

export const LandingDisciplines: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="disciplines" className="py-20 sm:py-28 bg-[#FAFAF8] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-gray-500">
            <span className="w-5 h-1.5 bg-[#FFE600] rounded-full inline-block" />
            <span>WHAT WE DO</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-medium text-[#0E0E10] tracking-[-0.035em] leading-[1.08]">
            Three disciplines, <br />
            <span className="relative inline-block">
              one team.
              <UnderlineBar heightClass="h-3.5 sm:h-4" />
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#4A4B53] leading-relaxed pt-1">
            The same people who scope the product design it, build it and grow it. Nothing gets handed to a second vendor halfway through.
          </p>
        </div>

        {/* 3 Pastel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {DISCIPLINES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl group border"
              style={{
                backgroundColor: item.accentColor,
                borderColor: item.type === 'design' ? '#D1F0DA' : item.type === 'engineering' ? '#CEECF4' : '#D5E1FB'
              }}
            >
              {/* Visual Mockup Graphic Area */}
              <div className="rounded-2xl bg-white/85 p-5 shadow-2xs aspect-[16/11] mb-6 flex items-center justify-center relative overflow-hidden border border-black/5">
                {item.type === 'design' && (
                  <div className="w-full space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <div className="flex space-x-1.5">
                        <div className="w-2 h-2 rounded-full bg-rose-400" />
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        Design System
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-10 rounded-lg bg-emerald-50 border border-emerald-200/50 p-1.5 space-y-1">
                        <div className="w-4 h-1.5 bg-emerald-400 rounded" />
                        <div className="w-8 h-1 bg-gray-300 rounded" />
                      </div>
                      <div className="h-10 rounded-lg bg-purple-50 border border-purple-200/50 p-1.5 space-y-1">
                        <div className="w-4 h-1.5 bg-purple-400 rounded" />
                        <div className="w-8 h-1 bg-gray-300 rounded" />
                      </div>
                      <div className="h-10 rounded-lg bg-amber-50 border border-amber-200/50 p-1.5 space-y-1">
                        <div className="w-4 h-1.5 bg-amber-400 rounded" />
                        <div className="w-8 h-1 bg-gray-300 rounded" />
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-between">
                      <div className="w-20 h-2 bg-gray-300 rounded" />
                      <div className="w-8 h-3 bg-emerald-500 rounded" />
                    </div>
                  </div>
                )}

                {item.type === 'engineering' && (
                  <div className="w-full space-y-2 font-mono text-[10px] text-gray-700">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <div className="flex space-x-1.5">
                        <div className="w-2 h-2 rounded-full bg-rose-400" />
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[9px] text-gray-400">ScaleEngine.tsx</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sky-600 font-bold">export const App = () =&gt; &#123;</div>
                      <div className="pl-3 text-purple-600">const platform = useScalablePlatform()</div>
                      <div className="pl-3 text-emerald-600">return &lt;Engine ready=&#123;true&#125; /&gt;</div>
                      <div className="text-sky-600 font-bold">&#125;</div>
                    </div>
                  </div>
                )}

                {item.type === 'growth' && (
                  <div className="w-full space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <span className="text-[10px] font-bold text-gray-700">Funnel & Velocity</span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full">+148%</span>
                    </div>
                    <div className="flex items-end justify-between h-14 pt-2 px-1">
                      <div className="w-4 bg-indigo-200 rounded-t h-5" />
                      <div className="w-4 bg-indigo-300 rounded-t h-8" />
                      <div className="w-4 bg-indigo-400 rounded-t h-10" />
                      <div className="w-4 bg-indigo-500 rounded-t h-12" />
                      <div className="w-4 bg-[#FFE600] rounded-t h-14" />
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-400 font-mono">
                      <span>W1</span>
                      <span>W2</span>
                      <span>W3</span>
                      <span>W4</span>
                      <span className="text-black font-bold">Scale</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-medium text-[#0E0E10] tracking-tight">
                    {item.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
                </div>
                <p className="text-xs sm:text-sm text-[#4A4B53] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingDisciplines


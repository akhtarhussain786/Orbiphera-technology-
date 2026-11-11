import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FEATURED_PROJECTS } from '../../data/landing'
import UnderlineBar from './UnderlineBar'

export const LandingProjects: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="projects"
      className="relative z-20 pt-20 sm:pt-28 pb-24 sm:pb-32 bg-[#FFFFFF] text-[#0E0E10] border-t border-black/5 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-gray-500">
              <span className="w-5 h-1.5 bg-[#FFE600] rounded-full inline-block" />
              <span>SELECTED WORK</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-medium text-[#0E0E10] tracking-[-0.035em] leading-[1.08]">
              Featured{' '}
              <span className="relative inline-block">
                projects.
                <UnderlineBar heightClass="h-3.5 sm:h-4" />
              </span>
            </h2>
          </div>

          <a
            href="/software"
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-gray-500 hover:text-black group border-b border-gray-300 pb-1 self-start md:self-auto transition-colors"
          >
            <span>View all case studies &amp; products</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 2-Column Staggered Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {FEATURED_PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`relative group space-y-4 ${idx % 2 === 1 ? 'lg:translate-y-8' : ''}`}
            >
              {/* Fake Browser-Frame Card (Clean White) */}
              <div className="relative rounded-2xl sm:rounded-3xl bg-[#FAFAF9] border border-black/10 p-3 sm:p-4 shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:border-black/20 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                {/* Window Dots & Address Bar */}
                <div className="flex items-center justify-between pb-3 px-2 border-b border-black/5">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono tracking-wider">
                    {proj.id}.yatharthit.com
                  </span>
                  <div className="w-8" />
                </div>

                {/* Screenshot Frame with Vertical Scroll Parallax on Hover */}
                <div className="mt-3 rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/10] bg-gray-100 relative border border-black/5">
                  <img
                    src={proj.screenshotUrl}
                    alt={proj.title}
                    className="w-full h-[140%] object-cover object-top transition-transform duration-700 ease-out group-hover:-translate-y-[28%]"
                    loading="lazy"
                  />
                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <a
                      href={proj.liveUrl}
                      className="px-4 py-2 rounded-full bg-white text-[#0E0E10] text-xs font-bold inline-flex items-center space-x-1 hover:bg-[#FFE600] transition-colors shadow-md"
                    >
                      <span>Explore Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Card Information */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-medium text-[#0E0E10] group-hover:text-black transition-colors">
                    {proj.title}
                  </h3>
                  <span className="text-xs text-gray-500 font-mono">
                    {proj.category}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#4A4B53] leading-relaxed">
                  {proj.description}
                </p>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-black/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingProjects

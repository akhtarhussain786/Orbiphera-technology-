import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { 
  Code2, 
  Smartphone, 
  Server, 
  Terminal, 
  Database, 
  Layers, 
  Container, 
  Cloud, 
  Zap, 
  Network, 
  Palette, 
  Boxes 
} from 'lucide-react'
import { TOOL_TILES, ToolItem } from '../../data/landing'
import UnderlineBar from './UnderlineBar'

export const LandingTools: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  const randomDelays = [0.08, 0.28, 0.14, 0.36, 0.18, 0.42, 0.24, 0.1, 0.32, 0.2, 0.46, 0.15]

  const getToolIcon = (slug: string) => {
    switch (slug) {
      case 'react':
        return Code2
      case 'flutter':
        return Smartphone
      case 'node':
        return Server
      case 'python':
        return Terminal
      case 'postgres':
        return Database
      case 'mongo':
        return Layers
      case 'docker':
        return Container
      case 'aws':
        return Cloud
      case 'redis':
        return Zap
      case 'graphql':
        return Network
      case 'tailwind':
        return Palette
      case 'k8s':
        return Boxes
      default:
        return Code2
    }
  }

  return (
    <section id="tools" className="py-20 sm:py-28 bg-[#FAFAF8] border-t border-black/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-gray-500">
            <span className="w-5 h-1.5 bg-[#FFE600] rounded-full inline-block" />
            <span>MODERN STACK</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-medium text-[#0E0E10] tracking-[-0.035em] leading-[1.08]">
            We build on what your team <br />
            <span className="relative inline-block">
              already runs on.
              <UnderlineBar heightClass="h-3.5 sm:h-4" />
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#4A4B53] leading-relaxed pt-1">
            Battle-tested frameworks, modern cloud infrastructure, and clean architecture designed for seamless collaboration and rapid scale.
          </p>
        </div>

        {/* 6x2 Bordered Tool Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {TOOL_TILES.map((tool, idx) => {
            const Icon = getToolIcon(tool.iconSlug)
            const delay = randomDelays[idx % randomDelays.length]

            return (
              <motion.div
                key={tool.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : delay,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group relative rounded-2xl bg-white border border-black/10 p-5 shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-black/25 flex flex-col justify-between aspect-[1/1] overflow-hidden"
              >
                {/* Subtle colored accent glow on hover */}
                <div
                  className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: tool.color }}
                />

                {/* Top: Icon (Grayscale -> Brand Color on hover) */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      color: 'inherit'
                    }}
                  >
                    <Icon
                      className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-300"
                      style={{
                        filter: 'grayscale(1)',
                        transition: 'filter 0.3s ease, color 0.3s ease'
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 group-hover:text-black transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* Bottom: Info */}
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0E0E10] tracking-tight group-hover:text-black transition-colors">
                    {tool.name}
                  </h3>
                  <span className="text-[11px] text-gray-500 font-medium block">
                    {tool.category}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LandingTools


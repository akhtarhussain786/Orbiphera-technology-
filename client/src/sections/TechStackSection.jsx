import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Terminal, Cpu } from 'lucide-react'

const TECH_ITEMS = [
  {
    name: 'React.js',
    category: 'Frontend Core',
    color: '#61DAFB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },
  {
    name: 'Next.js',
    category: 'Full-Stack Framework',
    color: '#FFFFFF',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
  },
  {
    name: 'Flutter',
    category: 'Cross-Platform Mobile',
    color: '#02569B',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg'
  },
  {
    name: 'TypeScript',
    category: 'Type Safety',
    color: '#3178C6',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  {
    name: 'Node.js',
    category: 'Runtime Core',
    color: '#339933',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
  },
  {
    name: 'Python',
    category: 'AI & Data Backend',
    color: '#3776AB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  },
  {
    name: 'PostgreSQL',
    category: 'Relational Database',
    color: '#336791',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
  },
  {
    name: 'MySQL',
    category: 'Enterprise SQL',
    color: '#4479A1',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
  },
  {
    name: 'Docker',
    category: 'Containerization',
    color: '#2496ED',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
  },
  {
    name: 'Google Cloud',
    category: 'Cloud Infrastructure',
    color: '#4285F4',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg'
  },
  {
    name: 'Firebase',
    category: 'Realtime Backend',
    color: '#FFCA28',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
  },
  {
    name: 'Tailwind CSS',
    category: 'Design Tokens',
    color: '#06B6D4',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
  }
]

const MARQUEE_LOGOS = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', tag: 'UI Library' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', tag: 'SSR Engine' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', tag: 'iOS & Android' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', tag: 'API Gateway' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', tag: 'Strict Typing' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', tag: 'Automation & ML' },
  { name: 'PHP / Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', tag: 'Enterprise ERP' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', tag: 'ACID Database' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', tag: 'High-TPS Storage' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', tag: 'Containers' },
  { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', tag: 'Orchestration' },
  { name: 'Google Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', tag: 'Global CDN' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', tag: 'Push & Auth' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', tag: 'Design Tokens' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', tag: 'In-Memory Cache' }
]

export default function TechStackSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section 
      id="tech-stack" 
      className="scroll-mt-28 py-16 sm:py-24 bg-[#0B0B0C] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Ambient Crimson Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E50914]/8 rounded-full blur-[150px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#121214] border border-[#E50914]/30 text-[#FF2A36] text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase shadow-sm max-w-full">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF2A36] shrink-0" />
            <span className="truncate">PLATFORMS &amp; STACK ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
            We build on what your <br className="hidden sm:inline" />
            team already{' '}
            <span className="text-[#FF2A36] relative inline-block">
              runs on.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Industry-standard languages, enterprise frameworks, and battle-tested cloud environments engineered for high concurrency and zero downtime.
          </p>
        </div>

        {/* =====================================================================
            INFINITE RUNNING MARQUEE OF TECH LOGOS
            - Grayscale by default -> Full Color + Lime Glow on hover
            - Pauses on hover
            ===================================================================== */}
        <div className="mb-14 relative overflow-hidden rounded-2xl bg-[#121214] border border-white/10 p-3 sm:p-4 shadow-2xl group">
          {/* Edge Fade Gradients */}
          <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-[#121214] via-[#121214]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-[#121214] via-[#121214]/80 to-transparent z-10 pointer-events-none" />

          <div className="landing-marquee-track flex items-center space-x-8 sm:space-x-12">
            {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#E50914]/40 hover:bg-[#18181B] transition-all duration-300 cursor-pointer shrink-0 group/item"
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover/item:scale-110 transition-all duration-300 drop-shadow-sm"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-white group-hover/item:text-[#FF2A36] transition-colors whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-white/50 tracking-wider whitespace-nowrap">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6x2 Unified Tool Grid */}
        <div className="rounded-3xl border border-white/10 bg-[#121214] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y divide-white/10">
            {TECH_ITEMS.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="group relative p-6 sm:p-7 flex flex-col items-center justify-center aspect-[1/1] hover:bg-[#18181B] transition-all duration-300 cursor-pointer"
              >
                {/* Tech Logo in Full Vibrant Color */}
                <div className="mb-3 w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-115">
                  <img
                    src={t.icon}
                    alt={t.name}
                    className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="text-center">
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-[#FF2A36] transition-colors">
                    {t.name}
                  </h4>
                  <span className="text-[10px] text-white/50 font-mono block mt-0.5 truncate">
                    {t.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

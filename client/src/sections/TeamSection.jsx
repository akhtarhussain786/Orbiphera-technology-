import React, { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import axios from 'axios'
import { Sparkles, ShieldCheck, CheckCircle2, Award } from 'lucide-react'
import { gsap, initHeaderReveal, prefersReducedMotion } from '../utils/motion'

const DEFAULT_TEAM_MEMBERS = [
  {
    id: 'team-1',
    name: 'Vikram Sharma',
    role: 'Chief Technology Officer & Lead Architect',
    credentials: 'Ex-Enterprise Systems Architect',
    bio: '12+ years designing distributed systems, high-concurrency APIs, and enterprise cloud migrations.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop&crop=faces&q=80',
    touchpoint: 'Architecture Lead',
    status: 'Active Sprint',
    isActive: true
  },
  {
    id: 'team-2',
    name: 'Ananya Roy',
    role: 'Head of Product Design & UX',
    credentials: 'Design Systems Lead',
    bio: 'Specialist in multi-platform design systems, interaction design, and WCAG accessibility compliance.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&crop=faces&q=80',
    touchpoint: 'Design Lead',
    status: 'Active Sprint',
    isActive: true
  },
  {
    id: 'team-3',
    name: 'Rohan Mehta',
    role: 'Principal Full-Stack Engineer',
    credentials: 'Full-Stack Performance Specialist',
    bio: 'Core expert in React, Next.js, Node microservices, real-time WebSockets, and state machines.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&crop=faces&q=80',
    touchpoint: 'Sprint Leader',
    status: 'Active Sprint',
    isActive: true
  },
  {
    id: 'team-4',
    name: 'Priya Nair',
    role: 'Lead Cloud & DevOps Engineer',
    credentials: 'AWS & Kubernetes Certified',
    bio: 'ISO 27001 compliance lead, Docker/Kubernetes cluster orchestrator, and zero-downtime CI/CD architect.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&crop=faces&q=80',
    touchpoint: 'DevOps Lead',
    status: 'Active Sprint',
    isActive: true
  }
]

export default function TeamSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const [members, setMembers] = useState(DEFAULT_TEAM_MEMBERS)
  const [subtitle, setSubtitle] = useState('You collaborate directly with the technical specialists building and deploying your codebase.')
  const [isSectionActive, setIsSectionActive] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || '/api'
  const SERVER_HOST = API_URL.replace('/api', '')

  useEffect(() => {
    let isMounted = true
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${API_URL}/content/team_members`)
        if (isMounted && res.data?.success && res.data.section) {
          const sec = res.data.section
          if (sec.subtitle) setSubtitle(sec.subtitle)
          if (sec.isActive !== undefined) setIsSectionActive(sec.isActive)
          if (Array.isArray(sec.data?.members) && sec.data.members.length > 0) {
            const activeOnly = sec.data.members.filter(m => m.isActive !== false)
            if (activeOnly.length > 0) {
              setMembers(activeOnly)
            }
          }
        }
      } catch {
        // Fallback silently to default
      }
    }

    fetchTeam()
    return () => {
      isMounted = false
    }
  }, [API_URL])

  // GSAP ScrollTrigger Entrance
  useEffect(() => {
    if (prefersReducedMotion() || !isSectionActive) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        initHeaderReveal(headerRef.current)
      }

      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll('.team-card-wrap')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [members, isSectionActive])

  if (!isSectionActive) {
    return null
  }

  const formatImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&crop=face'
    if (img.startsWith('http://') || img.startsWith('https://')) return img
    return `${SERVER_HOST}${img}`
  }

  return (
    <section 
      ref={sectionRef}
      id="team" 
      className="scroll-mt-28 py-10 sm:py-16 lg:py-24 bg-[#0B0B0C] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#E50914]/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-14 sm:mb-16 space-y-4">
          <div className="reveal-item inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-[#E50914] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
            <span>Core Leadership &amp; Engineering</span>
          </div>

          <h2 className="reveal-item text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
            Senior engineers.{' '}
            <span className="text-[#E50914] relative inline-block">
              Direct access.
            </span> <br />
            No account manager filters.
          </h2>

          <p className="reveal-item text-base sm:text-lg text-slate-300 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Team Cards Container: Centered Flex Grid so any odd/5th card is balanced */}
        <div 
          ref={cardsContainerRef}
          className="flex flex-wrap justify-center gap-6 sm:gap-7 items-stretch"
        >
          {members.map((member) => (
            <motion.div
              key={member.id || member.name}
              whileHover={shouldReduceMotion ? {} : { y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="team-card-wrap w-full sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-19px)] xl:w-[calc(25%-21px)] max-w-[340px] flex flex-col justify-between rounded-3xl bg-[#121214] border border-white/10 p-6 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_rgba(229,9,20,0.22)] hover:border-[#E50914]/60 transition-all duration-300 group"
            >
              {/* Subtle Ambient Hover Glows (Non-intrusive backdrop lighting) */}
              <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#E50914]/15 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              {/* Top border light streak on hover */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              <div className="relative z-10">
                {/* =============================================================
                    HIGH-TECH ROTATING ORBITAL AVATAR ("round wagera ghume")
                    ============================================================= */}
                <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
                  
                  {/* Outer Counter-Rotating Dashed Orbit Ring */}
                  <svg 
                    className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] animate-[spin_18s_linear_infinite_reverse] pointer-events-none opacity-40 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" 
                    viewBox="0 0 120 120"
                  >
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="56" 
                      stroke="#FFFFFF" 
                      strokeWidth="1" 
                      strokeDasharray="4 8" 
                      fill="none" 
                    />
                    <circle cx="60" cy="4" r="3" fill="#FFFFFF" />
                  </svg>

                  {/* Inner Rotating Lime Green Tech Orbital Ring with Satellite Dot */}
                  <svg 
                    className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] animate-[spin_10s_linear_infinite] pointer-events-none opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                    viewBox="0 0 100 100"
                  >
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="46" 
                      stroke="#E50914" 
                      strokeWidth="1.5" 
                      strokeDasharray="6 6" 
                      fill="none" 
                    />
                    {/* Glowing Satellite Orbit Dot */}
                    <circle 
                      cx="50" 
                      cy="4" 
                      r="3.5" 
                      fill="#E50914" 
                      filter="drop-shadow(0 0 6px #E50914)" 
                    />
                    <circle 
                      cx="50" 
                      cy="96" 
                      r="2.5" 
                      fill="#E50914" 
                    />
                  </svg>

                  {/* Inner Circular Avatar Frame */}
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-[#E50914] shadow-[0_0_20px_rgba(0,0,0,0.9)] transition-colors duration-300 bg-[#0B0B0C]">
                    <img
                      src={formatImageUrl(member.image)}
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop&crop=faces&q=80'
                      }}
                    />
                  </div>

                  {/* Verified Badge / Icon attached to circle */}
                  <div className="absolute -bottom-1 right-2 w-7 h-7 rounded-full bg-[#121214] border border-[#E50914] flex items-center justify-center text-[#E50914] shadow-[0_0_10px_rgba(229, 9, 20,0.4)] z-10 group-hover:rotate-12 transition-transform">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Credentials Badge */}
                {member.credentials && (
                  <div className="text-center mb-3">
                    <span className="inline-block bg-[#0B0B0C] text-[#E50914] text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-[#E50914]/30 shadow-xs max-w-full truncate">
                      {member.credentials}
                    </span>
                  </div>
                )}

                {/* Name & Role */}
                <div className="text-center space-y-1.5 mb-3">
                  <h3 className="text-lg font-black text-white tracking-tight group-hover:text-[#E50914] transition-colors">
                    {member.name}
                  </h3>
                  
                  <div className="inline-block">
                    <span className="text-xs font-semibold text-[#E50914] bg-[#E50914]/10 px-2.5 py-0.5 rounded-md border border-[#E50914]/20">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-400 leading-relaxed text-center mb-4 line-clamp-3">
                  {member.bio || 'Direct technical architect delivering high-velocity enterprise software and cloud applications.'}
                </p>
              </div>

              {/* Direct Touchpoint & Active Sprint Status */}
              <div className="relative z-10 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 mt-2">
                <span className="font-semibold text-slate-200 text-[11px] truncate mr-2">
                  {member.touchpoint || 'Architecture Lead'}
                </span>
                
                <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-semibold text-[#E50914] bg-[#E50914]/10 px-2.5 py-0.5 rounded-full border border-[#E50914]/30 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
                  <span>{member.status || 'Active Sprint'}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

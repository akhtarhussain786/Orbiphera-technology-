import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const DEFAULT_CASE_STUDIES = [
  {
    id: 'medflow-hms',
    client: 'MedFlow Health Systems',
    title: 'Clinical Workflow & EHR Platform',
    problem: 'Manual OPD patient queues and fragmented paper records slowed physician turnaround by 45%.',
    result: '+310% patient throughput & 99.98% uptime across 14 hospital branches',
    metric: '+310% Throughput',
    tags: ['React.js', 'Node.js', 'PostgreSQL', 'HIPAA Ready'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=540&fit=crop',
    link: '/software/medflow-clinic-hms'
  },
  {
    id: 'eduprime-erp',
    client: 'EduPrime Global Academies',
    title: 'Unified Multi-Campus Academic OS',
    problem: 'Disjointed spreadsheets for admissions, attendance, and fee tracking caused high operational errors.',
    result: '65% reduction in admission processing time and 100% automated fee reconciliation',
    metric: '65% Time Saved',
    tags: ['React', 'Express', 'MySQL', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=540&fit=crop',
    link: '/templates/eduprime-education-institute'
  },
  {
    id: 'omnicrm-suite',
    client: 'OmniTrade Enterprises',
    title: 'B2B Sales Velocity & CRM Engine',
    problem: 'Sales teams took over 48 hours to generate proposals and suffered a 38% lead drop-off.',
    result: '4.2x quote turnaround velocity with 28% higher deal close rate in first quarter',
    metric: '4.2x Velocity',
    tags: ['Node.js', 'React', 'MongoDB', 'RBAC Security'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=540&fit=crop',
    link: '/software/omnicrm-enterprise-suite'
  },
  {
    id: 'shopsphere-commerce',
    client: 'ShopSphere Retail Brands',
    title: 'High-Concurrency Headless Commerce',
    problem: 'Legacy store dropped transactions during peak sales surges due to slow checkout latency.',
    result: '3.8x checkout conversion rate with sub-100ms global page loads on flash drops',
    metric: '3.8x Conversion',
    tags: ['Next.js', 'Redux', 'Node.js', 'Redis'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&h=540&fit=crop',
    link: '/templates/shopsphere-ecommerce'
  }
]

export default function ProductShowcase() {
  const shouldReduceMotion = useReducedMotion()
  const [projects, setProjects] = useState(DEFAULT_CASE_STUDIES)
  const [title, setTitle] = useState('Featured projects.')
  const [subtitle, setSubtitle] = useState('Real software built for real businesses with verified outcomes.')
  const [isSectionActive, setIsSectionActive] = useState(true)
  const [activeModalProject, setActiveModalProject] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const SERVER_HOST = API_URL.replace('/api', '')

  useEffect(() => {
    let isMounted = true
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/content/featured_projects`)
        if (isMounted && res.data?.success && res.data.section) {
          const sec = res.data.section
          if (sec.title) setTitle(sec.title)
          if (sec.subtitle) setSubtitle(sec.subtitle)
          if (sec.isActive !== undefined) setIsSectionActive(sec.isActive)
          if (Array.isArray(sec.data?.projects) && sec.data.projects.length > 0) {
            const activeOnly = sec.data.projects.filter(p => p.isActive !== false)
            if (activeOnly.length > 0) {
              setProjects(activeOnly)
            }
          }
        }
      } catch {
        // Fallback silently to default
      }
    }

    fetchProjects()
    return () => {
      isMounted = false
    }
  }, [API_URL])

  // ESC key listener for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalProject(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeModalProject])

  if (!isSectionActive) {
    return null
  }

  const formatImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=540&fit=crop'
    if (img.startsWith('http://') || img.startsWith('https://')) return img
    return `${SERVER_HOST}${img}`
  }

  const renderTitle = (rawTitle) => {
    if (!rawTitle) {
      return (
        <>
          Featured{' '}
          <span className="relative inline-block isolate px-1">
            <span className="relative z-10">projects.</span>
            <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#F5B700] rounded-xs z-0 pointer-events-none" />
          </span>
        </>
      )
    }

    const words = rawTitle.trim().split(' ')
    if (words.length <= 1) {
      return (
        <span className="relative inline-block isolate px-1">
          <span className="relative z-10">{rawTitle}</span>
          <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#F5B700] rounded-xs z-0 pointer-events-none" />
        </span>
      )
    }

    const lastWord = words.pop()
    const rest = words.join(' ')
    return (
      <>
        {rest}{' '}
        <span className="relative inline-block isolate px-1">
          <span className="relative z-10">{lastWord}</span>
          <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#F5B700] rounded-xs z-0 pointer-events-none" />
        </span>
      </>
    )
  }

  return (
    <section id="work" className="scroll-mt-28 py-20 sm:py-28 bg-[#FDFBF7] text-[#111827] border-t border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 sm:mb-20 gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-[#111827]">
              <span className="w-5 h-1.5 bg-[#F5B700] rounded-full inline-block" />
              <span>SELECTED WORK</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#111827] tracking-[-0.035em] leading-[1.08]">
              {renderTitle(title)}
            </h2>
            <p className="text-base sm:text-lg text-[#4B5563]">
              {subtitle}
            </p>
          </div>

          <Link
            to="/software"
            className="inline-flex items-center space-x-2 text-sm font-bold text-[#111827] hover:text-[#D9A200] border-b-2 border-[#111827] pb-1 transition-colors"
          >
            <span>View all case studies</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>

        {/* Asymmetrical Staggered 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, idx) => {
            const tagsList = Array.isArray(project.tags)
              ? project.tags
              : (typeof project.tags === 'string' ? project.tags.split(',').map(s => s.trim()).filter(Boolean) : [])
            const isExternalLink = project.link && (project.link.startsWith('http://') || project.link.startsWith('https://'))
            const isOffsetCard = idx % 2 === 1

            return (
              <motion.div
                key={project.id || idx}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 28 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (idx % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden flex flex-col justify-between shadow-[0_12px_35px_rgba(17,24,39,0.04)] hover:border-[#F5B700] hover:shadow-[0_20px_50px_rgba(17,24,39,0.1)] transition-all duration-500 group ${
                  isOffsetCard ? 'lg:translate-y-10' : ''
                }`}
              >
                <div>
                  {/* Browser Window Device Bar */}
                  <div className="px-4 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-mono text-[#4B5563]">
                      {project.client}
                    </span>
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="text-[11px] font-semibold text-[#111827] hover:text-[#D9A200] underline cursor-pointer"
                    >
                      Quick view
                    </button>
                  </div>

                  {/* Screenshot Visual with Hover Zoom */}
                  <div 
                    onClick={() => setActiveModalProject(project)}
                    className="relative aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={formatImageUrl(project.image)}
                      alt={`${project.title} - ${project.client}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=540&fit=crop'
                      }}
                    />
                    {/* Metric Pill Badge on Top Right */}
                    {project.metric && (
                      <div className="absolute top-3.5 right-3.5 bg-[#111827]/95 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-bold font-mono shadow-md border border-[#F5B700]">
                        {project.metric}
                      </div>
                    )}
                  </div>

                  {/* Content Details */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                        {project.client}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight mt-0.5">
                        {project.title}
                      </h3>
                    </div>

                    {/* Problem */}
                    {project.problem && (
                      <div className="text-sm text-[#4B5563] leading-relaxed">
                        <strong className="text-[#111827] font-semibold">Problem: </strong>
                        {project.problem}
                      </div>
                    )}

                    {/* Result with Metric */}
                    {project.result && (
                      <div className="p-3.5 rounded-2xl bg-[#FEF3C7] border border-[#E5E7EB] text-xs sm:text-sm text-[#111827] font-medium leading-snug">
                        <strong className="font-bold">Result: </strong>
                        {project.result}
                      </div>
                    )}

                    {/* Tech Tags */}
                    {tagsList.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {tagsList.map(tag => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-[#F3F4F6] text-[#111827] text-xs font-semibold border border-[#E5E7EB]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#E5E7EB]/60 flex items-center justify-between">
                  {isExternalLink ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-sm font-bold text-[#111827] group-hover:text-[#D9A200] transition-colors"
                    >
                      <span>View case study</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      to={project.link || '/software'}
                      className="inline-flex items-center space-x-2 text-sm font-bold text-[#111827] group-hover:text-[#D9A200] transition-colors"
                    >
                      <span>View case study</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  )}
                  <span className="text-xs text-[#4B5563] font-mono">
                    Verified Outcome
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Case Study Quick-View Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div 
            onClick={() => setActiveModalProject(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white rounded-3xl max-w-2xl w-full border border-[#E5E7EB] shadow-2xl overflow-hidden my-8 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="px-6 py-4 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono font-bold text-[#111827] pl-2">
                    {activeModalProject.client}
                  </span>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#111827] hover:bg-[#FEF3C7] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                <img
                  src={formatImageUrl(activeModalProject.image)}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
                {activeModalProject.metric && (
                  <div className="absolute top-4 right-4 bg-[#111827] text-white px-3 py-1.5 rounded-full text-xs font-bold font-mono border border-[#F5B700]">
                    {activeModalProject.metric}
                  </div>
                )}
              </div>

              {/* Modal Details */}
              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F5B700] bg-[#111827] px-2.5 py-1 rounded inline-block mb-2">
                    {activeModalProject.client}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                    {activeModalProject.title}
                  </h3>
                </div>

                <div className="space-y-3 text-sm text-[#4B5563]">
                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5E7EB]">
                    <span className="font-bold text-[#111827] block mb-1">Challenge &amp; Problem:</span>
                    <p>{activeModalProject.problem}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FEF3C7] border border-[#E5E7EB] text-[#111827]">
                    <span className="font-bold block mb-1 flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-[#F5B700]" />
                      <span>Verified Result:</span>
                    </span>
                    <p className="font-medium">{activeModalProject.result}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(activeModalProject.tags) ? activeModalProject.tags : []).map(t => (
                    <span key={t} className="px-3 py-1 rounded-lg bg-[#F6F4EB] text-xs font-semibold text-[#111827] border border-[#E5E7EB]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Modal Footer Link */}
                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-xs text-[#4B5563] flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Production Architecture</span>
                  </span>

                  <Link
                    to={activeModalProject.link || '/software'}
                    onClick={() => setActiveModalProject(null)}
                    className="px-5 py-2.5 rounded-full bg-[#F5B700] hover:bg-[#D9A200] text-[#111827] font-bold text-xs flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <span>Open Case Study</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

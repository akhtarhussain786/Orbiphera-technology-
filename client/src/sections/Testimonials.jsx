import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, ArrowUpRight, User, Sparkles } from 'lucide-react'
import axios from 'axios'
import { gsap, initHeaderReveal, prefersReducedMotion } from '../utils/motion'

const DEFAULT_REVIEWS = [
  {
    id: 'review-1',
    headline: 'Things were visible, high-velocity, and efficient.',
    body: 'It was really good working with Yatharth IT Solutions and their engineering team, because they were attentive to our technical needs. It was collaborative, and as a client I can track the code commits and progress of the project. We used transparent sprint management, so things were visible and efficient. If you are looking for scalable software or mobile apps, I highly recommend them!',
    companyLogo: 'SPACECROP',
    authorName: 'Mary Grace Gasco',
    authorRole: 'Chief Executive Officer',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop'
  },
  {
    id: 'review-2',
    headline: 'The architecture & result is just amazing.',
    body: 'Yatharth IT Solutions is the right choice, I would highly recommend them, since they have been professional and competent from the very first moment. Our platform is wonderful, attractive, easy to use with the perfect design system. The team worked closely with us to provide a system that met all criteria. The result is just amazing.',
    companyLogo: 'NON STOP NANNY',
    authorName: 'Adrienn Asztalos',
    authorRole: 'Founder',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop'
  },
  {
    id: 'review-3',
    headline: 'A crucial engineering partner since our inception.',
    body: "They have been a crucial engineering partner since our company's inception. They manage our full web infrastructure, greatly enhancing our exposure and returns through outstanding architecture. Beyond web development, they've restructured our internal systems and automated data workflows.",
    companyLogo: 'RENTA STAY',
    authorName: 'Zaid Rauf',
    authorRole: 'Chief Technology Officer',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop'
  },
  {
    id: 'review-4',
    headline: 'We will surely continue working with them.',
    body: 'We have already done two projects of different nature, ie a software adaptation and an enterprise web platform, with the team at Yatharth IT. They have always been professional and flexible in adapting to our needs and are not afraid of incorporating new knowledge to their skills if the project requires it. We will surely continue working with them as the projects evolve.',
    companyLogo: 'BOTTEGA POLANCO',
    authorName: 'BOTTEGA Hospitality',
    authorRole: 'Chief Executive Officer',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop'
  },
  {
    id: 'review-5',
    headline: 'Reliable and trustable engineering company.',
    body: 'These engineers are great workers, full of technical depth and dedication. I have been working with them for more than a year with several websites and cloud platforms, and planning to stay longer. Reliable and trustable engineering company. Highly recommendable.',
    companyLogo: 'TRADERS HUB',
    authorName: 'Sergio',
    authorRole: 'Founder & CEO',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop'
  },
  {
    id: 'review-6',
    headline: 'Good customer service and deep commitment.',
    body: 'I was very happy with overall my platform build. Easy to understand, maintain, and update. It was very nice that their team explained and arranged every architectural component for me. I also like the user-friendly design system and continuous commitment I received.',
    companyLogo: 'SOLEIMANI CONSULTING',
    authorName: 'Saeedeh Soleimani',
    authorRole: 'Coach & Consultant',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop'
  }
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS)
  const [subtitle, setSubtitle] = useState('Verified feedback from founders, CTOs, and product directors.')
  const [isSectionActive, setIsSectionActive] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const SERVER_HOST = API_URL.replace('/api', '')

  useEffect(() => {
    let isMounted = true
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${API_URL}/content/testimonials`)
        if (isMounted && res.data?.success && res.data.section) {
          const sec = res.data.section
          if (sec.subtitle) setSubtitle(sec.subtitle)
          if (sec.isActive !== undefined) setIsSectionActive(sec.isActive)
          if (Array.isArray(sec.data?.reviews) && sec.data.reviews.length > 0) {
            const activeOnly = sec.data.reviews.filter(r => r.isActive !== false)
            if (activeOnly.length > 0) {
              setReviews(activeOnly)
            }
          }
        }
      } catch {
        // Fallback silently to default data
      }
    }

    fetchReviews()
    return () => {
      isMounted = false
    }
  }, [API_URL])

  useEffect(() => {
    if (prefersReducedMotion() || !isSectionActive) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        initHeaderReveal(headerRef.current)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isSectionActive])

  if (!isSectionActive) {
    return null
  }

  const formatAvatarUrl = (img) => {
    if (!img) return null
    if (img.startsWith('http://') || img.startsWith('https://')) return img
    return `${SERVER_HOST}${img}`
  }

  const totalPages = Math.max(1, Math.ceil(reviews.length / 3))
  const safeCurrentPage = Math.min(currentPage, totalPages - 1)
  const currentReviews = reviews.slice(safeCurrentPage * 3, (safeCurrentPage + 1) * 3)
  const topReview = currentReviews[0]
  const bottomReviews = currentReviews.slice(1, 3)

  const handleNext = () => setCurrentPage((prev) => (prev + 1) % totalPages)
  const handlePrev = () => setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))

  return (
    <section 
      ref={sectionRef}
      id="reviews" 
      className="scroll-mt-28 py-16 sm:py-24 bg-[#0F0F11] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[550px] h-[350px] bg-[#E50914]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="reveal-item inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914] bg-[#121214] px-3 py-1 rounded-full border border-[#E50914]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
            <span>CLIENT REVIEWS</span>
          </div>

          <h2 className="reveal-item text-4xl sm:text-5xl lg:text-[50px] font-black text-white tracking-tight leading-[1.08]">
            Don&apos;t just take <br />
            <span className="text-[#E50914] relative inline-block">
              our word for it.
            </span>
          </h2>
          <p className="reveal-item text-base sm:text-lg text-slate-300">
            {subtitle}
          </p>
        </div>

        {/* 1 Large Top Card + 2 Bottom Cards Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={safeCurrentPage}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6 sm:space-y-7"
          >
            {/* Top Large Full-Width Card */}
            {topReview && (
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl bg-[#121214] border border-white/10 p-7 sm:p-11 shadow-lg hover:border-[#E50914]/50 transition-colors"
              >
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Quotes + Headline + Body */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex space-x-1.5">
                      <span className="w-2 h-5 bg-[#E50914] -skew-x-12 inline-block rounded-xs" />
                      <span className="w-2 h-5 bg-[#E50914] -skew-x-12 inline-block rounded-xs" />
                      <span className="w-2 h-5 bg-[#E50914] -skew-x-12 inline-block rounded-xs" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                      &ldquo;{topReview.headline}&rdquo;
                    </h3>

                    <p className="text-base text-slate-300 leading-relaxed">
                      {topReview.body}
                    </p>
                  </div>

                  {/* Right: Author / Client Info */}
                  <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-10 space-y-3 pt-4 lg:pt-0">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#E50914] uppercase block">
                      {topReview.companyLogo}
                    </span>

                    <div className="flex text-[#E50914] space-x-0.5">
                      {[...Array(topReview.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#E50914]" />
                      ))}
                    </div>

                    <div className="flex items-center space-x-3 pt-1">
                      {formatAvatarUrl(topReview.avatar) ? (
                        <img
                          src={formatAvatarUrl(topReview.avatar)}
                          alt={topReview.authorName}
                          className="w-11 h-11 rounded-full object-cover border border-[#E50914]/40 shrink-0"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-[#E50914]/10 text-[#E50914] font-bold flex items-center justify-center text-sm border border-[#E50914]/30 shrink-0">
                          {topReview.authorName?.charAt(0) || <User className="w-4 h-4" />}
                        </div>
                      )}

                      <div>
                        <span className="text-base font-bold text-white block leading-tight">
                          {topReview.authorName}
                        </span>
                        <span className="text-xs text-slate-400 font-medium block mt-0.5">
                          {topReview.authorRole}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bottom 2 Side-by-Side Cards */}
            {bottomReviews.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
                {bottomReviews.map((rev) => (
                  <motion.div
                    key={rev.id}
                    whileHover={shouldReduceMotion ? {} : { y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-3xl bg-[#121214] border border-white/10 p-7 sm:p-8 shadow-md flex flex-col justify-between space-y-6 hover:border-[#E50914]/50 transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="flex space-x-1.5">
                        <span className="w-2 h-5 bg-[#E50914] -skew-x-12 inline-block rounded-xs" />
                        <span className="w-2 h-5 bg-[#E50914] -skew-x-12 inline-block rounded-xs" />
                        <span className="w-2 h-5 bg-[#E50914] -skew-x-12 inline-block rounded-xs" />
                      </div>

                      <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        &ldquo;{rev.headline}&rdquo;
                      </h4>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {rev.body}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {formatAvatarUrl(rev.avatar) ? (
                          <img
                            src={formatAvatarUrl(rev.avatar)}
                            alt={rev.authorName}
                            className="w-10 h-10 rounded-full object-cover border border-[#E50914]/40 shrink-0"
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#E50914]/10 text-[#E50914] font-bold flex items-center justify-center text-xs border border-[#E50914]/30 shrink-0">
                            {rev.authorName?.charAt(0) || <User className="w-3.5 h-3.5" />}
                          </div>
                        )}

                        <div>
                          <span className="text-sm font-bold text-white block leading-tight">
                            {rev.authorName}
                          </span>
                          <span className="text-xs text-slate-400 block mt-0.5">
                            {rev.authorRole} · <strong className="text-[#E50914]">{rev.companyLogo}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex text-[#E50914] space-x-0.5 shrink-0 pl-2">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#E50914]" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel Bottom Controls */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            {/* Prev Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              disabled={totalPages <= 1}
              className="w-10 h-10 rounded-full border border-white/10 bg-[#121214] hover:bg-[#E50914] hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#E50914] cursor-pointer"
              aria-label="Previous Reviews"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            {/* Sliding Pill Progress Bar */}
            <div className="flex space-x-1.5 items-center">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    safeCurrentPage === idx ? 'w-8 bg-[#E50914]' : 'w-2.5 bg-white/20 hover:bg-[#E50914]/50'
                  }`}
                  aria-label={`Go to review page ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              disabled={totalPages <= 1}
              className="w-10 h-10 rounded-full border border-white/10 bg-[#121214] hover:bg-[#E50914] hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#E50914] cursor-pointer"
              aria-label="Next Reviews"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>

            {/* Counter */}
            <span className="text-xs font-mono font-bold text-slate-400 pl-1">
              Page {safeCurrentPage + 1} of {totalPages} ({reviews.length} reviews)
            </span>
          </div>

          <a
            href="#reviews"
            className="text-xs sm:text-sm font-mono font-bold text-[#E50914] hover:underline underline-offset-8 transition-all inline-flex items-center space-x-1"
          >
            <span>Read all verified reviews</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
          </a>
        </div>
      </div>
    </section>
  )
}

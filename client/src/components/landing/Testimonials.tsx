import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'
import { TESTIMONIALS, TestimonialItem } from '../../data/landing'
import UnderlineBar from './UnderlineBar'

export const LandingTestimonials: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  // 2 pages of 3 testimonials each (1 large + 2 secondary = 3 per view)
  const pageSize = 3
  const totalPages = Math.ceil(TESTIMONIALS.length / pageSize)
  const currentReviews = TESTIMONIALS.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  const featured = currentReviews[0]
  const secondaries = currentReviews.slice(1, 3)

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const startIdx = currentPage * pageSize + 1
  const endIdx = Math.min((currentPage + 1) * pageSize, TESTIMONIALS.length)
  const progressPercent = ((currentPage + 1) / totalPages) * 100

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-[#FAFAF8] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-gray-500">
              <span className="w-5 h-1.5 bg-[#FFE600] rounded-full inline-block" />
              <span>CLIENT TESTIMONIALS</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-medium text-[#0E0E10] tracking-[-0.035em] leading-[1.08]">
              Don't just take <br />
              <span className="relative inline-block">
                our word for it.
                <UnderlineBar heightClass="h-3.5 sm:h-4" />
              </span>
            </h2>
          </div>

          {/* Navigation Controls: Counter + Yellow Sliding Progress Bar + Next/Prev */}
          <div className="flex items-center space-x-4 self-start md:self-auto">
            {/* Counter */}
            <span className="text-xs font-mono font-bold text-gray-500">
              {startIdx}–{endIdx} of {TESTIMONIALS.length}
            </span>

            {/* Yellow Sliding Progress Bar */}
            <div className="w-24 sm:w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-[#FFE600] rounded-full"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>

            {/* Next / Prev Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-black/10 bg-white hover:bg-black hover:text-white flex items-center justify-center text-[#0E0E10] transition-colors"
                aria-label="Previous Reviews"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="group relative w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-[#0E0E10] transition-all overflow-hidden"
                aria-label="Next Reviews"
              >
                {/* Yellow circle on next-button hover */}
                <span className="absolute inset-0 bg-[#FFE600] rounded-full scale-0 group-hover:scale-100 transition-transform duration-250 ease-out origin-center" />
                <ChevronRight className="w-4 h-4 relative z-10 text-[#0E0E10]" />
              </button>
            </div>
          </div>
        </div>

        {/* 1 Large + 2-Column Carousel Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
          >
            {/* 1 Large Featured Review (7 cols) */}
            {featured && (
              <div className="lg:col-span-7 rounded-3xl bg-white border border-black/10 p-8 sm:p-10 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  {/* Yellow Quotation Slashes */}
                  <div className="flex space-x-1">
                    <span className="w-2.5 h-6 bg-[#FFE600] -skew-x-12 inline-block rounded-xs" />
                    <span className="w-2.5 h-6 bg-[#FFE600] -skew-x-12 inline-block rounded-xs" />
                    <span className="w-2.5 h-6 bg-[#FFE600] -skew-x-12 inline-block rounded-xs" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-medium text-[#0E0E10] tracking-tight leading-snug">
                    “{featured.headline}”
                  </h3>

                  <p className="text-sm sm:text-base text-[#4A4B53] leading-relaxed">
                    {featured.body}
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm font-bold text-[#0E0E10]">
                        {featured.clientName}
                      </span>
                      {featured.verified && (
                        <ShieldCheck className="w-4 h-4 text-[#00B67A]" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 block">
                      {featured.clientRole} · {featured.company}
                    </span>
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <span className="text-xs font-mono font-bold tracking-wider text-[#0E0E10] uppercase">
                      {featured.companyLogoText}
                    </span>
                    <div className="flex text-[#00B67A] space-x-0.5 mt-1">
                      {[...Array(featured.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#00B67A]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2 Supporting Reviews (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {secondaries.map((sec) => (
                <div
                  key={sec.id}
                  className="rounded-3xl bg-white border border-black/10 p-6 sm:p-7 shadow-2xs flex flex-col justify-between space-y-4 flex-1"
                >
                  <div className="space-y-2.5">
                    <div className="flex text-[#00B67A] space-x-0.5">
                      {[...Array(sec.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#00B67A]" />
                      ))}
                    </div>

                    <h4 className="text-lg font-medium text-[#0E0E10] tracking-tight">
                      “{sec.headline}”
                    </h4>

                    <p className="text-xs sm:text-sm text-[#4A4B53] leading-relaxed line-clamp-3">
                      {sec.body}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#0E0E10] block">
                        {sec.clientName}
                      </span>
                      <span className="text-[11px] text-gray-500 block">
                        {sec.company}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase">
                      {sec.companyLogoText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default LandingTestimonials


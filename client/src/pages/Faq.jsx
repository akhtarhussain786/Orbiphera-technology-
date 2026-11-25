import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, 
  Sparkles, 
  ChevronDown, 
  Search, 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  ArrowRight 
} from 'lucide-react'
import SeoHead from '../components/common/SeoHead'
import { FAQ_ITEMS } from '../sections/FAQ'
import ProjectInquiryCTA from '../sections/ProjectInquiryCTA'
import { useSettings } from '../context/SettingsContext'

export default function Faq() {
  const { settings } = useSettings()
  const siteName = settings?.siteName || 'Orbiphera Technologies'
  const contactPhone = settings?.contactPhone || '+91 8676875336'
  const contactEmail = settings?.contactEmail || 'contact@orbiphera.in'

  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(0)

  const breadcrumbs = [
    { name: 'Home', url: 'https://orbiphera.in/' },
    { name: 'FAQ', url: 'https://orbiphera.in/faq' }
  ]

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_ITEMS
    const query = searchQuery.toLowerCase().trim()
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-[#FFFFFF] font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <SeoHead
        title={`Frequently Asked Questions (FAQ) | ${siteName}`}
        description={`Find detailed answers regarding website development costs, Flutter mobile apps, enterprise ERP software, source code ownership, and timelines at ${siteName}.`}
        keywords="Orbiphera FAQ, website development cost Bihar, mobile app timeline, software code ownership, IT questions Siwan Patna"
        canonical="https://orbiphera.in/faq"
        faqs={FAQ_ITEMS}
        breadcrumbs={breadcrumbs}
      />

      {/* Page Hero Header Banner */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-16 overflow-hidden border-b border-white/[0.06]">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E50914]/8 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </li>
              <li className="text-[#E50914] font-bold" aria-current="page">
                Frequently Asked Questions
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSPARENCY &amp; ARCHITECTURAL CLARITY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Frequently Asked{' '}
              <span className="text-[#E50914]">Questions.</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed pt-2">
              Everything you need to know about our software architecture standards, pricing tiers, IP code ownership, sprint delivery timelines, and post-launch maintenance.
            </p>
          </div>

          {/* Interactive Search Bar */}
          <div className="max-w-xl mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions (e.g. cost, Flutter, ERP, code ownership)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setOpenIndex(0)
                }}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#121214] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] text-sm shadow-xl transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQ Accordion Section */}
      <section className="py-16 sm:py-24 bg-[#0B0B0C] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-[#121214] border border-white/10">
              <HelpCircle className="w-12 h-12 text-[#E50914] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No matching questions found</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                We could not find an answer for &ldquo;{searchQuery}&rdquo;. Connect with our architects directly and get an answer within 15 minutes.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#E50914] text-white text-xs font-bold hover:bg-[#CC0813] transition-all"
              >
                <span>Ask Our Solutions Team</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div
                    key={faq.question}
                    className={`rounded-2xl transition-all border overflow-hidden ${
                      isOpen
                        ? 'bg-[#141418] border-[#E50914]/40 shadow-lg'
                        : 'bg-[#121214] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(idx)}
                      className="w-full py-5 px-6 sm:px-7 flex items-center justify-between text-left cursor-pointer transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-bold text-white pr-4">
                        {faq.question}
                      </span>
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                        isOpen 
                          ? 'bg-[#E50914] text-white border-[#E50914]' 
                          : 'bg-white/5 text-slate-400 border-white/10'
                      }`}>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          )}

          {/* Direct Support Card */}
          <div className="mt-16 p-8 rounded-3xl bg-[#121214] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-white">Have a specific question not answered here?</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Our solutions engineering team responds to WhatsApp inquiries within 15 minutes.
              </p>
            </div>
            <a
              href={`https://wa.me/91${contactPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Orbiphera Technologies, I have a question regarding your software services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#E50914] hover:bg-[#CC0813] text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

      {/* Free Project Consultation & Inquiry Form */}
      <ProjectInquiryCTA />
    </div>
  )
}

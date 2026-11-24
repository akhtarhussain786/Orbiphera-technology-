import React, { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Smartphone,
  Layers,
  Target,
  Code2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Star,
  ShieldCheck,
  Zap,
  Clock,
  PhoneCall,
  MessageSquare,
  FileCheck2,
  Cpu,
  Database
} from 'lucide-react'
import SeoHead from '../../components/common/SeoHead'
import { SERVICES_DATA } from '../../data/servicesData'
import { useSettings } from '../../context/SettingsContext'

const ICON_MAP = {
  Globe,
  Smartphone,
  Layers,
  Target,
  Code2,
  Sparkles
}

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams()
  const { settings } = useSettings()
  const [openFaq, setOpenFaq] = useState(0)

  const service = SERVICES_DATA[serviceSlug]

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const IconComponent = ICON_MAP[service.icon] || Globe
  const brandName = settings?.siteName || 'Orbiphera Technologies'
  const contactPhone = settings?.contactPhone || '+91 98765 43210'
  const rawPhone = contactPhone.replace(/[^0-9]/g, '')
  const whatsappNumber = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello ${brandName}, I am interested in your ${service.h1}. Please share scope and consultation details.`
  )}`

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.badge, url: `/services/${service.slug}` }
  ]

  const serviceSchemaData = {
    name: service.h1,
    description: service.metaDescription,
    serviceType: service.badge,
    features: service.features.map(f => f.title)
  }

  const otherServices = Object.values(SERVICES_DATA).filter(s => s.slug !== service.slug)

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white font-sans antialiased selection:bg-[#E50914] selection:text-white">
      {/* SEO Engine Injection */}
      <SeoHead
        title={service.metaTitle}
        description={service.metaDescription}
        keywords={service.keywords}
        canonical={`https://orbiphera.in/services/${service.slug}`}
        breadcrumbs={breadcrumbs}
        service={serviceSchemaData}
        faqs={service.faqs}
      />

      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#E50914]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#1558C9]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-16 sm:space-y-24">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="pt-4">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 font-medium overflow-x-auto whitespace-nowrap py-1">
            <li>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            </li>
            <li className="flex items-center space-x-2 text-[#FF2A36]">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
              <span className="font-semibold text-gray-200 truncate">{service.badge}</span>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#FF2A36] text-xs font-bold tracking-wide uppercase">
            <IconComponent className="w-3.5 h-3.5" />
            <span>{service.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            {service.h1}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl">
            {service.subtitle}
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/request-quote"
              className="px-6 py-3.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(255,200,0,0.3)] hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-2"
            >
              <span>Get Free Scope & Quote</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-[1.02] flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>

            <Link
              to="/request-demo"
              className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/10 transition-colors flex items-center space-x-2"
            >
              <span>Book Live Architecture Demo</span>
            </Link>
          </div>
        </header>

        {/* Value Proposition & Metric Stats Strip */}
        <section aria-label="Key Performance Indicators" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {service.stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#10151E] border border-white/10 shadow-xl space-y-1 hover:border-[#E50914]/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight text-[#FFC800]">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Core Architectural Capabilities (H2) */}
        <section aria-labelledby="capabilities-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="capabilities-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Engineering Capabilities
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl">
              High-availability architecture, clean code standards, and complete source code ownership built for real-world business scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#10151E] border border-white/10 hover:border-[#1558C9]/50 transition-all duration-300 shadow-xl space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1558C9]/20 text-[#1558C9] border border-[#1558C9]/30 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFC800] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack Badges */}
        <section aria-labelledby="techstack-heading" className="p-8 rounded-3xl bg-[#0F141F] border border-white/10 shadow-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 id="techstack-heading" className="text-xl sm:text-2xl font-extrabold text-white">
                Battle-Tested Technology Stack
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Zero legacy bloat. We build exclusively on modern, high-speed, and secure technologies.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 self-start sm:self-auto">
              Production Verified
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {service.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm font-semibold text-gray-200 shadow-sm flex items-center space-x-2"
              >
                <Cpu className="w-3.5 h-3.5 text-[#FF2A36]" />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </section>

        {/* 5-Step Agile Engineering Process (H2) */}
        <section aria-labelledby="process-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="process-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our 5-Step Engineering Workflow
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl">
              From requirement gathering to post-launch SLA support, our milestone-driven development process ensures on-time, within-budget delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#10151E] border border-white/10 relative overflow-hidden space-y-3"
              >
                <div className="text-2xl font-black font-mono text-[#E50914]">
                  {step.step}
                </div>
                <h3 className="text-sm font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions (H2) with Interactive Accordion */}
        <section aria-labelledby="faq-heading" className="space-y-6">
          <div className="space-y-2">
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl">
              Clear, transparent answers to technical, commercial, and post-launch maintenance questions.
            </p>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#10151E] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between space-x-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[#FFC800]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>

        {/* Internal Linking: Explore Related Services */}
        <section aria-labelledby="related-heading" className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h2 id="related-heading" className="text-xl sm:text-2xl font-extrabold text-white">
              Explore Related Digital Engineering Services
            </h2>
            <Link to="/services" className="text-xs sm:text-sm font-bold text-[#FFC800] hover:underline flex items-center">
              <span>View all services</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.slice(0, 4).map((other) => (
              <Link
                key={other.slug}
                to={`/services/${other.slug}`}
                className="p-5 rounded-2xl bg-[#10151E] border border-white/10 hover:border-[#FFC800]/40 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF2A36] font-bold">
                    {other.badge}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#FFC800] transition-colors">
                    {other.h1}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#FFC800]" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Global Conversion CTA Banner */}
        <section className="bg-gradient-to-br from-[#1558C9]/20 via-[#10151E] to-[#E50914]/20 border border-white/15 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to Build Your {service.badge} Solution?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Get in touch with our senior solutions architect today for a free project scoping consultation, timeline estimation, and transparent pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/request-quote"
              className="px-7 py-3.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(255,200,0,0.3)] hover:scale-105"
            >
              Request Free Project Estimate
            </Link>
            <a
              href={`tel:${contactPhone.replace(/\s+/g, '')}`}
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/10 transition-colors flex items-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Call Senior Architect</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

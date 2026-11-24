import React, { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Building2,
  ShieldCheck,
  Star,
  Users,
  Clock,
  Compass
} from 'lucide-react'
import SeoHead from '../../components/common/SeoHead'
import { LOCATIONS_DATA } from '../../data/locationsData'
import { SERVICES_DATA } from '../../data/servicesData'
import { useSettings } from '../../context/SettingsContext'

export default function LocationDetailPage() {
  const { locationSlug } = useParams()
  const { settings } = useSettings()
  const [openFaq, setOpenFaq] = useState(0)

  const location = LOCATIONS_DATA[locationSlug]

  if (!location) {
    return <Navigate to="/locations" replace />
  }

  const brandName = settings?.siteName || 'Orbiphera Technologies'
  const contactPhone = settings?.contactPhone || '+91 98765 43210'
  const contactEmail = settings?.contactEmail || 'contact@orbiphera.in'
  const rawPhone = contactPhone.replace(/[^0-9]/g, '')
  const whatsappNumber = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello ${brandName}, I am inquiring from ${location.name} regarding website and software development services.`
  )}`

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/locations' },
    { name: location.name, url: `/locations/${location.slug}` }
  ]

  const localBusinessData = {
    streetAddress: location.geo.streetAddress,
    city: location.geo.city,
    state: location.geo.state,
    postalCode: location.geo.postalCode,
    latitude: parseFloat(location.geo.position.split(';')[0]),
    longitude: parseFloat(location.geo.position.split(';')[1]),
    geoRegion: location.geo.region,
    placename: location.geo.placename,
    position: location.geo.position,
    icbm: location.geo.icbm,
    areas: location.serviceAreas.map(a => ({ '@type': 'City', name: a }))
  }

  const otherLocations = Object.values(LOCATIONS_DATA).filter(l => l.slug !== location.slug)
  const topServices = Object.values(SERVICES_DATA).slice(0, 4)

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <SeoHead
        title={location.metaTitle}
        description={location.metaDescription}
        keywords={location.keywords}
        canonical={`https://orbiphera.in/locations/${location.slug}`}
        breadcrumbs={breadcrumbs}
        localBusiness={localBusinessData}
        faqs={location.faqs}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-16 sm:space-y-24">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="pt-4">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 font-medium">
            <li>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <Link to="/locations" className="hover:text-white transition-colors">Locations</Link>
            </li>
            <li className="flex items-center space-x-2 text-[#FF2A36]">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <span className="font-semibold text-gray-200">{location.name}</span>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#FF2A36] text-xs font-bold tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>{location.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            {location.h1}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl">
            {location.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/request-quote"
              className="px-6 py-3.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(255,200,0,0.3)] hover:scale-[1.02]"
            >
              Get Free Project Scope & Cost
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Inquiry</span>
            </a>

            <a
              href={`tel:${contactPhone.replace(/\s+/g, '')}`}
              className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/10 transition-colors flex items-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-[#FF2A36]" />
              <span>{contactPhone}</span>
            </a>
          </div>
        </header>

        {/* Local Performance Metrics */}
        <section aria-label="Regional Statistics" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {location.stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#10151E] border border-white/10 space-y-1 hover:border-[#1558C9]/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-black text-[#FFC800] font-mono">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Local Highlights Grid */}
        <section aria-labelledby="highlights-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="highlights-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Why Businesses in {location.name} Trust {brandName}
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl">
              We eliminate technical friction with localized support, high-speed regional cloud deployment, and zero hidden costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {location.highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#10151E] border border-white/10 hover:border-[#FFC800]/40 transition-all shadow-xl space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E50914]/20 text-[#FF2A36] border border-[#E50914]/30 flex items-center justify-center font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Service Areas Tags */}
        <section className="p-8 rounded-3xl bg-[#0F141F] border border-white/10 space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Compass className="w-5 h-5 text-[#FFC800]" />
              <span>Key Service Areas in {location.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Immediate deployment and engineering consulting across all major zones:
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {location.serviceAreas.map((area, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-semibold text-gray-300 flex items-center space-x-1.5"
              >
                <MapPin className="w-3 h-3 text-[#FF2A36]" />
                <span>{area}</span>
              </span>
            ))}
          </div>
        </section>

        {/* Core Services Offered Locally */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Our Digital Solutions Available in {location.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topServices.map((srv) => (
              <Link
                key={srv.slug}
                to={`/services/${srv.slug}`}
                className="p-5 rounded-2xl bg-[#10151E] border border-white/10 hover:border-[#1558C9]/40 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#FF2A36] font-bold">
                    {srv.badge}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#FFC800] transition-colors">
                    {srv.h1}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <span>Explore service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#FFC800]" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Local FAQs */}
        <section aria-labelledby="local-faq-heading" className="space-y-6">
          <div className="space-y-2">
            <h2 id="local-faq-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions for {location.name}
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl">
              Local support, meeting scheduling, and commercial terms.
            </p>
          </div>

          <div className="space-y-3">
            {location.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#10151E] border border-white/10 overflow-hidden"
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

        {/* Other Location Hubs */}
        <section className="space-y-4 pt-6 border-t border-white/10">
          <h2 className="text-lg font-bold text-white">
            Explore Other Regional Service Hubs
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherLocations.map((other) => (
              <Link
                key={other.slug}
                to={`/locations/${other.slug}`}
                className="px-4 py-2 rounded-xl bg-[#10151E] border border-white/10 hover:border-white/20 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
              >
                {other.regionTitle} →
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

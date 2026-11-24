import React from 'react'
import { Link } from 'react-router-dom'
import {
  Globe,
  Smartphone,
  Layers,
  Target,
  Code2,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Clock,
  Zap,
  Building2
} from 'lucide-react'
import SeoHead from '../../components/common/SeoHead'
import { SERVICES_DATA } from '../../data/servicesData'

const ICON_MAP = {
  Globe,
  Smartphone,
  Layers,
  Target,
  Code2,
  Sparkles
}

export default function ServicesHubPage() {
  const servicesList = Object.values(SERVICES_DATA)

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' }
  ]

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <SeoHead
        title="Enterprise Software, Web & Mobile App Development Services | Orbiphera"
        description="Explore Orbiphera Technologies full suite of digital engineering services: Custom Web Development, Mobile Apps (Android & iOS), Flutter Apps, ERP Systems, and CRM Platforms."
        keywords="Website Development Services, Mobile App Development Services, Custom Software Development, Flutter App Development, ERP Software India, CRM Development Bihar"
        canonical="https://orbiphera.in/services"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 font-medium">
            <li>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li className="flex items-center space-x-2 text-[#FF2A36]">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <span className="font-semibold text-gray-200">Services</span>
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#FF2A36] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Engineering Disciplines</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Full-Spectrum Software & Web Engineering Services
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            From consumer-facing mobile apps to mission-critical multi-branch ERP solutions, we architect scalable digital products built to dominate search rankings and drive commercial growth.
          </p>
        </header>

        {/* Services Grid (8 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesList.map((srv) => {
            const Icon = ICON_MAP[srv.icon] || Globe
            return (
              <div
                key={srv.slug}
                className="p-7 rounded-3xl bg-[#10151E] border border-white/10 hover:border-[#E50914]/50 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#E50914]/15 text-[#FF2A36] border border-[#E50914]/30 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                      {srv.badge}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-[#FFC800] transition-colors">
                    {srv.h1}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {srv.subtitle}
                  </p>

                  <div className="pt-2 space-y-1.5 border-t border-white/5">
                    {srv.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC800] flex-shrink-0" />
                        <span className="truncate">{f.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    to={`/services/${srv.slug}`}
                    className="text-xs sm:text-sm font-bold text-[#FFC800] group-hover:text-white flex items-center space-x-1 transition-colors"
                  >
                    <span>Explore Architecture & Pricing</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Global CTA Section */}
        <section className="bg-gradient-to-r from-[#10151E] to-[#1558C9]/20 border border-white/15 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Need a Custom Architecture or Architecture Audit?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Speak directly with our senior software architects. We provide itemized milestones, transparent timelines, and fixed-cost guarantees.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/request-quote"
              className="px-7 py-3.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(255,200,0,0.3)] hover:scale-105"
            >
              Request Free Consultation
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/10 transition-colors"
            >
              Contact Our Engineers
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

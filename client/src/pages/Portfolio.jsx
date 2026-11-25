import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Sparkles, Layers, CheckCircle2, ArrowRight } from 'lucide-react'
import SeoHead from '../components/common/SeoHead'
import PortfolioSection from '../sections/PortfolioSection'
import IndustriesSection from '../sections/IndustriesSection'
import Testimonials from '../sections/Testimonials'
import ProjectInquiryCTA from '../sections/ProjectInquiryCTA'
import { useSettings } from '../context/SettingsContext'

export default function Portfolio() {
  const { settings } = useSettings()
  const siteName = settings?.siteName || 'Orbiphera Technologies'

  const breadcrumbs = [
    { name: 'Home', url: 'https://orbiphera.in/' },
    { name: 'Portfolio', url: 'https://orbiphera.in/portfolio' }
  ]

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-[#FFFFFF] font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <SeoHead
        title={`Our Projects & Completed Portfolio | ${siteName}`}
        description={`Explore enterprise software, custom websites, Flutter mobile applications, and ERP/EMS platforms engineered by ${siteName}. Real-world case studies with source architecture and performance metrics.`}
        keywords="Orbiphera portfolio, web development projects, Flutter mobile app showcase, ERP software case studies, hospital management system, school ERP Bihar"
        canonical="https://orbiphera.in/portfolio"
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
                Portfolio &amp; Projects
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROVEN ENGINEERING IMPACT</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Engineered Deployments &amp;{' '}
              <span className="text-[#E50914]">Case Studies.</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed pt-2">
              Every system we engineer is tailored to our clients&apos; specific business models. From high-conversion corporate web platforms to mission-critical multi-branch ERPs, discover our work below.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Main Interactive Portfolio Grid (All categories & full projects) */}
      <PortfolioSection isPage={true} />

      {/* 2. Industries & Enterprise Domains Served */}
      <IndustriesSection />

      {/* 3. Verified Client Reviews & Testimonials */}
      <Testimonials />

      {/* 4. Consultation & Inquiry CTA */}
      <ProjectInquiryCTA />
    </div>
  )
}

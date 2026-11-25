import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  ChevronRight,
  Code2,
  Cpu,
  Zap
} from 'lucide-react'
import SeoHead from '../components/common/SeoHead'
import CompanyAbout from '../sections/CompanyAbout'
import WhyChooseUs from '../sections/WhyChooseUs'
import TeamSection from '../sections/TeamSection'
import LocalTrustSection from '../sections/LocalTrustSection'
import DevelopmentProcess from '../sections/DevelopmentProcess'
import ProjectInquiryCTA from '../sections/ProjectInquiryCTA'
import { useSettings } from '../context/SettingsContext'

export default function About() {
  const { settings } = useSettings()
  const siteName = settings?.siteName || 'Orbiphera Technologies'

  const breadcrumbs = [
    { name: 'Home', url: 'https://orbiphera.in/' },
    { name: 'About Us', url: 'https://orbiphera.in/about' }
  ]

  const stats = [
    { label: 'Active Deployments', value: '50+', desc: 'Enterprises & businesses scaled' },
    { label: 'Client Retention Rate', value: '98%', desc: 'Long-term support partnerships' },
    { label: 'Average SLA Uptime', value: '99.8%', desc: 'Cloud infrastructure reliability' },
    { label: 'Code Ownership', value: '100%', desc: 'Zero vendor lock-in guarantee' }
  ]

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-[#FFFFFF] font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <SeoHead
        title={`About ${siteName} | Software Architects, Web & Mobile Engineering`}
        description={`${siteName} is a premier technical engineering firm specializing in modern website development, Flutter mobile apps, custom ERP/EMS software, and cloud architectures. Learn about our mission, leadership, and engineering standards.`}
        keywords="About Orbiphera Technologies, software development company in Bihar, website developers Siwan, Patna IT company, full-stack software architects, IT agency India"
        canonical="https://orbiphera.in/about"
        breadcrumbs={breadcrumbs}
      />

      {/* Page Hero Header Banner */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden border-b border-white/[0.06]">
        {/* Ambient Light Orbs */}
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
                About Us
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PIONEERING TECHNICAL EXCELLENCE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Architecting Digital Products With{' '}
              <span className="text-[#E50914]">Precision &amp; Scalability.</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed pt-2">
              We are a team of senior software architects, full-stack engineers, and product designers building high-performance websites, Flutter mobile apps, and enterprise software that solve real business bottlenecks.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 sm:mt-16">
            {stats.map((st) => (
              <div 
                key={st.label} 
                className="p-5 sm:p-6 rounded-2xl bg-[#121214] border border-white/10 hover:border-[#E50914]/30 transition-all"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E50914] tracking-tight font-mono">
                  {st.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {st.label}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                  {st.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. Core Company Mission & Story */}
      <CompanyAbout />

      {/* 2. Engineering Pillars & Strengths */}
      <WhyChooseUs />

      {/* 3. Core Leadership & Architects */}
      <TeamSection />

      {/* 4. Local Presence & Authority in Siwan & Bihar */}
      <LocalTrustSection />

      {/* 5. 5-Step Engineering Workflow */}
      <DevelopmentProcess />

      {/* 6. Direct Contact & Consultation CTA */}
      <ProjectInquiryCTA />
    </div>
  )
}

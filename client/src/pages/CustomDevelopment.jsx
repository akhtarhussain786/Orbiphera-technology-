import React from 'react'
import {
  Database, Server, Layers,
  CheckCircle2, ArrowRight, Sparkles, Cpu
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import SeoHead from '../components/common/SeoHead'
import PageBackground from '../components/common/PageBackground'

export default function CustomDevelopment() {
  const navigate = useNavigate()

  const services = [
    {
      title: 'Enterprise Web Applications & SaaS',
      description: 'End-to-end custom software built with modern React, Node.js, and MongoDB. Scalable architectures tailored to your exact business workflow.',
      features: ['Multi-tenant SaaS Architecture', 'Stripe / Cashfree / Razorpay Integration', 'Role-Based Access Control', 'High-speed Redis Caching'],
      icon: Layers
    },
    {
      title: 'Hospital & Healthcare ERP',
      description: 'Comprehensive digital clinical management platforms with electronic health records, OPD queueing, and doctor appointment scheduling.',
      features: ['HIPAA / Data Privacy Compliance', 'Doctor-Patient Portals', 'Lab & Pharmacy Billing', 'Automated SMS / WhatsApp Alerts'],
      icon: Cpu
    },
    {
      title: 'Education & Institutional Portals',
      description: 'Custom learning management systems, student admission pipelines, examination modules, and fee collection engines for modern universities.',
      features: ['Online Fee Payment Gateway', 'Student Performance Analytics', 'Faculty Course Builders', 'Certificate Verification API'],
      icon: Database
    },
    {
      title: 'CRM & Lead Conversion Pipelines',
      description: 'Bespoke CRM software designed to replace expensive bloated monthly subscriptions with customized ownership and tailored sales tracking.',
      features: ['Automated Lead Ingestion', 'Quotation & Invoice Generator', 'Team Commission Tracking', 'Real-time Pipeline Telemetry'],
      icon: Server
    }
  ]

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-32 sm:pt-36 pb-20 relative overflow-hidden">
      <PageBackground />
      <SeoHead
        title="Custom Digital Development & Software Engineering"
        description="Hire senior software engineers to build bespoke web platforms, SaaS applications, hospital management ERPs, and mobile apps."
        keywords="custom software development, hire web developers, saas development, hospital erp, crm engineering"
      />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121214] border border-[#E50914]/30 text-[#E50914] text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
            <span>Dedicated Full-Stack Engineering Squads</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Bespoke Software Engineered For{' '}
            <span className="text-[#E50914]">
              Limitless Scale
            </span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            When off-the-shelf templates aren't enough, our senior software architects engineer custom digital products tailored specifically to your organization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/request-quote')}
              icon={ArrowRight}
              iconPosition="right"
            >
              Request Custom Project Proposal
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Talk With an Architect
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((svc, idx) => {
            const Icon = svc.icon
            return (
              <div
                key={idx}
                className="bg-[#121214] border border-white/10 rounded-3xl p-8 hover:border-[#E50914]/40 hover:shadow-[0_0_30px_rgba(229, 9, 20,0.15)] transition-all duration-300 group shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-[#E50914] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#E50914] transition-colors">{svc.title}</h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6">
                  {svc.description}
                </p>
                <div className="space-y-2 border-t border-white/10 pt-4">
                  {svc.features.map((f, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#E50914] flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Development Methodology */}
        <div className="bg-[#121214] border border-white/10 rounded-3xl p-8 sm:p-12 mb-20 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white">How We Build Your Custom Platform</h3>
            <p className="text-xs text-white/60 mt-1">Our battle-tested 4-stage engineering lifecycle</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <span className="text-2xl font-black text-[#E50914] block mb-2 font-mono">01</span>
              <h4 className="text-sm font-bold text-white mb-1">Architecture & Wireframing</h4>
              <p className="text-xs text-white/60">Database schema design, security boundaries, and responsive UI wireframes.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <span className="text-2xl font-black text-[#E50914] block mb-2 font-mono">02</span>
              <h4 className="text-sm font-bold text-white mb-1">Agile Development</h4>
              <p className="text-xs text-white/60">Milestone sprints with continuous client previews and feedback integration.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <span className="text-2xl font-black text-[#E50914] block mb-2 font-mono">03</span>
              <h4 className="text-sm font-bold text-white mb-1">Security & Load Testing</h4>
              <p className="text-xs text-white/60">OWASP compliance, penetration testing, performance benchmarking, and SEO audit.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <span className="text-2xl font-black text-[#E50914] block mb-2 font-mono">04</span>
              <h4 className="text-sm font-bold text-white mb-1">Deployment & Handover</h4>
              <p className="text-xs text-white/60">Production server launch, source code handover, documentation, and SLA maintenance.</p>
            </div>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="bg-[#121214] border border-white/10 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#E50914]/8 rounded-full blur-[140px] pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Ready to Discuss Your Project?</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Get an itemized quotation and technical architecture plan prepared specifically for your company.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/request-quote')}
                className="px-8 py-3.5 rounded-full bg-[#E50914] text-white font-bold text-sm hover:brightness-110 transition-all inline-flex items-center space-x-2 shadow-[0_0_30px_rgba(229, 9, 20,0.18)] cursor-pointer"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4 text-[#0B0B0C]" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

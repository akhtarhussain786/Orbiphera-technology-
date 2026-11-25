import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Code2, 
  FileText,
  Lock,
  Headphones
} from 'lucide-react'
import SeoHead from '../components/common/SeoHead'
import ProjectCostEstimator from '../components/common/ProjectCostEstimator'
import ProjectInquiryCTA from '../sections/ProjectInquiryCTA'
import { useSettings } from '../context/SettingsContext'

export default function Pricing() {
  const { settings } = useSettings()
  const siteName = settings?.siteName || 'Orbiphera Technologies'

  const breadcrumbs = [
    { name: 'Home', url: 'https://orbiphera.in/' },
    { name: 'Pricing', url: 'https://orbiphera.in/pricing' }
  ]

  const packages = [
    {
      id: 'starter-web',
      name: 'Starter Business Web',
      category: 'Website Development',
      badge: 'Popular for SMEs',
      price: '₹14,999',
      unit: 'starting price',
      timeline: '7-10 Business Days',
      desc: 'High-conversion responsive corporate website engineered with speed, semantic SEO, and modern aesthetic.',
      features: [
        'Up to 5 Responsive Custom Pages',
        'Mobile-First & Ultra-Fast Loading',
        'SEO Meta Tags & Schema Setup',
        'Direct WhatsApp & Lead Form Integration',
        'Domain & Cloud Hosting Configuration',
        '3 Months Free Post-Launch Support'
      ],
      highlight: false,
      ctaText: 'Choose Starter Web'
    },
    {
      id: 'ecommerce-app',
      name: 'Dynamic E-Commerce & Portal',
      category: 'Web Application',
      badge: 'High Conversion',
      price: '₹34,999',
      unit: 'starting price',
      timeline: '2-3 Weeks',
      desc: 'Dynamic catalog or multi-vendor store equipped with secure payment gateways, inventory, and admin panel.',
      features: [
        'Dynamic Product & Category Management',
        'Razorpay / UPI / Stripe Payment Gateway',
        'Customer Cart, Wishlist & Order Tracking',
        'Automated GST Invoicing & PDF Receipts',
        'Role-Based Admin Dashboard',
        '6 Months Free Security & Uptime Support'
      ],
      highlight: true,
      ctaText: 'Choose E-Commerce'
    },
    {
      id: 'flutter-mobile',
      name: 'Flutter Cross-Platform App',
      category: 'Mobile Application',
      badge: 'iOS + Android',
      price: '₹49,999',
      unit: 'starting price',
      timeline: '3-4 Weeks',
      desc: 'Single codebase native-performance mobile app for Android and iOS with push notifications and cloud backend.',
      features: [
        'Android & iOS Native Performance (120fps)',
        'Push Notifications & Firebase Telemetry',
        'Secure Cloud REST / GraphQL APIs',
        'Biometric Auth & Offline Data Caching',
        'Google Play Store & Apple App Store Prep',
        '6 Months Free Maintenance & Bug Fixes'
      ],
      highlight: false,
      ctaText: 'Choose Mobile App'
    },
    {
      id: 'enterprise-erp',
      name: 'Enterprise ERP & Custom Suite',
      category: 'Custom Software',
      badge: 'Mission-Critical',
      price: '₹89,999',
      unit: 'starting price',
      timeline: '4-6 Weeks',
      desc: 'Tailored ERP/EMS platform designed to automate hospital, school, warehouse, or multi-branch operations.',
      features: [
        'Multi-Branch Architecture & Role Matrix (RBAC)',
        'Inventory, Warehouse, Billing & GST Ledgers',
        'Custom Staff, Payroll & Biometric Integration',
        'Automated WhatsApp & Email Alert Webhooks',
        'Encrypted Database & Daily Automated Backups',
        '1 Year Priority SLA & Dedicated Architect'
      ],
      highlight: false,
      ctaText: 'Choose Enterprise ERP'
    }
  ]

  const guarantees = [
    {
      icon: Code2,
      title: '100% Source Code Ownership',
      desc: 'You receive full legal intellectual property and unrestricted Git repository ownership upon completion. Zero licensing fees.'
    },
    {
      icon: ShieldCheck,
      title: '6 Months Free Warranty',
      desc: 'Every project comes standard with 3 to 12 months of free post-launch bug fixes, security patches, and cloud monitoring.'
    },
    {
      icon: Lock,
      title: 'Strict NDA & Confidentiality',
      desc: 'Your business ideas, database schemes, proprietary workflows, and customer data are protected under a legally binding Non-Disclosure Agreement.'
    },
    {
      icon: Headphones,
      title: 'Direct Architect Access',
      desc: 'No middleman account managers. You collaborate directly with experienced senior software architects on WhatsApp and Google Meet.'
    }
  ]

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-[#FFFFFF] font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <SeoHead
        title={`Software & Website Development Pricing | ${siteName}`}
        description={`Transparent, milestone-based pricing for websites, mobile applications, and enterprise ERP software by ${siteName}. Calculate your project cost instantly with our interactive scope estimator.`}
        keywords="website development pricing, mobile app development cost India, ERP software cost Bihar, custom software development quotation, Patna IT company pricing"
        canonical="https://orbiphera.in/pricing"
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
                Pricing &amp; Packages
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#E50914]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSPARENT &amp; MILESTONE-BASED</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Predictable Engineering Rates.{' '}
              <span className="text-[#E50914]">Zero Hidden Fees.</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed pt-2">
              We operate on transparent, milestone-driven contracts. You know exactly what you pay for each sprint with complete code ownership and comprehensive post-launch warranty.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Transparent Packages Grid */}
      <section className="py-16 sm:py-24 bg-[#0B0B0C] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  pkg.highlight 
                    ? 'bg-[#141418] border-2 border-[#E50914] shadow-[0_0_35px_rgba(229,9,20,0.25)]' 
                    : 'bg-[#121214] border border-white/10 hover:border-white/20 shadow-xl'
                }`}
              >
                {/* Highlight Badge */}
                {pkg.badge && (
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase ${
                      pkg.highlight 
                        ? 'bg-[#E50914] text-white' 
                        : 'bg-white/10 text-slate-300'
                    }`}>
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    {pkg.category}
                  </span>
                  <h3 className="text-xl font-black text-white tracking-tight mb-3">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {pkg.desc}
                  </p>

                  {/* Price */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
                    <div className="text-3xl font-black text-white font-mono tracking-tight">
                      {pkg.price}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                      <span>{pkg.unit}</span>
                      <span className="flex items-center space-x-1 text-[#E50914] font-semibold">
                        <Clock className="w-3 h-3" />
                        <span>{pkg.timeline}</span>
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Deliverables Checklist:
                    </div>
                    {pkg.features.map((feat) => (
                      <div key={feat} className="flex items-start space-x-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] mt-0.5 shrink-0" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div>
                  <a
                    href="#contact"
                    className={`w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      pkg.highlight
                        ? 'bg-[#E50914] hover:bg-[#CC0813] text-white shadow-[0_0_20px_rgba(229,9,20,0.4)]'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Guarantees Matrix */}
          <div className="mt-20 sm:mt-28 pt-16 border-t border-white/10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#E50914] block mb-2">
                ASSURANCE &amp; LEGAL STANDARDS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Every Contract Includes Our Guarantees
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guarantees.map((g) => {
                const Icon = g.icon
                return (
                  <div 
                    key={g.title}
                    className="p-6 rounded-2xl bg-[#121214] border border-white/10 hover:border-[#E50914]/30 transition-all space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center text-[#E50914]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {g.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive Scope & Cost Estimator */}
      <ProjectCostEstimator />

      {/* 3. Free Consultation & Direct Quote Form */}
      <ProjectInquiryCTA />
    </div>
  )
}

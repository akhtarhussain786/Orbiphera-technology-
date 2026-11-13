import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  MapPin,
  Search,
  Code2,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Building2,
  GraduationCap,
  Stethoscope,
  ShoppingBag,
  Dumbbell,
  Sparkles,
  PhoneCall,
  MessageSquare
} from 'lucide-react'
import { useSettings } from '../context/SettingsContext'

const LOCAL_INDUSTRIES = [
  { name: 'Retail & Showrooms', icon: ShoppingBag, desc: 'Billing POS, inventory, barcode, GST invoicing' },
  { name: 'Schools & Coaching', icon: GraduationCap, desc: 'Student admissions, fee dues, LMS & mobile apps' },
  { name: 'Hospitals & Clinics', icon: Stethoscope, desc: 'OPD appointments, patient records, pharmacy billing' },
  { name: 'Gyms & Fitness Centers', icon: Dumbbell, desc: 'Member subscriptions, biometric turnstile, workout plans' },
  { name: 'Real Estate & Builders', icon: Building2, desc: 'Property listings, lead CRM, automated follow-ups' }
]

const LOCAL_ADVANTAGES = [
  {
    icon: MapPin,
    title: 'Headquartered in Siwan (Local Office)',
    desc: 'No distant call centers or third-party middlemen. Visit our office in Siwan or meet our software engineers face-to-face for transparent sprint planning and weekly milestones.'
  },
  {
    icon: Search,
    title: 'Engineered for #1 Google Ranking',
    desc: 'Every website we deliver is built with Google PageSpeed 95+ performance, schema markup, and local SEO keywords so customers in Siwan and Bihar discover you first.'
  },
  {
    icon: Code2,
    title: '100% Source Code Ownership',
    desc: 'You receive full ownership of your intellectual property, custom codebases, and databases. Zero recurring template royalties or platform lock-in.'
  },
  {
    icon: Headphones,
    title: 'Same-Day Priority Support',
    desc: 'Instant direct developer access via WhatsApp, direct phone call, and on-site assistance whenever your business needs updates or new features.'
  }
]

export default function LocalTrustSection() {
  const { settings } = useSettings()
  const shouldReduceMotion = useReducedMotion()

  const contactPhone = settings?.contactPhone || '+91 98765 43210'
  const rawPhone = contactPhone.replace(/[^0-9]/g, '')
  const whatsappNumber = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Orbiphera Technologies! I am based in Siwan/Bihar and would like to discuss a website/software project.'
  )}`

  return (
    <section
      id="local-presence"
      className="scroll-mt-28 py-10 sm:py-16 lg:py-24 bg-[#0F0F11] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#E50914]/8 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121214] border border-[#E50914]/30 text-[#FF2A36] text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#FF2A36]" />
            <span>LOCAL ROOTS • GLOBAL ENGINEERING STANDARDS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
            Why Businesses in Siwan Choose{' '}
            <span className="text-[#FF2A36] relative inline-block">
              Orbiphera Technologies.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            From local retail brands and schools to healthcare institutions, we build high-converting websites and production software that dominate Google search in Siwan and Bihar.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {LOCAL_ADVANTAGES.map((adv, idx) => {
            const Icon = adv.icon
            return (
              <motion.div
                key={idx}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="p-6 rounded-2xl bg-[#121214] border border-white/10 hover:border-[#E50914]/50 hover:shadow-[0_15px_35px_rgba(229,9,20,0.25)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center text-[#FF2A36] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[#FF2A36] transition-colors">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Local Industries We Digitize Banner */}
        <div className="rounded-3xl bg-[#121214] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF2A36] block">
                Tailored Local Business Solutions
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                Software &amp; Websites Built for Siwan's Core Industries
              </h3>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#E50914] hover:bg-[#CC0813] text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(229,9,20,0.4)]"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-bold transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#FF2A36]" />
                <span>Call Helpline</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {LOCAL_INDUSTRIES.map((ind, idx) => {
              const IndIcon = ind.icon
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#0B0B0C] border border-white/5 hover:border-white/20 transition-colors space-y-2"
                >
                  <div className="flex items-center space-x-2 text-[#FF2A36]">
                    <IndIcon className="w-4 h-4" />
                    <h4 className="text-xs font-bold text-white truncate">{ind.name}</h4>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}


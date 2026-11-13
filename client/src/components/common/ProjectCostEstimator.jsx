import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Sliders,
  Monitor
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useSettings } from '../../context/SettingsContext'

const PLATFORMS = [
  { id: 'website', name: 'Business Website', basePrice: 25000, estDays: '2-3 Weeks' },
  { id: 'ecommerce', name: 'E-Commerce Platform', basePrice: 55000, estDays: '3-5 Weeks' },
  { id: 'saas', name: 'Custom SaaS / Web App', basePrice: 110000, estDays: '5-8 Weeks' },
  { id: 'mobile', name: 'Mobile App (Flutter)', basePrice: 140000, estDays: '6-10 Weeks' },
  { id: 'erp', name: 'Enterprise ERP / OS', basePrice: 195000, estDays: '8-14 Weeks' }
]

const FEATURES = [
  { id: 'auth', label: 'Multi-Role User Auth & Permissions', price: 15000 },
  { id: 'payments', label: 'Payment Gateways (Stripe/Razorpay/UPI)', price: 12000 },
  { id: 'realtime', label: 'Real-Time WebSockets & In-App Chat', price: 20000 },
  { id: 'alerts', label: 'Automated WhatsApp & SMS Alerts', price: 8000 },
  { id: 'multitenant', label: 'Multi-Branch & Tenant Isolation', price: 35000 },
  { id: 'analytics', label: 'Custom Telemetry & Report Export', price: 18000 },
  { id: 'devops', label: 'Cloud VPS, Docker & CI/CD Pipelines', price: 22000 },
  { id: 'seo', label: '95+ Google PageSpeed & SEO Engine', price: 10000 }
]

export default function ProjectCostEstimator() {
  const { settings } = useSettings()
  const [platform, setPlatform] = useState(PLATFORMS[2].id) // Default SaaS
  const [deliveryWeeks, setDeliveryWeeks] = useState(6) // Slider: 2 to 16 weeks
  const [screenCount, setScreenCount] = useState(15) // Slider: 5 to 50 screens
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'payments', 'analytics'])
  const [copied, setCopied] = useState(false)

  const selectedPlatformObj = PLATFORMS.find(p => p.id === platform) || PLATFORMS[0]

  const toggleFeature = (id) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  // Velocity badge & multiplier based on deliveryWeeks
  const velocityInfo = useMemo(() => {
    if (deliveryWeeks <= 3) {
      return { label: 'Fast-Track Sprint (Rush)', multiplier: 1.25, badge: 'High Velocity' }
    } else if (deliveryWeeks <= 8) {
      return { label: 'Standard Agile Delivery', multiplier: 1.0, badge: 'Recommended' }
    } else {
      return { label: 'Enterprise Multi-Phase', multiplier: 1.15, badge: 'Phased Rollout' }
    }
  }, [deliveryWeeks])

  // Screen multiplier: 5 screens is 0.8x, 15 is 1.0x, 30 is 1.25x, 50 is 1.55x
  const screenMultiplier = useMemo(() => {
    return 0.75 + (screenCount / 50) * 0.8
  }, [screenCount])

  // Dynamic cost calculation
  const { minPrice, maxPrice, totalBase } = useMemo(() => {
    const featuresTotal = selectedFeatures.reduce((acc, fId) => {
      const feat = FEATURES.find(f => f.id === fId)
      return acc + (feat ? feat.price : 0)
    }, 0)

    const rawTotal = (selectedPlatformObj.basePrice + featuresTotal) * velocityInfo.multiplier * screenMultiplier
    const min = Math.round((rawTotal * 0.95) / 1000) * 1000
    const max = Math.round((rawTotal * 1.22) / 1000) * 1000

    return { minPrice: min, maxPrice: max, totalBase: Math.round(rawTotal) }
  }, [selectedPlatformObj, velocityInfo, screenMultiplier, selectedFeatures])

  // WhatsApp Quote Link
  const contactPhone = settings?.contactPhone || '+91 98765 43210'
  const rawPhone = contactPhone.replace(/[^0-9]/g, '')
  const whatsappNumber = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone

  const featureNames = selectedFeatures
    .map(id => FEATURES.find(f => f.id === id)?.label)
    .filter(Boolean)
    .join(', ')

  const quoteMessage = `Hello Orbiphera Technologies! 🚀
I used your online Project Cost Estimator with the following scope:
• Platform: ${selectedPlatformObj.name}
• Estimated Scope: ~${screenCount} Screens / Workflows
• Target Timeline: ${deliveryWeeks} Weeks (${velocityInfo.label})
• Features (${selectedFeatures.length}): ${featureNames || 'Core System Only'}
• Estimated Investment: ₹${minPrice.toLocaleString('en-IN')} - ₹${maxPrice.toLocaleString('en-IN')}

I would like to discuss technical architecture and request a formal quote.`

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteMessage)}`

  const handleCopyEstimate = () => {
    navigator.clipboard.writeText(quoteMessage)
    setCopied(true)
    toast.success('Project estimate summary copied to clipboard!')
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section 
      id="cost-estimator" 
      className="scroll-mt-28 py-10 sm:py-16 lg:py-24 bg-[#0F0F11] border-t border-white/[0.06] relative overflow-hidden text-white"
    >
      {/* Background Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-[#E50914]/6 rounded-full blur-[160px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121214] border border-[#E50914]/30 text-[#FF2A36] text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-[#FF2A36]" />
            <span>INTERACTIVE SCOPE &amp; COST ESTIMATOR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
            Calculate your investment.{' '}
            <span className="text-[#FF2A36] relative inline-block">
              Zero guesswork.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Adjust platform, timeline sliders, and feature add-ons to see real-time price ranges and lock in a 1-click WhatsApp quote with our engineering team.
          </p>
        </div>

        {/* Main Grid: Left Controls (7 cols), Right Output Summary (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Platform Selector */}
            <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF2A36] flex items-center space-x-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>1. Select Platform &amp; Architecture</span>
                </span>
                <span className="text-xs text-white/50 font-mono">
                  Base: ₹{selectedPlatformObj.basePrice.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PLATFORMS.map((p) => {
                  const isSelected = platform === p.id
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlatform(p.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#E50914]/10 border-[#E50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.2)]'
                          : 'bg-[#0F0F11] border-white/10 text-white/70 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{p.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#FF2A36]" />}
                      </div>
                      <span className="text-[10px] font-mono text-white/50 block mt-1">
                        Est: {p.estDays}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2. Sliders: Timeline & Screens */}
            <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF2A36] flex items-center space-x-2">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>2. Timeline &amp; Scope Sliders</span>
                </span>
                <span className="text-xs font-mono font-semibold text-[#FF2A36] bg-[#E50914]/10 px-2.5 py-0.5 rounded-full border border-[#E50914]/30">
                  {velocityInfo.badge}
                </span>
              </div>

              {/* Slider A: Delivery Timeline in Weeks */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-semibold flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-white/60" />
                    <span>Target Delivery Timeline:</span>
                  </span>
                  <span className="font-mono font-bold text-[#FF2A36] text-sm">
                    {deliveryWeeks} {deliveryWeeks === 1 ? 'Week' : 'Weeks'}
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="16"
                  step="1"
                  value={deliveryWeeks}
                  onChange={(e) => setDeliveryWeeks(Number(e.target.value))}
                  className="slider-lime"
                  aria-label="Delivery timeline slider in weeks"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40 pt-1">
                  <span>2 Weeks (Sprint)</span>
                  <span>6-8 Weeks (Standard)</span>
                  <span>16 Weeks (Enterprise)</span>
                </div>
              </div>

              {/* Slider B: Scope & Screen Count */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-semibold flex items-center space-x-1.5">
                    <Monitor className="w-3.5 h-3.5 text-white/60" />
                    <span>Estimated App Scope / Screens:</span>
                  </span>
                  <span className="font-mono font-bold text-[#FF2A36] text-sm">
                    ~{screenCount} {screenCount >= 50 ? '50+ Screens' : 'Screens'}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={screenCount}
                  onChange={(e) => setScreenCount(Number(e.target.value))}
                  className="slider-lime"
                  aria-label="Scope and screen count slider"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40 pt-1">
                  <span>5 (MVP Core)</span>
                  <span>15 (Full SaaS Launch)</span>
                  <span>50+ (Multi-Tenant ERP)</span>
                </div>
              </div>
            </div>

            {/* 3. Feature Add-ons (Checkboxes) */}
            <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF2A36] flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3. Add-on Modules &amp; Capabilities ({selectedFeatures.length})</span>
                </span>
                <span className="text-xs text-white/50 font-mono">
                  Multi-Select
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FEATURES.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id)
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className={`text-left p-3 rounded-2xl border transition-all duration-200 flex items-start space-x-3 cursor-pointer ${
                        isChecked
                          ? 'bg-[#E50914]/10 border-[#E50914]/60 text-white'
                          : 'bg-[#0F0F11] border-white/10 text-white/70 hover:border-white/20'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-[#E50914] border-[#E50914] text-white' : 'border-white/30'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-semibold block leading-tight">{feat.label}</span>
                        <span className="text-[10px] font-mono text-[#FF2A36] block mt-0.5">+₹{feat.price.toLocaleString('en-IN')}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Right Summary Column (Sticky) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#121214] border border-white/10 shadow-2xl relative overflow-hidden space-y-6">
              
              {/* Card Crimson Accent Halo */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/60 block">
                  Estimated Investment Range
                </span>
                
                <div className="mt-3">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl sm:text-4xl font-black text-[#FF2A36] tracking-tight">
                      ₹{minPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xl font-bold text-white/50">
                      – ₹{maxPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white/60 block mt-1">
                    Timeline: ~{deliveryWeeks} Weeks • {velocityInfo.label}
                  </span>
                </div>
              </div>

              {/* Inclusions Breakdown */}
              <div className="p-4 rounded-2xl bg-[#0F0F11] border border-white/10 space-y-2.5 text-xs text-white/80">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white font-semibold">Selected Platform</span>
                  <span className="text-[#FF2A36] font-mono font-bold">{selectedPlatformObj.name}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white font-semibold">Scope &amp; Screens</span>
                  <span className="text-white/70 font-mono">~{screenCount} Screens</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white font-semibold">Target Timeline</span>
                  <span className="text-white/70 font-mono">{deliveryWeeks} Weeks</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">Selected Modules</span>
                  <span className="text-white/70 font-mono">{selectedFeatures.length} add-ons</span>
                </div>
              </div>

              {/* Verified Guarantees */}
              <div className="space-y-2 text-xs text-white/70">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>100% Client-Owned Source Code &amp; Repositories</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>No Monthly SaaS Platform Markups / Royalties</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>Milestone-Based Escrow Sprints &amp; Weekly Demos</span>
                </div>
              </div>

              {/* Primary Actions: WhatsApp + Copy */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#E50914] hover:bg-[#CC0813] text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_35px_rgba(229,9,20,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current text-white" />
                  <span>Lock In Quote on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEstimate}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#FF2A36]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Summary Copied to Clipboard!' : 'Copy Itemized Specification'}</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-white/50 flex items-center justify-center space-x-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E50914]" />
                <span>NDA signed upfront • Transparent fixed-price agreements</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

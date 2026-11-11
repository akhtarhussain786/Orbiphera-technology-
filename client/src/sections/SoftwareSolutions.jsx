import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowRight, 
  Stethoscope, 
  GraduationCap, 
  Building, 
  Package, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Activity, 
  Server,
  ExternalLink
} from 'lucide-react'
import Button from '../components/ui/Button'
import QuickViewModal from '../components/ui/QuickViewModal'

const softwareSolutions = [
  {
    id: 1,
    name: 'NexCare Hospital OS',
    slug: 'nexcare-hospital-management',
    icon: Stethoscope,
    type: 'software',
    price: 14999,
    originalPrice: 24999,
    badge: 'Enterprise ERP',
    description: 'Comprehensive hospital management system with OPD/IPD workflows, electronic health records, pharmacy billing, and lab telemetry.',
    features: [
      'Electronic Patient Health Records (EHR)',
      'Doctor & Tele-Consultation Scheduling',
      'Integrated Pharmacy POS & Inventory',
      'NABH & ISO Audit Compliance Ready'
    ],
    businessSize: 'Clinics, Multi-Specialty & Large Hospitals',
    pricing: '₹14,999 Lifetime License',
    rating: 4.9,
    reviewCount: 38,
    technologies: ['React 18', 'Node.js', 'MongoDB', 'Docker'],
    accentColor: '#1558C9'
  },
  {
    id: 2,
    name: 'ClassPilot Education ERP',
    slug: 'classpilot-institute-management',
    icon: GraduationCap,
    type: 'software',
    price: 11999,
    originalPrice: 18999,
    badge: 'Flagship Platform',
    description: 'All-in-one institute operating system for schools, colleges, and training academies with student portals and automated fee billing.',
    features: [
      'Automated Student Fee & Razorpay Gateway',
      'Exam Management, Report Cards & Grading',
      'Biometric & RFID Attendance Tracking',
      'Parent-Teacher Notification App'
    ],
    businessSize: 'K-12 Schools, Colleges & Coaching Chains',
    pricing: '₹11,999 Lifetime License',
    rating: 5.0,
    reviewCount: 42,
    technologies: ['React', 'Express', 'Tailwind', 'PostgreSQL'],
    accentColor: '#FFC800'
  },
  {
    id: 3,
    name: 'StockPilot Inventory OS',
    slug: 'stockpilot-inventory-management',
    icon: Package,
    type: 'software',
    price: 8999,
    originalPrice: 14999,
    badge: 'High Performance',
    description: 'Intelligent multi-store inventory management system with real-time barcode scanning, purchase orders, vendor ledger, and POS.',
    features: [
      'Multi-Warehouse Inventory Synchronization',
      'Automated Low Stock & Re-Order Alerts',
      'GST Invoice Generation & E-Way Bill',
      'Thermal Receipt Printing & Barcode Scanner'
    ],
    businessSize: 'Retail Outlets, Wholesalers & Distribution',
    pricing: '₹8,999 Lifetime License',
    rating: 4.8,
    reviewCount: 29,
    technologies: ['Node.js', 'React', 'MongoDB', 'Tailwind'],
    accentColor: '#10B981'
  },
  {
    id: 4,
    name: 'StayPilot Hotel & Resort PMS',
    slug: 'staypilot-resort-management',
    icon: Building,
    type: 'software',
    price: 12999,
    originalPrice: 19999,
    badge: 'Turnkey Suite',
    description: 'Cloud PMS for resorts and boutique hotels featuring interactive room grid, guest check-in/out, housekeeping, and restaurant POS.',
    features: [
      'Visual Room Grid & Instant Channel Sync',
      'Contactless Guest Check-in & Digital KYC',
      'Restaurant KOT / POS Billing Integration',
      'Housekeeping Real-Time Status Telemetry'
    ],
    businessSize: 'Hotels, Resorts, Villas & Homestays',
    pricing: '₹12,999 Lifetime License',
    rating: 4.9,
    reviewCount: 31,
    technologies: ['React', 'Node.js', 'Socket.io', 'Tailwind'],
    accentColor: '#F59E0B'
  }
]

const SoftwareSolutions = () => {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  const containerVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  const itemVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="py-20 lg:py-28 relative bg-[#F8F7F4] overflow-hidden border-t border-[#E5E7EB]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#1558C9]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFC800]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-semibold text-[#FFC800]">
              <Server className="w-3.5 h-3.5" />
              <span>Commercial Software Platforms</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight">
              Enterprise Software. <span className="text-[#FFC800]">Full Code Ownership.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl font-normal leading-relaxed">
              No monthly subscription traps. Deploy self-hosted business solutions on your own servers with zero vendor lock-in.
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/software')}
            icon={ArrowRight}
            iconPosition="right"
          >
            View All Software Solutions
          </Button>
        </div>

        {/* Software Cards Grid (2x2 on desktop) */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? {} : "hidden"}
          whileInView={shouldReduceMotion ? {} : "visible"}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {softwareSolutions.map((software) => {
            const IconComponent = software.icon

            return (
              <motion.div 
                key={software.id} 
                variants={itemVariants}
                className="h-full"
              >
                <div className="h-full p-7 sm:p-8 rounded-3xl bg-white backdrop-blur-xl border border-[#E5E7EB] hover:border-[#FFC800]/40 hover:bg-[#F3F4F6] transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,200,0,0.12)] flex flex-col justify-between group">
                  <div className="space-y-6">
                    {/* Top Row: Icon, Title & Badge */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#FFC800] group-hover:scale-110 group-hover:bg-[#FFC800]/15 group-hover:border-[#FFC800]/40 transition-all duration-300 shadow-[0_0_15px_rgba(255,200,0,0.15)] flex-shrink-0">
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 rounded-full bg-[#FFC800]/15 border border-[#FFC800]/40 text-[#FFC800] text-[10px] font-bold uppercase tracking-wider">
                              {software.badge}
                            </span>
                          </div>
                          <h3 
                            onClick={() => navigate(`/software/${software.slug}`)}
                            className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight mt-1 hover:text-[#FFC800] transition-colors cursor-pointer"
                          >
                            {software.name}
                          </h3>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-lg sm:text-xl font-extrabold text-[#FFC800] block">
                          ₹{software.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-[#475569] font-mono">One-time License</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#475569] leading-relaxed">
                      {software.description}
                    </p>

                    {/* Key Capabilities Checklist */}
                    <div className="p-4 rounded-2xl bg-[#F8F7F4]/60 border border-[#E5E7EB] space-y-2.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#475569] block">
                        Included Business Modules
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#111827]">
                        {software.features.map(feat => (
                          <div key={feat} className="flex items-center space-x-2">
                            <Check className="w-3.5 h-3.5 text-[#FFC800] flex-shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metadata Specs */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#475569] pt-1">
                      <div className="flex items-center space-x-2">
                        <Users className="w-3.5 h-3.5 text-[#FFC800]" />
                        <span>Best for: {software.businessSize}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Full Source Included</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 mt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <button
                      onClick={() => setQuickViewProduct(software)}
                      className="text-xs font-semibold text-[#475569] hover:text-[#FFC800] flex items-center space-x-1.5 transition-colors"
                    >
                      <span>Interactive Specs</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate('/request-demo')}
                        className="flex-1 sm:flex-none"
                      >
                        Request Demo
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/software/${software.slug}`)}
                        icon={ArrowRight}
                        iconPosition="right"
                        className="flex-1 sm:flex-none"
                      >
                        Explore Solution
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  )
}

export default SoftwareSolutions

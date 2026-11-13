import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Heart, Star, ShieldCheck, Server, 
  ArrowLeft, CheckCircle2, FileCode, Check
} from 'lucide-react'
import axios from 'axios'
import Button from '../components/ui/Button'
import SeoHead from '../components/common/SeoHead'
import PageBackground from '../components/common/PageBackground'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useSettings } from '../context/SettingsContext'
import toast from 'react-hot-toast'

export default function SoftwareDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { settings } = useSettings()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('modules')

  const API_URL = import.meta.env.VITE_API_URL || '/api'
  const siteName = settings?.siteName || 'Orbiphera Technologies'

  useEffect(() => {
    fetchSoftwareDetails()
  }, [slug])

  const fetchSoftwareDetails = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/products/${slug}`)
      if (res.data.success) {
        setProduct(res.data.product)
      } else {
        // Fallback
        setProduct({
          _id: 'sw-medflow',
          slug: slug,
          name: 'MedFlow Clinic & Hospital Management OS',
          category: 'Enterprise Software',
          price: 14999,
          rating: 4.95,
          reviewCount: 42,
          description: 'A robust, multi-tenant hospital operating system built for private clinics, multi-specialty nursing homes, and diagnostic laboratories. Complete with OPD consultation queues, digital prescription generation, pharmacy POS billing, and automated patient appointment reminders.',
          image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=700&fit=crop',
          modules: [
            'Patient Registration & OPD Queue Management',
            'Doctor Appointment Scheduling & Calendar Sync',
            'Electronic Medical Records (EMR) & Clinical History',
            'Diagnostic Lab Test Requisition & Report Archiving',
            'Integrated Pharmacy Inventory & Barcode Billing',
            'Role-Based Staff Access (Admin, Doctor, Receptionist, Pharmacist)'
          ]
        })
      }
    } catch (_) {
      setProduct({
        _id: 'sw-medflow',
        slug: slug,
        name: 'MedFlow Clinic & Hospital Management OS',
        category: 'Enterprise Software',
        price: 14999,
        rating: 4.95,
        reviewCount: 42,
        description: 'A robust, multi-tenant hospital operating system built for private clinics, multi-specialty nursing homes, and diagnostic laboratories. Complete with OPD consultation queues, digital prescription generation, pharmacy POS billing, and automated patient appointment reminders.',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=700&fit=crop',
        modules: [
          'Patient Registration & OPD Queue Management',
          'Doctor Appointment Scheduling & Calendar Sync',
          'Electronic Medical Records (EMR) & Clinical History',
          'Diagnostic Lab Test Requisition & Report Archiving',
          'Integrated Pharmacy Inventory & Barcode Billing',
          'Role-Based Staff Access (Admin, Doctor, Receptionist, Pharmacist)'
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = () => {
    addToCart(product, 'perpetual')
    navigate('/cart')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) return null

  const isFavorited = isInWishlist(product._id)

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-28 pb-24 relative overflow-hidden">
      <PageBackground />
      <SeoHead
        title={`${product.name} | ${siteName}`}
        description={product.description}
        keywords={`${product.name}, enterprise software, crm software, hospital erp`}
      />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-white/60 mb-8">
          <Link to="/marketplace" className="hover:text-[#E50914] flex items-center transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Marketplace
          </Link>
          <span>/</span>
          <Link to="/software" className="hover:text-[#E50914] transition-colors">Software</Link>
          <span>/</span>
          <span className="text-white font-semibold truncate">{product.name}</span>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Left Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-[#E50914] text-xs font-mono font-bold uppercase tracking-wider">
                  Self-Hosted Enterprise OS
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 flex items-center shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E50914] mr-1" />
                  Full Commercial License
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 text-xs text-white/60">
                <div className="flex items-center text-[#E50914] font-semibold">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span>{product.rating || '4.9'}</span>
                  <span className="text-white/60 ml-1">({product.reviewCount || 30} reviews)</span>
                </div>
                <span>•</span>
                <span className="text-[#E50914] font-semibold flex items-center">
                  <Server className="w-3.5 h-3.5 mr-1" /> Self-Hosted / Zero Lock-in
                </span>
              </div>
            </div>

            {/* Showcase Visual */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#121214] aspect-[16/10] relative group shadow-2xl">
              <img
                src={product.image || product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Tabs */}
            <div className="border-b border-white/10 flex space-x-6 text-sm font-semibold">
              {['modules', 'overview', 'server_specs'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 capitalize transition-colors relative cursor-pointer ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab.replace('_', ' ')}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeSoftwareTabUnderline"
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-[#E50914]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="space-y-6">
              {activeTab === 'modules' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121214] border border-white/10 shadow-xl space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Included Software Modules</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {(product.modules || []).map((mod, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-white/90">
                        <Check className="w-4 h-4 text-[#E50914] flex-shrink-0 mt-0.5" />
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'overview' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121214] border border-white/10 shadow-xl space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">System Architecture & Capabilities</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
                      <ShieldCheck className="w-5 h-5 text-[#E50914]" />
                      <h4 className="text-sm font-bold text-white">No Monthly Subscription</h4>
                      <p className="text-xs text-white/60">Pay once for the perpetual commercial license and host on your own VPS.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
                      <FileCode className="w-5 h-5 text-[#E50914]" />
                      <h4 className="text-sm font-bold text-white">Full Database Schema</h4>
                      <p className="text-xs text-white/60">Complete Mongoose / SQL schema models, seeders, and migration scripts included.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'server_specs' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121214] border border-white/10 shadow-xl space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Server & Hosting Requirements</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-white/60 block">Node.js Version</span>
                      <span className="text-white font-bold mt-1 block">v18.x or v20.x LTS</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-white/60 block">Database</span>
                      <span className="text-white font-bold mt-1 block">MongoDB 6.0+ / Atlas</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-white/60 block">Min RAM</span>
                      <span className="text-white font-bold mt-1 block">1 GB (2 GB recommended)</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-white/60 block">Deployment Mode</span>
                      <span className="text-white font-bold mt-1 block">Docker / PM2 / VPS</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-white/60 block">OS Compatibility</span>
                      <span className="text-white font-bold mt-1 block">Ubuntu, Debian, Windows</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-white/60 block">Reverse Proxy</span>
                      <span className="text-white font-bold mt-1 block">Nginx / Caddy</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Pricing Card (Sticky) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#121214] border border-white/10 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/60 block">
                  Perpetual Software License
                </span>
                <div className="mt-3 flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl sm:text-4xl font-black text-[#E50914]">
                      ₹{product.price?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-white/40 line-through ml-2">
                      ₹{(product.price * 1.6).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#E50914] font-semibold bg-[#E50914]/10 px-2 py-0.5 rounded-full border border-[#E50914]/20">
                    Zero Recurring Fee
                  </span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="p-4 rounded-2xl bg-[#0F0F11] border border-white/10 space-y-2 text-xs text-white/70">
                <div className="flex items-center space-x-2 text-white font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914]" />
                  <span>Unlimited end-users & patient/student records</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914]" />
                  <span>100% unminified frontend + backend code</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914]" />
                  <span>Deployment playbook with Docker configuration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914]" />
                  <span>12 months complimentary bug patches</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handlePurchase}
                  className="w-full text-center"
                >
                  Buy License & Download Code
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => navigate('/request-demo')}
                    className="flex-1"
                  >
                    Schedule Live Demo
                  </Button>
                  <button
                    onClick={() => addToWishlist(product)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isFavorited
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="pt-2 text-center text-[11px] text-white/60 flex items-center justify-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E50914]" />
                <span>Verified commercial license with direct developer support</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

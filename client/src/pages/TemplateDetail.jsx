import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, Heart, Star, ShieldCheck, Download, 
  ArrowLeft, CheckCircle2, FileCode, Zap, Check
} from 'lucide-react'
import axios from 'axios'
import Button from '../components/ui/Button'
import SeoHead from '../components/common/SeoHead'
import PageBackground from '../components/common/PageBackground'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useSettings } from '../context/SettingsContext'
import toast from 'react-hot-toast'

export default function TemplateDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { settings } = useSettings()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [licenseType, setLicenseType] = useState('regular') // 'regular' | 'extended'
  const [activeTab, setActiveTab] = useState('overview')

  const API_URL = import.meta.env.VITE_API_URL || '/api'
  const siteName = settings?.siteName || 'Yatharth IT Solutions'

  useEffect(() => {
    fetchProductDetails()
  }, [slug])

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/products/${slug}`)
      if (res.data.success) {
        setProduct(res.data.product)
      } else {
        // Fallback mock
        setProduct({
          _id: 'tpl-eduprime',
          slug: slug,
          name: 'EduPrime — Modern Education & University Portal',
          category: 'Website Template',
          price: 4999,
          rating: 4.9,
          reviewCount: 38,
          description: 'A comprehensive high-framerate website template and portal architecture tailored for universities, international schools, and academy bootcamps. Features dynamic course listings, faculty directories, admission application modals, and clean code documentation.',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=700&fit=crop',
          features: [
            '100% Responsive Grid with Fluid Mobile Navigation',
            'Tailwind CSS 3.4 with Calibrated Typography Tokens',
            'Framer Motion Micro-Interactions and Smooth Scroll',
            'Clean Semantic HTML5 & Modern React 18 Architecture',
            'Full Unminified Source Code + Documentation Included',
            'Commercial Royalty-Free Lifetime License'
          ]
        })
      }
    } catch (_) {
      setProduct({
        _id: 'tpl-eduprime',
        slug: slug,
        name: 'EduPrime — Modern Education & University Portal',
        category: 'Website Template',
        price: 4999,
        rating: 4.9,
        reviewCount: 38,
        description: 'A comprehensive high-framerate website template and portal architecture tailored for universities, international schools, and academy bootcamps. Features dynamic course listings, faculty directories, admission application modals, and clean code documentation.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=700&fit=crop',
        features: [
          '100% Responsive Grid with Fluid Mobile Navigation',
          'Tailwind CSS 3.4 with Calibrated Typography Tokens',
          'Framer Motion Micro-Interactions and Smooth Scroll',
          'Clean Semantic HTML5 & Modern React 18 Architecture',
          'Full Unminified Source Code + Documentation Included',
          'Commercial Royalty-Free Lifetime License'
        ]
      })
    } finally {
      setLoading(false)
    }
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
  const currentPrice = licenseType === 'regular' ? product.price : Math.round(product.price * 2.5)

  const handleAddToCart = () => {
    addToCart(product, licenseType)
  }

  const handleBuyNow = () => {
    addToCart(product, licenseType)
    navigate('/cart')
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-28 pb-24 relative overflow-hidden">
      <PageBackground />
      <SeoHead
        title={`${product.name} | ${siteName}`}
        description={product.description}
        keywords={`${product.name}, website template, react template, buy website source code`}
      />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Breadcrumb & Navigation Back */}
        <div className="flex items-center space-x-2 text-xs text-white/60 mb-8">
          <Link to="/marketplace" className="hover:text-[#E50914] flex items-center transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Marketplace
          </Link>
          <span>/</span>
          <Link to="/templates" className="hover:text-[#E50914] transition-colors">Templates</Link>
          <span>/</span>
          <span className="text-white font-semibold truncate">{product.name}</span>
        </div>

        {/* Product Layout Grid: Left (8 cols), Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Left Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header Details */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-[#E50914] text-xs font-mono font-bold uppercase tracking-wider">
                  {product.category || 'Website Template'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 flex items-center shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E50914] mr-1" />
                  Verified Architecture
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 text-xs text-white/60">
                <div className="flex items-center text-[#E50914] font-semibold">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span>{product.rating || '4.9'}</span>
                  <span className="text-white/60 ml-1">({product.reviewCount || 24} reviews)</span>
                </div>
                <span>•</span>
                <span className="text-[#E50914] font-semibold flex items-center">
                  <Download className="w-3.5 h-3.5 mr-1" /> Instant Digital Delivery
                </span>
              </div>
            </div>

            {/* Showcase Visual Image */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#121214] aspect-[16/10] relative group shadow-2xl">
              <img
                src={product.image || product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-white/10 flex space-x-6 text-sm font-semibold">
              {['overview', 'features', 'tech_specs'].map(tab => (
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
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-[#E50914]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#121214] border border-white/10 shadow-xl space-y-4">
                    <h3 className="text-xl font-bold text-white tracking-tight">Product Overview</h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Included Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
                      <FileCode className="w-5 h-5 text-[#E50914]" />
                      <h4 className="text-sm font-bold text-white">Full Source Code Handover</h4>
                      <p className="text-xs text-white/60">Clean React components, Tailwind tokens, and complete assets folder.</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
                      <Zap className="w-5 h-5 text-[#E50914]" />
                      <h4 className="text-sm font-bold text-white">High Speed & Core Web Vitals</h4>
                      <p className="text-xs text-white/60">Engineered for 95+ Google PageSpeed insights with minimal bundle size.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121214] border border-white/10 shadow-xl space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Included Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {(product.features || []).map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-white/90">
                        <Check className="w-4 h-4 text-[#E50914] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'tech_specs' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121214] border border-white/10 shadow-xl space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Technical Specifications</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-white/60 block">Framework</span>
                      <span className="text-white font-bold mt-1 block">React 18 / Vite</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-white/60 block">Styling</span>
                      <span className="text-white font-bold mt-1 block">Tailwind CSS 3.4</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-white/60 block">Animations</span>
                      <span className="text-white font-bold mt-1 block">Framer Motion</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-white/60 block">Icons</span>
                      <span className="text-white font-bold mt-1 block">Lucide React</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-white/60 block">Responsiveness</span>
                      <span className="text-white font-bold mt-1 block">100% Mobile Ready</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-white/60 block">License</span>
                      <span className="text-white font-bold mt-1 block">Commercial Tier</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Pricing Card (Sticky) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#121214] border border-white/10 shadow-2xl space-y-6">
              {/* License Switcher */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/60 block">
                  Select Commercial License
                </span>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#0F0F11] border border-white/10">
                  <button
                    onClick={() => setLicenseType('regular')}
                    className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      licenseType === 'regular'
                        ? 'bg-[#E50914] text-white shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Regular License
                  </button>
                  <button
                    onClick={() => setLicenseType('extended')}
                    className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      licenseType === 'extended'
                        ? 'bg-[#E50914] text-white shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Extended (SaaS)
                  </button>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl sm:text-4xl font-black text-[#E50914]">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-white/40 line-through ml-2">
                    ₹{(currentPrice * 1.5).toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-white/60">One-Time Payment</span>
              </div>

              {/* License Summary */}
              <div className="p-4 rounded-2xl bg-[#0F0F11] border border-white/10 space-y-2 text-xs text-white/70">
                <div className="flex items-center space-x-2 text-white font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914]" />
                  <span>
                    {licenseType === 'regular'
                      ? 'Single End-Product / Commercial Website'
                      : 'Multi-Client SaaS / Monetized Deployment'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914]" />
                  <span>Lifetime bug fixes & patch updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914]" />
                  <span>6 months dedicated architect support</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleBuyNow}
                  className="w-full text-center"
                >
                  Buy Now & Instant Download
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handleAddToCart}
                    icon={ShoppingCart}
                    iconPosition="left"
                    className="flex-1"
                  >
                    Add to Cart
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

              {/* Guarantee */}
              <div className="pt-2 text-center text-[11px] text-white/60 flex items-center justify-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E50914]" />
                <span>Encrypted 256-bit checkout with instant file delivery</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

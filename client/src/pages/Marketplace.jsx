import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Search, Heart, Sparkles,
  Maximize2, ShoppingCart
} from 'lucide-react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Button from '../components/ui/Button'
import SeoHead from '../components/common/SeoHead'
import PageBackground from '../components/common/PageBackground'
import QuickViewModal from '../components/ui/QuickViewModal'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useSettings } from '../context/SettingsContext'
import toast from 'react-hot-toast'

export default function Marketplace() {
  const navigate = useNavigate()
  const location = useLocation()
  const { settings } = useSettings()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('all') // 'all' | 'template' | 'software'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || '/api'
  const siteName = settings?.siteName || 'Orbiphera Technologies'

  // Parse URL search params (e.g. ?category=...&type=...)
  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const cat = query.get('category')
    const type = query.get('type')
    const q = query.get('q')

    if (cat) setSelectedCategory(cat)
    if (type) setSelectedType(type === 'website' ? 'template' : type)
    if (q) setSearch(q)
  }, [location.search])

  useEffect(() => {
    fetchProducts()
  }, [search, selectedType, selectedCategory, sortBy])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = {
        search: search || undefined,
        type: selectedType !== 'all' ? selectedType : undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        sort: sortBy
      }
      const res = await axios.get(`${API_URL}/products`, { params })
      if (res.data.success) {
        setProducts(res.data.products)
      }
    } catch (e) {
      toast.error('Failed to load marketplace products')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-28 pb-24 relative overflow-hidden">
      <PageBackground />
      <SeoHead
        title={`Marketplace Catalog | ${siteName}`}
        description="Browse premium ready-to-launch website templates and enterprise software solutions. Instant download, clean code, commercial license."
        keywords="buy website templates, digital marketplace, react templates, business software"
      />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold text-[#E50914] uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
            <span>Complete Architecture Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Explore All{' '}
            <span className="text-[#E50914]">
              Digital Products
            </span>
          </h1>
          <p className="text-sm sm:text-base text-white/60 font-normal leading-relaxed">
            Vetted website templates, enterprise ERPs, and business management software suites with full source code.
          </p>
        </div>

        {/* Filter and Search Toolbar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-[#121214] border border-white/10 shadow-2xl mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by keyword, tech, title..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F11] border border-white/10 rounded-2xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
              />
            </div>

            {/* Type Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {[
                { id: 'all', label: 'All Products' },
                { id: 'template', label: 'Website Templates' },
                { id: 'software', label: 'Enterprise Software' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedType === t.id
                      ? 'bg-[#E50914] text-white shadow-sm'
                      : 'bg-[#0F0F11] text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 w-full lg:w-auto justify-end">
              <span className="text-xs text-white/60">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
              >
                <option value="newest" className="bg-[#0B0B0C] text-white">Newest First</option>
                <option value="popular" className="bg-[#0B0B0C] text-white">Most Popular</option>
                <option value="price-low" className="bg-[#0B0B0C] text-white">Price: Low to High</option>
                <option value="price-high" className="bg-[#0B0B0C] text-white">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-24 text-white/60 text-xs">
            <div className="w-8 h-8 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading catalog from database...
          </div>
        ) : products.length === 0 ? (
          <div className="p-16 rounded-3xl bg-[#121214] border border-white/10 text-center space-y-2 shadow-xl">
            <p className="text-base font-bold text-white">No products match your criteria</p>
            <p className="text-xs text-white/60">Try clearing filters or searching for another keyword like "education", "hospital", or "react".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {products.map((prod) => {
              const isFavorited = isInWishlist(prod._id)

              return (
                <div 
                  key={prod._id}
                  className="rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#E50914]/40 hover:shadow-[0_0_30px_rgba(229, 9, 20,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl"
                >
                  {/* Thumbnail / Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0F0F11] border-b border-white/10">
                    <img
                      src={prod.thumbnail || prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
                      <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-[#E50914] text-white uppercase tracking-wider shadow-sm font-mono">
                        {prod.type}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
                      <button
                        onClick={() => setQuickViewProduct(prod)}
                        className="w-8 h-8 rounded-full bg-[#0B0B0C]/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-[#E50914] hover:text-white hover:border-[#E50914] transition-all shadow-sm cursor-pointer"
                        title="Quick View"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => addToWishlist(prod)}
                        className={`w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-all shadow-sm cursor-pointer ${
                          isFavorited
                            ? 'bg-rose-500 border-rose-500 text-white'
                            : 'bg-[#0B0B0C]/80 border-white/10 text-white hover:text-rose-400'
                        }`}
                        title="Add to Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 
                            onClick={() => navigate(`/${prod.type === 'software' ? 'software' : 'templates'}/${prod.slug}`)}
                            className="text-lg font-bold text-white tracking-tight hover:text-[#E50914] transition-colors cursor-pointer"
                          >
                            {prod.name}
                          </h3>
                          <span className="text-[11px] text-white/60 font-mono">{prod.category?.name || 'General Platform'}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-black text-[#E50914]">
                            ₹{prod.price?.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                        {prod.shortDescription || prod.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {prod.technologies?.slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-white/70 font-mono border border-white/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2.5 pt-4 border-t border-white/10">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/${prod.type === 'software' ? 'software' : 'templates'}/${prod.slug}`)}
                        className="flex-1"
                      >
                        Details
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => addToCart(prod)}
                        className="flex-1"
                        icon={ShoppingCart}
                        iconPosition="left"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </motion.div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, Search, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import SeoHead from '../components/common/SeoHead'
import PageBackground from '../components/common/PageBackground'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import toast from 'react-hot-toast'

export default function Templates() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    fetchTemplates()
  }, [search])

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/products`, {
        params: { type: 'template', search: search || undefined }
      })
      if (res.data.success) {
        setTemplates(res.data.products)
      }
    } catch (e) {
      toast.error('Failed to load templates')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-32 sm:pt-36 pb-20 relative overflow-hidden">
      <PageBackground />
      <SeoHead
        title="Ready-to-Launch Website Templates"
        description="Download production-ready website templates designed for modern businesses. Built with React, Tailwind CSS, and Framer Motion."
        keywords="website templates, react templates, tailwind css templates, buy website code"
      />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121214] border border-[#E50914]/30 text-[#E50914] text-xs font-mono font-bold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
            <span>Modern Responsive Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Standout Website{' '}
            <span className="text-[#E50914]">
              Templates
            </span>
          </h1>
          <p className="text-white/60 text-sm mt-3">
            Engineered for high conversion, clean typography, mobile responsiveness, and instantaneous launch.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search website templates..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F11] border border-white/10 rounded-2xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
            />
          </div>
        </div>

        {/* Template Grid */}
        {loading ? (
          <div className="text-center py-20 text-white/60 text-xs">
            <div className="w-8 h-8 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading templates...
          </div>
        ) : templates.length === 0 ? (
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-16 text-center text-white/60 shadow-xl">
            No templates found matching your query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((tpl) => (
              <div 
                key={tpl._id} 
                className="group h-full flex flex-col justify-between overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#E50914]/40 hover:shadow-[0_0_30px_rgba(229, 9, 20,0.15)] transition-all duration-300"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-[#0F0F11]">
                    <img
                      src={tpl.thumbnail}
                      alt={tpl.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <button
                      onClick={() => addToWishlist(tpl)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-[#0B0B0C]/80 backdrop-blur-md shadow-sm border border-white/10 text-white hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(tpl._id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#E50914] transition-colors">
                          {tpl.name}
                        </h3>
                        <p className="text-xs text-white/60 font-medium">{tpl.category?.name || 'Template'}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-[#E50914]">₹{tpl.price?.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <p className="text-xs text-white/60 line-clamp-2 mb-4 leading-relaxed">
                      {tpl.shortDescription || tpl.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {tpl.technologies?.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-white/70 font-mono border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex space-x-2 pt-4 border-t border-white/10">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/templates/${tpl.slug}`)}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => addToCart(tpl)}
                      className="flex-1"
                      icon={ShoppingCart}
                      iconPosition="left"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

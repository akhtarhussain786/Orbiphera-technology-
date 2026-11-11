import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Star, ShoppingCart, Heart, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import Button from './Button'

export default function QuickViewModal({ product, isOpen, onClose }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  const isFavorited = isInWishlist(product._id || product.id)

  const handleAddToCart = () => {
    addToCart(product)
    onClose()
  }

  const handleNavigateDetail = () => {
    onClose()
    if (product.type === 'software' || product.slug?.includes('management') || product.slug?.includes('pilot') || product.slug?.includes('care')) {
      navigate(`/software/${product.slug}`)
    } else {
      navigate(`/templates/${product.slug}`)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#111827]/60 backdrop-blur-sm transition-all"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-white border border-[#E5E7EB] rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-[#111827]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB] bg-[#F8F7F4]">
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                {product.category || 'Digital Product'}
              </span>
              <span className="text-xs text-[#475569] flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                Commercial License
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Preview Graphic / Image */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#F3F4F6] aspect-[16/10] flex items-center justify-center group">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-amber-50 via-gray-100 to-amber-100/40 ${product.image ? 'hidden' : 'flex'}`}>
                  <Sparkles className="w-10 h-10 text-[#FFC800] mb-3 animate-pulse" />
                  <span className="text-lg font-bold text-[#111827] tracking-tight">{product.name}</span>
                  <span className="text-xs text-[#475569] mt-1">Interactive Architecture Preview</span>
                </div>
              </div>

              {/* Details Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] tracking-tight">{product.name}</h3>
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="flex items-center text-amber-500 text-xs font-semibold">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      <span>{product.rating || '4.9'}</span>
                      <span className="text-[#475569] ml-1">({product.reviewCount || 24} reviews)</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-emerald-600 font-semibold">Instant Download</span>
                  </div>
                </div>

                <p className="text-sm text-[#475569] leading-relaxed">
                  {product.description || 'Enterprise-grade digital solution with scalable code architecture, responsive UI components, and complete documentation.'}
                </p>

                {/* Tech Stack */}
                {product.technologies && product.technologies.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-2">Technologies</span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.technologies.map(tech => (
                        <span key={tech} className="px-2.5 py-0.5 rounded-md bg-[#F3F4F6] border border-[#E5E7EB] text-xs text-[#111827] font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing Box */}
                <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E5E7EB] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#475569] block">Lifetime Regular License</span>
                    <div className="flex items-baseline space-x-2 mt-0.5">
                      <span className="text-2xl font-extrabold text-[#111827]">
                        ₹{product.price ? product.price.toLocaleString('en-IN') : '4,999'}
                      </span>
                      <span className="text-xs text-[#475569] line-through">
                        ₹{(product.price ? product.price * 1.5 : 7499).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToWishlist(product)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isFavorited
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-[#E5E7EB] text-[#475569] hover:text-[#111827]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Included Features List */}
            <div className="pt-4 border-t border-[#E5E7EB]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#111827] block mb-3">
                Key Features Included
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#111827]">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% Full Source Code & Documentation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Free Lifetime Bug Fixes & Updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Production Ready Tailwind & React</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Commercial Single & Multi-Domain License</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="p-6 border-t border-[#E5E7EB] bg-[#F8F7F4] flex flex-col sm:flex-row gap-3 justify-end items-center">
            <Button
              variant="secondary"
              size="md"
              onClick={handleNavigateDetail}
              icon={ExternalLink}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              View Full Details
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleAddToCart}
              icon={ShoppingCart}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Add to Cart • ₹{product.price ? product.price.toLocaleString('en-IN') : '4,999'}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2, ArrowRight, Sparkles } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useSettings } from '../context/SettingsContext'
import Button from '../components/ui/Button'
import SeoHead from '../components/common/SeoHead'

export default function Wishlist() {
  const navigate = useNavigate()
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { settings } = useSettings()

  const siteName = settings?.siteName || 'Yatharth IT Solutions'

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] text-[#111827] pt-28 pb-24 relative overflow-hidden">
        <SeoHead title={`My Wishlist | ${siteName}`} />
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="p-10 sm:p-14 rounded-3xl bg-white border border-[#E5E7EB] shadow-xl space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-[#111827]">
              <Heart className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">Your Wishlist is Empty</h2>
              <p className="text-xs sm:text-sm text-[#475569] max-w-md mx-auto">
                Save your favorite website templates and enterprise software solutions to review them anytime.
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/marketplace')}
              icon={ArrowRight}
              iconPosition="right"
              className="mx-auto"
            >
              Explore Products
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#111827] pt-24 pb-24 relative overflow-hidden">
      <SeoHead title={`My Wishlist (${wishlistItems.length}) | ${siteName}`} />

      {/* Subtle Warm Ambient Accent */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#FFC800]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#E6B400]" />
              <span>Saved Collections</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
              My Saved{' '}
              <span className="relative inline-block">
                Products ({wishlistItems.length})
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#FFC800] -z-10 rounded-sm" />
              </span>
            </h1>
          </div>

          <Link to="/marketplace" className="text-xs text-[#111827] hover:underline flex items-center font-bold">
            <span>Continue Browsing</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {wishlistItems.map((product) => (
            <div
              key={product._id || product.id}
              className="rounded-3xl bg-white border border-[#E5E7EB] hover:border-gray-300 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden shadow-sm group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 border-b border-[#E5E7EB]">
                <img
                  src={product.image || product.thumbnail || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=350&fit=crop'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => removeFromWishlist(product._id || product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 border border-gray-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors shadow-sm"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#475569] uppercase font-mono tracking-wider">{product.category || 'Digital Asset'}</span>
                  <h3 className="text-base font-bold text-[#111827] tracking-tight truncate">{product.name}</h3>
                  <div className="text-lg font-black text-[#111827] pt-1">
                    ₹{(product.price || 4999).toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex space-x-2 pt-3 border-t border-[#E5E7EB]">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      addToCart(product)
                      removeFromWishlist(product._id || product.id)
                    }}
                    icon={ShoppingCart}
                    iconPosition="left"
                    className="flex-1"
                  >
                    Move to Cart
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/${product.type === 'software' ? 'software' : 'templates'}/${product.slug}`)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Eye, 
  Heart, 
  ShoppingCart, 
  Star, 
  ArrowRight, 
  Sparkles, 
  Check, 
  ShieldCheck,
  Maximize2
} from 'lucide-react'
import Button from '../components/ui/Button'
import QuickViewModal from '../components/ui/QuickViewModal'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

const initialTemplates = [
  {
    _id: '1',
    name: 'EduPrime',
    slug: 'eduprime-education-institute',
    category: 'Education & E-learning',
    price: 4999,
    originalPrice: 7499,
    description: 'Modern education institute website with course management, student portal, and event calendar.',
    rating: 4.9,
    reviewCount: 24,
    technologies: ['React 18', 'Tailwind CSS', 'Vite'],
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=480&fit=crop'
  },
  {
    _id: '2',
    name: 'Medora',
    slug: 'medora-hospital-clinic',
    category: 'Hospital & Healthcare',
    price: 6999,
    originalPrice: 9999,
    description: 'Professional hospital and clinic website with appointment booking, doctor profiles, and telemedicine services.',
    rating: 4.8,
    reviewCount: 18,
    technologies: ['React 18', 'Bootstrap 5', 'Node.js'],
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=480&fit=crop'
  },
  {
    _id: '3',
    name: 'StayLuxe',
    slug: 'stayluxe-resort-hotel',
    category: 'Hotels & Resorts',
    price: 5999,
    originalPrice: 8999,
    description: 'Luxury hotel and resort website with live room booking engine, photo gallery, and VIP guest concierge.',
    rating: 5.0,
    reviewCount: 32,
    technologies: ['React', 'Framer Motion', 'Tailwind'],
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=480&fit=crop'
  },
  {
    _id: '4',
    name: 'ShopSphere',
    slug: 'shopsphere-ecommerce',
    category: 'E-commerce & Retail',
    price: 7999,
    originalPrice: 11999,
    description: 'Complete e-commerce storefront with product catalog, cart, Razorpay/Stripe checkout, and order tracker.',
    rating: 4.9,
    reviewCount: 45,
    technologies: ['React', 'Node.js', 'Express', 'Tailwind'],
    badge: 'High Conversion',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=480&fit=crop'
  },
  {
    _id: '5',
    name: 'EstateFlow',
    slug: 'estateflow-real-estate',
    category: 'Real Estate',
    price: 6499,
    originalPrice: 9499,
    description: 'Modern real estate portal with property listings, multi-filter search, virtual tours, and agent profiles.',
    rating: 4.7,
    reviewCount: 21,
    technologies: ['React', 'Tailwind CSS', 'Leaflet Maps'],
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=480&fit=crop'
  },
  {
    _id: '6',
    name: 'DineCraft',
    slug: 'dinecraft-restaurant',
    category: 'Restaurant & Food',
    price: 4499,
    originalPrice: 6999,
    description: 'Sleek restaurant website with interactive visual menu display, online reservations, and cloud kitchen support.',
    rating: 4.8,
    reviewCount: 28,
    technologies: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    badge: 'Fast Setup',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=480&fit=crop'
  }
]

const categoriesFilter = ['All', 'Education', 'Healthcare', 'Hotels', 'E-commerce', 'Real Estate']

const FeaturedTemplates = () => {
  const navigate = useNavigate()
  const { addToWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const shouldReduceMotion = useReducedMotion()

  const [activeFilter, setActiveFilter] = useState('All')
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  const filteredTemplates = activeFilter === 'All'
    ? initialTemplates
    : initialTemplates.filter(t => t.category.toLowerCase().includes(activeFilter.toLowerCase()))

  const containerVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="py-20 lg:py-28 relative bg-[#F8F7F4] overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#1558C9]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title & Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-semibold text-[#FFC800]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production Codebases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight">
              Standout Templates. <span className="text-[#FFC800]">Ready to Launch.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl font-normal leading-relaxed">
              Every template is thoroughly audited, fully responsive, and packaged with clean modular React code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categoriesFilter.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-[#FFC800] text-[#111827] shadow-[0_0_15px_rgba(255,200,0,0.3)]'
                    : 'bg-[#F3F4F6] text-[#475569] border border-[#E5E7EB] hover:text-[#111827] hover:border-[#E5E7EB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? {} : "hidden"}
          whileInView={shouldReduceMotion ? {} : "visible"}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {filteredTemplates.map((template) => {
            const isFavorited = isInWishlist(template._id)

            return (
              <motion.div 
                key={template._id} 
                variants={itemVariants}
                className="h-full"
              >
                <div className="h-full rounded-2xl bg-white backdrop-blur-xl border border-[#E5E7EB] hover:border-[#FFC800]/40 hover:bg-[#F3F4F6] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(255,200,0,0.12)] flex flex-col justify-between overflow-hidden group">
                  {/* Top Image Preview */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F8F7F4] border-b border-[#E5E7EB]">
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-[#FFC800] text-[#111827] text-[10px] font-black uppercase tracking-wider shadow-[0_0_12px_rgba(255,200,0,0.35)]">
                        {template.badge || 'Verified'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-[#E5E7EB] text-[#111827] text-[10px] font-medium">
                        {template.category}
                      </span>
                    </div>

                    {/* Top Right Actions: Wishlist & Quick View */}
                    <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
                      <button
                        onClick={() => setQuickViewProduct(template)}
                        className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-[#E5E7EB] text-[#111827] flex items-center justify-center hover:bg-[#FFC800] hover:text-[#111827] hover:border-[#FFC800] transition-all"
                        title="Quick View"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => addToWishlist(template)}
                        className={`w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${
                          isFavorited
                            ? 'bg-rose-500 border-rose-500 text-[#111827]'
                            : 'bg-black/60 border-[#E5E7EB] text-[#111827] hover:border-[#FFC800]'
                        }`}
                        title="Add to Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5">
                      <button
                        onClick={() => navigate(`/templates/${template.slug}`)}
                        className="px-4 py-2 rounded-xl bg-white text-[#111827] text-xs font-bold hover:bg-[#FFC800] transition-colors flex items-center space-x-1.5 shadow-lg"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Live Preview</span>
                      </button>
                      <button
                        onClick={() => setQuickViewProduct(template)}
                        className="px-4 py-2 rounded-xl bg-black/70 border border-[#E5E7EB] text-[#111827] text-xs font-semibold hover:bg-white/20 transition-colors"
                      >
                        Quick Specs
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 
                          onClick={() => navigate(`/templates/${template.slug}`)}
                          className="text-lg font-bold text-[#111827] tracking-tight hover:text-[#FFC800] transition-colors cursor-pointer"
                        >
                          {template.name}
                        </h3>
                        <div className="flex items-center text-amber-400 text-xs font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current mr-1" />
                          <span>{template.rating}</span>
                          <span className="text-[#475569] font-normal ml-1">({template.reviewCount})</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                        {template.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {template.technologies.map(tech => (
                          <span key={tech} className="px-2 py-0.5 rounded-md bg-[#F3F4F6] border border-[#E5E7EB] text-[10px] text-[#475569] font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & Add to Cart Footer */}
                    <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#475569] block uppercase tracking-wider font-mono">Regular License</span>
                        <div className="flex items-baseline space-x-1.5">
                          <span className="text-xl font-extrabold text-[#FFC800]">
                            ₹{template.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-[#475569] line-through">
                            ₹{template.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => addToCart(template)}
                        icon={ShoppingCart}
                        iconPosition="left"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Call to Action Link */}
        <div className="mt-14 text-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/templates')}
            icon={ArrowRight}
            iconPosition="right"
          >
            Explore All 50+ Ready Templates
          </Button>
        </div>
      </div>

      {/* Quick View Interactive Popover */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  )
}

export default FeaturedTemplates

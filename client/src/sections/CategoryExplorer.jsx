import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  GraduationCap, 
  Stethoscope, 
  Building, 
  ShoppingBag, 
  Briefcase, 
  Home, 
  UtensilsCrossed, 
  Palette, 
  Users, 
  Package, 
  UserCheck, 
  Calendar,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'Education & E-learning',
    slug: 'education-elearning',
    icon: GraduationCap,
    description: 'LMS portals, school ERP, and course platforms.',
    count: '3+ Products',
    accentColor: '#1558C9'
  },
  {
    id: 2,
    name: 'Hospital & Healthcare',
    slug: 'hospital-healthcare',
    icon: Stethoscope,
    description: 'Clinic OS, patient records, and appointment portals.',
    count: '2+ Products',
    accentColor: '#EF4444'
  },
  {
    id: 3,
    name: 'Hotels & Luxury Resorts',
    slug: 'hotels-resorts',
    icon: Building,
    description: 'Booking engines, room reservation, and guest services.',
    count: '2+ Products',
    accentColor: '#F59E0B'
  },
  {
    id: 4,
    name: 'E-commerce & Retail',
    slug: 'ecommerce-retail',
    icon: ShoppingBag,
    description: 'High-conversion online stores and inventory portals.',
    count: '4+ Products',
    accentColor: '#10B981'
  },
  {
    id: 5,
    name: 'Corporate & Tech Agencies',
    slug: 'corporate-business',
    icon: Briefcase,
    description: 'SaaS landing pages, agency portfolios, and tech hubs.',
    count: '3+ Products',
    accentColor: '#8B5CF6'
  },
  {
    id: 6,
    name: 'Real Estate & Properties',
    slug: 'real-estate',
    icon: Home,
    description: 'Listing portals, broker CRM, and property showcases.',
    count: '2+ Products',
    accentColor: '#3B82F6'
  },
  {
    id: 7,
    name: 'Restaurants & Cloud Kitchens',
    slug: 'restaurant-food',
    icon: UtensilsCrossed,
    description: 'Digital food menus, table reservations, and POS.',
    count: '2+ Products',
    accentColor: '#EC4899'
  },
  {
    id: 8,
    name: 'Enterprise CRM & ERP Solutions',
    slug: 'crm-sales',
    icon: Users,
    description: 'Customer pipeline, revenue telemetry, and sales OS.',
    count: '5+ Products',
    accentColor: '#FFC800'
  }
]

const CategoryExplorer = () => {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="py-20 lg:py-28 relative bg-[#F8F7F4] text-[#111827] overflow-hidden">
      {/* Background Soft Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FFC800]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E6B400]" />
            <span>Structured Digital Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight">
            Curated Categories Built for{' '}
            <span className="relative inline-block">
              High Impact
              <span className="absolute -bottom-1 left-0 w-full h-3.5 bg-[#FFC800] -z-10 rounded-sm" />
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-[#475569] font-normal leading-relaxed">
            Every solution is architected with modern technology stacks, clean responsive UI design, and production-tested business logic.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? {} : "hidden"}
          whileInView={shouldReduceMotion ? {} : "visible"}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <motion.div 
                key={category.id} 
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <div 
                  onClick={() => navigate(`/marketplace?category=${category.slug}`)}
                  className="h-full p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-gray-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Icon & Count Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#111827] group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono text-[#475569] bg-[#F8F7F4] px-2.5 py-1 rounded-full border border-[#E5E7EB] transition-colors">
                        {category.count}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-base font-bold text-[#111827] tracking-tight group-hover:text-black transition-colors mb-1.5">
                        {category.name}
                      </h3>
                      <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Indicator */}
                  <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-[#475569] group-hover:text-[#111827] transition-colors">
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4 text-[#475569] group-hover:text-[#111827] group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default CategoryExplorer

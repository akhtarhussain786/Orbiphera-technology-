import React from 'react'
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
  Sparkles,
  ArrowRight
} from 'lucide-react'
import SeoHead from '../components/common/SeoHead'
import { useSettings } from '../context/SettingsContext'

const allCategories = [
  { id: 1, name: 'Education & E-learning', slug: 'education-elearning', icon: GraduationCap, description: 'LMS platforms, school portals, course managers, student ERP.', count: '3+ Products' },
  { id: 2, name: 'Hospital & Healthcare', slug: 'hospital-healthcare', icon: Stethoscope, description: 'Clinical ERP, doctor appointment schedulers, pharmacy POS.', count: '2+ Products' },
  { id: 3, name: 'Hotels & Resorts', slug: 'hotels-resorts', icon: Building, description: 'Room reservation engines, luxury resort portals, guest concierge.', count: '2+ Products' },
  { id: 4, name: 'E-commerce & Retail', slug: 'ecommerce-retail', icon: ShoppingBag, description: 'Online storefronts, inventory portals, checkout carts.', count: '4+ Products' },
  { id: 5, name: 'Corporate & Business', slug: 'corporate-business', icon: Briefcase, description: 'Agency landing pages, tech hubs, SaaS portfolio showcases.', count: '3+ Products' },
  { id: 6, name: 'Real Estate & Properties', slug: 'real-estate', icon: Home, description: 'Property listing search, broker portfolios, virtual tours.', count: '2+ Products' },
  { id: 7, name: 'Restaurant & Food', slug: 'restaurant-food', icon: UtensilsCrossed, description: 'Digital menus, cloud kitchen ordering, table booking.', count: '2+ Products' },
  { id: 8, name: 'Portfolio & Creative', slug: 'portfolio-creative', icon: Palette, description: 'Designer portfolios, creative agency reels, photography.', count: '2+ Products' },
  { id: 9, name: 'CRM & Sales Automation', slug: 'crm-sales', icon: Users, description: 'Lead pipelines, quotation engines, telemetry dashboards.', count: '5+ Products' },
  { id: 10, name: 'Inventory & Store OS', slug: 'inventory-store-management', icon: Package, description: 'Multi-warehouse stock sync, barcode POS, supplier ledger.', count: '3+ Products' },
  { id: 11, name: 'HR & Payroll Systems', slug: 'hr-payroll', icon: UserCheck, description: 'Staff attendance, payroll calculators, leave management.', count: '2+ Products' },
  { id: 12, name: 'Booking & Appointments', slug: 'booking-appointment-systems', icon: Calendar, description: 'Salon booking, consultation schedules, event tickets.', count: '2+ Products' }
]

export default function Categories() {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const siteName = settings?.siteName || 'Yatharth IT Solutions'

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#111827] pt-24 pb-24 relative overflow-hidden">
      <SeoHead
        title={`All Product Categories | ${siteName}`}
        description="Explore ready-to-launch website templates and enterprise software solutions categorized by industry."
        keywords="website categories, digital products, software solutions by industry"
      />

      {/* Subtle Warm Ambient Accent */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#FFC800]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E6B400]" />
            <span>Curated Catalogs</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight">
            Browse Products by{' '}
            <span className="relative inline-block">
              Industry
              <span className="absolute -bottom-1 left-0 w-full h-3.5 bg-[#FFC800] -z-10 rounded-sm" />
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#475569]">
            Find the right digital architecture purpose-built for your business domain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allCategories.map((cat) => {
            const IconComp = cat.icon
            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/marketplace?category=${cat.slug}`)}
                className="p-6 rounded-3xl bg-white border border-[#E5E7EB] hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer shadow-sm flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#111827] group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-[#475569]">{cat.count}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#111827] tracking-tight group-hover:text-black transition-colors mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-[#475569] group-hover:text-[#111827] transition-colors">
                  <span>Browse Category</span>
                  <ArrowRight className="w-4 h-4 text-[#475569] group-hover:text-[#111827] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

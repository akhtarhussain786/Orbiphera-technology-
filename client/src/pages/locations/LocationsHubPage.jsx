import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ArrowRight, ChevronRight, Compass, ShieldCheck } from 'lucide-react'
import SeoHead from '../../components/common/SeoHead'
import { LOCATIONS_DATA } from '../../data/locationsData'

export default function LocationsHubPage() {
  const locationsList = Object.values(LOCATIONS_DATA)

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/locations' }
  ]

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <SeoHead
        title="Service Locations | Website & Software Development Company Bihar, Patna, Siwan"
        description="Orbiphera Technologies delivers localized website development, Flutter mobile apps, and enterprise software across Bihar, Patna, Siwan, Gopalganj, and Chapra."
        keywords="Website Development Bihar, IT Company Patna, Software Development Siwan, Web design Chapra, IT services Bihar"
        canonical="https://orbiphera.in/locations"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 font-medium">
            <li>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li className="flex items-center space-x-2 text-[#FF2A36]">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <span className="font-semibold text-gray-200">Locations</span>
            </li>
          </ol>
        </nav>

        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#FF2A36] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Regional IT & Software Hubs</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Local Engineering Excellence Across Bihar
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Direct access to senior developers, on-site scoping workshops, and high-speed cloud infrastructure customized for local business requirements.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {locationsList.map((loc) => (
            <div
              key={loc.slug}
              className="p-7 rounded-3xl bg-[#10151E] border border-white/10 hover:border-[#1558C9]/50 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#1558C9]/15 text-[#1558C9] border border-[#1558C9]/30 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-gray-400 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    {loc.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-[#FFC800] transition-colors">
                  {loc.regionTitle}
                </h2>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {loc.subtitle}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {loc.serviceAreas.slice(0, 4).map((area, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <Link
                  to={`/locations/${loc.slug}`}
                  className="text-xs sm:text-sm font-bold text-[#FFC800] group-hover:text-white flex items-center space-x-1 transition-colors"
                >
                  <span>Explore Local Services & Team</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

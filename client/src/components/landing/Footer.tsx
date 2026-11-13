import React from 'react'
import { ArrowUpRight, ShieldCheck, Star } from 'lucide-react'
import { FOOTER_COLUMNS } from '../../data/landing'
import BrandLogo from '../common/BrandLogo'

export const LandingFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#FFFFFF] text-[#0E0E10] border-t border-black/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        {/* Main Grid: Brand Column + 4 Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-black/10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#hero" className="flex items-center space-x-3 group">
              <BrandLogo size="md" showText={true} theme="light" textClassName="text-[#0E0E10] text-base font-bold" />
            </a>

            <p className="text-xs sm:text-sm text-[#4A4B53] leading-relaxed max-w-sm">
              We design and develop powerful software, mobile applications, websites, and scalable digital platforms that help businesses grow faster.
            </p>

            {/* Direct Contact Details */}
            <div className="space-y-1.5 pt-1 text-xs text-gray-500">
              <div>Email: <a href="mailto:contact@yathartitsolutions.com" className="text-[#0E0E10] hover:underline font-medium">contact@yathartitsolutions.com</a></div>
              <div>Direct: <a href="tel:+919876543210" className="text-[#0E0E10] hover:underline font-medium">+91 98765 43210</a></div>
              <div>Headquarters: Digital Tech Hub, India</div>
            </div>

            {/* Verified Badges Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gray-50 border border-black/5 text-[10px] text-gray-600">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00B67A]" />
                <span>ISO 27001 Protocol</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gray-50 border border-black/5 text-[10px] text-gray-600">
                <Star className="w-3.5 h-3.5 text-[#00B67A] fill-[#00B67A]" />
                <span>5.0 Clutch Verified</span>
              </div>
            </div>
          </div>

          {/* 4 Link Columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-3">
                <h4 className="text-xs font-bold text-[#0E0E10] uppercase tracking-wider font-mono">
                  {col.title}
                </h4>
                <ul className="space-y-2 text-xs">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-500 hover:text-black transition-colors block leading-relaxed"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <span>&copy; {new Date().getFullYear()} Orbiphera Technologies. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="/contact" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="/contact" className="hover:text-black transition-colors">
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="text-[#0E0E10] hover:underline font-mono inline-flex items-center space-x-1 font-bold"
            >
              <span>Back to Top ↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter

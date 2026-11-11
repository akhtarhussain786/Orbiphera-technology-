import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react'
import { LANDING_NAV_LINKS, NavLink } from '../../data/landing'
import BrandLogo from '../common/BrandLogo'

export const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      <div className={`w-full transition-all duration-400 ${isScrolled ? 'px-4 sm:px-6 pt-3' : 'px-6 lg:px-12 pt-4'}`}>
        <nav
          className={`pointer-events-auto transition-all duration-400 mx-auto flex items-center justify-between ${
            isScrolled
              ? 'max-w-[980px] bg-white/85 backdrop-blur-xl border border-black/10 shadow-[0_12px_35px_rgba(0,0,0,0.08)] rounded-full py-2 px-4 sm:px-6'
              : 'w-full bg-transparent border-b border-black/5 py-3'
          }`}
        >
          {/* Brand Logo Presentation */}
          <div className="flex items-center space-x-3">
            <a href="#hero" className="flex items-center group">
              <BrandLogo
                theme="light"
                size={isScrolled ? 'xs' : 'sm'}
                showText={!isScrolled}
                textClassName="text-sm font-extrabold text-[#0E0E10] tracking-tight"
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 text-[13px] font-semibold text-[#0E0E10]">
            {LANDING_NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.isDropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="relative group px-3 py-1.5 rounded-full hover:text-black transition-colors flex items-center space-x-1"
                >
                  <span>{link.label}</span>
                  {link.isDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-black transition-transform" />
                  )}
                  {/* Yellow underline on hover */}
                  <span className="absolute bottom-0.5 left-3 right-3 h-[2.5px] bg-[#FFE600] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                </a>

                {/* Dropdown Menu */}
                {link.isDropdown && link.items && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-72 p-2 bg-white rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.12)] border border-black/5 z-50 text-left"
                      >
                        {link.items.map((item) => (
                          <a
                            key={item.title}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <span className="text-xs font-bold text-[#0E0E10] group-hover:text-black block">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-gray-500 block leading-tight">
                              {item.desc}
                            </span>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Action: Book a call ↗ pill */}
          <div className="flex items-center space-x-3">
            <a
              href="#roast"
              className="px-4 sm:px-5 py-2 rounded-full bg-[#0E0E10] text-white text-xs sm:text-[13px] font-bold hover:bg-black transition-all flex items-center space-x-1.5 shadow-sm group"
            >
              <span>Book a call</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#0E0E10]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pointer-events-auto mx-4 mt-2 p-5 bg-white rounded-3xl border border-black/10 shadow-2xl space-y-3"
          >
            {LANDING_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-bold text-[#0E0E10] hover:text-black border-b border-gray-100"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#roast"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#0E0E10] text-white text-xs font-bold flex items-center justify-center space-x-2"
              >
                <span>Book a call</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default LandingNavbar


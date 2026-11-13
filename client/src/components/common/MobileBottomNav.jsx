import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Layers, Sparkles, Briefcase, PhoneCall } from 'lucide-react'

export default function MobileBottomNav() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    const handleHashAndPath = () => {
      const hash = window.location.hash
      const path = location.pathname

      if (hash === '#services') {
        setActiveTab('services')
      } else if (hash === '#products') {
        setActiveTab('products')
      } else if (hash === '#work') {
        setActiveTab('work')
      } else if (hash === '#contact') {
        setActiveTab('contact')
      } else if (path === '/') {
        setActiveTab('home')
      } else {
        setActiveTab('')
      }
    }

    handleHashAndPath()
    window.addEventListener('hashchange', handleHashAndPath)
    return () => window.removeEventListener('hashchange', handleHashAndPath)
  }, [location.pathname, location.hash])

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      href: '/',
      isRouterLink: true
    },
    {
      id: 'services',
      label: 'Services',
      icon: Layers,
      href: '/#services',
      isRouterLink: false
    },
    {
      id: 'products',
      label: 'Products',
      icon: Sparkles,
      href: '/#products',
      isRouterLink: false
    },
    {
      id: 'work',
      label: 'Portfolio',
      icon: Briefcase,
      href: '/#work',
      isRouterLink: false
    },
    {
      id: 'contact',
      label: 'Quote',
      icon: PhoneCall,
      href: '#contact',
      isRouterLink: false,
      isPrimaryCta: true
    }
  ]

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0B0B0C]/94 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_35px_rgba(0,0,0,0.9)] pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] pt-2 px-2 transition-all duration-300"
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          const content = (
            <div className="flex flex-col items-center justify-center relative py-1 px-1 group">
              {item.isPrimaryCta ? (
                // Special Glowing Crimson CTA for Contact / Get a Quote
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 -mt-3 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
                      isActive
                        ? 'bg-[#E50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.7)] scale-105'
                        : 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.45)] group-hover:scale-105 group-active:scale-95'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#FF2A36] mt-1 tracking-tight">
                    {item.label}
                  </span>
                </div>
              ) : (
                // Standard Icon Button
                <div className="flex flex-col items-center space-y-1">
                  <div
                    className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-[#E50914]/15 text-[#FF2A36] scale-105'
                        : 'text-slate-400 group-hover:text-white group-active:scale-90'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2]" />
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] tracking-tight transition-colors duration-200 ${
                      isActive
                        ? 'font-bold text-white'
                        : 'font-medium text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              )}
            </div>
          )

          if (item.isRouterLink) {
            return (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => setActiveTab(item.id)}
                className="select-none active:scale-95 transition-transform"
                aria-label={item.label}
              >
                {content}
              </Link>
            )
          }

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              className="select-none active:scale-95 transition-transform"
              aria-label={item.label}
            >
              {content}
            </a>
          )
        })}
      </div>
    </nav>
  )
}


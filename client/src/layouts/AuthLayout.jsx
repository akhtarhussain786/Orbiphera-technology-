import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Hexagon } from 'lucide-react'
import { useSettings } from '../context/SettingsContext'

const AuthLayout = () => {
  const { settings } = useSettings()
  const siteName = settings?.siteName || 'Yatharth IT Solutions'

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#111827] flex flex-col justify-between relative overflow-hidden">
      {/* Subtle Warm Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#FFC800]/10 rounded-full blur-[140px] pointer-events-none" />

      <header className="p-6 relative z-10 max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center space-x-2.5 w-fit group">
          <div className="w-9 h-9 rounded-xl bg-[#111827] border border-gray-900/10 flex items-center justify-center text-[#FFC800] shadow-sm group-hover:scale-105 transition-transform">
            <Hexagon className="w-5 h-5" fill="currentColor" />
          </div>
          <span className="text-lg font-black text-[#111827] tracking-tight">{siteName}</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <Outlet />
      </main>

      <footer className="p-6 text-center text-xs text-[#475569] relative z-10">
        <span>© {new Date().getFullYear()} {siteName}. All rights reserved.</span>
      </footer>
    </div>
  )
}

export default AuthLayout

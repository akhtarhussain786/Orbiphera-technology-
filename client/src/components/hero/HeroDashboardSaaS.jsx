import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  FolderKanban, 
  BarChart3, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  Users,
  ChevronDown,
  Sparkles
} from 'lucide-react'

export default function HeroDashboardSaaS() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none">
      {/* Lime Green Radial Glow Behind Dashboard */}
      <div className="absolute -inset-4 bg-[#E50914]/15 rounded-full blur-[100px] pointer-events-none -z-10" />



      {/* Main SaaS Dashboard Visual Card */}
      <div className="rounded-3xl bg-[#121214]/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 hover:border-[#E50914]/40 group">
        
        {/* Dashboard Top Header Bar */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#161618]">
          <div className="flex items-center space-x-3">
            {/* Traffic Light Dots */}
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5C542]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E50914]" />
            </div>

            <div className="flex items-center space-x-2 pl-2">
              <div className="w-5 h-5 rounded-md bg-[#E50914] flex items-center justify-center text-white font-black text-[10px]">
                OP
              </div>
              <span className="text-xs font-black text-white tracking-wider uppercase">
                Orbiphera Analytics
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 flex items-center space-x-1">
              <span>Last 30 Days</span>
              <ChevronDown className="w-3 h-3 text-[#E50914]" />
            </span>
            <span className="inline-flex items-center space-x-1 text-[10px] font-mono font-bold text-[#E50914] bg-[#E50914]/10 px-2 py-0.5 rounded-full border border-[#E50914]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
              <span>LIVE</span>
            </span>
          </div>
        </div>

        {/* Dashboard Body Grid: Mini Sidebar + Analytics Content */}
        <div className="grid grid-cols-12 min-h-[300px]">
          
          {/* Mini Sidebar (3 cols) */}
          <div className="col-span-3 border-r border-white/10 p-3 sm:p-4 bg-[#0F0F11] space-y-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-2 px-2.5 py-2 rounded-xl text-left font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229, 9, 20,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center space-x-2 px-2.5 py-2 rounded-xl text-left font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#E50914] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Projects</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-2 px-2.5 py-2 rounded-xl text-left font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-[#E50914] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Analytics</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-2 px-2.5 py-2 rounded-xl text-left font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#E50914] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Settings</span>
            </button>

            <div className="pt-6">
              <button
                type="button"
                className="w-full flex items-center space-x-2 px-2.5 py-2 rounded-xl text-left text-slate-500 hover:text-rose-400 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Analytics Content (9 cols) */}
          <div className="col-span-9 p-4 sm:p-5 flex flex-col justify-between space-y-4">
            
            {/* Top Row: Analytics Heading + Highlight Metric */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">
                  Analytics Overview
                </h4>
                <p className="text-[11px] text-slate-400">
                  Real-time software deployment telemetry
                </p>
              </div>

              {/* Total Projects Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl px-3.5 py-2 text-right">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Projects</span>
                <div className="flex items-center space-x-1.5 justify-end">
                  <span className="text-lg font-black text-white">120+</span>
                  <span className="text-[10px] font-bold text-[#E50914] bg-[#E50914]/10 px-1.5 py-0.2 rounded">
                    +12%
                  </span>
                </div>
              </div>
            </div>

            {/* Glowing Lime Green SVG Line Graph */}
            <div className="relative w-full h-28 bg-[#0B0B0C]/60 rounded-2xl p-2 border border-white/5 overflow-hidden flex items-end">
              {/* SVG Glowing Curve */}
              <svg 
                viewBox="0 0 400 120" 
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="limeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E50914" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#E50914" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Area Fill */}
                <path
                  d="M0 90 Q 50 110 100 80 T 200 60 T 300 40 T 400 15 L 400 120 L 0 120 Z"
                  fill="url(#limeGradient)"
                />
                
                {/* Glowing Stroke */}
                <path
                  d="M0 90 Q 50 110 100 80 T 200 60 T 300 40 T 400 15"
                  fill="none"
                  stroke="#E50914"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="filter drop-shadow-[0_0_8px_rgba(229, 9, 20,0.6)]"
                />

                {/* Animated Pulsing Dot at current peak */}
                <circle cx="400" cy="15" r="5" fill="#E50914" className="animate-ping" />
                <circle cx="400" cy="15" r="4" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Bottom 3 Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
              <div className="bg-white/5 border border-white/5 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block truncate">Live Projects</span>
                <span className="text-base font-black text-white">45</span>
                <span className="text-[9px] text-[#E50914] block font-mono">Active Sprint</span>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block truncate">Happy Clients</span>
                <span className="text-base font-black text-white">200+</span>
                <span className="text-[9px] text-[#E50914] block font-mono">Verified Global</span>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block truncate">Uptime</span>
                <span className="text-base font-black text-[#E50914]">99.9%</span>
                <span className="text-[9px] text-slate-400 block font-mono">SLA Guaranteed</span>
              </div>
            </div>

          </div>

        </div>

        {/* Dashboard Bottom Telemetry Strip */}
        <div className="px-5 py-2.5 bg-[#0A0A0C] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#E50914]" />
            <span className="text-white font-bold">ERP, EMS &amp; Custom Mobile/Web Solutions</span>
          </span>
          <span className="text-[#E50914]">● Production-Grade Systems</span>
        </div>

      </div>
    </div>
  )
}


import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Cpu, 
  Server, 
  CheckCircle2, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Users,
  Layers,
  Database,
  Smartphone,
  CheckCircle
} from 'lucide-react'

export default function HeroDashboardPreview() {
  const [activeTab, setActiveTab] = useState('erp')

  return (
    <div className="w-full h-full bg-[#101B35] text-white p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden relative">
      {/* Background ambient royal blue/soft yellow soft glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#2457D6]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5C542]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Internal Navigation & System Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded-md bg-[#2457D6] flex items-center justify-center text-white font-black text-xs font-mono shadow-xs">
            Y
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xs tracking-wider uppercase text-white font-mono">
                ENTERPRISE MANAGEMENT OS
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white/10 text-[#F5C542]">
                v4.2.0
              </span>
            </div>
          </div>
        </div>

        {/* Live Cluster Badge (Emerald Green #10B981) */}
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[11px] font-mono text-[#10B981]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-semibold">SYSTEM LIVE • 99.99% UPTIME</span>
        </div>
      </div>

      {/* Interactive Tabs: ERP, EMS, Mobile & Web */}
      <div className="flex items-center space-x-2 pt-2.5 pb-2 text-[11px] font-mono border-b border-white/5 relative z-10">
        {[
          { id: 'erp', label: 'ERP & Finance', icon: Layers },
          { id: 'ems', label: 'EMS & GPS Attendance', icon: Users },
          { id: 'apps', label: 'Web & Mobile APIs', icon: Smartphone }
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center space-x-1.5 cursor-pointer ${
                isActive 
                  ? 'bg-[#2457D6] text-white font-bold shadow-xs' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Dynamic Content based on Active Tab */}
      <div className="relative z-10 my-2">
        {activeTab === 'erp' && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white/5 border border-white/10 p-2.5">
                <span className="text-[10px] font-mono text-gray-400 block">Total Invoices</span>
                <span className="text-base sm:text-lg font-bold font-mono text-white">₹48.2L</span>
                <span className="text-[10px] text-[#10B981] font-mono">↑ 14.2% MoM</span>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-2.5">
                <span className="text-[10px] font-mono text-gray-400 block">Inventory SKUs</span>
                <span className="text-base sm:text-lg font-bold font-mono text-white">12,480</span>
                <span className="text-[10px] text-[#2457D6] font-mono">Synced Real-Time</span>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-2.5">
                <span className="text-[10px] font-mono text-gray-400 block">DB Latency</span>
                <span className="text-base sm:text-lg font-bold font-mono text-white">14.2ms</span>
                <span className="text-[10px] text-[#10B981] font-mono">MySQL Cluster</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-2.5 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-gray-300">
                <span>Multi-Branch Financial Ledger</span>
                <span className="text-[#10B981] font-semibold">● Auto-Reconciled</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#2457D6] to-[#F5C542] rounded-full w-4/5" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ems' && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white/5 border border-white/10 p-2.5">
                <span className="text-[10px] font-mono text-gray-400 block">Active Staff</span>
                <span className="text-base sm:text-lg font-bold font-mono text-white">482 / 500</span>
                <span className="text-[10px] text-[#10B981] font-mono">● 96.4% On-Duty</span>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-2.5">
                <span className="text-[10px] font-mono text-gray-400 block">GPS Attendance</span>
                <span className="text-base sm:text-lg font-bold font-mono text-white">Geo-Fenced</span>
                <span className="text-[10px] text-[#2457D6] font-mono">Mobile Punch In</span>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-2.5">
                <span className="text-[10px] font-mono text-gray-400 block">Payroll Engine</span>
                <span className="text-base sm:text-lg font-bold font-mono text-white">Automated</span>
                <span className="text-[10px] text-[#F5C542] font-mono">Tax &amp; Deductions</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-2.5 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-gray-300">
                <span>Workforce Roster &amp; Shift Rotation</span>
                <span className="text-[#2457D6] font-semibold">Role-Based RBAC</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#2457D6] rounded-full w-11/12" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'apps' && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white/5 border border-white/10 p-2.5">
                <span className="text-[10px] font-mono text-gray-400 block">Flutter App Sync</span>
                <span className="text-base sm:text-lg font-bold font-mono text-white">iOS &amp; Android</span>
                <span className="text-[10px] text-[#10B981] font-mono">WebSocket Live</span>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-2.5">
                <span className="text-[10px] font-mono text-gray-400 block">REST APIs</span>
                <span className="text-base sm:text-lg font-bold font-mono text-white">18.4K req/s</span>
                <span className="text-[10px] text-[#2457D6] font-mono">Node.js / Laravel</span>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-2.5">
                <span className="text-[10px] font-mono text-gray-400 block">Cloud Hosting</span>
                <span className="text-base sm:text-lg font-bold font-mono text-white">AWS &amp; Firebase</span>
                <span className="text-[10px] text-[#10B981] font-mono">Zero Downtime</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-2.5 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-gray-300">
                <span>Mobile Client Response Telemetry</span>
                <span className="text-[#F5C542] font-semibold">sub-30ms P99</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#10B981] rounded-full w-full" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Command Output Status */}
      <div className="rounded-lg bg-black/40 border border-white/5 p-2 font-mono text-[10px] text-gray-300 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2 truncate">
          <Terminal className="w-3.5 h-3.5 text-[#2457D6] flex-shrink-0" />
          <span className="text-[#F5C542]">$</span>
          <span className="truncate">systemctl status erp-ems-cluster --live</span>
        </div>
        <span className="text-[#10B981] font-semibold flex-shrink-0 pl-2">ACTIVE (RUNNING)</span>
      </div>
    </div>
  )
}

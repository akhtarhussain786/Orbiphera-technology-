import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  User, 
  Download, 
  Key, 
  ShieldCheck, 
  LogOut
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useSettings } from '../../context/SettingsContext'
import Button from '../../components/ui/Button'
import SeoHead from '../../components/common/SeoHead'
import toast from 'react-hot-toast'

export default function Account() {
  const { user, logout } = useAuth()
  const { settings } = useSettings()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('licenses')
  const siteName = settings?.siteName || 'Orbiphera Technologies'

  const mockPurchases = [
    {
      id: 'YT-849201',
      productName: 'EduPrime — Education Institute & LMS',
      category: 'Website Template',
      licenseType: 'Commercial Regular',
      licenseKey: 'YT-LIC-9A4B8F2E',
      purchasedDate: 'Oct 28, 2026',
      price: 4999,
      status: 'Active'
    },
    {
      id: 'YT-618492',
      productName: 'NexCare Hospital OS',
      category: 'Enterprise Software',
      licenseType: 'Commercial Lifetime',
      licenseKey: 'YT-LIC-3D7C1E90',
      purchasedDate: 'Oct 15, 2026',
      price: 14999,
      status: 'Active'
    }
  ]

  const handleDownload = (name) => {
    toast.success(`Preparing clean unminified source code bundle for ${name}...`)
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#111827] pt-24 pb-24 relative overflow-hidden">
      <SeoHead title={`My Account Dashboard | ${siteName}`} />

      {/* Subtle Warm Ambient Accent */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#FFC800]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* User Profile Header Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-2xl bg-[#111827] border border-gray-900/10 flex items-center justify-center font-black text-2xl text-[#FFC800] shadow-sm">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-[#111827] tracking-tight">{user?.name || 'Verified Customer'}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-bold uppercase">
                  Commercial Licensee
                </span>
              </div>
              <p className="text-xs text-[#475569]">{user?.email || 'customer@organization.com'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/marketplace')}
              className="flex-1 sm:flex-none"
            >
              Browse Catalog
            </Button>
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => { logout(); navigate('/'); }}
                icon={LogOut}
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-[#E5E7EB] flex space-x-6 text-sm font-semibold mb-8">
          {[
            { id: 'licenses', label: 'My Licenses & Downloads', icon: Key },
            { id: 'profile', label: 'Account Profile', icon: User }
          ].map(tab => {
            const IconComp = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 flex items-center space-x-2 transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-[#111827]'
                    : 'text-[#475569] hover:text-[#111827]'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="accountTabUnderline"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-[#FFC800]"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'licenses' && (
          <div className="space-y-4">
            {mockPurchases.map((purchase) => (
              <div 
                key={purchase.id}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E5E7EB] hover:border-gray-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm"
              >
                <div className="space-y-3 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                      {purchase.category}
                    </span>
                    <span className="text-xs text-[#475569]">Order #{purchase.id}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-[#475569]">Purchased {purchase.purchasedDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#111827] tracking-tight">{purchase.productName}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center space-x-1.5 text-[#111827] bg-[#F3F4F6] px-3 py-1.5 rounded-xl border border-[#E5E7EB] font-mono">
                      <Key className="w-3.5 h-3.5 text-[#111827]" />
                      <span>{purchase.licenseKey}</span>
                    </div>
                    <span className="text-emerald-600 flex items-center text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                      Lifetime Commercial Rights
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E5E7EB]">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleDownload(purchase.productName)}
                    icon={Download}
                    iconPosition="left"
                  >
                    Download ZIP (v2.4)
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-[#111827] tracking-tight">Security & Developer Profile</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[#475569] block mb-1">Account Holder Name</label>
                <input
                  type="text"
                  readOnly
                  value={user?.name || 'Administrator'}
                  className="w-full px-4 py-2.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl text-[#111827]"
                />
              </div>
              <div>
                <label className="text-[#475569] block mb-1">Primary Email Address</label>
                <input
                  type="email"
                  readOnly
                  value={user?.email || 'admin@yathartitsolutions.com'}
                  className="w-full px-4 py-2.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl text-[#111827]"
                />
              </div>
              <p className="text-[11px] text-[#475569]">
                To update your commercial organization billing address or request VAT/GST invoices, please contact our accounts team at <a href="mailto:contact@yathartitsolutions.com" className="text-[#111827] font-bold underline">contact@yathartitsolutions.com</a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

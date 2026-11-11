import React, { useState } from 'react'
import {
  LayoutDashboard, FileText, Layers, Briefcase, Quote, UserCheck, Menu as MenuIcon, Image as ImageIcon,
  Users, Mail, Sparkles, Settings, LogOut, ExternalLink, ChevronRight,
  ShieldCheck, X, Database, Clock, Package
} from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'
import { useSettings } from '../context/SettingsContext'
import BrandLogo from '../components/common/BrandLogo'
import AdminLogin from '../pages/admin/AdminLogin'
import Dashboard from '../pages/admin/Dashboard'
import PagesManager from '../pages/admin/PagesManager'
import ContentManager from '../pages/admin/ContentManager'
import ProductsManager from '../pages/admin/ProductsManager'
import ProjectsManager from '../pages/admin/ProjectsManager'
import TestimonialsManager from '../pages/admin/TestimonialsManager'
import TeamManager from '../pages/admin/TeamManager'
import NavigationManager from '../pages/admin/NavigationManager'
import MediaManager from '../pages/admin/MediaManager'
import UsersManager from '../pages/admin/UsersManager'
import InquiriesManager from '../pages/admin/InquiriesManager'
import SeoEngineManager from '../pages/admin/SeoEngineManager'
import SettingsManager from '../pages/admin/SettingsManager'

export default function AdminLayout() {
  const { admin, loading, isAuthenticated, logoutAdmin } = useAdminAuth()
  const { settings } = useSettings()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030407] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFC800] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Enforce secure authentication gate
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setActiveTab('dashboard')} />
  }

  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'pages', label: 'Pages Management', icon: FileText },
    { id: 'content', label: 'Website Content', icon: Layers },
    { id: 'products', label: 'Products & Solutions', icon: Package },
    { id: 'projects', label: 'Featured Projects', icon: Briefcase },
    { id: 'testimonials', label: 'Client Reviews', icon: Quote },
    { id: 'team', label: 'Leadership & Team', icon: UserCheck },
    { id: 'navigation', label: 'Navigation Menus', icon: MenuIcon },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'users', label: 'Admin Users & Roles', icon: Users },
    { id: 'inquiries', label: 'Contact Enquiries', icon: Mail },
    { id: 'seo', label: 'AI Auto SEO Engine', icon: Sparkles, badge: 'AUTO 2 AM' },
    { id: 'settings', label: 'Settings & Integrations', icon: Settings }
  ]

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />
      case 'pages':
        return <PagesManager />
      case 'content':
        return <ContentManager />
      case 'products':
        return <ProductsManager />
      case 'projects':
        return <ProjectsManager />
      case 'testimonials':
        return <TestimonialsManager />
      case 'team':
        return <TeamManager />
      case 'navigation':
        return <NavigationManager />
      case 'media':
        return <MediaManager />
      case 'users':
        return <UsersManager />
      case 'inquiries':
        return <InquiriesManager />
      case 'seo':
        return <SeoEngineManager />
      case 'settings':
        return <SettingsManager />
      default:
        return <Dashboard setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-[#030407] text-[#F7F8FC] flex flex-col lg:flex-row antialiased selection:bg-[#FFC800] selection:text-[#111827]">
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-[#10151E] border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <BrandLogo size="xs" showText={true} textClassName="text-sm font-bold" disableHover={true} />
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-gray-400 hover:text-white"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#10151E] border-r border-white/10 flex flex-col justify-between z-50 transition-transform duration-300
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Brand Header */}
        <div>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <BrandLogo size="sm" showText={true} textClassName="text-xs font-bold" />

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* System Status Indicator */}
          <div className="px-5 py-3 bg-[#0B0E14] border-b border-white/5 flex items-center justify-between text-[11px]">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Atlas DB Connected</span>
            </div>
            <span className="text-[10px] font-mono text-gray-500">v2.0</span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setMobileSidebarOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#1558C9] text-white shadow-lg shadow-[#1558C9]/25'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#FFC800]/20 text-[#FFC800] border border-[#FFC800]/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Current User & Quick Links */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs text-gray-300 hover:text-white transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          </a>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1558C9]/30 border border-[#1558C9]/50 flex items-center justify-center font-bold text-xs text-[#FFC800]">
                {admin?.name?.charAt(0) || 'A'}
              </div>
              <div className="truncate max-w-[110px]">
                <p className="text-xs font-semibold text-white truncate">{admin?.name}</p>
                <p className="text-[10px] text-gray-500 font-mono capitalize truncate">{admin?.role?.replace('_', ' ')}</p>
              </div>
            </div>

            <button
              onClick={logoutAdmin}
              className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
              title="Logout session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderActiveView()}
        </div>
      </main>
    </div>
  )
}

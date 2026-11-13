import React, { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  FileText,
  Layers,
  Briefcase,
  Quote,
  UserCheck,
  Menu as MenuIcon,
  Image as ImageIcon,
  Users,
  Mail,
  Sparkles,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  Database,
  Globe,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  CheckCircle2
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
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('orbiphera_admin_sidebar_collapsed') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('orbiphera_admin_sidebar_collapsed', collapsed ? 'true' : 'false')
  }, [collapsed])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030407] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#FFC800] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-400 font-mono tracking-wider uppercase">Loading Control Plane...</p>
        </div>
      </div>
    )
  }

  // Enforce secure authentication gate
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setActiveTab('dashboard')} />
  }

  // Grouped Navigation Structure
  const navigationGroups = [
    {
      group: 'Overview',
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      group: 'Content & CMS',
      items: [
        { id: 'pages', label: 'Pages Management', icon: FileText },
        { id: 'content', label: 'Website Content', icon: Layers },
        { id: 'navigation', label: 'Navigation Menus', icon: MenuIcon },
        { id: 'media', label: 'Media Library', icon: ImageIcon }
      ]
    },
    {
      group: 'Portfolio & Business',
      items: [
        { id: 'products', label: 'Products & Solutions', icon: Briefcase },
        { id: 'projects', label: 'Featured Projects', icon: Layers },
        { id: 'testimonials', label: 'Client Reviews', icon: Quote },
        { id: 'team', label: 'Leadership & Team', icon: UserCheck }
      ]
    },
    {
      group: 'Operations & System',
      items: [
        { id: 'inquiries', label: 'Contact Enquiries', icon: Mail },
        { id: 'seo', label: 'AI Auto SEO Engine', icon: Sparkles, badge: 'AUTO 2 AM' },
        { id: 'users', label: 'Admin Users & Roles', icon: Users },
        { id: 'settings', label: 'Settings & Integrations', icon: Settings }
      ]
    }
  ]

  const activeItemLabel = navigationGroups
    .flatMap(g => g.items)
    .find(item => item.id === activeTab)?.label || 'Executive Dashboard'

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
    <div className="min-h-screen bg-[#07090E] text-[#F7F8FC] flex flex-col lg:flex-row antialiased selection:bg-[#FFC800] selection:text-[#111827]">
      {/* Mobile Top App Bar */}
      <div className="lg:hidden bg-[#10151E] border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="flex items-center space-x-3 overflow-hidden">
          <BrandLogo size="xs" showText={false} disableHover={true} />
          <div className="flex flex-col truncate">
            <span className="text-xs font-bold text-white tracking-wider uppercase truncate">ORBIPHERA</span>
            <span className="text-[9px] text-[#FFC800] font-mono tracking-widest uppercase">Admin Panel</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('inquiries')}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
            title="Inquiries"
          >
            <Mail className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6 text-[#FFC800]" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-[#10151E] border-r border-white/10 flex flex-col justify-between z-50 transition-all duration-300 ease-in-out
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
          w-72 max-w-[85vw]
          ${mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Top Header & Brand Identity */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between min-h-[68px]">
            {!collapsed ? (
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600/30 to-amber-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(229,9,20,0.3)]">
                  <img
                    src={settings?.logoUrl || '/logo.png'}
                    alt="Orbiphera"
                    className="w-7 h-7 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                  />
                  <span className="hidden font-black text-red-500 text-xs font-mono">OP</span>
                </div>
                <div className="flex flex-col truncate leading-tight">
                  <span className="text-xs font-black text-white tracking-widest uppercase truncate">
                    ORBIPHERA
                  </span>
                  <span className="text-[10px] font-bold text-[#FFC800] tracking-wider uppercase truncate">
                    TECHNOLOGY
                  </span>
                </div>
              </div>
            ) : (
              <div className="mx-auto">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600/30 to-amber-500/20 border border-red-500/30 flex items-center justify-center shadow-[0_0_12px_rgba(229,9,20,0.3)]">
                  <img
                    src={settings?.logoUrl || '/logo.png'}
                    alt="Orbiphera"
                    className="w-7 h-7 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                  />
                  <span className="hidden font-black text-red-500 text-xs font-mono">OP</span>
                </div>
              </div>
            )}

            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4 text-[#FFC800]" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Database & Runtime Status Indicator */}
          {!collapsed ? (
            <div className="px-4 py-2.5 bg-[#0A0D13] border-b border-white/5 flex items-center justify-between text-[11px]">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-medium truncate">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="truncate">Atlas DB Connected</span>
              </div>
              <span className="text-[10px] font-mono text-gray-500 px-1.5 py-0.5 rounded bg-white/5">v2.4</span>
            </div>
          ) : (
            <div className="py-2 bg-[#0A0D13] border-b border-white/5 flex justify-center" title="Atlas DB Connected">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          )}

          {/* Scrollable Navigation Groups */}
          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 custom-scrollbar">
            {navigationGroups.map((group) => (
              <div key={group.group} className="space-y-1">
                {!collapsed && (
                  <div className="px-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest select-none">
                    {group.group}
                  </div>
                )}
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id)
                        setMobileSidebarOpen(false)
                      }}
                      title={collapsed ? item.label : undefined}
                      className={`w-full flex items-center ${
                        collapsed ? 'justify-center px-2' : 'justify-between px-3'
                      } py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group relative ${
                        isActive
                          ? 'bg-[#1558C9] text-white shadow-lg shadow-[#1558C9]/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-3 truncate">
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 transition-colors ${
                            isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                          }`}
                        />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!collapsed && item.badge && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#FFC800]/15 text-[#FFC800] border border-[#FFC800]/30 tracking-tight flex-shrink-0">
                          {item.badge}
                        </span>
                      )}

                      {/* Active Left Indicator Bar */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#FFC800] rounded-r-full" />
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer: Public Web & Admin User Card */}
        <div className="p-3 border-t border-white/10 space-y-2 bg-[#0C1017]">
          {!collapsed ? (
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs text-gray-300 hover:text-white transition-colors"
            >
              <span className="flex items-center space-x-2 truncate">
                <Globe className="w-3.5 h-3.5 text-[#1558C9] flex-shrink-0" />
                <span className="truncate">Public Website</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
            </a>
          ) : (
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
              title="Open Public Website"
            >
              <Globe className="w-4 h-4 text-[#1558C9]" />
            </a>
          )}

          <div className="flex items-center justify-between pt-1">
            {!collapsed ? (
              <button
                onClick={() => setActiveTab('users')}
                className="flex items-center space-x-2.5 text-left group cursor-pointer hover:opacity-90 transition-opacity truncate flex-1 min-w-0 mr-2"
                title="Manage Admin Profile"
              >
                <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center font-bold text-xs text-red-400 flex-shrink-0">
                  {admin?.name?.charAt(0) || 'A'}
                </div>
                <div className="truncate flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white group-hover:text-[#FFC800] transition-colors truncate">
                    {admin?.name || 'Super Admin'}
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono capitalize truncate">
                    {admin?.role?.replace('_', ' ') || 'SuperAdmin'}
                  </p>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('users')}
                className="mx-auto w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center font-bold text-xs text-red-400 hover:border-[#FFC800] transition-colors"
                title={`Logged in as ${admin?.name || 'Admin'}`}
              >
                {admin?.name?.charAt(0) || 'A'}
              </button>
            )}

            {!collapsed && (
              <button
                onClick={logoutAdmin}
                className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors flex-shrink-0"
                title="Logout session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Desktop Sticky Sub-Header with Breadcrumb, Telemetry & Quick Profile */}
        <header className="hidden lg:flex items-center justify-between px-8 py-3.5 bg-[#0C1017]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-gray-400">Control Plane</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#FFC800] font-semibold">{activeItemLabel}</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-[#10151E] border border-white/10 rounded-full text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-gray-300 font-mono text-[11px]">System Live</span>
            </div>

            <button
              onClick={() => setActiveTab('inquiries')}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 relative"
              title="Recent Inquiries"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFC800]" />
            </button>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-[#1558C9]/30 border border-[#1558C9]/50 flex items-center justify-center text-[10px] font-bold text-white">
                {admin?.name?.charAt(0) || 'A'}
              </div>
              <span className="text-xs text-gray-300 font-medium">{admin?.email || 'admin@orbiphera.in'}</span>
            </div>
          </div>
        </header>

        {/* Viewport Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </div>
      </main>
    </div>
  )
}

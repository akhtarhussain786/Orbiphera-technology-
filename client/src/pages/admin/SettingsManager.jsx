import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Settings, Globe, Shield, Save, Code, Bell,
  Sliders, Link2, Mail, Phone, MapPin, AlertCircle, KeyRound, RefreshCw, Lock, User
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { useSettings } from '../../context/SettingsContext'
import toast from 'react-hot-toast'

export default function SettingsManager() {
  const { admin: currentAdmin, updateAdmin, getAuthHeader } = useAdminAuth()
  const { refreshSettings, updateLocalSettings } = useSettings()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Admin Credentials (Username & Password) State
  const [adminCreds, setAdminCreds] = useState({
    name: currentAdmin?.name || '',
    email: currentAdmin?.email || '',
    newPassword: '',
    confirmPassword: '',
    currentPassword: ''
  })
  const [savingCreds, setSavingCreds] = useState(false)

  const [formData, setFormData] = useState({
    siteName: 'Orbiphera Technology',
    tagline: 'Engineering Digital Solutions. Building the Future.',
    preloaderTitle: '',
    preloaderSubtitle: '',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
    contactEmail: 'contact@orbiphera.in',
    contactPhone: '+91 98765 43210',
    address: 'Orbiphera Technology, Digital Tech Hub, India',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
      instagram: '',
      facebook: ''
    },
    defaultMetaTitle: '',
    defaultMetaDescription: '',
    defaultOgImage: '',
    googleAnalyticsId: '',
    googleSearchConsoleKey: '',
    maintenanceMode: false,
    customHeaderScripts: '',
    customFooterScripts: ''
  })

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    fetchSettings()
  }, [])

  useEffect(() => {
    if (currentAdmin) {
      setAdminCreds(prev => ({
        ...prev,
        name: currentAdmin.name || '',
        email: currentAdmin.email || ''
      }))
    }
  }, [currentAdmin])

  const handleUpdateAdminCreds = async (e) => {
    if (e && e.preventDefault) e.preventDefault()

    if (!adminCreds.name.trim() || !adminCreds.email.trim()) {
      return toast.error('Admin name and email cannot be empty')
    }

    if (adminCreds.newPassword) {
      if (adminCreds.newPassword.length < 6) {
        return toast.error('New password must be at least 6 characters')
      }
      if (adminCreds.newPassword !== adminCreds.confirmPassword) {
        return toast.error('New password and confirm password do not match')
      }
    }

    try {
      setSavingCreds(true)
      const payload = {
        name: adminCreds.name.trim(),
        email: adminCreds.email.trim().toLowerCase(),
        currentPassword: adminCreds.currentPassword || undefined,
        newPassword: adminCreds.newPassword || undefined
      }

      const res = await axios.put(`${API_URL}/admin/auth/profile`, payload, {
        headers: getAuthHeader()
      })

      if (res.data.success) {
        if (res.data.token) {
          localStorage.setItem('adminToken', res.data.token)
        }
        if (updateAdmin && res.data.admin) {
          updateAdmin(res.data.admin)
        }
        toast.success('Admin username and password updated successfully!')
        setAdminCreds(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }))
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update admin credentials')
    } finally {
      setSavingCreds(false)
    }
  }

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/admin/settings/admin`, {
        headers: getAuthHeader()
      })
      if (res.data.success) {
        const s = res.data.settings
        setFormData({
          siteName: s.siteName || 'Yatharth It Solutions',
          tagline: s.tagline || '',
          preloaderTitle: s.preloaderTitle || '',
          preloaderSubtitle: s.preloaderSubtitle || '',
          logoUrl: s.logoUrl || '',
          faviconUrl: s.faviconUrl || '/favicon.ico',
          contactEmail: s.contactEmail || '',
          contactPhone: s.contactPhone || '',
          address: s.address || '',
          socialLinks: s.socialLinks || {},
          defaultMetaTitle: s.defaultMetaTitle || '',
          defaultMetaDescription: s.defaultMetaDescription || '',
          defaultOgImage: s.defaultOgImage || '',
          googleAnalyticsId: s.googleAnalyticsId || '',
          googleSearchConsoleKey: s.googleSearchConsoleKey || '',
          maintenanceMode: Boolean(s.maintenanceMode),
          customHeaderScripts: s.customHeaderScripts || '',
          customFooterScripts: s.customFooterScripts || ''
        })
      }
    } catch (e) {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const res = await axios.put(`${API_URL}/admin/settings/admin`, formData, {
        headers: getAuthHeader()
      })
      const saved = res.data?.settings || formData
      if (updateLocalSettings) updateLocalSettings(saved)
      if (refreshSettings) await refreshSettings()
      try {
        localStorage.setItem('site_settings_cache', JSON.stringify(saved))
      } catch (_) {}
      toast.success('Website settings & brand identity updated successfully!')
    } catch (e) {
      console.warn('API save notice, applied local fallback:', e.message)
      if (updateLocalSettings) updateLocalSettings(formData)
      try {
        localStorage.setItem('site_settings_cache', JSON.stringify(formData))
      } catch (_) {}
      toast.success('Website settings updated!')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#FFC800] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Website Settings & Integrations</h2>
          <p className="text-sm text-gray-400 mt-1">
            Global brand configurations, contact details, Google Search Console, and Analytics integrations.
          </p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="flex items-center space-x-2 px-5 py-2.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(255,200,0,0.25)] transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Brand & Identity */}
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#FFC800] flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            Brand Identity & Appearance
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Website Name</label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Tagline / Slogan</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Logo Image URL</label>
              <input
                type="text"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                placeholder="/uploads/logo.png or https://..."
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Favicon URL</label>
              <input
                type="text"
                value={formData.faviconUrl}
                onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
              />
            </div>
          </div>

          {/* Loading Screen / Preloader Customization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/5">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Loading Screen Brand Name <span className="text-gray-500">(Optional - defaults to Website Name)</span>
              </label>
              <input
                type="text"
                value={formData.preloaderTitle}
                onChange={(e) => setFormData({ ...formData, preloaderTitle: e.target.value })}
                placeholder={formData.siteName || 'Yatharth IT Solutions'}
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Loading Screen Subtitle <span className="text-gray-500">(Optional - defaults to Tagline)</span>
              </label>
              <input
                type="text"
                value={formData.preloaderSubtitle}
                onChange={(e) => setFormData({ ...formData, preloaderSubtitle: e.target.value })}
                placeholder={formData.tagline || 'IT Software Development Agency'}
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>

          {/* Maintenance Mode */}
          <div className="pt-2">
            <label className="flex items-center space-x-3 text-xs text-gray-300 cursor-pointer p-3 bg-[#0B0E14] rounded-xl border border-white/5">
              <input
                type="checkbox"
                checked={formData.maintenanceMode}
                onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                className="rounded bg-[#10151E] border-white/20 text-[#FFC800] focus:ring-0"
              />
              <div>
                <span className="font-semibold text-white block">Maintenance Mode Switch</span>
                <span className="text-[11px] text-gray-500">
                  When enabled, public visitors see a maintenance screen while administrators maintain full access.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Contact Information & Social Profiles */}
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1558C9] flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Contact & Social Coordinates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Official Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Office Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">LinkedIn Profile</label>
              <input
                type="url"
                value={formData.socialLinks?.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, linkedin: e.target.value } })}
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Twitter / X Profile</label>
              <input
                type="url"
                value={formData.socialLinks?.twitter || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: e.target.value } })}
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">GitHub Organization</label>
              <input
                type="url"
                value={formData.socialLinks?.github || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, github: e.target.value } })}
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
              />
            </div>
          </div>
        </div>

        {/* Google Integrations: Search Console & Analytics 4 */}
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center">
            <Link2 className="w-4 h-4 mr-2" />
            Phase 5: Google Search Console & Analytics 4 Integrations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Google Analytics 4 Measurement ID
              </label>
              <input
                type="text"
                value={formData.googleAnalyticsId}
                onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#1558C9]"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                Used to track visitors, sessions, bounce rate, and organic traffic in real time.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Google Search Console Verification Key / API Token
              </label>
              <input
                type="text"
                value={formData.googleSearchConsoleKey}
                onChange={(e) => setFormData({ ...formData, googleSearchConsoleKey: e.target.value })}
                placeholder="google-site-verification=..."
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#1558C9]"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                Enables search clicks, impressions, average position, and indexing telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* Global SEO Defaults & Custom Scripts */}
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center">
            <Code className="w-4 h-4 mr-2" />
            Global SEO Defaults & Custom Header/Footer Scripts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Default Fallback SEO Title</label>
              <input
                type="text"
                value={formData.defaultMetaTitle}
                onChange={(e) => setFormData({ ...formData, defaultMetaTitle: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Default Fallback OpenGraph Image</label>
              <input
                type="text"
                value={formData.defaultOgImage}
                onChange={(e) => setFormData({ ...formData, defaultOgImage: e.target.value })}
                placeholder="https://nexvora.com/og-image.jpg"
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Default Fallback Meta Description</label>
            <textarea
              rows={2}
              value={formData.defaultMetaDescription}
              onChange={(e) => setFormData({ ...formData, defaultMetaDescription: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Custom Header Scripts (&lt;head&gt; injection)</label>
              <textarea
                rows={3}
                value={formData.customHeaderScripts}
                onChange={(e) => setFormData({ ...formData, customHeaderScripts: e.target.value })}
                placeholder="<!-- Custom analytics / chat widgets -->"
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#1558C9]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Custom Footer Scripts (before &lt;/body&gt;)</label>
              <textarea
                rows={3}
                value={formData.customFooterScripts}
                onChange={(e) => setFormData({ ...formData, customFooterScripts: e.target.value })}
                placeholder="<!-- Custom tracking pixels -->"
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#1558C9]"
              />
            </div>
          </div>
        </div>

        {/* Admin Credentials & Password Management Card */}
        <div className="bg-[#10151E] border border-[#E50914]/35 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center space-x-2">
                <KeyRound className="w-4 h-4 text-[#E50914]" />
                <span>Admin Login Credentials (Username &amp; Password)</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Change your administrative username (Name &amp; Login Email) and access password.
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30 self-start sm:self-auto">
              Session: {currentAdmin?.email}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Admin Display Name (Username)</span>
              </label>
              <input
                type="text"
                value={adminCreds.name}
                onChange={(e) => setAdminCreds({ ...adminCreds, name: e.target.value })}
                placeholder="e.g. Orbiphera Admin"
                className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Admin Login Email (Login Username)</span>
              </label>
              <input
                type="email"
                value={adminCreds.email}
                onChange={(e) => setAdminCreds({ ...adminCreds, email: e.target.value })}
                placeholder="admin@orbiphera.com"
                className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span>Current Password (optional)</span>
              </label>
              <input
                type="password"
                value={adminCreds.currentPassword}
                onChange={(e) => setAdminCreds({ ...adminCreds, currentPassword: e.target.value })}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-[#E50914]" />
                <span>New Password</span>
              </label>
              <input
                type="password"
                value={adminCreds.newPassword}
                onChange={(e) => setAdminCreds({ ...adminCreds, newPassword: e.target.value })}
                placeholder="Leave blank to keep current"
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Confirm New Password</span>
              </label>
              <input
                type="password"
                value={adminCreds.confirmPassword}
                onChange={(e) => setAdminCreds({ ...adminCreds, confirmPassword: e.target.value })}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleUpdateAdminCreds}
              disabled={savingCreds}
              className="flex items-center space-x-2 px-5 py-2.5 bg-[#E50914] hover:bg-[#CC0813] text-white font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(229,9,20,0.35)] transition-all cursor-pointer"
            >
              {savingCreds ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Updating Admin Credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Update Admin Username &amp; Password</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}


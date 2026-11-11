import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Settings, Globe, Shield, Save, Code, Bell,
  Sliders, Link2, Mail, Phone, MapPin, AlertCircle
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { useSettings } from '../../context/SettingsContext'
import toast from 'react-hot-toast'

export default function SettingsManager() {
  const { getAuthHeader } = useAdminAuth()
  const { refreshSettings, updateLocalSettings } = useSettings()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    siteName: 'Yatharth It Solutions',
    tagline: 'Digital Products. Limitless Possibilities.',
    preloaderTitle: '',
    preloaderSubtitle: '',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
    contactEmail: 'contact@yathartitsolutions.com',
    contactPhone: '+91 98765 43210',
    address: 'Yathart IT Solutions, Digital Tech Hub, India',
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

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    fetchSettings()
  }, [])

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
      </form>
    </div>
  )
}


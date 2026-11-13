import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const SettingsContext = createContext()

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

const DEFAULT_SETTINGS = {
  siteName: 'Yatharth IT Solutions',
  tagline: 'Engineering Digital Solutions. Building the Future.',
  preloaderTitle: '',
  preloaderSubtitle: '',
  logoUrl: '/logo.png',
  faviconUrl: '/favicon.ico',
  contactEmail: 'contact@yathartitsolutions.com',
  contactPhone: '+91 98765 43210',
  address: 'Yathart IT Solutions, Digital Tech Hub, India',
  socialLinks: {
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com'
  },
  defaultMetaTitle: 'Yatharth IT Solutions - Software Development & IT Solutions Company',
  defaultMetaDescription: 'We design and develop powerful software, mobile applications, websites, and scalable digital platforms that help businesses grow faster.',
  maintenanceMode: false
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('site_settings_cache')
      if (cached) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(cached) }
      }
    } catch (_) {}
    return DEFAULT_SETTINGS
  })

  const [navigation, setNavigation] = useState({
    header: [],
    footer: []
  })

  const [loading, setLoading] = useState(true)

  const getApiUrl = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
    return '/api'
  }

  const API_URL = getApiUrl()

  const applyDomUpdates = (data) => {
    if (!data) return
    if (data.siteName) {
      const name = data.siteName
      const tagline = data.tagline || ''
      document.title = tagline ? `${name} - ${tagline}` : name
    }
    if (data.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']")
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.href = data.faviconUrl
    }
  }

  useEffect(() => {
    applyDomUpdates(settings)
    fetchPublicData()

    // Listen for real-time updates across components or tabs
    const handleStorage = (e) => {
      if (e.key === 'site_settings_cache' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          setSettings(prev => ({ ...prev, ...parsed }))
          applyDomUpdates(parsed)
        } catch (_) {}
      }
    }

    const handleCustomUpdate = (e) => {
      if (e.detail) {
        setSettings(prev => {
          const merged = { ...prev, ...e.detail }
          applyDomUpdates(merged)
          return merged
        })
      } else {
        fetchPublicData()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('site_settings_updated', handleCustomUpdate)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('site_settings_updated', handleCustomUpdate)
    }
  }, [])

  const fetchPublicData = async () => {
    try {
      // 1. Fetch settings
      const settingsRes = await axios.get(`${API_URL}/settings/public`).catch((err) => {
        console.warn('API /settings/public fallback applied:', err?.message)
        return null
      })

      if (settingsRes?.data?.success && settingsRes.data.settings) {
        const remote = settingsRes.data.settings
        setSettings(prev => {
          const merged = { ...prev, ...remote }
          try {
            localStorage.setItem('site_settings_cache', JSON.stringify(merged))
          } catch (_) {}
          applyDomUpdates(merged)
          return merged
        })
      }

      // 2. Fetch navigation
      const navRes = await axios.get(`${API_URL}/navigation`).catch(() => null)
      if (navRes?.data?.success && navRes.data.menus) {
        setNavigation(navRes.data.menus)
      }
    } catch (e) {
      console.warn('Could not load dynamic public settings:', e.message)
    } finally {
      setLoading(false)
    }
  }

  const refreshSettings = async () => {
    return await fetchPublicData()
  }

  const updateLocalSettings = (newPartialSettings) => {
    setSettings(prev => {
      const merged = { ...prev, ...newPartialSettings }
      try {
        localStorage.setItem('site_settings_cache', JSON.stringify(merged))
      } catch (_) {}
      applyDomUpdates(merged)
      return merged
    })
    window.dispatchEvent(new CustomEvent('site_settings_updated', { detail: newPartialSettings }))
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        navigation,
        loading,
        refreshSettings,
        updateLocalSettings
      }}
    >
      {/* Maintenance Mode Screen for Public Visitors */}
      {settings.maintenanceMode && !window.location.pathname.startsWith('/admin') ? (
        <div className="min-h-screen bg-[#F8F7F4] text-[#111827] flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white border border-[#E5E7EB] rounded-3xl p-8 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-2xl">
              🛠️
            </div>
            <h1 className="text-2xl font-bold text-[#111827] mb-2">{settings.siteName} is Under Scheduled Maintenance</h1>
            <p className="text-[#475569] text-sm mb-6">
              We are currently optimizing our platform. We will be back online shortly.
            </p>
            <div className="text-xs text-[#475569] border-t border-[#E5E7EB] pt-4">
              Urgent inquiries: <a href={`mailto:${settings.contactEmail}`} className="text-[#111827] underline font-bold">{settings.contactEmail}</a>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </SettingsContext.Provider>
  )
}

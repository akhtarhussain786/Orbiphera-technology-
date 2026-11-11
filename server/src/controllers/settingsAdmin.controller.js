import mongoose from 'mongoose'
import WebsiteSetting from '../models/WebsiteSetting.model.js'
import { logAdminActivity } from '../middleware/adminAuth.middleware.js'
import localStore from '../utils/localStore.js'

export const getPublicSettings = async (req, res) => {
  try {
    let settings = null

    if (mongoose.connection.readyState === 1) {
      try {
        settings = await WebsiteSetting.findOne()
      } catch (err) {
        console.warn('⚠️ MongoDB WebsiteSetting fetch failed, falling back to localStore:', err.message)
      }
    }

    if (!settings) {
      settings = localStore.getSettings()
    }

    // Only return safe public properties
    res.json({
      success: true,
      settings: {
        siteName: settings.siteName || 'Yatharth It Solutions',
        tagline: settings.tagline || 'Digital Products. Limitless Possibilities.',
        preloaderTitle: settings.preloaderTitle || '',
        preloaderSubtitle: settings.preloaderSubtitle || '',
        logoUrl: settings.logoUrl || '',
        faviconUrl: settings.faviconUrl || '/favicon.ico',
        contactEmail: settings.contactEmail || 'contact@yathartitsolutions.com',
        contactPhone: settings.contactPhone || '+91 98765 43210',
        address: settings.address || 'Yathart IT Solutions, Digital Tech Hub, India',
        socialLinks: settings.socialLinks || {},
        defaultMetaTitle: settings.defaultMetaTitle || 'Yatharth It Solutions - Digital Products & Solutions Marketplace',
        defaultMetaDescription: settings.defaultMetaDescription || 'Premium digital marketplace for website templates, SaaS solutions, and custom digital engineering.',
        defaultOgImage: settings.defaultOgImage || '',
        googleAnalyticsId: settings.googleAnalyticsId || '',
        maintenanceMode: Boolean(settings.maintenanceMode),
        customHeaderScripts: settings.customHeaderScripts || '',
        customFooterScripts: settings.customFooterScripts || ''
      }
    })
  } catch (error) {
    console.error('getPublicSettings error:', error)
    // Always return localStore settings on any unexpected exception
    const fallback = localStore.getSettings()
    res.json({
      success: true,
      settings: fallback
    })
  }
}

export const getAdminSettings = async (req, res) => {
  try {
    let settings = null

    if (mongoose.connection.readyState === 1) {
      try {
        settings = await WebsiteSetting.findOne()
      } catch (err) {
        console.warn('⚠️ MongoDB getAdminSettings failed, using localStore:', err.message)
      }
    }

    if (!settings) {
      settings = localStore.getSettings()
    }

    res.json({ success: true, settings })
  } catch (error) {
    console.error('getAdminSettings error:', error)
    res.json({ success: true, settings: localStore.getSettings() })
  }
}

export const updateAdminSettings = async (req, res) => {
  try {
    const updatableFields = [
      'siteName', 'tagline', 'preloaderTitle', 'preloaderSubtitle', 'logoUrl', 'faviconUrl',
      'contactEmail', 'contactPhone', 'address', 'socialLinks',
      'defaultMetaTitle', 'defaultMetaDescription', 'defaultOgImage',
      'googleAnalyticsId', 'googleSearchConsoleKey', 'maintenanceMode',
      'customHeaderScripts', 'customFooterScripts'
    ]

    const updates = {}
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    })

    // 1. Immediately update persistent localStore
    const savedLocal = localStore.updateSettings(updates)

    // 2. Also update MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        let dbSettings = await WebsiteSetting.findOne()
        if (!dbSettings) {
          dbSettings = new WebsiteSetting(updates)
        } else {
          updatableFields.forEach(field => {
            if (updates[field] !== undefined) {
              dbSettings[field] = updates[field]
            }
          })
        }
        await dbSettings.save()
      } catch (dbErr) {
        console.warn('⚠️ Could not sync settings to MongoDB Atlas:', dbErr.message)
      }
    }

    try {
      await logAdminActivity(req, {
        action: 'UPDATE_WEBSITE_SETTINGS',
        entity: 'WebsiteSetting',
        details: `Updated general website configuration: ${updates.siteName || ''}`
      })
    } catch (_) {}

    res.json({ success: true, settings: savedLocal })
  } catch (error) {
    console.error('updateAdminSettings error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

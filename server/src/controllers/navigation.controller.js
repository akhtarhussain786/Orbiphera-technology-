import mongoose from 'mongoose'
import NavigationMenu from '../models/NavigationMenu.model.js'
import { logAdminActivity } from '../middleware/adminAuth.middleware.js'
import localStore from '../utils/localStore.js'

export const getAllMenus = async (req, res) => {
  try {
    let result = null

    if (mongoose.connection.readyState === 1) {
      try {
        const menus = await NavigationMenu.find()
        if (menus && menus.length > 0) {
          result = {
            header: menus.find(m => m.location === 'header')?.items || [],
            footer: menus.find(m => m.location === 'footer')?.items || []
          }
        }
      } catch (err) {
        console.warn('⚠️ MongoDB NavigationMenu fetch failed, using localStore:', err.message)
      }
    }

    if (!result) {
      result = localStore.getNavigation()
    }

    res.json({ success: true, menus: result })
  } catch (error) {
    console.error('getAllMenus error:', error)
    res.json({ success: true, menus: localStore.getNavigation() })
  }
}

export const updateMenu = async (req, res) => {
  try {
    const { location } = req.params
    const { items } = req.body

    if (!['header', 'footer'].includes(location)) {
      return res.status(400).json({ success: false, message: 'Invalid location. Must be "header" or "footer"' })
    }

    // 1. Update persistent local store
    localStore.updateNavigation(location, items)

    // 2. Sync to MongoDB if connected
    let menu = null
    if (mongoose.connection.readyState === 1) {
      try {
        menu = await NavigationMenu.findOne({ location })
        if (!menu) {
          menu = new NavigationMenu({ location, items: [] })
        }
        menu.items = items
        await menu.save()
      } catch (err) {
        console.warn('⚠️ MongoDB NavigationMenu update failed:', err.message)
      }
    }

    try {
      await logAdminActivity(req, {
        action: 'UPDATE_NAVIGATION_MENU',
        entity: 'NavigationMenu',
        details: `Updated ${location} navigation menu items (${items?.length || 0} items)`
      })
    } catch (_) {}

    res.json({ success: true, menu: { location, items } })
  } catch (error) {
    console.error('updateMenu error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

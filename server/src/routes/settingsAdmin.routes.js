import express from 'express'
import {
  getPublicSettings,
  getAdminSettings,
  updateAdminSettings
} from '../controllers/settingsAdmin.controller.js'
import { protectAdmin, requireRole } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

// Public
router.get('/public', getPublicSettings)

// Admin
router.get('/admin', protectAdmin, getAdminSettings)
router.put('/admin', protectAdmin, requireRole(['super_admin', 'admin']), updateAdminSettings)

export default router


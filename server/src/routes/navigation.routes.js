import express from 'express'
import { getAllMenus, updateMenu } from '../controllers/navigation.controller.js'
import { protectAdmin, requireRole } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

// Public
router.get('/', getAllMenus)

// Admin
router.put('/admin/:location', protectAdmin, requireRole(['super_admin', 'admin', 'editor']), updateMenu)

export default router


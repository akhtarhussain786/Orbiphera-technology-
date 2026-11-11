import express from 'express'
import {
  getAllContentSections,
  getContentSectionByKey,
  updateContentSection
} from '../controllers/content.controller.js'
import { protectAdmin, requireRole } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

// Public
router.get('/', getAllContentSections)
router.get('/:sectionKey', getContentSectionByKey)

// Admin
router.put('/admin/:sectionKey', protectAdmin, requireRole(['super_admin', 'admin', 'editor']), updateContentSection)

export default router


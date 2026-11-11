import express from 'express'
import {
  getPublicPages,
  getPageBySlug,
  getAdminPages,
  createPage,
  updatePage,
  togglePublishPage,
  deletePage
} from '../controllers/pages.controller.js'
import { protectAdmin, requireRole } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

// Public
router.get('/', getPublicPages)
router.get('/:slug', getPageBySlug)

// Admin
router.get('/admin/all', protectAdmin, getAdminPages)
router.post('/admin', protectAdmin, requireRole(['super_admin', 'admin', 'editor']), createPage)
router.put('/admin/:id', protectAdmin, requireRole(['super_admin', 'admin', 'editor']), updatePage)
router.patch('/admin/:id/publish', protectAdmin, requireRole(['super_admin', 'admin', 'editor']), togglePublishPage)
router.delete('/admin/:id', protectAdmin, requireRole(['super_admin', 'admin']), deletePage)

export default router


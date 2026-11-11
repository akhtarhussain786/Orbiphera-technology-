import express from 'express'
import {
  getSeoDashboardOverview,
  getSeoRecommendations,
  approveRecommendation,
  rejectRecommendation,
  runManualScan,
  updateSeoSettings,
  getChangeHistory,
  rollbackChange,
  getAutomationLogs
} from '../controllers/seoAdmin.controller.js'
import { protectAdmin, requireRole } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

router.get('/overview', protectAdmin, getSeoDashboardOverview)
router.get('/recommendations', protectAdmin, getSeoRecommendations)
router.post('/recommendations/:id/approve', protectAdmin, requireRole(['super_admin', 'admin', 'seo_manager']), approveRecommendation)
router.post('/recommendations/:id/reject', protectAdmin, requireRole(['super_admin', 'admin', 'seo_manager']), rejectRecommendation)
router.post('/scan-now', protectAdmin, requireRole(['super_admin', 'admin', 'seo_manager']), runManualScan)
router.put('/settings', protectAdmin, requireRole(['super_admin', 'admin']), updateSeoSettings)
router.get('/history', protectAdmin, getChangeHistory)
router.post('/history/:id/rollback', protectAdmin, requireRole(['super_admin', 'admin', 'seo_manager']), rollbackChange)
router.get('/automation-logs', protectAdmin, getAutomationLogs)

export default router


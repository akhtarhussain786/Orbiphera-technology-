import express from 'express'
import rateLimit from 'express-rate-limit'
import {
  trackPageView,
  trackHeartbeat,
  getAnalyticsOverview,
  getLiveActiveVisitors,
  getAnalyticsCharts,
  getGranularBreakdown,
  getBotAuditLogs
} from '../controllers/analytics.controller.js'
import { protectAdmin } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

// High-capacity rate limiter for public tracking beacon (180 requests per minute per IP)
const trackingLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 180,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Tracking rate limit exceeded' }
})

// Public Visitor & Heartbeat Ingestion
router.post('/track', trackingLimiter, trackPageView)
router.post('/heartbeat', trackingLimiter, trackHeartbeat)

// Protected Admin Analytics Endpoints - Support both /overview and /admin/overview
router.get('/admin/overview', protectAdmin, getAnalyticsOverview)
router.get('/overview', protectAdmin, getAnalyticsOverview)

router.get('/admin/live', protectAdmin, getLiveActiveVisitors)
router.get('/live', protectAdmin, getLiveActiveVisitors)

router.get('/admin/charts', protectAdmin, getAnalyticsCharts)
router.get('/charts', protectAdmin, getAnalyticsCharts)

router.get('/admin/breakdown', protectAdmin, getGranularBreakdown)
router.get('/breakdown', protectAdmin, getGranularBreakdown)

router.get('/admin/bots', protectAdmin, getBotAuditLogs)
router.get('/bots', protectAdmin, getBotAuditLogs)

export default router

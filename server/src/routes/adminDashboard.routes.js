import express from 'express'
import { getDashboardStats } from '../controllers/adminDashboard.controller.js'
import { protectAdmin } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

router.get('/stats', protectAdmin, getDashboardStats)

export default router


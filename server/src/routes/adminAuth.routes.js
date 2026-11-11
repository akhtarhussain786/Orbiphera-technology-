import express from 'express'
import {
  adminLogin,
  getAdminMe,
  adminLogout,
  adminForgotPassword,
  adminResetPassword
} from '../controllers/adminAuth.controller.js'
import { protectAdmin, adminLoginLimiter } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

router.post('/login', adminLoginLimiter, adminLogin)
router.get('/me', protectAdmin, getAdminMe)
router.post('/logout', protectAdmin, adminLogout)
router.post('/forgot-password', adminForgotPassword)
router.post('/reset-password', adminResetPassword)

export default router


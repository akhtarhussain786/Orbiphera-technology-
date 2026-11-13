import express from 'express'
import {
  adminLogin,
  getAdminMe,
  adminLogout,
  adminForgotPassword,
  adminResetPassword,
  updateAdminProfile,
  changeAdminPassword
} from '../controllers/adminAuth.controller.js'
import { protectAdmin, adminLoginLimiter } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

router.post('/login', adminLoginLimiter, adminLogin)
router.get('/me', protectAdmin, getAdminMe)
router.post('/logout', protectAdmin, adminLogout)
router.put('/profile', protectAdmin, updateAdminProfile)
router.put('/change-password', protectAdmin, changeAdminPassword)
router.post('/forgot-password', adminForgotPassword)
router.post('/reset-password', adminResetPassword)

export default router


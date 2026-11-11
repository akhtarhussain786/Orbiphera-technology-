import express from 'express'
import {
  getAllAdminUsers,
  createAdminUser,
  updateAdminUser,
  toggleAdminUserStatus,
  deleteAdminUser
} from '../controllers/usersAdmin.controller.js'
import { protectAdmin, requireRole } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

router.get('/', protectAdmin, getAllAdminUsers)
router.post('/', protectAdmin, requireRole(['super_admin']), createAdminUser)
router.put('/:id', protectAdmin, requireRole(['super_admin']), updateAdminUser)
router.patch('/:id/toggle-status', protectAdmin, requireRole(['super_admin']), toggleAdminUserStatus)
router.delete('/:id', protectAdmin, requireRole(['super_admin']), deleteAdminUser)

export default router


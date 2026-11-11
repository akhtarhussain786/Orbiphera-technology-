import express from 'express'
import {
  getAdminInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/inquiriesAdmin.controller.js'
import { protectAdmin, requireRole } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

router.get('/', protectAdmin, getAdminInquiries)
router.patch('/:id/status', protectAdmin, requireRole(['super_admin', 'admin', 'editor']), updateInquiryStatus)
router.delete('/:id', protectAdmin, requireRole(['super_admin', 'admin']), deleteInquiry)

export default router


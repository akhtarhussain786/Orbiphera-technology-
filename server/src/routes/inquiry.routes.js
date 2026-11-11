import express from 'express'
import { createInquiry, getInquiries } from '../controllers/inquiry.controller.js'
import { protect, admin } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/', createInquiry)
router.get('/', protect, admin, getInquiries)

export default router

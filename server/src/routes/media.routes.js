import express from 'express'
import {
  upload,
  getMediaList,
  uploadMediaFile,
  updateMediaAlt,
  deleteMediaItem
} from '../controllers/media.controller.js'
import { protectAdmin, requireRole } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

router.get('/', protectAdmin, getMediaList)
router.post('/upload', protectAdmin, requireRole(['super_admin', 'admin', 'editor']), upload.single('file'), uploadMediaFile)
router.put('/:id', protectAdmin, requireRole(['super_admin', 'admin', 'editor']), updateMediaAlt)
router.delete('/:id', protectAdmin, requireRole(['super_admin', 'admin']), deleteMediaItem)

export default router


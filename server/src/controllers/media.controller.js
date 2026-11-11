import path from 'path'
import fs from 'fs'
import multer from 'multer'
import MediaItem from '../models/MediaItem.model.js'
import { logAdminActivity } from '../middleware/adminAuth.middleware.js'

// Configure Multer storage
const uploadDir = path.resolve('uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    cb(null, uniqueName)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, SVG, and GIF image files are allowed.'), false)
  }
}

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter
})

export const getMediaList = async (req, res) => {
  try {
    const { folder, search, page = 1, limit = 24 } = req.query
    const filter = {}

    if (folder && folder !== 'all') {
      filter.folder = folder
    }

    if (search) {
      filter.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { altText: { $regex: search, $options: 'i' } }
      ]
    }

    const total = await MediaItem.countDocuments(filter)
    const media = await MediaItem.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({
      success: true,
      media,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const uploadMediaFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image file to upload' })
    }

    const fileUrl = `/uploads/${req.file.filename}`
    const mediaItem = await MediaItem.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: fileUrl,
      mimeType: req.file.mimetype,
      size: req.file.size,
      altText: req.body.altText || req.file.originalname.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      caption: req.body.caption || '',
      folder: req.body.folder || 'general',
      uploadedBy: req.admin?._id
    })

    await logAdminActivity(req, {
      action: 'UPLOAD_MEDIA',
      entity: 'MediaItem',
      entityId: mediaItem._id,
      details: `Uploaded media: ${mediaItem.originalName} (${(mediaItem.size / 1024).toFixed(1)} KB)`
    })

    res.status(201).json({ success: true, media: mediaItem })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateMediaAlt = async (req, res) => {
  try {
    const { altText, caption, folder } = req.body
    const media = await MediaItem.findById(req.params.id)

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media item not found' })
    }

    if (altText !== undefined) media.altText = altText
    if (caption !== undefined) media.caption = caption
    if (folder !== undefined) media.folder = folder

    await media.save()

    await logAdminActivity(req, {
      action: 'UPDATE_MEDIA_METADATA',
      entity: 'MediaItem',
      entityId: media._id,
      details: `Updated metadata/ALT for ${media.filename}`
    })

    res.json({ success: true, media })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteMediaItem = async (req, res) => {
  try {
    const media = await MediaItem.findById(req.params.id)
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media item not found' })
    }

    // Try deleting file from disk
    const filePath = path.resolve('uploads', media.filename)
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath)
      } catch (err) {
        console.warn('Could not delete disk file:', err.message)
      }
    }

    await MediaItem.findByIdAndDelete(req.params.id)

    await logAdminActivity(req, {
      action: 'DELETE_MEDIA',
      entity: 'MediaItem',
      entityId: media._id,
      details: `Deleted media file ${media.filename}`
    })

    res.json({ success: true, message: 'Media deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}


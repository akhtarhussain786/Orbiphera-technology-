import mongoose from 'mongoose'

const mediaItemSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  dimensions: {
    width: Number,
    height: Number
  },
  altText: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
  },
  folder: {
    type: String,
    default: 'general'
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true
})

const MediaItem = mongoose.model('MediaItem', mediaItemSchema)

export default MediaItem


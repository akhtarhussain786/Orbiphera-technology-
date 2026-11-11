import mongoose from 'mongoose'

const contentSectionSchema = new mongoose.Schema({
  sectionKey: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  pageSlug: {
    type: String,
    default: 'home'
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const ContentSection = mongoose.model('ContentSection', contentSectionSchema)

export default ContentSection


import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Page title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Page slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    default: ''
  },
  excerpt: {
    type: String,
    default: ''
  },
  template: {
    type: String,
    enum: ['default', 'landing', 'full-width', 'legal', 'contact'],
    default: 'default'
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'archived'],
    default: 'published'
  },
  // Technical & On-Page SEO fields
  metaTitle: {
    type: String,
    trim: true,
    default: ''
  },
  metaDescription: {
    type: String,
    trim: true,
    default: ''
  },
  primaryKeyword: {
    type: String,
    trim: true,
    default: ''
  },
  secondaryKeywords: {
    type: [String],
    default: []
  },
  canonicalUrl: {
    type: String,
    default: ''
  },
  ogTitle: {
    type: String,
    default: ''
  },
  ogDescription: {
    type: String,
    default: ''
  },
  ogImage: {
    type: String,
    default: ''
  },
  h1Heading: {
    type: String,
    default: ''
  },
  suggestedH2s: {
    type: [String],
    default: []
  },
  schemaType: {
    type: String,
    enum: ['WebPage', 'AboutPage', 'ContactPage', 'ItemPage', 'Article', 'FAQPage'],
    default: 'WebPage'
  },
  views: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser'
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Index for fast status queries
pageSchema.index({ status: 1 })

const Page = mongoose.model('Page', pageSchema)

export default Page

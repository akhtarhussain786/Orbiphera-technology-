import mongoose from 'mongoose'

const seoIssueSchema = new mongoose.Schema({
  pageId: String,
  pageSlug: String,
  pageTitle: String,
  type: {
    type: String,
    enum: [
      'missing_title',
      'missing_description',
      'title_length',
      'description_length',
      'duplicate_title',
      'duplicate_description',
      'missing_h1',
      'duplicate_h1',
      'missing_alt',
      'broken_link',
      'canonical_issue',
      'thin_content',
      'keyword_deficiency',
      'missing_schema',
      'sitemap_issue'
    ]
  },
  severity: {
    type: String,
    enum: ['critical', 'warning', 'info'],
    default: 'warning'
  },
  message: String,
  details: String
}, { _id: false })

const seoAuditLogSchema = new mongoose.Schema({
  scanDate: {
    type: Date,
    default: Date.now
  },
  overallScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  technicalScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  onPageScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  contentScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  totalPagesScanned: {
    type: Number,
    default: 0
  },
  summary: {
    missingTitles: { type: Number, default: 0 },
    missingDescriptions: { type: Number, default: 0 },
    duplicateTitles: { type: Number, default: 0 },
    duplicateDescriptions: { type: Number, default: 0 },
    missingAltTags: { type: Number, default: 0 },
    brokenLinks: { type: Number, default: 0 },
    canonicalIssues: { type: Number, default: 0 },
    sitemapIssues: { type: Number, default: 0 }
  },
  issues: [seoIssueSchema],
  scanDurationMs: {
    type: Number,
    default: 0
  },
  triggerType: {
    type: String,
    enum: ['scheduled_cron', 'manual_admin'],
    default: 'scheduled_cron'
  }
}, {
  timestamps: true
})

const SeoAuditLog = mongoose.model('SeoAuditLog', seoAuditLogSchema)

export default SeoAuditLog


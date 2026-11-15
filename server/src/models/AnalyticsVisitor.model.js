import mongoose from 'mongoose'

const analyticsVisitorSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  firstSeen: {
    type: Date,
    default: Date.now,
    index: true
  },
  lastSeen: {
    type: Date,
    default: Date.now,
    index: true
  },
  totalSessions: {
    type: Number,
    default: 1
  },
  totalPageViews: {
    type: Number,
    default: 1
  },
  isHuman: {
    type: Boolean,
    default: true,
    index: true
  },
  isBot: {
    type: Boolean,
    default: false,
    index: true
  },
  botScore: {
    type: Number,
    default: 0 // 0 = verified human, 100 = verified bot
  },
  botCategory: {
    type: String,
    default: 'none'
  },
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet', 'unknown'],
    default: 'desktop',
    index: true
  },
  os: {
    type: String,
    default: 'Unknown'
  },
  browser: {
    type: String,
    default: 'Unknown',
    index: true
  },
  browserVersion: {
    type: String,
    default: ''
  },
  screenResolution: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: 'India',
    index: true
  },
  countryCode: {
    type: String,
    default: 'IN',
    index: true
  },
  region: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: '',
    index: true
  },
  firstReferrer: {
    type: String,
    default: 'Direct'
  },
  firstLandingPage: {
    type: String,
    default: '/'
  },
  ipHash: {
    type: String,
    index: true
  },
  anonymizedIp: {
    type: String,
    default: ''
  },
  utmFirst: {
    source: { type: String, default: '' },
    medium: { type: String, default: '' },
    campaign: { type: String, default: '' },
    term: { type: String, default: '' },
    content: { type: String, default: '' }
  }
}, {
  timestamps: true
})

// Compound index for fast queries
analyticsVisitorSchema.index({ isHuman: 1, lastSeen: -1 })
analyticsVisitorSchema.index({ countryCode: 1, isHuman: 1 })

const AnalyticsVisitor = mongoose.model('AnalyticsVisitor', analyticsVisitorSchema)

export default AnalyticsVisitor

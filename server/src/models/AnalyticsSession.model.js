import mongoose from 'mongoose'

const analyticsSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  visitorId: {
    type: String,
    required: true,
    index: true
  },
  startedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  lastActivityAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  durationSeconds: {
    type: Number,
    default: 0
  },
  pageViewCount: {
    type: Number,
    default: 1
  },
  landingPage: {
    type: String,
    default: '/'
  },
  exitPage: {
    type: String,
    default: '/'
  },
  referrer: {
    type: String,
    default: 'Direct'
  },
  referrerDomain: {
    type: String,
    default: 'direct',
    index: true
  },
  trafficType: {
    type: String,
    enum: ['human', 'bot', 'suspicious'],
    default: 'human',
    index: true
  },
  isReturning: {
    type: Boolean,
    default: false,
    index: true
  },
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet', 'unknown'],
    default: 'desktop',
    index: true
  },
  browser: {
    type: String,
    default: 'Unknown'
  },
  os: {
    type: String,
    default: 'Unknown'
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
  city: {
    type: String,
    default: '',
    index: true
  },
  utm: {
    source: { type: String, default: '' },
    medium: { type: String, default: '' },
    campaign: { type: String, default: '' },
    term: { type: String, default: '' },
    content: { type: String, default: '' }
  },
  botReason: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

// Index for live visitors: sessions active in the last 5 minutes
analyticsSessionSchema.index({ trafficType: 1, lastActivityAt: -1 })
analyticsSessionSchema.index({ startedAt: -1, trafficType: 1 })

const AnalyticsSession = mongoose.model('AnalyticsSession', analyticsSessionSchema)

export default AnalyticsSession


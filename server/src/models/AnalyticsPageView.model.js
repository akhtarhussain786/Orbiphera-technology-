import mongoose from 'mongoose'

const analyticsPageViewSchema = new mongoose.Schema({
  pageViewId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  visitorId: {
    type: String,
    required: true,
    index: true
  },
  path: {
    type: String,
    required: true,
    index: true
  },
  fullUrl: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  referrer: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  trafficType: {
    type: String,
    enum: ['human', 'bot', 'suspicious'],
    default: 'human',
    index: true
  },
  deviceType: {
    type: String,
    default: 'desktop'
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
  city: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

analyticsPageViewSchema.index({ trafficType: 1, timestamp: -1 })
analyticsPageViewSchema.index({ path: 1, trafficType: 1 })

const AnalyticsPageView = mongoose.model('AnalyticsPageView', analyticsPageViewSchema)

export default AnalyticsPageView


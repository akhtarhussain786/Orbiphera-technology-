import mongoose from 'mongoose'

const analyticsBotLogSchema = new mongoose.Schema({
  botName: {
    type: String,
    required: true,
    index: true
  },
  botCategory: {
    type: String,
    enum: [
      'search_crawler',
      'ai_crawler',
      'seo_crawler',
      'headless_automation',
      'automated_script',
      'spam_bot',
      'suspicious_traffic'
    ],
    default: 'search_crawler',
    index: true
  },
  ipHash: {
    type: String,
    default: ''
  },
  anonymizedIp: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: '/',
    index: true
  },
  detectionMethod: {
    type: String,
    enum: [
      'user_agent',
      'webdriver_flag',
      'headless_signal',
      'missing_browser_headers',
      'rate_limit',
      'behavioral'
    ],
    default: 'user_agent'
  },
  details: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: 'Unknown'
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
})

analyticsBotLogSchema.index({ botCategory: 1, timestamp: -1 })

const AnalyticsBotLog = mongoose.model('AnalyticsBotLog', analyticsBotLogSchema)

export default AnalyticsBotLog


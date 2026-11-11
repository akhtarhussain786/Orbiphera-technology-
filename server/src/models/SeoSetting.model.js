import mongoose from 'mongoose'

const seoSettingSchema = new mongoose.Schema({
  automationMode: {
    type: String,
    enum: ['approval', 'auto'],
    default: 'approval' // DEFAULT IS STRICT APPROVAL MODE as requested
  },
  scanSchedule: {
    type: String,
    default: '0 2 * * *' // 02:00 AM daily
  },
  aiProvider: {
    type: String,
    enum: ['heuristic', 'openai', 'gemini'],
    default: 'heuristic'
  },
  aiApiKey: {
    type: String,
    default: '',
    select: false // Never returned in public endpoints
  },
  aiModel: {
    type: String,
    default: 'gpt-4o-mini'
  },
  autoApplySafeMeta: {
    type: Boolean,
    default: false
  },
  isAutomationPaused: {
    type: Boolean,
    default: false
  },
  lastScanDate: {
    type: Date,
    default: null
  },
  nextScanDate: {
    type: Date,
    default: null
  },
  totalTokensUsed: {
    type: Number,
    default: 0
  },
  estimatedCostUsd: {
    type: Number,
    default: 0
  },
  googleSearchConsoleConnected: {
    type: Boolean,
    default: false
  },
  googleAnalyticsConnected: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const SeoSetting = mongoose.model('SeoSetting', seoSettingSchema)

export default SeoSetting


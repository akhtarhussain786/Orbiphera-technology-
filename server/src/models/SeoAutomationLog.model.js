import mongoose from 'mongoose'

const seoAutomationLogSchema = new mongoose.Schema({
  executionDate: {
    type: Date,
    default: Date.now
  },
  durationMs: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['success', 'warning', 'failed'],
    default: 'success'
  },
  trigger: {
    type: String,
    enum: ['daily_cron', 'manual_admin', 'manual_run'],
    default: 'daily_cron'
  },
  pagesProcessed: {
    type: Number,
    default: 0
  },
  recommendationsGenerated: {
    type: Number,
    default: 0
  },
  autoAppliedCount: {
    type: Number,
    default: 0
  },
  tokenUsage: {
    type: Number,
    default: 0
  },
  estimatedCost: {
    type: Number,
    default: 0
  },
  logs: [String],
  errorMessage: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})

const SeoAutomationLog = mongoose.model('SeoAutomationLog', seoAutomationLogSchema)

export default SeoAutomationLog

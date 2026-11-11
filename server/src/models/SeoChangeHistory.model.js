import mongoose from 'mongoose'

const seoChangeHistorySchema = new mongoose.Schema({
  targetType: {
    type: String,
    enum: ['page', 'product'],
    default: 'page'
  },
  targetId: {
    type: String,
    required: true
  },
  pageUrl: {
    type: String,
    required: true
  },
  recommendationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SeoRecommendation'
  },
  appliedBy: {
    type: String,
    enum: ['admin_manual', 'ai_auto'],
    default: 'admin_manual'
  },
  appliedByUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser'
  },
  changes: [
    {
      field: String,
      previousValue: mongoose.Schema.Types.Mixed,
      newValue: mongoose.Schema.Types.Mixed
    }
  ],
  isRolledBack: {
    type: Boolean,
    default: false
  },
  rolledBackAt: Date,
  rolledBackByUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true
})

const SeoChangeHistory = mongoose.model('SeoChangeHistory', seoChangeHistorySchema)

export default SeoChangeHistory


import mongoose from 'mongoose'

const seoRecommendationSchema = new mongoose.Schema({
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
  pageTitle: {
    type: String,
    required: true
  },
  currentData: {
    title: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    primaryKeyword: { type: String, default: '' },
    h1Heading: { type: String, default: '' },
    ogTitle: { type: String, default: '' },
    ogDescription: { type: String, default: '' }
  },
  suggestedData: {
    title: { type: String, required: true },
    metaDescription: { type: String, required: true },
    primaryKeyword: { type: String, default: '' },
    secondaryKeywords: { type: [String], default: [] },
    searchIntent: { type: String, default: 'Informational/Commercial' },
    suggestedH1: { type: String, default: '' },
    suggestedH2s: { type: [String], default: [] },
    ogTitle: { type: String, default: '' },
    ogDescription: { type: String, default: '' },
    imageAltSuggestions: { type: [String], default: [] },
    internalLinkSuggestions: { type: [String], default: [] },
    faqSuggestions: [
      {
        question: String,
        answer: String
      }
    ],
    schemaRecommendation: {
      type: { type: String, default: 'WebPage' },
      jsonLdSnippet: { type: String, default: '' }
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'applied'],
    default: 'pending'
  },
  mode: {
    type: String,
    enum: ['approval', 'auto'],
    default: 'approval'
  },
  aiConfidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 88
  },
  aiProvider: {
    type: String,
    default: 'heuristic'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser'
  },
  reviewedAt: Date,
  appliedAt: Date,
  rejectionReason: String
}, {
  timestamps: true
})

const SeoRecommendation = mongoose.model('SeoRecommendation', seoRecommendationSchema)

export default SeoRecommendation


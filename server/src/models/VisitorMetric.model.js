import mongoose from 'mongoose'

const visitorMetricSchema = new mongoose.Schema({
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    unique: true,
    index: true
  },
  pageViews: {
    type: Number,
    default: 0
  },
  uniqueVisitors: {
    type: Number,
    default: 0
  },
  ipHashes: {
    type: [String],
    default: []
  },
  pathCounts: {
    type: Map,
    of: Number,
    default: {}
  },
  deviceCounts: {
    desktop: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 }
  }
}, {
  timestamps: true
})

const VisitorMetric = mongoose.model('VisitorMetric', visitorMetricSchema)

export default VisitorMetric


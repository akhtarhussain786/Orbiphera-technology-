import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema({
  projectType: {
    type: String,
    required: [true, 'Project type is required'],
    default: 'Website Development'
  },
  serviceType: {
    type: String,
    default: 'Website Development'
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    default: 'Client'
  },
  lastName: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  companyName: {
    type: String,
    default: null,
    trim: true
  },
  industry: {
    type: String,
    default: null
  },
  projectDescription: {
    type: String,
    required: [true, 'Project description is required']
  },
  requiredFeatures: {
    type: String,
    default: null
  },
  preferredTechnology: {
    type: String,
    default: null
  },
  timeline: {
    type: String,
    default: 'Immediate'
  },
  budget: {
    type: String,
    default: null
  },
  budgetRange: {
    type: String,
    default: null
  },
  needHosting: {
    type: Boolean,
    default: false
  },
  needMaintenance: {
    type: Boolean,
    default: false
  },
  needDomain: {
    type: Boolean,
    default: false
  },
  needMigration: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Proposal Sent', 'In Discussion', 'Won', 'Lost'],
    default: 'New'
  },
  adminNotes: {
    type: String,
    default: null
  },
  quotedAmount: {
    type: Number,
    default: null
  },
  quoteSentAt: Date,
  contactedAt: Date
}, {
  timestamps: true
})

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema)

export default Inquiry

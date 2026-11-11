import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema({
  projectType: {
    type: String,
    required: [true, 'Project type is required'],
    enum: ['Website', 'Web application', 'CRM', 'Hospital management', 'Institute management', 'Resort management', 'E-commerce', 'Inventory management', 'Mobile application', 'Other']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  companyName: {
    type: String,
    default: null
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
    default: null
  },
  budget: {
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

const Inquiry = mongoose.model('Inquiry', inquirySchema)

export default Inquiry

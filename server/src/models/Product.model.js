import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required']
  },
  type: {
    type: String,
    enum: ['template', 'software'],
    required: [true, 'Product type is required']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  extendedPrice: {
    type: Number,
    default: null
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  thumbnail: {
    type: String,
    required: [true, 'Product thumbnail is required']
  },
  features: [String],
  technologies: [String],
  demoUrl: {
    type: String,
    default: null
  },
  documentationUrl: {
    type: String,
    default: null
  },
  fileUrl: {
    type: String,
    default: null
  },
  version: {
    type: String,
    default: '1.0.0'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isFree: {
    type: Boolean,
    default: false
  },
  licenseType: {
    type: String,
    enum: ['regular', 'extended'],
    default: 'regular'
  },
  supportInfo: {
    type: String,
    default: 'Email support available'
  },
  installationGuide: {
    type: String,
    default: null
  },
  changelog: [{
    version: String,
    date: Date,
    changes: [String]
  }],
  browserCompatibility: [String],
  responsive: {
    type: Boolean,
    default: true
  },
  downloads: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  metaTitle: String,
  metaDescription: String
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product

import mongoose from 'mongoose'

const websiteSettingSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'NEXVORA'
  },
  tagline: {
    type: String,
    default: 'Digital Products. Limitless Possibilities.'
  },
  preloaderTitle: {
    type: String,
    default: ''
  },
  preloaderSubtitle: {
    type: String,
    default: ''
  },
  logoUrl: {
    type: String,
    default: ''
  },
  faviconUrl: {
    type: String,
    default: '/favicon.ico'
  },
  contactEmail: {
    type: String,
    default: 'info@nexvora.com'
  },
  contactPhone: {
    type: String,
    default: '+91 98765 43210'
  },
  address: {
    type: String,
    default: 'Digital IT Park, Tech Hub, India'
  },
  socialLinks: {
    twitter: { type: String, default: 'https://twitter.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    github: { type: String, default: 'https://github.com' },
    instagram: { type: String, default: 'https://instagram.com' },
    facebook: { type: String, default: 'https://facebook.com' },
    youtube: { type: String, default: '' }
  },
  defaultMetaTitle: {
    type: String,
    default: 'NEXVORA - Digital Products & Solutions Marketplace'
  },
  defaultMetaDescription: {
    type: String,
    default: 'Premium digital marketplace for website templates, business software, SaaS solutions, and custom digital engineering.'
  },
  defaultOgImage: {
    type: String,
    default: ''
  },
  googleAnalyticsId: {
    type: String,
    default: ''
  },
  googleSearchConsoleKey: {
    type: String,
    default: ''
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  customHeaderScripts: {
    type: String,
    default: ''
  },
  customFooterScripts: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

const WebsiteSetting = mongoose.model('WebsiteSetting', websiteSettingSchema)

export default WebsiteSetting


import mongoose from 'mongoose'

const websiteSettingSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Orbiphera Technologies'
  },
  tagline: {
    type: String,
    default: 'Website, Software & App Development'
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
    default: '/logo.png'
  },
  faviconUrl: {
    type: String,
    default: '/favicon.ico'
  },
  contactEmail: {
    type: String,
    default: 'contact@orbiphera.in'
  },
  contactPhone: {
    type: String,
    default: '+91 98765 43210'
  },
  address: {
    type: String,
    default: 'Orbiphera Technologies, Digital Tech Hub, India'
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
    default: 'Orbiphera Technologies | Website, Software & App Development'
  },
  defaultMetaDescription: {
    type: String,
    default: 'Orbiphera Technologies is a premier software development, custom web applications, mobile apps, and enterprise digital solutions engineering company. Scalable, high-performance, and SEO-ready.'
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


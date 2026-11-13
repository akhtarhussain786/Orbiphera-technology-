import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import fs from 'fs'

// Existing Routes
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import categoryRoutes from './routes/category.routes.js'
import inquiryRoutes from './routes/inquiry.routes.js'

// New Architecture Routes
import adminAuthRoutes from './routes/adminAuth.routes.js'
import adminDashboardRoutes from './routes/adminDashboard.routes.js'
import pagesRoutes from './routes/pages.routes.js'
import contentRoutes from './routes/content.routes.js'
import navigationRoutes from './routes/navigation.routes.js'
import mediaRoutes from './routes/media.routes.js'
import usersAdminRoutes from './routes/usersAdmin.routes.js'
import inquiriesAdminRoutes from './routes/inquiriesAdmin.routes.js'
import settingsAdminRoutes from './routes/settingsAdmin.routes.js'
import seoAdminRoutes from './routes/seoAdmin.routes.js'
import sitemapRoutes from './routes/sitemap.routes.js'

// Middleware & Utilities
import { trackVisitor } from './middleware/tracking.middleware.js'
import { seedInitialData } from './utils/seedData.js'
import { initCronScheduler } from './cron/scheduler.js'

if (fs.existsSync(path.resolve('server/.env'))) {
  dotenv.config({ path: path.resolve('server/.env') })
} else {
  dotenv.config()
}

const app = express()
const PORT = process.env.PORT || 5000

// Ensure uploads folder exists
const uploadDir = path.resolve('uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://orbiphera.in',
  'https://www.orbiphera.in',
  process.env.CLIENT_URL
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile, curl, Postman, server-to-server)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin) || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true)
    }
    return callback(null, true) // In local development, always permit
  },
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Serve static uploads for images/media
app.use('/uploads', express.static(uploadDir))

// Real-time visitor metric tracking
app.use(trackVisitor)

// Technical SEO: Dynamic Sitemap & Robots.txt
app.use('/', sitemapRoutes)

// Prevent Mongoose from buffering queries indefinitely when offline
mongoose.set('bufferCommands', false)

// Database connection & Seeding
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexvora'
console.log('🔄 Attempting MongoDB Atlas connection...')

mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 3000,
  connectTimeoutMS: 3000
})
  .then(async () => {
    console.log('✅ Connected to MongoDB Atlas')
    await seedInitialData()
    await initCronScheduler()
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB Atlas is currently offline or unreachable. High-Availability Local Store is ACTIVE.')
    console.warn('Reason:', err.message)
  })

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'NEXVORA / YathartITSolutions Full API & AI SEO Automation Engine is running',
    timestamp: new Date().toISOString()
  })
})

// Public & Customer Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/pages', pagesRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/navigation', navigationRoutes)
app.use('/api/settings', settingsAdminRoutes)

// Advanced Admin Panel Routes
app.use('/api/admin/auth', adminAuthRoutes)
app.use('/api/admin/dashboard', adminDashboardRoutes)
app.use('/api/admin/pages', pagesRoutes)
app.use('/api/admin/content', contentRoutes)
app.use('/api/admin/navigation', navigationRoutes)
app.use('/api/admin/media', mediaRoutes)
app.use('/api/admin/users', usersAdminRoutes)
app.use('/api/admin/inquiries', inquiriesAdminRoutes)
app.use('/api/admin/settings', settingsAdminRoutes)
app.use('/api/admin/seo', seoAdminRoutes)

// Global Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
})

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API Route not found' })
})

// Serve React Frontend Production Build (Single-Port Full-Stack Deployment)
const clientDistPath = path.resolve('client/dist')
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath))
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/uploads')) {
      return next()
    }
    res.sendFile(path.join(clientDistPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`🚀 NEXVORA / YathartITSolutions Server running on port ${PORT}`)
  console.log(`📡 Admin API available at http://localhost:${PORT}/api/admin`)
})

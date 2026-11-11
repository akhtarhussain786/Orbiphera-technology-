import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import AdminUser from '../models/AdminUser.model.js'
import AdminActivityLog from '../models/AdminActivityLog.model.js'
import localStore from '../utils/localStore.js'

// Strict login rate limiter for Admin authentication
export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // Permit up to 30 attempts per 15 minutes in development
  message: {
    success: false,
    message: 'Too many admin login attempts from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// Protect admin routes middleware
export const protectAdmin = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied: Admin authentication token required'
    })
  }

  try {
    const secret = process.env.JWT_SECRET || 'nexvora_jwt_secret_key_development_change_in_production_12345678'
    const decoded = jwt.verify(token, secret)

    let admin = null
    if (mongoose.connection.readyState === 1) {
      try {
        admin = await AdminUser.findById(decoded.id).select('-password')
      } catch (_) {}
    }

    if (!admin) {
      admin = localStore.findAdminById(decoded.id)
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin token: Account does not exist'
      })
    }

    if (admin.isActive === false) {
      return res.status(403).json({
        success: false,
        message: 'Admin account has been deactivated. Contact SuperAdmin.'
      })
    }

    req.admin = admin
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired admin session. Please log in again.'
    })
  }
}

// Require specific roles or permissions
export const requireRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ success: false, message: 'Authentication required' })
    }

    if (req.admin.role === 'super_admin') {
      return next() // Super admin has full access
    }

    if (roles.length > 0 && !roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: This action requires one of the following roles: [${roles.join(', ')}]`
      })
    }

    next()
  }
}

// Helper to record an admin activity log
export const logAdminActivity = async (req, { action, entity, entityId = null, details = '' }) => {
  try {
    if (!req.admin) return
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1'
    const userAgent = req.headers['user-agent'] || ''

    if (mongoose.connection.readyState === 1) {
      try {
        await AdminActivityLog.create({
          adminId: req.admin._id,
          adminEmail: req.admin.email,
          action,
          entity,
          entityId: entityId ? entityId.toString() : null,
          details,
          ip,
          userAgent
        })
      } catch (_) {}
    }

    // Always log to localStore
    localStore.addActivityLog({
      adminEmail: req.admin.email,
      action,
      entity,
      details,
      ip
    })
  } catch (error) {
    console.error('Failed to log admin activity:', error.message)
  }
}

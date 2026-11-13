import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import AdminUser from '../models/AdminUser.model.js'
import User from '../models/User.model.js'
import { logAdminActivity } from '../middleware/adminAuth.middleware.js'
import localStore from '../utils/localStore.js'

export const getAllAdminUsers = async (req, res) => {
  try {
    let adminUsers = []
    let regularUsers = []
    const isDbConnected = mongoose.connection.readyState === 1

    if (isDbConnected) {
      try {
        adminUsers = await AdminUser.find().select('-password').sort({ createdAt: -1 })
        regularUsers = await User.find().select('-password').sort({ createdAt: -1 }).limit(50)
      } catch (_) {}
    }

    if (!adminUsers || adminUsers.length === 0) {
      adminUsers = localStore.getAdminUsers().map(u => ({
        _id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        permissions: u.permissions,
        phone: u.phone,
        isActive: u.isActive,
        createdAt: u.createdAt
      }))
    }

    res.json({
      success: true,
      adminUsers,
      regularUsers
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const createAdminUser = async (req, res) => {
  try {
    const { name, email, password, role, permissions, phone } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' })
    }

    const cleanEmail = email.toLowerCase().trim()
    const isDbConnected = mongoose.connection.readyState === 1

    if (isDbConnected) {
      const existing = await AdminUser.findOne({ email: cleanEmail })
      if (existing) {
        return res.status(400).json({ success: false, message: 'Admin with this email already exists' })
      }
    }

    const localExisting = localStore.findAdminByEmail(cleanEmail)
    if (localExisting) {
      return res.status(400).json({ success: false, message: 'Admin with this email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    let newAdmin = null

    if (isDbConnected) {
      try {
        newAdmin = await AdminUser.create({
          name,
          email: cleanEmail,
          password: hashedPassword,
          role: role || 'admin',
          permissions: permissions || ['dashboard', 'pages', 'content', 'navigation', 'media', 'inquiries', 'seo'],
          phone: phone || null,
          isActive: true
        })
      } catch (_) {}
    }

    const localCreated = localStore.createAdminUser({
      _id: newAdmin ? newAdmin._id.toString() : `admin_${Date.now()}`,
      name,
      email: cleanEmail,
      password: hashedPassword,
      role: role || 'admin',
      permissions: permissions || ['dashboard', 'pages', 'content', 'navigation', 'media', 'inquiries', 'seo'],
      phone: phone || null,
      isActive: true
    })

    const finalAdmin = newAdmin || localCreated

    try {
      await logAdminActivity(req, {
        action: 'CREATE_ADMIN_USER',
        entity: 'AdminUser',
        entityId: finalAdmin._id,
        details: `Created new admin user: ${finalAdmin.email} with role ${finalAdmin.role}`
      })
    } catch (_) {}

    res.status(201).json({
      success: true,
      admin: {
        _id: finalAdmin._id,
        name: finalAdmin.name,
        email: finalAdmin.email,
        role: finalAdmin.role,
        permissions: finalAdmin.permissions,
        isActive: finalAdmin.isActive
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateAdminUser = async (req, res) => {
  try {
    const adminId = req.params.id
    const { name, email, role, permissions, phone, password } = req.body
    const isDbConnected = mongoose.connection.readyState === 1
    let admin = null

    if (isDbConnected) {
      try {
        admin = await AdminUser.findById(adminId)
      } catch (_) {}
    }

    let localAdmin = localStore.findAdminById(adminId)

    if (!admin && !localAdmin) {
      return res.status(404).json({ success: false, message: 'Admin user not found' })
    }

    let hashedPassword = null
    if (password && password.trim().length >= 6) {
      hashedPassword = await bcrypt.hash(password.trim(), 10)
    }

    const updates = {}
    if (name) updates.name = name.trim()
    if (email) updates.email = email.toLowerCase().trim()
    if (role) updates.role = role
    if (permissions) updates.permissions = permissions
    if (phone !== undefined) updates.phone = phone
    if (hashedPassword) updates.password = hashedPassword

    if (admin) {
      if (updates.name) admin.name = updates.name
      if (updates.email) admin.email = updates.email
      if (updates.role) admin.role = updates.role
      if (updates.permissions) admin.permissions = updates.permissions
      if (updates.phone !== undefined) admin.phone = updates.phone
      if (hashedPassword) admin.password = hashedPassword
      await admin.save()
    }

    if (localAdmin) {
      localStore.updateAdminUser(adminId, updates)
    } else {
      localStore.createAdminUser({
        _id: adminId,
        name: updates.name || admin?.name,
        email: updates.email || admin?.email,
        password: hashedPassword || admin?.password || bcrypt.hashSync('Admin@123456', 10),
        role: updates.role || admin?.role || 'admin',
        permissions: updates.permissions || admin?.permissions || []
      })
    }

    try {
      await logAdminActivity(req, {
        action: 'UPDATE_ADMIN_USER',
        entity: 'AdminUser',
        entityId: adminId,
        details: `Updated admin profile for: ${updates.email || admin?.email || localAdmin?.email}`
      })
    } catch (_) {}

    const result = admin || localStore.findAdminById(adminId)

    res.json({
      success: true,
      message: 'Admin updated successfully',
      admin: {
        _id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
        permissions: result.permissions,
        isActive: result.isActive
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const toggleAdminUserStatus = async (req, res) => {
  try {
    const adminId = req.params.id
    const isDbConnected = mongoose.connection.readyState === 1
    let admin = null

    if (isDbConnected) {
      try {
        admin = await AdminUser.findById(adminId)
      } catch (_) {}
    }

    let localAdmin = localStore.findAdminById(adminId)

    if (!admin && !localAdmin) {
      return res.status(404).json({ success: false, message: 'Admin user not found' })
    }

    // Prevent deactivating own account
    if (String(adminId) === String(req.admin._id)) {
      return res.status(400).json({ success: false, message: 'Cannot deactivate your own logged-in account' })
    }

    let newStatus = true
    if (admin) {
      admin.isActive = !admin.isActive
      await admin.save()
      newStatus = admin.isActive
    }

    if (localAdmin) {
      const toggled = localStore.toggleAdminUserStatus(adminId)
      if (toggled) newStatus = toggled.isActive
    }

    try {
      await logAdminActivity(req, {
        action: 'TOGGLE_ADMIN_STATUS',
        entity: 'AdminUser',
        entityId: adminId,
        details: `Admin ${admin?.email || localAdmin?.email} status changed to ${newStatus ? 'Active' : 'Deactivated'}`
      })
    } catch (_) {}

    res.json({ success: true, isActive: newStatus })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteAdminUser = async (req, res) => {
  try {
    const adminId = req.params.id
    const isDbConnected = mongoose.connection.readyState === 1
    let admin = null

    if (isDbConnected) {
      try {
        admin = await AdminUser.findById(adminId)
      } catch (_) {}
    }

    let localAdmin = localStore.findAdminById(adminId)

    if (!admin && !localAdmin) {
      return res.status(404).json({ success: false, message: 'Admin user not found' })
    }

    if (String(adminId) === String(req.admin._id)) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own logged-in account' })
    }

    if ((admin?.role === 'super_admin' || localAdmin?.role === 'super_admin') && req.admin.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Only a SuperAdmin can delete another SuperAdmin' })
    }

    if (admin) {
      await AdminUser.findByIdAndDelete(adminId)
    }
    if (localAdmin) {
      localStore.deleteAdminUser(adminId)
    }

    try {
      await logAdminActivity(req, {
        action: 'DELETE_ADMIN_USER',
        entity: 'AdminUser',
        entityId: adminId,
        details: `Deleted admin user: ${admin?.email || localAdmin?.email}`
      })
    } catch (_) {}

    res.json({ success: true, message: 'Admin user deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}


import bcrypt from 'bcryptjs'
import AdminUser from '../models/AdminUser.model.js'
import User from '../models/User.model.js'
import { logAdminActivity } from '../middleware/adminAuth.middleware.js'

export const getAllAdminUsers = async (req, res) => {
  try {
    const adminUsers = await AdminUser.find().select('-password').sort({ createdAt: -1 })
    const regularUsers = await User.find().select('-password').sort({ createdAt: -1 }).limit(50)

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

    const existing = await AdminUser.findOne({ email: email.toLowerCase().trim() })
    if (existing) {
      return res.status(400).json({ success: false, message: 'Admin with this email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = await AdminUser.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || 'admin',
      permissions: permissions || ['dashboard', 'pages', 'content', 'navigation', 'media', 'inquiries', 'seo'],
      phone: phone || null,
      isActive: true
    })

    await logAdminActivity(req, {
      action: 'CREATE_ADMIN_USER',
      entity: 'AdminUser',
      entityId: newAdmin._id,
      details: `Created new admin user: ${newAdmin.email} with role ${newAdmin.role}`
    })

    res.status(201).json({
      success: true,
      admin: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        permissions: newAdmin.permissions,
        isActive: newAdmin.isActive
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateAdminUser = async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.params.id)
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin user not found' })
    }

    const { name, email, role, permissions, phone, password } = req.body

    if (name) admin.name = name
    if (email) admin.email = email.toLowerCase().trim()
    if (role) admin.role = role
    if (permissions) admin.permissions = permissions
    if (phone !== undefined) admin.phone = phone
    if (password && password.length >= 6) {
      admin.password = await bcrypt.hash(password, 10)
    }

    await admin.save()

    await logAdminActivity(req, {
      action: 'UPDATE_ADMIN_USER',
      entity: 'AdminUser',
      entityId: admin._id,
      details: `Updated admin profile for: ${admin.email}`
    })

    res.json({
      success: true,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
        isActive: admin.isActive
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const toggleAdminUserStatus = async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.params.id)
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin user not found' })
    }

    // Prevent deactivating own account
    if (admin._id.toString() === req.admin._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot deactivate your own logged-in account' })
    }

    admin.isActive = !admin.isActive
    await admin.save()

    await logAdminActivity(req, {
      action: 'TOGGLE_ADMIN_STATUS',
      entity: 'AdminUser',
      entityId: admin._id,
      details: `Admin ${admin.email} status changed to ${admin.isActive ? 'Active' : 'Deactivated'}`
    })

    res.json({ success: true, isActive: admin.isActive })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteAdminUser = async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.params.id)
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin user not found' })
    }

    if (admin._id.toString() === req.admin._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own logged-in account' })
    }

    if (admin.role === 'super_admin' && req.admin.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Only a SuperAdmin can delete another SuperAdmin' })
    }

    await AdminUser.findByIdAndDelete(req.params.id)

    await logAdminActivity(req, {
      action: 'DELETE_ADMIN_USER',
      entity: 'AdminUser',
      entityId: admin._id,
      details: `Deleted admin user: ${admin.email}`
    })

    res.json({ success: true, message: 'Admin user deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}


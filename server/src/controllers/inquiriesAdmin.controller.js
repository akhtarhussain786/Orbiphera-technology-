import mongoose from 'mongoose'
import Inquiry from '../models/Inquiry.model.js'
import localStore from '../utils/localStore.js'
import { logAdminActivity } from '../middleware/adminAuth.middleware.js'

export const getAdminInquiries = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query
    const isDbConnected = mongoose.connection.readyState === 1
    let inquiries = []
    let total = 0

    if (isDbConnected) {
      try {
        const filter = {}
        if (status && status !== 'all') {
          filter.status = status
        }

        if (search) {
          filter.$or = [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { companyName: { $regex: search, $options: 'i' } },
            { projectType: { $regex: search, $options: 'i' } },
            { serviceType: { $regex: search, $options: 'i' } }
          ]
        }

        total = await Inquiry.countDocuments(filter)
        inquiries = await Inquiry.find(filter)
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(Number(limit))
          .lean()
      } catch (dbErr) {
        console.warn('⚠️ MongoDB Inquiry query failed, falling back to localStore:', dbErr.message)
      }
    }

    // High availability fallback: merge or use localStore if DB is offline or returned empty
    if (!inquiries || inquiries.length === 0) {
      let localInqs = localStore.getInquiries()
      if (status && status !== 'all') {
        localInqs = localInqs.filter(i => i.status === status)
      }
      if (search) {
        const s = search.toLowerCase()
        localInqs = localInqs.filter(i => 
          (i.firstName && i.firstName.toLowerCase().includes(s)) ||
          (i.lastName && i.lastName.toLowerCase().includes(s)) ||
          (i.email && i.email.toLowerCase().includes(s)) ||
          (i.phone && i.phone.toLowerCase().includes(s)) ||
          (i.companyName && i.companyName.toLowerCase().includes(s)) ||
          (i.projectType && i.projectType.toLowerCase().includes(s)) ||
          (i.serviceType && i.serviceType.toLowerCase().includes(s))
        )
      }
      total = localInqs.length
      inquiries = localInqs.slice((page - 1) * limit, page * limit)
    }

    return res.json({
      success: true,
      inquiries,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit) || 1
    })
  } catch (error) {
    console.error('getAdminInquiries error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const updateInquiryStatus = async (req, res) => {
  try {
    const { status, adminNotes, quotedAmount } = req.body
    const id = req.params.id
    const isDbConnected = mongoose.connection.readyState === 1
    let inquiry = null

    if (isDbConnected && mongoose.Types.ObjectId.isValid(id)) {
      try {
        inquiry = await Inquiry.findById(id)
        if (inquiry) {
          if (status) inquiry.status = status
          if (adminNotes !== undefined) inquiry.adminNotes = adminNotes
          if (quotedAmount !== undefined) inquiry.quotedAmount = quotedAmount
          if (status === 'Contacted' && !inquiry.contactedAt) inquiry.contactedAt = new Date()
          if (status === 'Proposal Sent' && !inquiry.quoteSentAt) inquiry.quoteSentAt = new Date()
          await inquiry.save()
        }
      } catch (err) {
        console.warn('⚠️ MongoDB Inquiry update failed:', err.message)
      }
    }

    // Also update in localStore if exists there
    const localInquiries = localStore.getInquiries()
    const localInq = localInquiries.find(i => i._id === id || String(i._id) === String(id))
    if (localInq) {
      if (status) localInq.status = status
      if (adminNotes !== undefined) localInq.adminNotes = adminNotes
      if (quotedAmount !== undefined) localInq.quotedAmount = quotedAmount
      localStore.save()
      if (!inquiry) inquiry = localInq
    }

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' })
    }

    await logAdminActivity(req, {
      action: 'UPDATE_INQUIRY',
      entity: 'Inquiry',
      entityId: inquiry._id,
      details: `Updated inquiry from ${inquiry.firstName} ${inquiry.lastName} to status: ${inquiry.status}`
    })

    return res.json({ success: true, inquiry })
  } catch (error) {
    console.error('updateInquiryStatus error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteInquiry = async (req, res) => {
  try {
    const id = req.params.id
    const isDbConnected = mongoose.connection.readyState === 1
    let deleted = false

    if (isDbConnected && mongoose.Types.ObjectId.isValid(id)) {
      try {
        const inquiry = await Inquiry.findByIdAndDelete(id)
        if (inquiry) deleted = true
      } catch (err) {
        console.warn('⚠️ MongoDB Inquiry delete failed:', err.message)
      }
    }

    // Also remove from localStore
    const localInquiries = localStore.getInquiries()
    const index = localInquiries.findIndex(i => i._id === id || String(i._id) === String(id))
    if (index >= 0) {
      localInquiries.splice(index, 1)
      localStore.save()
      deleted = true
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' })
    }

    await logAdminActivity(req, {
      action: 'DELETE_INQUIRY',
      entity: 'Inquiry',
      entityId: id,
      details: `Deleted inquiry ${id}`
    })

    return res.json({ success: true, message: 'Inquiry deleted successfully' })
  } catch (error) {
    console.error('deleteInquiry error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

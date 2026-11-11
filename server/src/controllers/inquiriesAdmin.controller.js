import Inquiry from '../models/Inquiry.model.js'
import { logAdminActivity } from '../middleware/adminAuth.middleware.js'

export const getAdminInquiries = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 25 } = req.query
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
        { projectType: { $regex: search, $options: 'i' } }
      ]
    }

    const total = await Inquiry.countDocuments(filter)
    const inquiries = await Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({
      success: true,
      inquiries,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateInquiryStatus = async (req, res) => {
  try {
    const { status, adminNotes, quotedAmount } = req.body
    const inquiry = await Inquiry.findById(req.params.id)

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' })
    }

    if (status) inquiry.status = status
    if (adminNotes !== undefined) inquiry.adminNotes = adminNotes
    if (quotedAmount !== undefined) inquiry.quotedAmount = quotedAmount

    if (status === 'Contacted' && !inquiry.contactedAt) {
      inquiry.contactedAt = new Date()
    }
    if (status === 'Proposal Sent' && !inquiry.quoteSentAt) {
      inquiry.quoteSentAt = new Date()
    }

    await inquiry.save()

    await logAdminActivity(req, {
      action: 'UPDATE_INQUIRY',
      entity: 'Inquiry',
      entityId: inquiry._id,
      details: `Updated inquiry from ${inquiry.firstName} ${inquiry.lastName} to status: ${inquiry.status}`
    })

    res.json({ success: true, inquiry })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' })
    }

    await Inquiry.findByIdAndDelete(req.params.id)

    await logAdminActivity(req, {
      action: 'DELETE_INQUIRY',
      entity: 'Inquiry',
      entityId: inquiry._id,
      details: `Deleted inquiry from ${inquiry.firstName} ${inquiry.lastName} (${inquiry.email})`
    })

    res.json({ success: true, message: 'Inquiry deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}


import mongoose from 'mongoose'
import Inquiry from '../models/Inquiry.model.js'
import localStore from '../utils/localStore.js'

export const createInquiry = async (req, res) => {
  try {
    const body = req.body || {}

    // Support flexible name mapping
    let firstName = (body.firstName || '').trim()
    let lastName = (body.lastName || '').trim()
    if (!firstName && body.name) {
      const parts = body.name.trim().split(/\s+/)
      firstName = parts[0] || 'Client'
      lastName = parts.slice(1).join(' ') || ''
    }
    if (!firstName) firstName = 'Prospective'

    // Service & Project Type mapping
    const serviceType = body.serviceType || body.projectType || 'Website Development'
    const projectType = body.projectType || body.serviceType || 'Website Development'

    // Budget, Company, Description mapping
    const budget = body.budget || body.budgetRange || null
    const companyName = body.companyName || body.company || null
    const projectDescription = body.projectDescription || body.message || body.requirements || 'Project Scope Inquiry'
    const phone = body.phone ? String(body.phone).trim() : '+91 00000 00000'
    const email = body.email ? String(body.email).toLowerCase().trim() : 'inquiry@orbiphera.in'

    const sanitizedData = {
      projectType,
      serviceType,
      firstName,
      lastName,
      email,
      phone,
      companyName,
      industry: body.industry || null,
      projectDescription,
      requiredFeatures: body.requiredFeatures || null,
      preferredTechnology: body.preferredTechnology || null,
      timeline: body.timeline || 'Within 1-3 months',
      budget,
      budgetRange: budget,
      status: 'New'
    }

    let inquiry = null
    const isDbConnected = mongoose.connection.readyState === 1

    if (isDbConnected) {
      try {
        inquiry = await Inquiry.create(sanitizedData)
      } catch (dbErr) {
        console.warn('⚠️ MongoDB Inquiry creation failed, saving to localStore:', dbErr.message)
      }
    }

    // Always mirror to localStore for high-availability backup
    const localInq = localStore.addInquiry({
      _id: inquiry?._id ? String(inquiry._id) : undefined,
      ...sanitizedData
    })
    if (!inquiry) {
      inquiry = localInq
    }

    // Record admin notification log
    localStore.addActivityLog({
      adminEmail: 'client-inquiry',
      action: 'NEW_INQUIRY',
      entity: 'Inquiry',
      entityId: inquiry._id || localInq._id,
      details: `New project inquiry received from ${firstName} ${lastName} (${email}) for ${serviceType}`
    })

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. Our engineering architects will contact you within 24 hours.',
      inquiry
    })
  } catch (error) {
    console.error('createInquiry error:', error)
    return res.status(500).json({ success: false, message: error.message || 'Could not submit inquiry' })
  }
}

export const getInquiries = async (req, res) => {
  try {
    let inquiries = []
    if (mongoose.connection.readyState === 1) {
      try {
        inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean()
      } catch (_) {}
    }

    if (!inquiries || inquiries.length === 0) {
      inquiries = localStore.getInquiries()
    }

    return res.json({
      success: true,
      inquiries
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

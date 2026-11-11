import mongoose from 'mongoose'
import Inquiry from '../models/Inquiry.model.js'
import localStore from '../utils/localStore.js'

export const createInquiry = async (req, res) => {
  try {
    const body = req.body || {}

    // Support flexible field mapping
    let firstName = body.firstName
    let lastName = body.lastName
    if (!firstName && body.name) {
      const parts = body.name.trim().split(' ')
      firstName = parts[0] || 'Client'
      lastName = parts.slice(1).join(' ') || 'Inquirer'
    }

    const projectDescription = body.projectDescription || body.message || body.requirements || 'Project Scope Inquiry'
    
    // Map project type to allowed enum
    let projectType = body.projectType || 'Other'
    const allowedTypes = ['Website', 'Web application', 'CRM', 'Hospital management', 'Institute management', 'Resort management', 'E-commerce', 'Inventory management', 'Mobile application', 'Other']
    if (!allowedTypes.includes(projectType)) {
      if (body.serviceType?.toLowerCase().includes('mobile') || projectType.toLowerCase().includes('mobile')) {
        projectType = 'Mobile application'
      } else if (body.serviceType?.toLowerCase().includes('crm') || projectType.toLowerCase().includes('crm')) {
        projectType = 'CRM'
      } else if (body.serviceType?.toLowerCase().includes('web') || projectType.toLowerCase().includes('web')) {
        projectType = 'Web application'
      } else {
        projectType = 'Other'
      }
    }

    const sanitizedData = {
      projectType,
      firstName: firstName || 'Prospective',
      lastName: lastName || 'Client',
      email: body.email,
      phone: body.phone || '+91 00000 00000',
      companyName: body.companyName || null,
      industry: body.industry || null,
      projectDescription,
      budgetRange: body.budgetRange || body.budget || null,
      timeline: body.timeline || 'Within 1-3 months',
      status: 'New'
    }

    let inquiry = null
    if (mongoose.connection.readyState === 1) {
      try {
        inquiry = await Inquiry.create(sanitizedData)
      } catch (dbErr) {
        console.warn('⚠️ MongoDB Inquiry creation failed, saving to localStore:', dbErr.message)
      }
    }

    if (!inquiry) {
      inquiry = localStore.addInquiry(sanitizedData)
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. Our engineering architects will contact you within 24 hours.',
      inquiry
    })
  } catch (error) {
    console.error('createInquiry error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getInquiries = async (req, res) => {
  try {
    let inquiries = []
    if (mongoose.connection.readyState === 1) {
      try {
        inquiries = await Inquiry.find().sort({ createdAt: -1 })
      } catch (_) {}
    }

    if (!inquiries || inquiries.length === 0) {
      inquiries = localStore.getInquiries()
    }

    res.json({
      success: true,
      inquiries
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

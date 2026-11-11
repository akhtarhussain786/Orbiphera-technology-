import Page from '../models/Page.model.js'
import { logAdminActivity } from '../middleware/adminAuth.middleware.js'

export const getPublicPages = async (req, res) => {
  try {
    const pages = await Page.find({ status: 'published' })
      .select('title slug excerpt metaTitle metaDescription updatedAt')
      .sort({ title: 1 })
    res.json({ success: true, pages })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, status: 'published' })
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' })
    }
    // Increment view counter
    page.views += 1
    await page.save()
    res.json({ success: true, page })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getAdminPages = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query
    const filter = {}

    if (status && status !== 'all') {
      filter.status = status
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
        { metaTitle: { $regex: search, $options: 'i' } }
      ]
    }

    const total = await Page.countDocuments(filter)
    const pages = await Page.find(filter)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({
      success: true,
      pages,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const createPage = async (req, res) => {
  try {
    const { title, slug, content, excerpt, template, status, metaTitle, metaDescription, primaryKeyword, secondaryKeywords, h1Heading, schemaType, canonicalUrl } = req.body

    const cleanSlug = (slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const existing = await Page.findOne({ slug: cleanSlug })
    if (existing) {
      return res.status(400).json({ success: false, message: `Page with slug "${cleanSlug}" already exists` })
    }

    const newPage = await Page.create({
      title,
      slug: cleanSlug,
      content: content || '',
      excerpt: excerpt || '',
      template: template || 'default',
      status: status || 'draft',
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || '',
      primaryKeyword: primaryKeyword || '',
      secondaryKeywords: Array.isArray(secondaryKeywords) ? secondaryKeywords : (secondaryKeywords ? secondaryKeywords.split(',').map(s => s.trim()) : []),
      h1Heading: h1Heading || title,
      schemaType: schemaType || 'WebPage',
      canonicalUrl: canonicalUrl || '',
      author: req.admin?._id
    })

    await logAdminActivity(req, {
      action: 'CREATE_PAGE',
      entity: 'Page',
      entityId: newPage._id,
      details: `Created page: "${newPage.title}" (${newPage.slug})`
    })

    res.status(201).json({ success: true, page: newPage })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updatePage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id)
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' })
    }

    const fields = [
      'title', 'content', 'excerpt', 'template', 'status',
      'metaTitle', 'metaDescription', 'primaryKeyword', 'secondaryKeywords',
      'h1Heading', 'schemaType', 'canonicalUrl', 'ogTitle', 'ogDescription', 'ogImage'
    ]

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        page[field] = req.body[field]
      }
    })

    // If slug is changed, check uniqueness
    if (req.body.slug && req.body.slug !== page.slug) {
      const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const conflict = await Page.findOne({ slug: cleanSlug, _id: { $ne: page._id } })
      if (conflict) {
        return res.status(400).json({ success: false, message: `Slug "${cleanSlug}" is already in use by another page` })
      }
      page.slug = cleanSlug
    }

    await page.save()

    await logAdminActivity(req, {
      action: 'UPDATE_PAGE',
      entity: 'Page',
      entityId: page._id,
      details: `Updated page: "${page.title}" (${page.slug})`
    })

    res.json({ success: true, page })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const togglePublishPage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id)
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' })
    }

    page.status = page.status === 'published' ? 'draft' : 'published'
    if (page.status === 'published' && !page.publishedAt) {
      page.publishedAt = new Date()
    }
    await page.save()

    await logAdminActivity(req, {
      action: 'TOGGLE_PUBLISH_PAGE',
      entity: 'Page',
      entityId: page._id,
      details: `Changed page "${page.title}" status to ${page.status}`
    })

    res.json({ success: true, page })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deletePage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id)
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' })
    }

    // Protect critical system pages from deletion
    const protectedSlugs = ['home', 'marketplace', 'templates', 'software', 'contact']
    if (protectedSlugs.includes(page.slug)) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete protected core system page "${page.title}". You can set it to draft if needed.`
      })
    }

    await Page.findByIdAndDelete(req.params.id)

    await logAdminActivity(req, {
      action: 'DELETE_PAGE',
      entity: 'Page',
      entityId: page._id,
      details: `Deleted page: "${page.title}" (${page.slug})`
    })

    res.json({ success: true, message: 'Page deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}


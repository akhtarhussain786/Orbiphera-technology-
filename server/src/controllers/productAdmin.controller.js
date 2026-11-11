import Product from '../models/Product.model.js'
import { logAdminActivity } from '../middleware/adminAuth.middleware.js'

export const getAdminProducts = async (req, res) => {
  try {
    const { status, type, search, page = 1, limit = 20 } = req.query
    const filter = {}

    if (status && status !== 'all') filter.status = status
    if (type && type !== 'all') filter.type = type
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } }
      ]
    }

    const total = await Product.countDocuments(filter)
    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({
      success: true,
      products,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const createAdminProduct = async (req, res) => {
  try {
    const {
      name, slug, description, shortDescription, type, category, price, extendedPrice,
      thumbnail, features, technologies, demoUrl, documentationUrl, isFeatured, metaTitle, metaDescription
    } = req.body

    const cleanSlug = (slug || name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const existing = await Product.findOne({ slug: cleanSlug })
    if (existing) {
      return res.status(400).json({ success: false, message: `Product with slug "${cleanSlug}" already exists` })
    }

    const newProduct = await Product.create({
      name,
      slug: cleanSlug,
      description,
      shortDescription: shortDescription || description.slice(0, 120),
      type,
      category,
      price: Number(price),
      extendedPrice: extendedPrice ? Number(extendedPrice) : null,
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      features: Array.isArray(features) ? features : (features ? features.split(',').map(f => f.trim()) : []),
      technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map(t => t.trim()) : []),
      demoUrl: demoUrl || null,
      documentationUrl: documentationUrl || null,
      isFeatured: Boolean(isFeatured),
      status: req.body.status || 'published',
      metaTitle: metaTitle || `${name} - Download Source Code`,
      metaDescription: metaDescription || shortDescription
    })

    await logAdminActivity(req, {
      action: 'CREATE_PRODUCT',
      entity: 'Product',
      entityId: newProduct._id,
      details: `Created new product: "${newProduct.name}" (${newProduct.type})`
    })

    res.status(201).json({ success: true, product: newProduct })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateAdminProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    const fields = [
      'name', 'description', 'shortDescription', 'type', 'category', 'price',
      'extendedPrice', 'thumbnail', 'features', 'technologies', 'demoUrl',
      'documentationUrl', 'isFeatured', 'status', 'metaTitle', 'metaDescription'
    ]

    fields.forEach(f => {
      if (req.body[f] !== undefined) {
        if (f === 'features' && typeof req.body[f] === 'string') {
          product[f] = req.body[f].split(',').map(i => i.trim())
        } else if (f === 'technologies' && typeof req.body[f] === 'string') {
          product[f] = req.body[f].split(',').map(i => i.trim())
        } else {
          product[f] = req.body[f]
        }
      }
    })

    if (req.body.slug && req.body.slug !== product.slug) {
      const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const conflict = await Product.findOne({ slug: cleanSlug, _id: { $ne: product._id } })
      if (conflict) {
        return res.status(400).json({ success: false, message: `Slug "${cleanSlug}" is already in use by another product` })
      }
      product.slug = cleanSlug
    }

    await product.save()

    await logAdminActivity(req, {
      action: 'UPDATE_PRODUCT',
      entity: 'Product',
      entityId: product._id,
      details: `Updated product: "${product.name}"`
    })

    res.json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteAdminProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    await Product.findByIdAndDelete(req.params.id)

    await logAdminActivity(req, {
      action: 'DELETE_PRODUCT',
      entity: 'Product',
      entityId: product._id,
      details: `Deleted product: "${product.name}"`
    })

    res.json({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}


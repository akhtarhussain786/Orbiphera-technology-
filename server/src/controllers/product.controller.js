import Product from '../models/Product.model.js'

export const getProducts = async (req, res) => {
  try {
    const { type, category, search, sort = 'newest', page = 1, limit = 12 } = req.query
    
    const query = { status: 'published' }
    
    if (type) query.type = type
    if (category) query.category = category
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } }
      ]
    }
    
    let sortOption = {}
    if (sort === 'price-low') sortOption.price = 1
    else if (sort === 'price-high') sortOption.price = -1
    else if (sort === 'popular') sortOption.downloads = -1
    else sortOption.createdAt = -1 // newest
    
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)
    
    const total = await Product.countDocuments(query)
    
    res.json({
      success: true,
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, status: 'published' })
      .populate('category', 'name slug')
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    
    // Increment views
    product.views += 1
    await product.save()
    
    res.json({
      success: true,
      product
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'published', isFeatured: true })
      .populate('category', 'name slug')
      .limit(6)
      .sort({ createdAt: -1 })
    
    res.json({
      success: true,
      products
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

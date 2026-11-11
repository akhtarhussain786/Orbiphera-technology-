import Category from '../models/Category.model.js'

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1, name: 1 })
    res.json({
      success: true,
      categories
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true })
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.json({
      success: true,
      category
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

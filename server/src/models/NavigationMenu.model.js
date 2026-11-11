import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  url: { type: String, required: true },
  isExternal: { type: Boolean, default: false },
  openInNewTab: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  category: { type: String, default: '' }, // For multi-column footer menus (e.g., 'products', 'company', 'support', 'legal')
  children: [
    {
      id: String,
      label: String,
      url: String,
      isExternal: Boolean
    }
  ]
}, { _id: false })

const navigationMenuSchema = new mongoose.Schema({
  location: {
    type: String,
    enum: ['header', 'footer'],
    required: true,
    unique: true
  },
  items: [menuItemSchema]
}, {
  timestamps: true
})

const NavigationMenu = mongoose.model('NavigationMenu', navigationMenuSchema)

export default NavigationMenu


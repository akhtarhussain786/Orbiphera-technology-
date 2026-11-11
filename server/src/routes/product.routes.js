import express from 'express'
import { getProducts, getProductBySlug, getFeaturedProducts } from '../controllers/product.controller.js'
import {
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct
} from '../controllers/productAdmin.controller.js'
import { protectAdmin, requireRole } from '../middleware/adminAuth.middleware.js'

const router = express.Router()

// Public
router.get('/', getProducts)
router.get('/featured', getFeaturedProducts)
router.get('/:slug', getProductBySlug)

// Admin
router.get('/admin/all', protectAdmin, getAdminProducts)
router.post('/admin', protectAdmin, requireRole(['super_admin', 'admin', 'editor']), createAdminProduct)
router.put('/admin/:id', protectAdmin, requireRole(['super_admin', 'admin', 'editor']), updateAdminProduct)
router.delete('/admin/:id', protectAdmin, requireRole(['super_admin', 'admin']), deleteAdminProduct)

export default router

import express from 'express'
import { generateSitemapXml, generateRobotsTxt } from '../controllers/sitemap.controller.js'

const router = express.Router()

router.get('/sitemap.xml', generateSitemapXml)
router.get('/robots.txt', generateRobotsTxt)

export default router


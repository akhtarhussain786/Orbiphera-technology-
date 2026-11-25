import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import Page from '../models/Page.model.js'
import Product from '../models/Product.model.js'
import WebsiteSetting from '../models/WebsiteSetting.model.js'
import localStore from '../utils/localStore.js'

/**
 * Dynamic XML Sitemap Generator for Search Engines (Google Search Console, Bing Webmaster)
 * Endpoints: /sitemap.xml
 */
export const generateSitemapXml = async (req, res) => {
  try {
    const baseUrl = 'https://orbiphera.in'
    const isDbConnected = mongoose.connection.readyState === 1

    let pages = []
    let products = []

    if (isDbConnected) {
      try {
        pages = await Page.find({ status: 'published' }).sort({ updatedAt: -1 }).lean()
        products = await Product.find({ status: 'published' }).sort({ updatedAt: -1 }).lean()
      } catch (dbErr) {
        console.warn('⚠️ MongoDB sitemap query failed, falling back to localStore:', dbErr.message)
      }
    }

    if (!pages || pages.length === 0) {
      pages = localStore.getPages().filter(p => p.status === 'published')
    }
    if (!products || products.length === 0) {
      products = localStore.getProducts().filter(p => p.status === 'published')
    }

    // Core high-authority routes
    const coreRoutes = [
      { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
      
      // Services Hub & Dedicated Service Landing Pages
      { loc: `${baseUrl}/services`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/services/website-development`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/services/mobile-app-development`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/services/flutter-app-development`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/services/android-app-development`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/services/erp-software-development`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/services/crm-software-development`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/services/custom-software-development`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/services/it-solutions`, priority: '0.9', changefreq: 'weekly' },

      // Local SEO Hubs (Bihar, Patna, Siwan & Chapra)
      { loc: `${baseUrl}/locations`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${baseUrl}/locations/bihar`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/locations/patna`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/locations/siwan`, priority: '0.9', changefreq: 'weekly' },

      // Engineering Blog & Content Marketing Guides
      { loc: `${baseUrl}/blog`, priority: '0.9', changefreq: 'daily' },
      { loc: `${baseUrl}/blog/how-to-choose-the-best-website-development-company`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/blog/website-development-cost-in-india-complete-guide`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/blog/flutter-vs-native-app-development-comparison`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/blog/how-much-does-an-android-app-development-cost`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/blog/why-growing-businesses-need-custom-erp-crm-software`, priority: '0.8', changefreq: 'monthly' },

      // Dedicated Company Pages
      { loc: `${baseUrl}/about`, priority: '0.9', changefreq: 'monthly' },
      { loc: `${baseUrl}/portfolio`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/pricing`, priority: '0.9', changefreq: 'monthly' },
      { loc: `${baseUrl}/faq`, priority: '0.8', changefreq: 'monthly' },

      // Marketplace & Solutions
      { loc: `${baseUrl}/marketplace`, priority: '0.9', changefreq: 'daily' },
      { loc: `${baseUrl}/software`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/custom-development`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/templates`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/categories`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${baseUrl}/request-demo`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/request-quote`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/contact`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/search`, priority: '0.7', changefreq: 'weekly' }
    ]

    const urlSet = new Map()
    const today = new Date().toISOString().slice(0, 10)

    // Seed core routes
    for (const r of coreRoutes) {
      urlSet.set(r.loc, {
        loc: r.loc,
        lastmod: today,
        changefreq: r.changefreq,
        priority: r.priority
      })
    }

    // Add published CMS Pages
    for (const page of pages) {
      const loc = page.slug === 'home' ? `${baseUrl}/` : `${baseUrl}/${page.slug}`
      const lastMod = page.updatedAt ? new Date(page.updatedAt).toISOString().slice(0, 10) : today
      const priority = page.slug === 'home' ? '1.0' : ['marketplace', 'templates', 'software', 'custom-development'].includes(page.slug) ? '0.9' : '0.7'
      const changeFreq = page.slug === 'home' ? 'daily' : 'weekly'

      urlSet.set(loc, { loc, lastmod: lastMod, changefreq: changeFreq, priority })
    }

    // Add published Products
    for (const prod of products) {
      const pathPrefix = prod.type === 'software' ? 'software' : 'templates'
      const loc = `${baseUrl}/${pathPrefix}/${prod.slug}`
      const lastMod = prod.updatedAt ? new Date(prod.updatedAt).toISOString().slice(0, 10) : today

      urlSet.set(loc, {
        loc,
        lastmod: lastMod,
        changefreq: 'weekly',
        priority: '0.8',
        image: prod.thumbnail ? {
          loc: prod.thumbnail,
          title: (prod.name || '').replace(/&/g, '&amp;')
        } : null
      })
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`

    for (const entry of urlSet.values()) {
      xml += `  <url>\n`
      xml += `    <loc>${entry.loc}</loc>\n`
      xml += `    <lastmod>${entry.lastmod}</lastmod>\n`
      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`
      xml += `    <priority>${entry.priority}</priority>\n`
      if (entry.image) {
        xml += `    <image:image>\n`
        xml += `      <image:loc>${entry.image.loc}</image:loc>\n`
        xml += `      <image:title>${entry.image.title}</image:title>\n`
        xml += `    </image:image>\n`
      }
      xml += `  </url>\n`
    }

    xml += `</urlset>`

    res.header('Content-Type', 'application/xml; charset=utf-8')
    res.header('X-Robots-Tag', 'all')
    res.header('Cache-Control', 'public, max-age=3600') // Cache 1 hour
    return res.send(xml)
  } catch (error) {
    console.error('Sitemap generation error, falling back to static sitemap:', error.message)
    const staticPath = path.resolve('client/public/sitemap.xml')
    if (fs.existsSync(staticPath)) {
      res.header('Content-Type', 'application/xml; charset=utf-8')
      res.header('X-Robots-Tag', 'all')
      return res.sendFile(staticPath)
    }
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://orbiphera.in/</loc><priority>1.0</priority></url></urlset>`)
  }
}

/**
 * Standard Robots.txt Generator
 * Endpoints: /robots.txt
 */
export const generateRobotsTxt = async (req, res) => {
  try {
    const baseUrl = 'https://orbiphera.in'
    const setting = await WebsiteSetting.findOne().catch(() => null)

    let content = `# Robots.txt for Orbiphera Technologies\n`
    content += `User-agent: *\n`

    if (setting && setting.maintenanceMode) {
      content += `Disallow: /\n`
    } else {
      content += `Allow: /\n`
      content += `Disallow: /admin\n`
      content += `Disallow: /admin/\n`
      content += `Disallow: /api/\n`
      content += `Disallow: /account/\n`
      content += `Disallow: /cart\n`
    }

    content += `\nCrawl-delay: 1\n`
    content += `Host: ${baseUrl}\n`
    content += `Sitemap: ${baseUrl}/sitemap.xml\n`

    res.header('Content-Type', 'text/plain; charset=utf-8')
    res.header('Cache-Control', 'public, max-age=86400')
    return res.send(content)
  } catch (error) {
    return res.send("User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://orbiphera.in/sitemap.xml\n")
  }
}

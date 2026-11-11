import Page from '../models/Page.model.js'
import Product from '../models/Product.model.js'
import WebsiteSetting from '../models/WebsiteSetting.model.js'

export const generateSitemapXml = async (req, res) => {
  try {
    const setting = await WebsiteSetting.findOne()
    const baseUrl = process.env.CLIENT_URL || `http://${req.headers.host || 'localhost:5173'}`

    const pages = await Page.find({ status: 'published' }).sort({ updatedAt: -1 })
    const products = await Product.find({ status: 'published' }).sort({ updatedAt: -1 })

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`

    // Add published CMS Pages
    for (const page of pages) {
      const loc = page.slug === 'home' ? `${baseUrl}/` : `${baseUrl}/${page.slug}`
      const lastMod = (page.updatedAt || new Date()).toISOString().slice(0, 10)
      const priority = page.slug === 'home' ? '1.0' : ['marketplace', 'templates', 'software', 'custom-development'].includes(page.slug) ? '0.8' : '0.6'
      const changeFreq = page.slug === 'home' ? 'daily' : 'weekly'

      xml += `  <url>\n`
      xml += `    <loc>${loc}</loc>\n`
      xml += `    <lastmod>${lastMod}</lastmod>\n`
      xml += `    <changefreq>${changeFreq}</changefreq>\n`
      xml += `    <priority>${priority}</priority>\n`
      xml += `  </url>\n`
    }

    // Add published Products
    for (const prod of products) {
      const pathPrefix = prod.type === 'software' ? 'software' : 'templates'
      const loc = `${baseUrl}/${pathPrefix}/${prod.slug}`
      const lastMod = (prod.updatedAt || new Date()).toISOString().slice(0, 10)

      xml += `  <url>\n`
      xml += `    <loc>${loc}</loc>\n`
      xml += `    <lastmod>${lastMod}</lastmod>\n`
      xml += `    <changefreq>weekly</changefreq>\n`
      xml += `    <priority>0.7</priority>\n`
      if (prod.thumbnail) {
        xml += `    <image:image>\n`
        xml += `      <image:loc>${prod.thumbnail}</image:loc>\n`
        xml += `      <image:title>${prod.name.replace(/&/g, '&amp;')}</image:title>\n`
        xml += `    </image:image>\n`
      }
      xml += `  </url>\n`
    }

    xml += `</urlset>`

    res.header('Content-Type', 'application/xml')
    res.header('Cache-Control', 'public, max-age=3600') // Cache 1 hour
    res.send(xml)
  } catch (error) {
    res.status(500).send('Error generating sitemap')
  }
}

export const generateRobotsTxt = async (req, res) => {
  try {
    const baseUrl = process.env.CLIENT_URL || `http://${req.headers.host || 'localhost:5173'}`
    const setting = await WebsiteSetting.findOne()

    let content = `User-agent: *\n`
    if (setting && setting.maintenanceMode) {
      content += `Disallow: /\n`
    } else {
      content += `Allow: /\n`
      content += `Disallow: /admin/\n`
      content += `Disallow: /api/admin/\n`
      content += `Disallow: /account/\n`
      content += `Disallow: /cart\n`
    }
    content += `\nSitemap: ${baseUrl}/sitemap.xml\n`

    res.header('Content-Type', 'text/plain')
    res.header('Cache-Control', 'public, max-age=86400')
    res.send(content)
  } catch (error) {
    res.status(500).send('User-agent: *\nAllow: /\n')
  }
}


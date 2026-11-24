import { useEffect } from 'react'
import { useSettings } from '../../context/SettingsContext'

export default function SeoHead({
  title = '',
  description = '',
  keywords = '',
  canonical = '',
  ogImage = '',
  ogType = 'website',
  schemaJson = null,
  faqs = null,
  breadcrumbs = null,
  service = null,
  article = null,
  localBusiness = null
}) {
  const { settings } = useSettings()

  useEffect(() => {
    const siteName = settings?.siteName || 'Orbiphera Technologies'
    const tagline = settings?.tagline || 'Website, Software & App Development'
    const baseSiteUrl = 'https://orbiphera.in'

    // 1. Set document title
    let resolvedTitle = title
    if (!resolvedTitle) {
      resolvedTitle = `${siteName} | ${tagline}`
    } else if (resolvedTitle.includes('NEXVORA') || resolvedTitle.includes('Yatharth')) {
      resolvedTitle = resolvedTitle.replace(/NEXVORA/g, siteName).replace(/Yatharth IT Solutions/g, siteName).replace(/Yatharth It Solutions/g, siteName)
    }

    document.title = resolvedTitle

    // Helper to set meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attrName, attrValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content || '')
    }

    // 2. Standard Meta tags
    const defaultDescription = 'Orbiphera Technologies is a premier software development, custom web applications, mobile apps, and enterprise digital solutions engineering company. Scalable, high-performance, and SEO-ready.'
    const resolvedDesc = description || settings?.defaultMetaDescription || defaultDescription
    const resolvedKeywords = keywords || 'Orbiphera Technologies, website development company, custom software development, mobile app development, flutter app development, android app development, enterprise digital solutions, Bihar, India'

    setMetaTag('name', 'description', resolvedDesc)
    setMetaTag('name', 'keywords', resolvedKeywords)
    setMetaTag('name', 'author', siteName)
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')

    // Google Search Console Site Verification if available
    if (settings?.googleSearchConsoleKey) {
      setMetaTag('name', 'google-site-verification', settings.googleSearchConsoleKey)
    }

    // 3. Local SEO Geo Tags (Default to Bihar HQ or override)
    const geoRegion = localBusiness?.geoRegion || 'IN-BR'
    const geoPlacename = localBusiness?.placename || 'Siwan, Bihar, India'
    const geoPosition = localBusiness?.position || '26.2196;84.3567'
    const icbm = localBusiness?.icbm || '26.2196, 84.3567'

    setMetaTag('name', 'geo.region', geoRegion)
    setMetaTag('name', 'geo.placename', geoPlacename)
    setMetaTag('name', 'geo.position', geoPosition)
    setMetaTag('name', 'ICBM', icbm)
    setMetaTag('name', 'city', localBusiness?.city || 'Siwan')
    setMetaTag('name', 'state', localBusiness?.state || 'Bihar')
    setMetaTag('name', 'country', 'India')

    // 4. Canonical Link
    const currentPath = window.location.pathname === '/' ? '' : window.location.pathname
    const currentUrl = canonical || (window.location.origin.includes('orbiphera.in') ? `${baseSiteUrl}${currentPath}` : window.location.href)
    
    let canonicalTag = document.querySelector('link[rel="canonical"]')
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalTag)
    }
    canonicalTag.setAttribute('href', currentUrl)

    // 5. Open Graph Tags
    setMetaTag('property', 'og:title', resolvedTitle)
    setMetaTag('property', 'og:description', resolvedDesc)
    setMetaTag('property', 'og:url', currentUrl)
    setMetaTag('property', 'og:type', ogType)
    setMetaTag('property', 'og:site_name', siteName)
    setMetaTag('property', 'og:locale', 'en_IN')
    const resolvedImage = ogImage || settings?.defaultOgImage || settings?.logoUrl || '/logo.png'
    if (resolvedImage) {
      setMetaTag('property', 'og:image', resolvedImage.startsWith('http') ? resolvedImage : `${baseSiteUrl}${resolvedImage}`)
    }

    // 6. Twitter Card Tags
    setMetaTag('name', 'twitter:card', resolvedImage ? 'summary_large_image' : 'summary')
    setMetaTag('name', 'twitter:title', resolvedTitle)
    setMetaTag('name', 'twitter:description', resolvedDesc)
    if (resolvedImage) {
      setMetaTag('name', 'twitter:image', resolvedImage.startsWith('http') ? resolvedImage : `${baseSiteUrl}${resolvedImage}`)
    }

    // 7. JSON-LD Structured Data Graph
    const scriptId = 'structured-data-json-ld'
    let scriptTag = document.getElementById(scriptId)
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = scriptId
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }

    const defaultSchemaGraph = [
      {
        '@type': 'Organization',
        '@id': `${baseSiteUrl}/#organization`,
        'name': siteName,
        'alternateName': ['Orbiphera Technology', 'Orbiphera'],
        'url': baseSiteUrl,
        'logo': settings?.logoUrl || `${baseSiteUrl}/logo.png`,
        'image': settings?.logoUrl || `${baseSiteUrl}/logo.png`,
        'email': settings?.contactEmail || 'contact@orbiphera.in',
        'telephone': settings?.contactPhone || '+91-9876543210',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Digital Tech Hub',
          'addressLocality': 'Siwan',
          'addressRegion': 'Bihar',
          'postalCode': '841226',
          'addressCountry': 'IN'
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': settings?.contactPhone || '+91-9876543210',
          'email': settings?.contactEmail || 'contact@orbiphera.in',
          'contactType': 'customer service',
          'areaServed': 'IN',
          'availableLanguage': ['English', 'Hindi']
        },
        'sameAs': [
          'https://twitter.com',
          'https://linkedin.com',
          'https://github.com'
        ]
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${baseSiteUrl}/#localbusiness`,
        'name': `${siteName} | Website, Software & App Development`,
        'url': baseSiteUrl,
        'logo': settings?.logoUrl || `${baseSiteUrl}/logo.png`,
        'image': settings?.logoUrl || `${baseSiteUrl}/logo.png`,
        'telephone': settings?.contactPhone || '+91-9876543210',
        'email': settings?.contactEmail || 'contact@orbiphera.in',
        'priceRange': '₹₹',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': localBusiness?.streetAddress || 'Digital Tech Hub',
          'addressLocality': localBusiness?.city || 'Siwan',
          'addressRegion': localBusiness?.state || 'Bihar',
          'postalCode': localBusiness?.postalCode || '841226',
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': localBusiness?.latitude || 26.2196,
          'longitude': localBusiness?.longitude || 84.3567
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '09:00',
            'closes': '20:00'
          }
        ],
        'areaServed': localBusiness?.areas || [
          { '@type': 'City', 'name': 'Siwan' },
          { '@type': 'City', 'name': 'Gopalganj' },
          { '@type': 'City', 'name': 'Chhapra' },
          { '@type': 'City', 'name': 'Patna' },
          { '@type': 'State', 'name': 'Bihar' },
          { '@type': 'Country', 'name': 'India' }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${baseSiteUrl}/#website`,
        'url': baseSiteUrl,
        'name': siteName,
        'description': resolvedDesc,
        'publisher': {
          '@id': `${baseSiteUrl}/#organization`
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${baseSiteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }
    ]

    // Service Schema injection
    if (service) {
      defaultSchemaGraph.push({
        '@type': 'Service',
        '@id': `${currentUrl}/#service`,
        'name': service.name,
        'description': service.description || resolvedDesc,
        'provider': {
          '@id': `${baseSiteUrl}/#organization`
        },
        'serviceType': service.serviceType || 'IT Services',
        'areaServed': {
          '@type': 'Country',
          'name': 'India'
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': `${service.name} Deliverables`,
          'itemListElement': (service.features || []).map((f, i) => ({
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': f
            }
          }))
        }
      })
    }

    // Article / BlogPosting Schema injection
    if (article) {
      defaultSchemaGraph.push({
        '@type': 'BlogPosting',
        '@id': `${currentUrl}/#article`,
        'headline': article.title,
        'description': article.description || resolvedDesc,
        'author': {
          '@type': 'Person',
          'name': article.author || 'Orbiphera Engineering Team',
          'jobTitle': 'Senior Solutions Architect'
        },
        'publisher': {
          '@id': `${baseSiteUrl}/#organization`
        },
        'datePublished': article.datePublished || '2026-11-20',
        'dateModified': article.dateModified || '2026-11-24',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': currentUrl
        },
        'image': article.image ? (article.image.startsWith('http') ? article.image : `${baseSiteUrl}${article.image}`) : `${baseSiteUrl}/logo.png`
      })
    }

    // BreadcrumbList Schema injection
    if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      defaultSchemaGraph.push({
        '@type': 'BreadcrumbList',
        '@id': `${currentUrl}/#breadcrumb`,
        'itemListElement': breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': crumb.name,
          'item': crumb.url.startsWith('http') ? crumb.url : `${baseSiteUrl}${crumb.url}`
        }))
      })
    }

    // FAQPage Schema injection
    if (Array.isArray(faqs) && faqs.length > 0) {
      defaultSchemaGraph.push({
        '@type': 'FAQPage',
        '@id': `${currentUrl}/#faq`,
        'mainEntity': faqs.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer
          }
        }))
      })
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@graph': defaultSchemaGraph
    }

    scriptTag.text = JSON.stringify(schemaJson || defaultSchema)
  }, [title, description, keywords, canonical, ogImage, ogType, schemaJson, faqs, breadcrumbs, service, article, localBusiness, settings])

  return null
}

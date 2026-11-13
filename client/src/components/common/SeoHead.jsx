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
  faqs = null
}) {
  const { settings } = useSettings()

  useEffect(() => {
    const siteName = settings?.siteName || 'Orbiphera Technologies'
    const tagline = settings?.tagline || 'Website, Software & App Development'

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
    const resolvedKeywords = keywords || 'Orbiphera Technologies, Orbiphera Technology, website development company, custom software development, mobile app development, enterprise digital solutions, ' + siteName

    setMetaTag('name', 'description', resolvedDesc)
    setMetaTag('name', 'keywords', resolvedKeywords)
    setMetaTag('name', 'author', siteName)
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large')

    // 3. Local SEO Geo Tags
    setMetaTag('name', 'geo.region', 'IN-BR')
    setMetaTag('name', 'geo.placename', 'Siwan, Bihar, India')
    setMetaTag('name', 'geo.position', '26.2196;84.3567')
    setMetaTag('name', 'ICBM', '26.2196, 84.3567')
    setMetaTag('name', 'city', 'Siwan')
    setMetaTag('name', 'state', 'Bihar')
    setMetaTag('name', 'country', 'India')

    // 4. Canonical Link
    const baseSiteUrl = 'https://orbiphera.in'
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

    // 7. JSON-LD Structured Data (Organization + LocalBusiness + WebSite + FAQPage)
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
        }
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
          'streetAddress': 'Digital Tech Hub',
          'addressLocality': 'Siwan',
          'addressRegion': 'Bihar',
          'postalCode': '841226',
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 26.2196,
          'longitude': 84.3567
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '09:00',
            'closes': '20:00'
          }
        ],
        'areaServed': [
          { '@type': 'City', 'name': 'Siwan' },
          { '@type': 'City', 'name': 'Gopalganj' },
          { '@type': 'City', 'name': 'Chhapra' },
          { '@type': 'City', 'name': 'Patna' },
          { '@type': 'State', 'name': 'Bihar' },
          { '@type': 'Country', 'name': 'India' }
        ],
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '128',
          'bestRating': '5',
          'worstRating': '1'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${baseSiteUrl}/#website`,
        'url': baseSiteUrl,
        'name': siteName,
        'description': resolvedDesc,
        'publisher': {
          '@id': `${baseSiteUrl}/#organization`
        }
      }
    ]

    // Inject FAQPage Schema if faqs array provided
    if (Array.isArray(faqs) && faqs.length > 0) {
      defaultSchemaGraph.push({
        '@type': 'FAQPage',
        '@id': `${baseSiteUrl}/#faq`,
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
  }, [title, description, keywords, canonical, ogImage, ogType, schemaJson, faqs, settings])

  return null
}

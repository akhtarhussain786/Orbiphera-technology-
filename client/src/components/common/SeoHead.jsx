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
    const siteName = settings?.siteName || 'Yatharth IT Solutions'
    const tagline = settings?.tagline || 'Best Website Company in Siwan - Web & Software Agency'

    // 1. Set document title
    let resolvedTitle = title
    if (!resolvedTitle) {
      resolvedTitle = `${siteName} - ${tagline}`
    } else if (resolvedTitle.includes('NEXVORA')) {
      resolvedTitle = resolvedTitle.replace(/NEXVORA/g, siteName)
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
    const resolvedDesc = description || settings?.defaultMetaDescription || 'Looking for the best website company in Siwan? Yatharth IT Solutions is the #1 web development, mobile app, and custom software company in Siwan, Bihar.'
    const resolvedKeywords = keywords || 'best website company in siwan, website development company in siwan, web design siwan, software company in siwan, app development company in siwan bihar, website designer in siwan, IT company in siwan, ' + siteName

    setMetaTag('name', 'description', resolvedDesc)
    setMetaTag('name', 'keywords', resolvedKeywords)
    setMetaTag('name', 'author', siteName)
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large')

    // 3. Local SEO Geo Tags for Siwan, Bihar
    setMetaTag('name', 'geo.region', 'IN-BR')
    setMetaTag('name', 'geo.placename', 'Siwan, Bihar, India')
    setMetaTag('name', 'geo.position', '26.2196;84.3567')
    setMetaTag('name', 'ICBM', '26.2196, 84.3567')
    setMetaTag('name', 'city', 'Siwan')
    setMetaTag('name', 'state', 'Bihar')
    setMetaTag('name', 'country', 'India')

    // 4. Canonical Link
    const currentUrl = canonical || window.location.href
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
    const resolvedImage = ogImage || settings?.defaultOgImage || '/logo-full.png'
    if (resolvedImage) {
      setMetaTag('property', 'og:image', resolvedImage)
    }

    // 6. Twitter Card Tags
    setMetaTag('name', 'twitter:card', resolvedImage ? 'summary_large_image' : 'summary')
    setMetaTag('name', 'twitter:title', resolvedTitle)
    setMetaTag('name', 'twitter:description', resolvedDesc)
    if (resolvedImage) {
      setMetaTag('name', 'twitter:image', resolvedImage)
    }

    // 7. JSON-LD Structured Data (LocalBusiness + Organization + WebSite + FAQPage)
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
        '@type': 'LocalBusiness',
        '@id': `${window.location.origin}/#localbusiness`,
        'name': `${siteName} - Best Website Company in Siwan`,
        'alternateName': 'Best Website & Software Development Company in Siwan',
        'url': window.location.origin,
        'logo': settings?.logoUrl || `${window.location.origin}/logo-full.png`,
        'image': settings?.logoUrl || `${window.location.origin}/logo-full.png`,
        'telephone': settings?.contactPhone || '+91-9876543210',
        'email': settings?.contactEmail || 'contact@yathartitsolutions.com',
        'priceRange': '₹₹',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Station Road / Hospital Road',
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
          'reviewCount': '120',
          'bestRating': '5',
          'worstRating': '1'
        }
      },
      {
        '@type': 'Organization',
        '@id': `${window.location.origin}/#organization`,
        'name': siteName,
        'url': window.location.origin,
        'logo': settings?.logoUrl || `${window.location.origin}/logo-full.png`,
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': settings?.contactPhone || '+91-9876543210',
          'email': settings?.contactEmail || 'contact@yathartitsolutions.com',
          'contactType': 'customer service',
          'areaServed': 'IN',
          'availableLanguage': ['English', 'Hindi']
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${window.location.origin}/#website`,
        'url': window.location.origin,
        'name': `${siteName} - Best Website Company in Siwan`,
        'description': resolvedDesc,
        'publisher': {
          '@id': `${window.location.origin}/#organization`
        }
      }
    ]

    // Inject FAQPage Schema if faqs array provided
    if (Array.isArray(faqs) && faqs.length > 0) {
      defaultSchemaGraph.push({
        '@type': 'FAQPage',
        '@id': `${window.location.origin}/#faq`,
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

import crypto from 'crypto'

const COUNTRY_NAMES = {
  IN: 'India',
  US: 'United States',
  GB: 'United Kingdom',
  AE: 'United Arab Emirates',
  CA: 'Canada',
  AU: 'Australia',
  DE: 'Germany',
  FR: 'France',
  SG: 'Singapore',
  NL: 'Netherlands',
  SA: 'Saudi Arabia',
  QA: 'Qatar',
  KW: 'Kuwait',
  OM: 'Oman',
  NP: 'Nepal',
  BD: 'Bangladesh',
  JP: 'Japan',
  KR: 'South Korea',
  BR: 'Brazil',
  ZA: 'South Africa',
  ES: 'Spain',
  IT: 'Italy',
  CH: 'Switzerland',
  SE: 'Sweden',
  IE: 'Ireland',
  MY: 'Malaysia',
  ID: 'Indonesia',
  TH: 'Thailand',
  VN: 'Vietnam',
  PH: 'Philippines'
}

/**
 * Anonymize IP address for GDPR compliance
 * Keeps network routing prefix while removing host identifier
 */
export function anonymizeIp(ipString = '') {
  if (!ipString) return '0.0.0.0'
  const cleanIp = ipString.split(',')[0].trim()

  // IPv4
  if (cleanIp.includes('.')) {
    const parts = cleanIp.split('.')
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`
    }
  }

  // IPv6
  if (cleanIp.includes(':')) {
    const parts = cleanIp.split(':')
    return parts.slice(0, 3).join(':') + ':xxxx:xxxx'
  }

  return 'anonymized-ip'
}

/**
 * Create a secure one-way hash of IP for deduplication without storing raw IP
 */
export function hashIp(ipString = '') {
  const cleanIp = ipString.split(',')[0].trim() || '127.0.0.1'
  return crypto.createHash('sha256').update(cleanIp + 'orbiphera_salt_2026').digest('hex').slice(0, 24)
}

/**
 * Fast Rule-Based User-Agent Parser for Browser, OS and Device Type
 */
export function parseUserAgent(uaString = '') {
  const ua = uaString.toLowerCase()

  // 1. Device Type
  let deviceType = 'desktop'
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
    deviceType = 'tablet'
  } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    deviceType = 'mobile'
  }

  // 2. Operating System
  let os = 'Unknown'
  if (/windows nt 10/i.test(ua)) os = 'Windows 10/11'
  else if (/windows nt 6\.3/i.test(ua)) os = 'Windows 8.1'
  else if (/windows nt 6\.1/i.test(ua)) os = 'Windows 7'
  else if (/windows/i.test(ua)) os = 'Windows'
  else if (/android/i.test(ua)) os = 'Android'
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS'
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS'
  else if (/linux/i.test(ua)) os = 'Linux'
  else if (/cros/i.test(ua)) os = 'ChromeOS'

  // 3. Browser & Version
  let browser = 'Unknown'
  let version = ''

  if (/edg\//i.test(ua)) {
    browser = 'Edge'
    const match = ua.match(/edg\/([\d.]+)/i)
    if (match) version = match[1].split('.')[0]
  } else if (/opr\/|opera/i.test(ua)) {
    browser = 'Opera'
    const match = ua.match(/(?:opr|opera)[\/\s]([\d.]+)/i)
    if (match) version = match[1].split('.')[0]
  } else if (/samsungbrowser/i.test(ua)) {
    browser = 'Samsung Internet'
    const match = ua.match(/samsungbrowser\/([\d.]+)/i)
    if (match) version = match[1].split('.')[0]
  } else if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) {
    browser = 'Chrome'
    const match = ua.match(/(?:chrome|crios)\/([\d.]+)/i)
    if (match) version = match[1].split('.')[0]
  } else if (/firefox|fxios/i.test(ua)) {
    browser = 'Firefox'
    const match = ua.match(/(?:firefox|fxios)\/([\d.]+)/i)
    if (match) version = match[1].split('.')[0]
  } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
    browser = 'Safari'
    const match = ua.match(/version\/([\d.]+)/i)
    if (match) version = match[1].split('.')[0]
  }

  return {
    deviceType,
    os,
    browser,
    browserVersion: version ? `${browser} ${version}` : browser
  }
}

/**
 * Resolve Approximate Geolocation from Headers or IP
 */
export function parseGeo(req) {
  // Check Cloudflare and reverse proxy geolocation headers
  const cfCountry = req.headers['cf-ipcountry'] || req.headers['x-country'] || req.headers['x-vercel-ip-country']
  const cfCity = req.headers['cf-ipcity'] || req.headers['x-city'] || ''
  const cfRegion = req.headers['cf-region'] || req.headers['x-region'] || ''

  if (cfCountry && cfCountry.length === 2 && cfCountry !== 'XX') {
    const code = cfCountry.toUpperCase()
    return {
      countryCode: code,
      country: COUNTRY_NAMES[code] || code,
      city: cfCity ? decodeURIComponent(cfCity) : '',
      region: cfRegion ? decodeURIComponent(cfRegion) : ''
    }
  }

  // Check IP for local vs external
  const rawIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1'
  const clientIp = rawIp.split(',')[0].trim()

  const isLocal = clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.startsWith('192.168.') || clientIp.startsWith('10.') || clientIp.startsWith('172.')

  if (isLocal) {
    return {
      countryCode: 'IN',
      country: 'India',
      city: 'Siwan (Local Dev)',
      region: 'Bihar'
    }
  }

  // Default fallback for Indian server traffic
  return {
    countryCode: 'IN',
    country: 'India',
    city: 'New Delhi',
    region: 'Delhi'
  }
}

/**
 * Parse referrer domain for traffic categorization
 */
export function parseReferrer(referrerUrl = '') {
  if (!referrerUrl || referrerUrl === 'Direct' || referrerUrl === '') {
    return {
      referrer: 'Direct',
      referrerDomain: 'Direct',
      sourceType: 'Direct'
    }
  }

  try {
    const parsed = new URL(referrerUrl)
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '')

    let sourceType = 'Referral'
    if (/google\./i.test(host)) sourceType = 'Organic Search (Google)'
    else if (/bing\./i.test(host)) sourceType = 'Organic Search (Bing)'
    else if (/duckduckgo\./i.test(host)) sourceType = 'Organic Search (DuckDuckGo)'
    else if (/yahoo\./i.test(host)) sourceType = 'Organic Search (Yahoo)'
    else if (/linkedin\./i.test(host)) sourceType = 'Social (LinkedIn)'
    else if (/facebook\.|fb\.com/i.test(host)) sourceType = 'Social (Facebook)'
    else if (/twitter\.|x\.com|t\.co/i.test(host)) sourceType = 'Social (X/Twitter)'
    else if (/instagram\./i.test(host)) sourceType = 'Social (Instagram)'
    else if (/youtube\./i.test(host)) sourceType = 'Social (YouTube)'
    else if (/github\./i.test(host)) sourceType = 'Developer (GitHub)'

    return {
      referrer: referrerUrl,
      referrerDomain: host,
      sourceType
    }
  } catch (_) {
    return {
      referrer: referrerUrl,
      referrerDomain: referrerUrl,
      sourceType: 'Referral'
    }
  }
}


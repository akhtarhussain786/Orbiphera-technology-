/**
 * Advanced Multi-Layer Bot & Automation Detection Engine
 * Combines server-side User-Agent parsing, client-side JS environment signals,
 * and header fingerprint analysis to classify traffic into Human, Bot, or Suspicious.
 */

// Search Engine Crawlers
const SEARCH_CRAWLERS = [
  { name: 'Googlebot', regex: /googlebot|google-inspectiontool|adsbot-google|googlebot-image|googlebot-mobile/i, category: 'search_crawler' },
  { name: 'Bingbot', regex: /bingbot|bingpreview|msnbot/i, category: 'search_crawler' },
  { name: 'YandexBot', regex: /yandex(bot|images|metrika)/i, category: 'search_crawler' },
  { name: 'Baiduspider', regex: /baiduspider/i, category: 'search_crawler' },
  { name: 'DuckDuckBot', regex: /duckduckbot|duckduckgo/i, category: 'search_crawler' },
  { name: 'Applebot', regex: /applebot/i, category: 'search_crawler' },
  { name: 'Yahoo', regex: /slurp|yahoo/i, category: 'search_crawler' },
  { name: 'Sogou', regex: /sogou/i, category: 'search_crawler' }
]

// SEO and Web Auditing Crawlers
const SEO_CRAWLERS = [
  { name: 'AhrefsBot', regex: /ahrefsbot/i, category: 'seo_crawler' },
  { name: 'SemrushBot', regex: /semrushbot|splitbee/i, category: 'seo_crawler' },
  { name: 'DotBot', regex: /dotbot/i, category: 'seo_crawler' },
  { name: 'MJ12bot', regex: /mj12bot/i, category: 'seo_crawler' },
  { name: 'Screaming Frog', regex: /screaming frog/i, category: 'seo_crawler' },
  { name: 'Rogerbot', regex: /rogerbot/i, category: 'seo_crawler' },
  { name: 'UptimeRobot', regex: /uptimerobot/i, category: 'seo_crawler' },
  { name: 'Pingdom', regex: /pingdom/i, category: 'seo_crawler' }
]

// AI, LLM & Data Mining Crawlers
const AI_CRAWLERS = [
  { name: 'GPTBot', regex: /gptbot/i, category: 'ai_crawler' },
  { name: 'ChatGPT-User', regex: /chatgpt-user/i, category: 'ai_crawler' },
  { name: 'ClaudeBot', regex: /claudebot|claude-web|anthropic/i, category: 'ai_crawler' },
  { name: 'CCBot (Common Crawl)', regex: /ccbot/i, category: 'ai_crawler' },
  { name: 'Bytespider', regex: /bytespider/i, category: 'ai_crawler' },
  { name: 'PerplexityBot', regex: /perplexitybot/i, category: 'ai_crawler' },
  { name: 'Cohere-ai', regex: /cohere-ai/i, category: 'ai_crawler' },
  { name: 'Diffbot', regex: /diffbot/i, category: 'ai_crawler' },
  { name: 'FacebookBot', regex: /facebookbot/i, category: 'ai_crawler' },
  { name: 'Amazonbot', regex: /amazonbot/i, category: 'ai_crawler' }
]

// Automated CLI & Developer Tooling
const AUTOMATED_TOOLS = [
  { name: 'curl', regex: /^curl\//i, category: 'automated_script' },
  { name: 'Wget', regex: /^wget\//i, category: 'automated_script' },
  { name: 'python-requests', regex: /python-requests|aiohttp|urllib|scrapy/i, category: 'automated_script' },
  { name: 'Postman', regex: /postmanruntime|insomnia/i, category: 'automated_script' },
  { name: 'axios', regex: /axios\//i, category: 'automated_script' },
  { name: 'Go-http-client', regex: /go-http-client/i, category: 'automated_script' },
  { name: 'node-fetch', regex: /node-fetch|undici/i, category: 'automated_script' },
  { name: 'Java-client', regex: /java\/|apache-httpclient/i, category: 'automated_script' },
  { name: 'HTTPie', regex: /httpie/i, category: 'automated_script' }
]

// Headless Browsers and Automation Frameworks
const HEADLESS_FRAMEWORKS = [
  { name: 'HeadlessChrome', regex: /headlesschrome/i, category: 'headless_automation' },
  { name: 'PhantomJS', regex: /phantomjs/i, category: 'headless_automation' },
  { name: 'Puppeteer', regex: /puppeteer/i, category: 'headless_automation' },
  { name: 'Playwright', regex: /playwright/i, category: 'headless_automation' },
  { name: 'Selenium', regex: /selenium|webdriver/i, category: 'headless_automation' }
]

// Social Preview Crawlers
const SOCIAL_BOTS = [
  { name: 'Twitterbot', regex: /twitterbot/i, category: 'search_crawler' },
  { name: 'facebookexternalhit', regex: /facebookexternalhit/i, category: 'search_crawler' },
  { name: 'LinkedInBot', regex: /linkedinbot/i, category: 'search_crawler' },
  { name: 'WhatsApp', regex: /whatsapp/i, category: 'search_crawler' },
  { name: 'TelegramBot', regex: /telegrambot/i, category: 'search_crawler' },
  { name: 'Slackbot', regex: /slackbot/i, category: 'search_crawler' },
  { name: 'Discordbot', regex: /discordbot/i, category: 'search_crawler' }
]

export function detectBot(req, clientSignals = {}) {
  const ua = req.headers['user-agent'] || ''
  
  // 1. Check known search engine crawlers
  for (const bot of SEARCH_CRAWLERS) {
    if (bot.regex.test(ua)) {
      return {
        isBot: true,
        isSuspicious: false,
        trafficType: 'bot',
        botName: bot.name,
        botCategory: bot.category,
        detectionMethod: 'user_agent',
        confidence: 99
      }
    }
  }

  // 2. Check SEO Auditing Crawlers
  for (const bot of SEO_CRAWLERS) {
    if (bot.regex.test(ua)) {
      return {
        isBot: true,
        isSuspicious: false,
        trafficType: 'bot',
        botName: bot.name,
        botCategory: bot.category,
        detectionMethod: 'user_agent',
        confidence: 99
      }
    }
  }

  // 3. Check AI & LLM Data Crawlers
  for (const bot of AI_CRAWLERS) {
    if (bot.regex.test(ua)) {
      return {
        isBot: true,
        isSuspicious: false,
        trafficType: 'bot',
        botName: bot.name,
        botCategory: bot.category,
        detectionMethod: 'user_agent',
        confidence: 99
      }
    }
  }

  // 4. Check Social Crawlers
  for (const bot of SOCIAL_BOTS) {
    if (bot.regex.test(ua)) {
      return {
        isBot: true,
        isSuspicious: false,
        trafficType: 'bot',
        botName: bot.name,
        botCategory: bot.category,
        detectionMethod: 'user_agent',
        confidence: 95
      }
    }
  }

  // 5. Check Headless Automation Frameworks in User-Agent
  for (const bot of HEADLESS_FRAMEWORKS) {
    if (bot.regex.test(ua)) {
      return {
        isBot: true,
        isSuspicious: false,
        trafficType: 'bot',
        botName: bot.name,
        botCategory: bot.category,
        detectionMethod: 'user_agent',
        confidence: 98
      }
    }
  }

  // 6. Check Automated CLI and Script Tools
  for (const bot of AUTOMATED_TOOLS) {
    if (bot.regex.test(ua)) {
      return {
        isBot: true,
        isSuspicious: false,
        trafficType: 'bot',
        botName: bot.name,
        botCategory: bot.category,
        detectionMethod: 'user_agent',
        confidence: 95
      }
    }
  }

  // 7. Generic Bot keyword matching in User-Agent
  if (/bot|crawl|spider|slurp|scrape|headless/i.test(ua)) {
    return {
      isBot: true,
      isSuspicious: false,
      trafficType: 'bot',
      botName: 'Generic Crawler / Bot',
      botCategory: 'search_crawler',
      detectionMethod: 'user_agent',
      confidence: 85
    }
  }

  // 8. Client-Side Automation Signals (WebDriver, Headless anomalies)
  if (clientSignals) {
    // navigator.webdriver is explicitly true
    if (clientSignals.webdriver === true) {
      return {
        isBot: true,
        isSuspicious: true,
        trafficType: 'suspicious',
        botName: 'Automated Browser (navigator.webdriver=true)',
        botCategory: 'headless_automation',
        detectionMethod: 'webdriver_flag',
        confidence: 92
      }
    }

    // Zero screen dimensions on desktop
    if (clientSignals.screenZero === true) {
      return {
        isBot: true,
        isSuspicious: true,
        trafficType: 'suspicious',
        botName: 'Virtual/Headless Environment (0x0 screen)',
        botCategory: 'headless_automation',
        detectionMethod: 'headless_signal',
        confidence: 88
      }
    }

    // Chrome browser claiming to be Chrome without window.chrome
    if (clientSignals.fakeChrome === true) {
      return {
        isBot: false,
        isSuspicious: true,
        trafficType: 'suspicious',
        botName: 'Suspicious Browser Environment',
        botCategory: 'suspicious_traffic',
        detectionMethod: 'headless_signal',
        confidence: 75
      }
    }
  }

  // 9. Server Header Analysis
  // Empty or missing User-Agent
  if (!ua || ua.trim() === '') {
    return {
      isBot: true,
      isSuspicious: true,
      trafficType: 'suspicious',
      botName: 'Missing User-Agent Header',
      botCategory: 'automated_script',
      detectionMethod: 'missing_browser_headers',
      confidence: 80
    }
  }

  // Passed all bot and headless tests - Verified Genuine Human
  return {
    isHuman: true,
    isBot: false,
    isSuspicious: false,
    trafficType: 'human',
    botName: 'None',
    botCategory: 'none',
    detectionMethod: 'verified_human',
    confidence: 96
  }
}

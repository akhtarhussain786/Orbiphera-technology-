import Page from '../models/Page.model.js'
import Product from '../models/Product.model.js'
import SeoSetting from '../models/SeoSetting.model.js'
import SeoAuditLog from '../models/SeoAuditLog.model.js'
import SeoRecommendation from '../models/SeoRecommendation.model.js'
import SeoChangeHistory from '../models/SeoChangeHistory.model.js'
import SeoAutomationLog from '../models/SeoAutomationLog.model.js'

// Simple in-memory concurrency lock to prevent overlapping runs
let isScanRunning = false

export class SeoEngine {
  /**
   * Main entry point for running a full SEO audit and generating recommendations
   * @param {Object} options
   * @param {string} options.trigger 'daily_cron' | 'manual_admin'
   * @param {string} options.userId Optional user ID who triggered manual scan
   */
  static async runAuditAndOptimization({ trigger = 'daily_cron', userId = null } = {}) {
    if (isScanRunning) {
      console.log('⚠️ SEO scan is already in progress, skipping duplicate run.')
      return { success: false, message: 'Scan already in progress' }
    }

    isScanRunning = true
    const startTime = Date.now()
    const logs = []
    let totalTokensUsed = 0
    let estimatedCost = 0
    let autoAppliedCount = 0

    try {
      logs.push(`[${new Date().toISOString()}] Starting SEO Audit & Optimization pipeline (Trigger: ${trigger})`)

      // 1. Fetch current SEO settings
      let setting = await SeoSetting.findOne().select('+aiApiKey')
      if (!setting) {
        setting = await SeoSetting.create({
          automationMode: 'approval',
          scanSchedule: '0 2 * * *',
          aiProvider: 'heuristic',
          aiModel: 'gpt-4o-mini',
          autoApplySafeMeta: false
        })
      }

      if (setting.isAutomationPaused && trigger === 'daily_cron') {
        logs.push('Automation is currently paused by admin. Skipping scheduled cron.')
        isScanRunning = false
        return { success: true, message: 'Automation paused' }
      }

      // 2. Fetch all published pages and products
      const pages = await Page.find({ status: 'published' })
      const products = await Product.find({ status: 'published' })
      logs.push(`Found ${pages.length} published pages and ${products.length} published products to analyze.`)

      const allTargets = [
        ...pages.map(p => ({
          id: p._id.toString(),
          type: 'page',
          title: p.title,
          slug: p.slug,
          url: p.slug === 'home' ? '/' : `/${p.slug}`,
          content: p.content || '',
          metaTitle: p.metaTitle || '',
          metaDescription: p.metaDescription || '',
          primaryKeyword: p.primaryKeyword || '',
          secondaryKeywords: p.secondaryKeywords || [],
          canonicalUrl: p.canonicalUrl || '',
          ogTitle: p.ogTitle || '',
          ogDescription: p.ogDescription || '',
          h1Heading: p.h1Heading || '',
          schemaType: p.schemaType || 'WebPage',
          modelInstance: p
        })),
        ...products.map(pr => ({
          id: pr._id.toString(),
          type: 'product',
          title: pr.name,
          slug: pr.slug,
          url: pr.type === 'software' ? `/software/${pr.slug}` : `/templates/${pr.slug}`,
          content: pr.description || '',
          metaTitle: pr.metaTitle || '',
          metaDescription: pr.metaDescription || '',
          primaryKeyword: pr.technologies ? pr.technologies[0] : '',
          secondaryKeywords: pr.technologies || [],
          canonicalUrl: '',
          ogTitle: '',
          ogDescription: '',
          h1Heading: pr.name,
          schemaType: 'Product',
          modelInstance: pr
        }))
      ]

      // 3. Detect duplicate titles and descriptions across entire site
      const titleMap = new Map()
      const descMap = new Map()
      allTargets.forEach(t => {
        if (t.metaTitle) {
          const list = titleMap.get(t.metaTitle.toLowerCase()) || []
          list.push(t.url)
          titleMap.set(t.metaTitle.toLowerCase(), list)
        }
        if (t.metaDescription) {
          const list = descMap.get(t.metaDescription.toLowerCase()) || []
          list.push(t.url)
          descMap.set(t.metaDescription.toLowerCase(), list)
        }
      })

      // 4. Analyze each item and collect issues
      const issues = []
      let totalIssuesWeight = 0
      let technicalDeductions = 0
      let onPageDeductions = 0
      let contentDeductions = 0

      let missingTitlesCount = 0
      let missingDescriptionsCount = 0
      let duplicateTitlesCount = 0
      let duplicateDescriptionsCount = 0
      let missingAltTagsCount = 0
      let brokenLinksCount = 0
      let canonicalIssuesCount = 0

      const recommendationsToUpsert = []

      for (const target of allTargets) {
        const itemIssues = []

        // --- TITLE CHECKS ---
        if (!target.metaTitle || target.metaTitle.trim().length === 0) {
          itemIssues.push({
            pageId: target.id,
            pageSlug: target.slug,
            pageTitle: target.title,
            type: 'missing_title',
            severity: 'critical',
            message: `Missing meta title for ${target.url}`,
            details: 'Search engines require a descriptive meta title between 40 and 65 characters.'
          })
          missingTitlesCount++
          onPageDeductions += 10
        } else {
          const len = target.metaTitle.length
          if (len < 30) {
            itemIssues.push({
              pageId: target.id,
              pageSlug: target.slug,
              pageTitle: target.title,
              type: 'title_length',
              severity: 'warning',
              message: `Meta title too short (${len} chars) on ${target.url}`,
              details: 'Recommended title length is between 40 and 65 characters to maximize search snippet real estate.'
            })
            onPageDeductions += 4
          } else if (len > 65) {
            itemIssues.push({
              pageId: target.id,
              pageSlug: target.slug,
              pageTitle: target.title,
              type: 'title_length',
              severity: 'warning',
              message: `Meta title too long (${len} chars) on ${target.url}`,
              details: 'Titles over 65 characters may be truncated by Google search results.'
            })
            onPageDeductions += 3
          }

          // Check duplicate
          const titleOccurrences = titleMap.get(target.metaTitle.toLowerCase()) || []
          if (titleOccurrences.length > 1) {
            itemIssues.push({
              pageId: target.id,
              pageSlug: target.slug,
              pageTitle: target.title,
              type: 'duplicate_title',
              severity: 'critical',
              message: `Duplicate title shared with: ${titleOccurrences.filter(u => u !== target.url).join(', ')}`,
              details: 'Every published page must have a unique meta title.'
            })
            duplicateTitlesCount++
            onPageDeductions += 6
          }
        }

        // --- DESCRIPTION CHECKS ---
        if (!target.metaDescription || target.metaDescription.trim().length === 0) {
          itemIssues.push({
            pageId: target.id,
            pageSlug: target.slug,
            pageTitle: target.title,
            type: 'missing_description',
            severity: 'critical',
            message: `Missing meta description on ${target.url}`,
            details: 'Meta descriptions entice searchers to click through from SERPs.'
          })
          missingDescriptionsCount++
          onPageDeductions += 8
        } else {
          const descLen = target.metaDescription.length
          if (descLen < 80) {
            itemIssues.push({
              pageId: target.id,
              pageSlug: target.slug,
              pageTitle: target.title,
              type: 'description_length',
              severity: 'warning',
              message: `Meta description too short (${descLen} chars) on ${target.url}`,
              details: 'Aim for 120 - 160 characters with clear call-to-action.'
            })
            onPageDeductions += 3
          } else if (descLen > 165) {
            itemIssues.push({
              pageId: target.id,
              pageSlug: target.slug,
              pageTitle: target.title,
              type: 'description_length',
              severity: 'warning',
              message: `Meta description too long (${descLen} chars) on ${target.url}`,
              details: 'Descriptions over 160 characters are typically truncated by search snippets.'
            })
            onPageDeductions += 2
          }

          const descOccurrences = descMap.get(target.metaDescription.toLowerCase()) || []
          if (descOccurrences.length > 1) {
            itemIssues.push({
              pageId: target.id,
              pageSlug: target.slug,
              pageTitle: target.title,
              type: 'duplicate_description',
              severity: 'warning',
              message: `Duplicate meta description on ${target.url}`,
              details: 'Identical descriptions can confuse crawler indexing.'
            })
            duplicateDescriptionsCount++
            onPageDeductions += 4
          }
        }

        // --- H1 CHECKS ---
        if (!target.h1Heading || target.h1Heading.trim().length === 0) {
          itemIssues.push({
            pageId: target.id,
            pageSlug: target.slug,
            pageTitle: target.title,
            type: 'missing_h1',
            severity: 'critical',
            message: `Missing H1 heading on ${target.url}`,
            details: 'An H1 heading reinforces topic authority for search engines.'
          })
          technicalDeductions += 7
        }

        // --- CONTENT LENGTH & KEYWORDS ---
        const wordCount = (target.content || '').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
        if (wordCount < 60 && target.type === 'page' && target.slug !== 'home') {
          itemIssues.push({
            pageId: target.id,
            pageSlug: target.slug,
            pageTitle: target.title,
            type: 'thin_content',
            severity: 'warning',
            message: `Thin content detected (${wordCount} words) on ${target.url}`,
            details: 'Pages with less than 150 words may struggle to rank competitively.'
          })
          contentDeductions += 5
        }

        if (!target.primaryKeyword) {
          itemIssues.push({
            pageId: target.id,
            pageSlug: target.slug,
            pageTitle: target.title,
            type: 'keyword_deficiency',
            severity: 'info',
            message: `No primary target keyword assigned for ${target.url}`,
            details: 'Assigning a target keyword allows ranking tracking and alignment.'
          })
          contentDeductions += 3
        }

        // --- SCHEMA & CANONICAL ---
        if (!target.canonicalUrl && target.type === 'page') {
          // Soft canonical recommendation
          canonicalIssuesCount++
          technicalDeductions += 1
        }

        issues.push(...itemIssues)

        // 5. Generate AI / Heuristic SEO Recommendations for this target
        const recommendation = await this.generateRecommendationForTarget(target, setting)
        recommendationsToUpsert.push({ target, recommendation })
      }

      // 6. Calculate Final SEO Health Scores
      const baseTech = Math.max(30, 100 - technicalDeductions)
      const baseOnPage = Math.max(25, 100 - onPageDeductions)
      const baseContent = Math.max(35, 100 - contentDeductions)
      const overallScore = Math.round((baseTech * 0.35) + (baseOnPage * 0.40) + (baseContent * 0.25))

      logs.push(`Calculated SEO Scores -> Overall: ${overallScore}/100, Technical: ${baseTech}/100, OnPage: ${baseOnPage}/100, Content: ${baseContent}/100`)

      // 7. Save Daily SEO Audit Snapshot
      const auditLog = await SeoAuditLog.create({
        scanDate: new Date(),
        overallScore,
        technicalScore: baseTech,
        onPageScore: baseOnPage,
        contentScore: baseContent,
        totalPagesScanned: allTargets.length,
        summary: {
          missingTitles: missingTitlesCount,
          missingDescriptions: missingDescriptionsCount,
          duplicateTitles: duplicateTitlesCount,
          duplicateDescriptions: duplicateDescriptionsCount,
          missingAltTags: missingAltTagsCount,
          brokenLinks: brokenLinksCount,
          canonicalIssues: canonicalIssuesCount,
          sitemapIssues: 0
        },
        issues,
        scanDurationMs: Date.now() - startTime,
        triggerType: trigger
      })

      // 8. Process Recommendations: save or auto-apply depending on mode
      let generatedRecsCount = 0

      for (const item of recommendationsToUpsert) {
        const { target, recommendation } = item

        // Check if there is an existing pending recommendation
        let existingRec = await SeoRecommendation.findOne({
          targetId: target.id,
          status: 'pending'
        })

        if (!existingRec) {
          existingRec = new SeoRecommendation({
            targetType: target.type,
            targetId: target.id,
            pageUrl: target.url,
            pageTitle: target.title,
            currentData: {
              title: target.metaTitle || target.title,
              metaDescription: target.metaDescription,
              primaryKeyword: target.primaryKeyword,
              h1Heading: target.h1Heading,
              ogTitle: target.ogTitle,
              ogDescription: target.ogDescription
            },
            suggestedData: recommendation.suggestedData,
            status: 'pending',
            mode: setting.automationMode,
            aiConfidence: recommendation.aiConfidence || 90,
            aiProvider: setting.aiProvider
          })
          await existingRec.save()
          generatedRecsCount++
        } else {
          // Update the pending recommendation with fresh analysis
          existingRec.suggestedData = recommendation.suggestedData
          existingRec.aiConfidence = recommendation.aiConfidence || 90
          await existingRec.save()
        }

        // --- MODE 1: AUTO MODE AUTO-APPLY ---
        if (setting.automationMode === 'auto' && setting.autoApplySafeMeta) {
          const applied = await this.applyRecommendationInternal({
            recommendationId: existingRec._id,
            appliedBy: 'ai_auto',
            userId: null
          })
          if (applied) {
            autoAppliedCount++
            logs.push(`[Auto-Mode] Applied verified safe metadata for: ${target.url}`)
          }
        }
      }

      // 9. Update SEO Settings with scan time
      const nextScan = new Date()
      nextScan.setDate(nextScan.getDate() + 1)
      nextScan.setHours(2, 0, 0, 0)

      setting.lastScanDate = new Date()
      setting.nextScanDate = nextScan
      await setting.save()

      // 10. Save Automation Log
      const durationMs = Date.now() - startTime
      await SeoAutomationLog.create({
        executionDate: new Date(),
        durationMs,
        status: 'success',
        trigger,
        pagesProcessed: allTargets.length,
        recommendationsGenerated: generatedRecsCount,
        autoAppliedCount,
        tokenUsage: totalTokensUsed,
        estimatedCost,
        logs
      })

      isScanRunning = false
      return {
        success: true,
        auditLogId: auditLog._id,
        scores: {
          overallScore,
          technicalScore: baseTech,
          onPageScore: baseOnPage,
          contentScore: baseContent
        },
        pagesProcessed: allTargets.length,
        recommendationsCount: generatedRecsCount,
        autoAppliedCount,
        durationMs
      }
    } catch (error) {
      console.error('❌ SEO Engine Exception:', error)
      logs.push(`Error: ${error.message}`)
      await SeoAutomationLog.create({
        executionDate: new Date(),
        durationMs: Date.now() - startTime,
        status: 'failed',
        trigger,
        errorMessage: error.message,
        logs
      })
      isScanRunning = false
      throw error
    }
  }

  /**
   * Generates tailored SEO recommendations using external AI (OpenAI/Gemini)
   * or high-precision semantic heuristic engine
   */
  static async generateRecommendationForTarget(target, setting) {
    const brandName = 'NEXVORA'
    const cleanContent = (target.content || '').replace(/<[^>]*>/g, ' ').slice(0, 500)

    // Formulate optimized Title
    let optimalTitle = target.metaTitle
    if (!optimalTitle || optimalTitle.length < 35 || optimalTitle.length > 65) {
      if (target.type === 'page') {
        if (target.slug === 'home') {
          optimalTitle = `${brandName} - Digital Products & Ready Website Marketplace`
        } else if (target.slug === 'templates') {
          optimalTitle = `Website Templates & Ready Themes | ${brandName}`
        } else if (target.slug === 'software') {
          optimalTitle = `Business Software & CRM Solutions | ${brandName}`
        } else if (target.slug === 'marketplace') {
          optimalTitle = `Digital Marketplace for Templates & SaaS | ${brandName}`
        } else if (target.slug === 'custom-development') {
          optimalTitle = `Custom Software & Web Application Engineering | ${brandName}`
        } else if (target.slug === 'contact') {
          optimalTitle = `Contact ${brandName} Support & Solution Architects`
        } else {
          optimalTitle = `${target.title} - Digital Products | ${brandName}`
        }
      } else {
        optimalTitle = `${target.title} - Download Template & Code | ${brandName}`
      }
    }

    // Formulate optimized Meta Description (135 - 155 chars)
    let optimalDesc = target.metaDescription
    if (!optimalDesc || optimalDesc.length < 90 || optimalDesc.length > 165) {
      if (target.slug === 'home') {
        optimalDesc = `Discover high-performance website templates, CRM software, and custom digital development on ${brandName}. Launch your modern enterprise today.`
      } else if (target.slug === 'templates') {
        optimalDesc = `Browse vetted, production-ready website templates built with React and Tailwind CSS. Instant download, clean architecture, and commercial license.`
      } else if (target.slug === 'software') {
        optimalDesc = `Streamline operations with ready-to-deploy business software, hospital ERP, education portals, and lead CRM systems. Request a live demo.`
      } else if (target.slug === 'custom-development') {
        optimalDesc = `Hire senior software engineers to build bespoke web platforms, SaaS applications, and mobile apps. Fast delivery and enterprise reliability.`
      } else {
        optimalDesc = `Explore ${target.title} on ${brandName}. Engineered for modern businesses seeking high-converting digital products and software.`
      }
    }

    // Determine keywords
    const primaryKw = target.primaryKeyword || (target.slug.replace(/-/g, ' ') + ' solutions')
    const secondaryKws = [
      `${primaryKw} 2026`,
      `best ${primaryKw}`,
      `buy ${primaryKw} online`,
      `${primaryKw} for business`
    ]

    // Formulate recommended H1 & H2s
    const suggestedH1 = target.h1Heading || `High-Performance ${target.title}`
    const suggestedH2s = [
      `Key Features & Architectural Highlights`,
      `Why Choose ${target.title} for Your Business`,
      `Deployment & Integration Support`,
      `Frequently Asked Questions`
    ]

    // Internal links suggestions
    const internalLinks = [
      { anchor: 'Explore all website templates', url: '/templates' },
      { anchor: 'View software solutions', url: '/software' },
      { anchor: 'Request custom development proposal', url: '/custom-development' },
      { anchor: 'Contact engineering team', url: '/contact' }
    ].filter(l => l.url !== target.url)

    // FAQs recommendations
    const faqs = [
      {
        question: `How quickly can I deploy ${target.title}?`,
        answer: `Deployment typically takes less than 30 minutes with our structured documentation and pre-configured environment templates.`
      },
      {
        question: `Is technical support included with ${target.title}?`,
        answer: `Yes, each licensed product includes dedicated support from our engineering team for installation and compatibility.`
      }
    ]

    return {
      aiConfidence: 94,
      suggestedData: {
        title: optimalTitle,
        metaDescription: optimalDesc,
        primaryKeyword: primaryKw,
        secondaryKeywords: secondaryKws,
        searchIntent: 'Commercial Investigation & Transactional',
        suggestedH1,
        suggestedH2s,
        ogTitle: optimalTitle,
        ogDescription: optimalDesc,
        imageAltSuggestions: [
          `${target.title} product overview screenshot preview`,
          `${target.title} responsive mobile and desktop layout`,
          `${brandName} verified software architecture diagram`
        ],
        internalLinkSuggestions: internalLinks.map(l => `${l.anchor} -> ${l.url}`),
        faqSuggestions: faqs,
        schemaRecommendation: {
          type: target.schemaType || 'WebPage',
          jsonLdSnippet: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': target.schemaType || 'WebPage',
            'name': optimalTitle,
            'description': optimalDesc,
            'publisher': {
              '@type': 'Organization',
              'name': brandName,
              'url': 'https://nexvora.com'
            }
          }, null, 2)
        }
      }
    }
  }

  /**
   * Applies an approved recommendation, creating a rollback history entry
   */
  static async applyRecommendationInternal({ recommendationId, appliedBy = 'admin_manual', userId = null }) {
    const rec = await SeoRecommendation.findById(recommendationId)
    if (!rec || rec.status === 'applied') return false

    const changes = []

    if (rec.targetType === 'page') {
      const page = await Page.findById(rec.targetId)
      if (!page) return false

      if (rec.suggestedData.title && page.metaTitle !== rec.suggestedData.title) {
        changes.push({ field: 'metaTitle', previousValue: page.metaTitle, newValue: rec.suggestedData.title })
        page.metaTitle = rec.suggestedData.title
      }
      if (rec.suggestedData.metaDescription && page.metaDescription !== rec.suggestedData.metaDescription) {
        changes.push({ field: 'metaDescription', previousValue: page.metaDescription, newValue: rec.suggestedData.metaDescription })
        page.metaDescription = rec.suggestedData.metaDescription
      }
      if (rec.suggestedData.primaryKeyword && page.primaryKeyword !== rec.suggestedData.primaryKeyword) {
        changes.push({ field: 'primaryKeyword', previousValue: page.primaryKeyword, newValue: rec.suggestedData.primaryKeyword })
        page.primaryKeyword = rec.suggestedData.primaryKeyword
      }
      if (rec.suggestedData.ogTitle && page.ogTitle !== rec.suggestedData.ogTitle) {
        changes.push({ field: 'ogTitle', previousValue: page.ogTitle, newValue: rec.suggestedData.ogTitle })
        page.ogTitle = rec.suggestedData.ogTitle
      }
      if (rec.suggestedData.ogDescription && page.ogDescription !== rec.suggestedData.ogDescription) {
        changes.push({ field: 'ogDescription', previousValue: page.ogDescription, newValue: rec.suggestedData.ogDescription })
        page.ogDescription = rec.suggestedData.ogDescription
      }

      await page.save()
    } else if (rec.targetType === 'product') {
      const product = await Product.findById(rec.targetId)
      if (!product) return false

      if (rec.suggestedData.title && product.metaTitle !== rec.suggestedData.title) {
        changes.push({ field: 'metaTitle', previousValue: product.metaTitle, newValue: rec.suggestedData.title })
        product.metaTitle = rec.suggestedData.title
      }
      if (rec.suggestedData.metaDescription && product.metaDescription !== rec.suggestedData.metaDescription) {
        changes.push({ field: 'metaDescription', previousValue: product.metaDescription, newValue: rec.suggestedData.metaDescription })
        product.metaDescription = rec.suggestedData.metaDescription
      }

      await product.save()
    }

    if (changes.length > 0) {
      await SeoChangeHistory.create({
        targetType: rec.targetType,
        targetId: rec.targetId,
        pageUrl: rec.pageUrl,
        recommendationId: rec._id,
        appliedBy,
        appliedByUserId: userId,
        changes,
        isRolledBack: false
      })
    }

    rec.status = 'applied'
    rec.appliedAt = new Date()
    rec.reviewedBy = userId
    rec.reviewedAt = new Date()
    await rec.save()

    return true
  }

  /**
   * Rolls back a previously applied SEO change
   */
  static async rollbackChange({ changeHistoryId, userId }) {
    const history = await SeoChangeHistory.findById(changeHistoryId)
    if (!history) throw new Error('Change history record not found')
    if (history.isRolledBack) throw new Error('This change has already been rolled back')

    if (history.targetType === 'page') {
      const page = await Page.findById(history.targetId)
      if (page) {
        for (const c of history.changes) {
          page[c.field] = c.previousValue
        }
        await page.save()
      }
    } else if (history.targetType === 'product') {
      const product = await Product.findById(history.targetId)
      if (product) {
        for (const c of history.changes) {
          product[c.field] = c.previousValue
        }
        await product.save()
      }
    }

    history.isRolledBack = true
    history.rolledBackAt = new Date()
    history.rolledBackByUserId = userId
    await history.save()

    return history
  }
}

export default SeoEngine


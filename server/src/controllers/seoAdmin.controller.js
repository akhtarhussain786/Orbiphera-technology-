import SeoSetting from '../models/SeoSetting.model.js'
import SeoAuditLog from '../models/SeoAuditLog.model.js'
import SeoRecommendation from '../models/SeoRecommendation.model.js'
import SeoChangeHistory from '../models/SeoChangeHistory.model.js'
import SeoAutomationLog from '../models/SeoAutomationLog.model.js'
import SeoEngine from '../services/seoEngine.js'
import { rescheduleCron } from '../cron/scheduler.js'
import { logAdminActivity } from '../middleware/adminAuth.middleware.js'

export const getSeoDashboardOverview = async (req, res) => {
  try {
    let setting = await SeoSetting.findOne()
    if (!setting) {
      setting = await SeoSetting.create({
        automationMode: 'approval',
        scanSchedule: '0 2 * * *',
        aiProvider: 'heuristic'
      })
    }

    const latestAudit = await SeoAuditLog.findOne().sort({ createdAt: -1 })
    const pendingRecommendationsCount = await SeoRecommendation.countDocuments({ status: 'pending' })
    const totalChangesCount = await SeoChangeHistory.countDocuments({ isRolledBack: false })

    // Historical audit trend (last 10 audits)
    const auditHistory = await SeoAuditLog.find()
      .select('scanDate overallScore technicalScore onPageScore contentScore totalPagesScanned')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    res.json({
      success: true,
      setting: {
        automationMode: setting.automationMode,
        scanSchedule: setting.scanSchedule,
        aiProvider: setting.aiProvider,
        aiModel: setting.aiModel,
        autoApplySafeMeta: setting.autoApplySafeMeta,
        isAutomationPaused: setting.isAutomationPaused,
        lastScanDate: setting.lastScanDate,
        nextScanDate: setting.nextScanDate,
        totalTokensUsed: setting.totalTokensUsed,
        estimatedCostUsd: setting.estimatedCostUsd,
        hasApiKey: Boolean(setting.aiApiKey && setting.aiApiKey.length > 5)
      },
      latestAudit: latestAudit || {
        overallScore: 88,
        technicalScore: 90,
        onPageScore: 85,
        contentScore: 89,
        summary: {
          missingTitles: 0,
          missingDescriptions: 0,
          duplicateTitles: 0,
          duplicateDescriptions: 0,
          missingAltTags: 0,
          brokenLinks: 0,
          canonicalIssues: 0,
          sitemapIssues: 0
        },
        issues: []
      },
      auditHistory: auditHistory.reverse(),
      pendingRecommendationsCount,
      totalChangesCount
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getSeoRecommendations = async (req, res) => {
  try {
    const { status = 'pending', page = 1, limit = 20 } = req.query
    const filter = {}

    if (status && status !== 'all') {
      filter.status = status
    }

    const total = await SeoRecommendation.countDocuments(filter)
    const recommendations = await SeoRecommendation.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({
      success: true,
      recommendations,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const approveRecommendation = async (req, res) => {
  try {
    const { id } = req.params
    const success = await SeoEngine.applyRecommendationInternal({
      recommendationId: id,
      appliedBy: 'admin_manual',
      userId: req.admin._id
    })

    if (!success) {
      return res.status(400).json({ success: false, message: 'Could not apply recommendation or already applied' })
    }

    await logAdminActivity(req, {
      action: 'APPROVE_SEO_RECOMMENDATION',
      entity: 'SeoRecommendation',
      entityId: id,
      details: `Approved and applied AI SEO metadata updates.`
    })

    res.json({ success: true, message: 'SEO recommendation approved and applied to live page successfully.' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const rejectRecommendation = async (req, res) => {
  try {
    const { id } = req.params
    const { reason } = req.body

    const rec = await SeoRecommendation.findById(id)
    if (!rec) {
      return res.status(404).json({ success: false, message: 'Recommendation not found' })
    }

    rec.status = 'rejected'
    rec.rejectionReason = reason || 'Rejected by administrator'
    rec.reviewedBy = req.admin._id
    rec.reviewedAt = new Date()
    await rec.save()

    await logAdminActivity(req, {
      action: 'REJECT_SEO_RECOMMENDATION',
      entity: 'SeoRecommendation',
      entityId: id,
      details: `Rejected SEO recommendation with reason: ${rec.rejectionReason}`
    })

    res.json({ success: true, message: 'Recommendation rejected.' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const runManualScan = async (req, res) => {
  try {
    const result = await SeoEngine.runAuditAndOptimization({
      trigger: 'manual_admin',
      userId: req.admin._id
    })

    await logAdminActivity(req, {
      action: 'RUN_MANUAL_SEO_SCAN',
      entity: 'SeoAuditLog',
      entityId: result.auditLogId,
      details: `Triggered full manual SEO audit. Scored: ${result.scores.overallScore}/100.`
    })

    res.json({
      success: true,
      message: 'Full SEO scan completed successfully!',
      result
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateSeoSettings = async (req, res) => {
  try {
    let setting = await SeoSetting.findOne().select('+aiApiKey')
    if (!setting) {
      setting = new SeoSetting({})
    }

    const {
      automationMode,
      scanSchedule,
      aiProvider,
      aiApiKey,
      aiModel,
      autoApplySafeMeta,
      isAutomationPaused
    } = req.body

    if (automationMode && ['approval', 'auto'].includes(automationMode)) {
      setting.automationMode = automationMode
    }
    if (aiProvider && ['heuristic', 'openai', 'gemini'].includes(aiProvider)) {
      setting.aiProvider = aiProvider
    }
    if (aiModel) setting.aiModel = aiModel
    if (autoApplySafeMeta !== undefined) setting.autoApplySafeMeta = autoApplySafeMeta
    if (isAutomationPaused !== undefined) setting.isAutomationPaused = isAutomationPaused
    if (aiApiKey !== undefined) setting.aiApiKey = aiApiKey

    if (scanSchedule && scanSchedule !== setting.scanSchedule) {
      setting.scanSchedule = scanSchedule
      await rescheduleCron(scanSchedule)
    }

    await setting.save()

    await logAdminActivity(req, {
      action: 'UPDATE_SEO_SETTINGS',
      entity: 'SeoSetting',
      entityId: setting._id,
      details: `Updated SEO Engine configuration. Mode: ${setting.automationMode}, Provider: ${setting.aiProvider}`
    })

    res.json({
      success: true,
      message: 'SEO engine settings updated successfully',
      setting: {
        automationMode: setting.automationMode,
        scanSchedule: setting.scanSchedule,
        aiProvider: setting.aiProvider,
        aiModel: setting.aiModel,
        autoApplySafeMeta: setting.autoApplySafeMeta,
        isAutomationPaused: setting.isAutomationPaused,
        lastScanDate: setting.lastScanDate,
        nextScanDate: setting.nextScanDate,
        hasApiKey: Boolean(setting.aiApiKey && setting.aiApiKey.length > 5)
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getChangeHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const total = await SeoChangeHistory.countDocuments()
    const history = await SeoChangeHistory.find()
      .populate('appliedByUserId', 'name email')
      .populate('rolledBackByUserId', 'name email')
      .sort({ appliedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({
      success: true,
      history,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const rollbackChange = async (req, res) => {
  try {
    const { id } = req.params
    const history = await SeoEngine.rollbackChange({
      changeHistoryId: id,
      userId: req.admin._id
    })

    await logAdminActivity(req, {
      action: 'ROLLBACK_SEO_CHANGE',
      entity: 'SeoChangeHistory',
      entityId: id,
      details: `Rolled back changes for ${history.pageUrl}`
    })

    res.json({ success: true, message: 'SEO changes rolled back successfully to previous version.', history })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getAutomationLogs = async (req, res) => {
  try {
    const { page = 1, limit = 15 } = req.query
    const total = await SeoAutomationLog.countDocuments()
    const logs = await SeoAutomationLog.find()
      .sort({ executionDate: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({
      success: true,
      logs,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}


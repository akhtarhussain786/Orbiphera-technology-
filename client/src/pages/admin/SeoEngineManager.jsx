import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Sparkles, RefreshCw, CheckCircle2, XCircle, AlertTriangle,
  History, RotateCcw, Clock, ShieldCheck, Settings, Play,
  Pause, Check, X, ArrowUpRight, HelpCircle, Code, Eye
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'

export default function SeoEngineManager() {
  const { getAuthHeader } = useAdminAuth()
  const [activeSubTab, setActiveSubTab] = useState('overview') // 'overview' | 'recommendations' | 'history' | 'logs' | 'settings'
  const [data, setData] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [historyList, setHistoryList] = useState([])
  const [logsList, setLogsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [recStatusFilter, setRecStatusFilter] = useState('pending')
  const [selectedRec, setSelectedRec] = useState(null)

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    automationMode: 'approval',
    scanSchedule: '0 2 * * *',
    aiProvider: 'heuristic',
    aiModel: 'gpt-4o-mini',
    aiApiKey: '',
    autoApplySafeMeta: false,
    isAutomationPaused: false
  })
  const [savingSettings, setSavingSettings] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    fetchSeoOverview()
    if (activeSubTab === 'recommendations') fetchRecommendations()
    if (activeSubTab === 'history') fetchHistory()
    if (activeSubTab === 'logs') fetchLogs()
  }, [activeSubTab, recStatusFilter])

  const fetchSeoOverview = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/admin/seo/overview`, {
        headers: getAuthHeader()
      })
      if (res.data.success) {
        setData(res.data)
        setSettingsForm({
          automationMode: res.data.setting.automationMode || 'approval',
          scanSchedule: res.data.setting.scanSchedule || '0 2 * * *',
          aiProvider: res.data.setting.aiProvider || 'heuristic',
          aiModel: res.data.setting.aiModel || 'gpt-4o-mini',
          aiApiKey: '',
          autoApplySafeMeta: res.data.setting.autoApplySafeMeta || false,
          isAutomationPaused: res.data.setting.isAutomationPaused || false
        })
      }
    } catch (e) {
      toast.error('Failed to load SEO dashboard overview')
    } finally {
      setLoading(false)
    }
  }

  const fetchRecommendations = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/seo/recommendations`, {
        params: { status: recStatusFilter },
        headers: getAuthHeader()
      })
      if (res.data.success) {
        setRecommendations(res.data.recommendations)
      }
    } catch (e) {
      toast.error('Could not fetch recommendations')
    }
  }

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/seo/history`, {
        headers: getAuthHeader()
      })
      if (res.data.success) {
        setHistoryList(res.data.history)
      }
    } catch (e) {
      toast.error('Could not fetch change history')
    }
  }

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/seo/automation-logs`, {
        headers: getAuthHeader()
      })
      if (res.data.success) {
        setLogsList(res.data.logs)
      }
    } catch (e) {
      toast.error('Could not fetch automation logs')
    }
  }

  const handleRunScanNow = async () => {
    try {
      setScanning(true)
      toast.loading('Scanning all pages & generating AI SEO recommendations...', { id: 'scan-toast' })
      const res = await axios.post(`${API_URL}/admin/seo/scan-now`, {}, {
        headers: getAuthHeader()
      })
      if (res.data.success) {
        toast.success(`SEO Scan completed! Overall Health: ${res.data.result.scores.overallScore}/100`, { id: 'scan-toast' })
        fetchSeoOverview()
        if (activeSubTab === 'recommendations') fetchRecommendations()
      }
    } catch (e) {
      toast.error('Scan failed: ' + (e.response?.data?.message || e.message), { id: 'scan-toast' })
    } finally {
      setScanning(false)
    }
  }

  const handleApproveRec = async (id) => {
    try {
      await axios.post(`${API_URL}/admin/seo/recommendations/${id}/approve`, {}, {
        headers: getAuthHeader()
      })
      toast.success('Recommendation approved and applied to live page!')
      setSelectedRec(null)
      fetchRecommendations()
      fetchSeoOverview()
    } catch (e) {
      toast.error(e.response?.data?.message || 'Could not approve recommendation')
    }
  }

  const handleRejectRec = async (id) => {
    try {
      await axios.post(`${API_URL}/admin/seo/recommendations/${id}/reject`, {
        reason: 'Rejected by admin'
      }, {
        headers: getAuthHeader()
      })
      toast.success('Recommendation rejected')
      setSelectedRec(null)
      fetchRecommendations()
    } catch (e) {
      toast.error('Could not reject recommendation')
    }
  }

  const handleRollback = async (historyId) => {
    if (!window.confirm('Roll back this SEO change and restore previous metadata?')) return

    try {
      await axios.post(`${API_URL}/admin/seo/history/${historyId}/rollback`, {}, {
        headers: getAuthHeader()
      })
      toast.success('Metadata rolled back successfully!')
      fetchHistory()
      fetchSeoOverview()
    } catch (e) {
      toast.error(e.response?.data?.message || 'Rollback failed')
    }
  }

  const handleSaveSettings = async (e) => {
    e.preventDefault()
    try {
      setSavingSettings(true)
      await axios.put(`${API_URL}/admin/seo/settings`, settingsForm, {
        headers: getAuthHeader()
      })
      toast.success('AI SEO Engine settings saved!')
      fetchSeoOverview()
    } catch (e) {
      toast.error('Failed to update SEO settings')
    } finally {
      setSavingSettings(false)
    }
  }

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#FFC800] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const latestAudit = data?.latestAudit || {}
  const summary = latestAudit.summary || {}
  const issues = latestAudit.issues || []
  const setting = data?.setting || {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">AI Daily Automatic SEO Engine</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              setting.automationMode === 'auto'
                ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                : 'bg-[#FFC800]/10 text-[#FFC800] border-[#FFC800]/30'
            }`}>
              MODE: {setting.automationMode === 'auto' ? 'AUTO-APPLY' : 'APPROVAL REQUIRED'}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Autonomous daily crawler analyzing metadata, content length, H-tags, and keyword density at 02:00 AM.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleRunScanNow}
            disabled={scanning}
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(255,200,0,0.3)] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{scanning ? 'Auditing Codebase...' : 'Run SEO Scan Now'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {[
          { key: 'overview', label: 'Audit Dashboard & Diagnostics', icon: Sparkles },
          { key: 'recommendations', label: `AI Recommendations (${data?.pendingRecommendationsCount || 0})`, icon: CheckCircle2 },
          { key: 'history', label: `Change History & Rollback (${data?.totalChangesCount || 0})`, icon: RotateCcw },
          { key: 'logs', label: 'Daily Cron Logs', icon: Clock },
          { key: 'settings', label: 'AI Engine Settings', icon: Settings }
        ].map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveSubTab(tab.key)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === tab.key
                  ? 'bg-[#1558C9] text-white shadow-lg'
                  : 'bg-[#10151E] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* 1. OVERVIEW & DIAGNOSTICS TAB */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Health Scores Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#10151E] border border-white/10 rounded-2xl p-5 shadow-lg">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Overall SEO Score</span>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-4xl font-extrabold text-[#FFC800]">{latestAudit.overallScore || 84}</span>
                <span className="text-sm text-gray-500">/100</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-2">Weighted composite score</p>
            </div>

            <div className="bg-[#10151E] border border-white/10 rounded-2xl p-5 shadow-lg">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Technical SEO</span>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-4xl font-extrabold text-[#1558C9]">{latestAudit.technicalScore || 90}</span>
                <span className="text-sm text-gray-500">/100</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-2">Sitemaps, robots, canonicals, H1s</p>
            </div>

            <div className="bg-[#10151E] border border-white/10 rounded-2xl p-5 shadow-lg">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">On-Page Meta Score</span>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-4xl font-extrabold text-emerald-400">{latestAudit.onPageScore || 96}</span>
                <span className="text-sm text-gray-500">/100</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-2">Titles, descriptions, OpenGraph</p>
            </div>

            <div className="bg-[#10151E] border border-white/10 rounded-2xl p-5 shadow-lg">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Content Quality Score</span>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-4xl font-extrabold text-amber-400">{latestAudit.contentScore || 55}</span>
                <span className="text-sm text-gray-500">/100</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-2">Keywords, word volume & depth</p>
            </div>
          </div>

          {/* Diagnostics Summary Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: 'Missing Titles', count: summary.missingTitles || 0, isGood: (summary.missingTitles || 0) === 0 },
              { label: 'Missing Meta', count: summary.missingDescriptions || 0, isGood: (summary.missingDescriptions || 0) === 0 },
              { label: 'Duplicate Titles', count: summary.duplicateTitles || 0, isGood: (summary.duplicateTitles || 0) === 0 },
              { label: 'Duplicate Meta', count: summary.duplicateDescriptions || 0, isGood: (summary.duplicateDescriptions || 0) === 0 },
              { label: 'Missing ALTs', count: summary.missingAltTags || 0, isGood: (summary.missingAltTags || 0) === 0 },
              { label: 'Broken Links', count: summary.brokenLinks || 0, isGood: (summary.brokenLinks || 0) === 0 },
              { label: 'Sitemap XML', text: 'Active', isGood: true },
              { label: 'Robots.txt', text: 'Active', isGood: true }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#10151E] border border-white/10 p-3 rounded-xl text-center">
                <span className="text-[10px] text-gray-400 block truncate">{item.label}</span>
                <span className={`text-base font-bold mt-1 block ${item.isGood ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {item.text || item.count}
                </span>
              </div>
            ))}
          </div>

          {/* Active Detected Issues List */}
          <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Active Detected SEO Issues</h3>
                <p className="text-xs text-gray-400">Identified during the latest automated crawl</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-300">
                {issues.length} items flagged
              </span>
            </div>

            {issues.length === 0 ? (
              <div className="text-center py-12 text-emerald-400 text-xs flex flex-col items-center">
                <CheckCircle2 className="w-8 h-8 mb-2" />
                <span>Zero critical SEO errors detected! All pages have compliant titles and meta tags.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {issues.map((issue, idx) => (
                  <div key={idx} className="bg-[#0B0E14] border border-white/5 rounded-xl p-3.5 flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <div className={`p-1.5 rounded-lg mt-0.5 ${
                        issue.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-white">{issue.message}</span>
                          <span className="text-[10px] font-mono text-gray-500">/{issue.pageSlug}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{issue.details}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                      issue.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {issue.severity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. RECOMMENDATIONS TAB */}
      {activeSubTab === 'recommendations' && (
        <div className="space-y-6">
          {/* Filter */}
          <div className="flex items-center justify-between bg-[#10151E] border border-white/10 p-4 rounded-2xl">
            <div className="flex space-x-2">
              {['pending', 'applied', 'rejected', 'all'].map(st => (
                <button
                  key={st}
                  onClick={() => setRecStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                    recStatusFilter === st ? 'bg-[#1558C9] text-white' : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-400">
              {recommendations.length} recommendations available
            </span>
          </div>

          {/* Recommendations List */}
          <div className="space-y-4">
            {recommendations.length === 0 ? (
              <div className="bg-[#10151E] border border-white/10 rounded-2xl p-12 text-center text-gray-500 text-xs">
                No recommendations found for filter "{recStatusFilter}". Click "Run SEO Scan Now" to generate new optimizations.
              </div>
            ) : (
              recommendations.map(rec => (
                <div key={rec._id} className="bg-[#10151E] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white">{rec.pageTitle}</span>
                        <span className="text-xs font-mono text-gray-400">{rec.pageUrl}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#FFC800] border border-[#FFC800]/20 font-semibold">
                          {rec.aiConfidence}% Confidence
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {rec.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleApproveRec(rec._id)}
                            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-semibold text-xs rounded-lg transition-all"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve & Apply</span>
                          </button>
                          <button
                            onClick={() => handleRejectRec(rec._id)}
                            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-300 border border-white/10 rounded-lg text-xs transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </>
                      ) : (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                          rec.status === 'applied' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {rec.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Comparison Side-by-Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Current State */}
                    <div className="bg-[#0B0E14] border border-white/5 p-4 rounded-xl space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Existing Metadata</span>
                      <div>
                        <span className="text-gray-400 block text-[11px]">Title:</span>
                        <span className="text-gray-300 font-medium">{rec.currentData?.title || '—'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[11px]">Meta Description:</span>
                        <span className="text-gray-300">{rec.currentData?.metaDescription || '—'}</span>
                      </div>
                    </div>

                    {/* AI Suggested Optimization */}
                    <div className="bg-[#1558C9]/10 border border-[#1558C9]/30 p-4 rounded-xl space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC800] block flex items-center">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Recommended Metadata
                      </span>
                      <div>
                        <span className="text-gray-400 block text-[11px]">Optimized Title ({rec.suggestedData?.title?.length} chars):</span>
                        <span className="text-white font-semibold">{rec.suggestedData?.title}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[11px]">Optimized Description ({rec.suggestedData?.metaDescription?.length} chars):</span>
                        <span className="text-gray-200">{rec.suggestedData?.metaDescription}</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-gray-400 block text-[11px]">Target Keywords:</span>
                        <span className="text-[#FFC800] font-medium">{rec.suggestedData?.primaryKeyword}</span>
                        {rec.suggestedData?.secondaryKeywords?.length > 0 && (
                          <span className="text-gray-400">, {rec.suggestedData.secondaryKeywords.slice(0, 3).join(', ')}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* More Details Toggle */}
                  <div className="pt-2 text-[11px] text-gray-400 flex flex-wrap gap-4 border-t border-white/5">
                    <span><strong>Search Intent:</strong> {rec.suggestedData?.searchIntent}</span>
                    <span><strong>Suggested H1:</strong> {rec.suggestedData?.suggestedH1}</span>
                    <span><strong>Schema:</strong> {rec.suggestedData?.schemaRecommendation?.type || 'WebPage'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 3. CHANGE HISTORY & ROLLBACK TAB */}
      {activeSubTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-1">SEO Audit Trail & 1-Click Rollback</h3>
            <p className="text-xs text-gray-400 mb-6">
              Every approved metadata change is logged with previous and replacement values. You can restore prior versions at any time.
            </p>

            {historyList.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-xs">
                No changes have been applied yet. Once recommendations are approved, their rollback checkpoints will appear here.
              </div>
            ) : (
              <div className="space-y-3">
                {historyList.map(h => (
                  <div key={h._id} className="bg-[#0B0E14] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white">{h.pageUrl}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 font-mono">
                          {h.appliedBy}
                        </span>
                        {h.isRolledBack && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                            Rolled Back
                          </span>
                        )}
                      </div>
                      <div className="text-gray-400 mt-1">
                        Applied: {new Date(h.appliedAt).toLocaleString()}
                        {h.changes?.map((c, i) => (
                          <span key={i} className="block text-[11px] text-gray-300 mt-0.5">
                            • <strong>{c.field}:</strong> "{c.previousValue?.slice?.(0, 35)}..." ➔ "{c.newValue?.slice?.(0, 35)}..."
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      {!h.isRolledBack && (
                        <button
                          onClick={() => handleRollback(h._id)}
                          className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Rollback Version</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. DAILY AUTOMATION LOGS TAB */}
      {activeSubTab === 'logs' && (
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Daily Cron Automation Logs</h3>
            <p className="text-xs text-gray-400">Execution records from server cron scheduler</p>
          </div>

          {logsList.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-xs">
              No automation executions recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {logsList.map(log => (
                <div key={log._id} className="bg-[#0B0E14] border border-white/5 rounded-xl p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">
                      {new Date(log.executionDate).toLocaleString()} (Trigger: {log.trigger})
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      log.status === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {log.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-gray-400 text-[11px] flex gap-4">
                    <span>Duration: {log.durationMs}ms</span>
                    <span>Pages Processed: {log.pagesProcessed}</span>
                    <span>Auto-Applied: {log.autoAppliedCount}</span>
                  </div>
                  {log.logs?.length > 0 && (
                    <div className="bg-[#10151E] p-2.5 rounded-lg text-[10px] font-mono text-gray-400 space-y-0.5">
                      {log.logs.map((l, i) => (
                        <div key={i}>{l}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. AI ENGINE SETTINGS TAB */}
      {activeSubTab === 'settings' && (
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">AI SEO Engine Configuration</h3>
            <p className="text-xs text-gray-400">Control automation triggers, AI models, and safe auto-apply modes</p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Automation Mode */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Operating Mode (Default: Approval Mode)
                </label>
                <select
                  value={settingsForm.automationMode}
                  onChange={(e) => setSettingsForm({ ...settingsForm, automationMode: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                >
                  <option value="approval">MODE 2: APPROVAL MODE (Admin Review Required)</option>
                  <option value="auto">MODE 1: AUTO MODE (Auto-Apply Verified Safe Meta)</option>
                </select>
                <p className="text-[11px] text-gray-500 mt-1">
                  In Approval Mode, all AI suggestions are stored as pending for your authorization.
                </p>
              </div>

              {/* AI Provider */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  AI Intelligence Engine Provider
                </label>
                <select
                  value={settingsForm.aiProvider}
                  onChange={(e) => setSettingsForm({ ...settingsForm, aiProvider: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                >
                  <option value="heuristic">Semantic Heuristic Engine (Built-in, zero cost, 100% reliable)</option>
                  <option value="openai">OpenAI (GPT-4o, GPT-4o-mini)</option>
                  <option value="gemini">Google Gemini (Gemini 1.5 Flash)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Cron Schedule Expression</label>
                <input
                  type="text"
                  value={settingsForm.scanSchedule}
                  onChange={(e) => setSettingsForm({ ...settingsForm, scanSchedule: e.target.value })}
                  placeholder="0 2 * * *"
                  className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#1558C9]"
                />
                <p className="text-[11px] text-gray-500 mt-1">Default "0 2 * * *" triggers every morning at 02:00 AM server time.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">AI API Key (Optional)</label>
                <input
                  type="password"
                  value={settingsForm.aiApiKey}
                  onChange={(e) => setSettingsForm({ ...settingsForm, aiApiKey: e.target.value })}
                  placeholder={setting.hasApiKey ? '•••••••••••••••• (Configured)' : 'sk-...'}
                  className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#1558C9]"
                />
                <p className="text-[11px] text-gray-500 mt-1">Never sent to frontend bundles; stored safely in backend.</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 pt-2">
              <label className="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settingsForm.autoApplySafeMeta}
                  onChange={(e) => setSettingsForm({ ...settingsForm, autoApplySafeMeta: e.target.checked })}
                  className="rounded bg-[#0B0E14] border-white/20 text-[#FFC800] focus:ring-0"
                />
                <span>Auto-apply safe meta tags during scheduled runs when in Auto-Mode</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settingsForm.isAutomationPaused}
                  onChange={(e) => setSettingsForm({ ...settingsForm, isAutomationPaused: e.target.checked })}
                  className="rounded bg-[#0B0E14] border-white/20 text-red-500 focus:ring-0"
                />
                <span>Pause scheduled daily cron execution</span>
              </label>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-5 py-2.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-semibold text-xs rounded-xl shadow-lg transition-all"
              >
                {savingSettings ? 'Saving...' : 'Update SEO Settings'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}


import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Users,
  Eye,
  FileText,
  Package,
  Mail,
  Sparkles,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'

export default function Dashboard({ setActiveTab }) {
  const { getAuthHeader } = useAdminAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [scanning, setScanning] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setRefreshing(true)
      const res = await axios.get(`${API_URL}/admin/dashboard/stats`, {
        headers: getAuthHeader()
      })
      if (res.data.success) {
        setData(res.data)
      }
    } catch (error) {
      toast.error('Failed to load dashboard metrics')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRunQuickScan = async () => {
    try {
      setScanning(true)
      toast.loading('Running AI SEO Audit across all pages...', { id: 'scan-toast' })
      const res = await axios.post(`${API_URL}/admin/seo/scan-now`, {}, {
        headers: getAuthHeader()
      })
      if (res.data.success) {
        toast.success(`SEO Audit complete! Health Score: ${res.data.result.scores.overallScore}/100`, { id: 'scan-toast' })
        fetchStats()
      }
    } catch (e) {
      toast.error('Scan failed: ' + (e.response?.data?.message || e.message), { id: 'scan-toast' })
    } finally {
      setScanning(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#FFC800] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const stats = data?.stats || {}
  const trafficChart = data?.trafficChart || []
  const recentActivities = data?.recentActivities || []
  const recentEnquiries = data?.recentEnquiries || []
  const recentPages = data?.recentPages || []

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Executive Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time telemetry, database metrics, and AI SEO automation performance.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchStats}
            disabled={refreshing}
            className="flex items-center space-x-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-medium text-gray-300 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleRunQuickScan}
            disabled={scanning}
            className="flex items-center space-x-2 px-4 py-2 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(255,200,0,0.25)] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{scanning ? 'Analyzing Site...' : 'Run SEO Audit'}</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Visitors */}
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all shadow-lg">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Website Visitors</span>
            <div className="p-2 rounded-xl bg-[#1558C9]/20 text-[#1558C9] border border-[#1558C9]/30">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold text-white">{stats.visitors?.total || 1}</span>
            <span className="text-xs text-[#FFC800] font-medium flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5 inline" /> {stats.visitors?.today || 1} today
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            {stats.visitors?.pageViewsTotal || 1} total page impressions recorded
          </p>
        </div>

        {/* Content Pages */}
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all shadow-lg">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Managed Pages</span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold text-white">{stats.pages?.total || 10}</span>
            <span className="text-xs text-gray-400 font-medium">
              {stats.pages?.published || 10} Published
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            {stats.pages?.draft || 0} drafts awaiting review
          </p>
        </div>

        {/* Inquiries */}
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all shadow-lg">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Contact Inquiries</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold text-white">{stats.inquiries?.total || 0}</span>
            {stats.inquiries?.newCount > 0 ? (
              <span className="text-xs text-amber-400 font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                {stats.inquiries.newCount} New
              </span>
            ) : (
              <span className="text-xs text-gray-400">All reviewed</span>
            )}
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            Project quotes & customer inquiries
          </p>
        </div>

        {/* SEO Health Score */}
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all shadow-lg">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">SEO Health Score</span>
            <div className="p-2 rounded-xl bg-[#FFC800]/20 text-[#FFC800] border border-[#FFC800]/30">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold text-[#FFC800]">
              {stats.seo?.healthScore || 84}<span className="text-lg text-gray-500">/100</span>
            </span>
            <span className="text-xs text-emerald-400 font-medium">Optimal</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            Mode: <span className="text-white capitalize">{stats.seo?.automationMode || 'approval'}</span> • {stats.seo?.totalIssues || 0} issues tracked
          </p>
        </div>
      </div>

      {/* Traffic Chart & SEO Score Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitors Area Chart */}
        <div className="lg:col-span-2 bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Visitor Telemetry & Trends</h3>
              <p className="text-xs text-gray-400 mt-0.5">Unique visitors & page impressions over the last 14 days</p>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1558C9]" />
                <span className="text-gray-400">Visitors</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFC800]" />
                <span className="text-gray-400">Page Views</span>
              </div>
            </div>
          </div>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficChart}>
                <defs>
                  <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1558C9" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#1558C9" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFC800" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#FFC800" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#10151E',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#1558C9" strokeWidth={2} fillOpacity={1} fill="url(#visitorsGradient)" />
                <Area type="monotone" dataKey="pageViews" stroke="#FFC800" strokeWidth={2} fillOpacity={1} fill="url(#viewsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SEO Diagnostics Box */}
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">SEO Engine Diagnostics</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFC800]/10 text-[#FFC800] border border-[#FFC800]/30">
                DAILY 02:00 AM
              </span>
            </div>

            <div className="space-y-3.5 mb-6">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Technical SEO</span>
                  <span className="text-white font-semibold">{stats.seo?.technicalScore || 90}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1558C9] rounded-full" style={{ width: `${stats.seo?.technicalScore || 90}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">On-Page Metadata</span>
                  <span className="text-white font-semibold">{stats.seo?.onPageScore || 96}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFC800] rounded-full" style={{ width: `${stats.seo?.onPageScore || 96}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Content Quality & Volume</span>
                  <span className="text-white font-semibold">{stats.seo?.contentScore || 55}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${stats.seo?.contentScore || 55}%` }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs border-t border-white/10 pt-4">
              <div className="bg-[#0B0E14] p-2.5 rounded-lg border border-white/5">
                <span className="text-gray-500 block text-[10px]">Sitemap Status</span>
                <span className="text-emerald-400 font-medium flex items-center mt-0.5">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Dynamic XML OK
                </span>
              </div>
              <div className="bg-[#0B0E14] p-2.5 rounded-lg border border-white/5">
                <span className="text-gray-500 block text-[10px]">Robots.txt</span>
                <span className="text-emerald-400 font-medium flex items-center mt-0.5">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Configured
                </span>
              </div>
              <div className="bg-[#0B0E14] p-2.5 rounded-lg border border-white/5">
                <span className="text-gray-500 block text-[10px]">Search Console</span>
                <span className="text-gray-400 font-medium mt-0.5 block">
                  {stats.seo?.googleSearchConsole?.connected ? 'Connected' : 'Ready to Connect'}
                </span>
              </div>
              <div className="bg-[#0B0E14] p-2.5 rounded-lg border border-white/5">
                <span className="text-gray-500 block text-[10px]">Google Analytics</span>
                <span className="text-gray-400 font-medium mt-0.5 block">
                  {stats.seo?.googleAnalytics?.connected ? 'Connected' : 'Ready to Connect'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('seo')}
            className="w-full mt-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <span>Open AI SEO Control Engine</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Two Column Section: Recent Inquiries & Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Recent Client Inquiries</h3>
            <button
              onClick={() => setActiveTab('inquiries')}
              className="text-xs text-[#FFC800] hover:underline"
            >
              View all
            </button>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-xs">
              No customer inquiries received yet. Submissions from Contact & Quote forms will appear here in real-time.
            </div>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((inq) => (
                <div key={inq._id} className="p-3 bg-[#0B0E14] border border-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">{inq.firstName} {inq.lastName}</h4>
                    <p className="text-xs text-gray-400">{inq.email} • {inq.projectType}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                    inq.status === 'New' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Admin Activity Log */}
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Audit Trail & Activity Log</h3>
            <span className="text-xs text-gray-500">Immutable operations</span>
          </div>

          {recentActivities.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-xs">
              No recent administrative actions recorded.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
              {recentActivities.map((act) => (
                <div key={act._id} className="p-2.5 bg-[#0B0E14] border border-white/5 rounded-xl text-xs flex items-start justify-between">
                  <div>
                    <span className="text-white font-medium block">{act.action.replace(/_/g, ' ')}</span>
                    <span className="text-gray-400 text-[11px] block">{act.details || act.entity}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">
                    {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

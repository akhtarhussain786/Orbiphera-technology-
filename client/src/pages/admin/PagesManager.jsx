import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  FileText, Plus, Search, Edit3, Trash2, Globe, Eye,
  CheckCircle, XCircle, ArrowUpRight, Save, X, Sparkles
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'

export default function PagesManager() {
  const { getAuthHeader } = useAdminAuth()
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPage, setEditingPage] = useState(null)
  const [saving, setSaving] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    template: 'default',
    status: 'published',
    content: '',
    excerpt: '',
    metaTitle: '',
    metaDescription: '',
    primaryKeyword: '',
    secondaryKeywords: '',
    h1Heading: '',
    canonicalUrl: '',
    schemaType: 'WebPage'
  })

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    fetchPages()
  }, [search, statusFilter])

  const fetchPages = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/pages/admin/all`, {
        params: { search, status: statusFilter },
        headers: getAuthHeader()
      })
      if (res.data.success) {
        setPages(res.data.pages)
      }
    } catch (error) {
      toast.error('Failed to load pages')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenCreate = () => {
    setEditingPage(null)
    setFormData({
      title: '',
      slug: '',
      template: 'default',
      status: 'published',
      content: '',
      excerpt: '',
      metaTitle: '',
      metaDescription: '',
      primaryKeyword: '',
      secondaryKeywords: '',
      h1Heading: '',
      canonicalUrl: '',
      schemaType: 'WebPage'
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (page) => {
    setEditingPage(page)
    setFormData({
      title: page.title || '',
      slug: page.slug || '',
      template: page.template || 'default',
      status: page.status || 'published',
      content: page.content || '',
      excerpt: page.excerpt || '',
      metaTitle: page.metaTitle || '',
      metaDescription: page.metaDescription || '',
      primaryKeyword: page.primaryKeyword || '',
      secondaryKeywords: Array.isArray(page.secondaryKeywords) ? page.secondaryKeywords.join(', ') : '',
      h1Heading: page.h1Heading || '',
      canonicalUrl: page.canonicalUrl || '',
      schemaType: page.schemaType || 'WebPage'
    })
    setIsModalOpen(true)
  }

  const handleSavePage = async (e) => {
    e.preventDefault()
    if (!formData.title) {
      toast.error('Page title is required')
      return
    }

    try {
      setSaving(true)
      const payload = {
        ...formData,
        secondaryKeywords: formData.secondaryKeywords ? formData.secondaryKeywords.split(',').map(s => s.trim()) : []
      }

      if (editingPage) {
        await axios.put(`${API_URL}/pages/admin/${editingPage._id}`, payload, {
          headers: getAuthHeader()
        })
        toast.success('Page updated successfully')
      } else {
        await axios.post(`${API_URL}/pages/admin`, payload, {
          headers: getAuthHeader()
        })
        toast.success('Page created successfully')
      }

      setIsModalOpen(false)
      fetchPages()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save page')
    } finally {
      setSaving(false)
    }
  }

  const handleTogglePublish = async (page) => {
    try {
      await axios.patch(`${API_URL}/pages/admin/${page._id}/publish`, {}, {
        headers: getAuthHeader()
      })
      toast.success(`Page marked as ${page.status === 'published' ? 'Draft' : 'Published'}`)
      fetchPages()
    } catch (error) {
      toast.error('Could not toggle publish status')
    }
  }

  const handleDeletePage = async (page) => {
    if (!window.confirm(`Are you sure you want to delete "${page.title}"?`)) return

    try {
      await axios.delete(`${API_URL}/pages/admin/${page._id}`, {
        headers: getAuthHeader()
      })
      toast.success('Page deleted successfully')
      fetchPages()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete page')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Pages Management</h2>
          <p className="text-sm text-gray-400 mt-1">
            Create, edit, unpublish, and configure granular technical SEO metadata for every page.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(255,200,0,0.25)] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#10151E] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pages by title or slug..."
            className="w-full pl-10 pr-4 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#1558C9]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {['all', 'published', 'draft'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                statusFilter === s ? 'bg-[#1558C9] text-white' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-[#10151E] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0E14] text-gray-400 font-semibold uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Title & Slug</th>
                <th className="py-3.5 px-4">Template</th>
                <th className="py-3.5 px-4">SEO Title & Meta</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Modified</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-500">
                    Loading pages...
                  </td>
                </tr>
              ) : pages.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-500">
                    No pages found matching your search.
                  </td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr key={page._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{page.title}</div>
                      <div className="text-[11px] text-gray-500 font-mono">
                        {page.slug === 'home' ? '/' : `/${page.slug}`}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                        {page.template}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate">
                      <div className="text-white font-medium truncate">{page.metaTitle || '—'}</div>
                      <div className="text-[11px] text-gray-500 truncate">{page.metaDescription || 'No description configured'}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(page)}
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                          page.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                      >
                        {page.status === 'published' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span className="capitalize">{page.status}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-gray-400">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenEdit(page)}
                          className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                          title="Edit page & SEO"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePage(page)}
                          className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 transition-colors"
                          title="Delete page"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Page Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#10151E] border border-white/10 rounded-2xl max-w-3xl w-full p-6 text-left shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-lg font-bold text-white">
                {editingPage ? `Edit Page: ${editingPage.title}` : 'Create New Page'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePage} className="space-y-6">
              {/* General Page Information */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFC800]">General Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Page Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder="e.g. Solutions Overview"
                      className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">URL Slug *</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="e.g. solutions-overview"
                      className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#1558C9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Template</label>
                    <select
                      value={formData.template}
                      onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                    >
                      <option value="default">Default Page</option>
                      <option value="landing">Landing Page</option>
                      <option value="full-width">Full Width</option>
                      <option value="legal">Legal Policy</option>
                      <option value="contact">Contact Form</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Publish Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Schema.org Type</label>
                    <select
                      value={formData.schemaType}
                      onChange={(e) => setFormData({ ...formData, schemaType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                    >
                      <option value="WebPage">WebPage</option>
                      <option value="AboutPage">AboutPage</option>
                      <option value="ContactPage">ContactPage</option>
                      <option value="Article">Article</option>
                      <option value="FAQPage">FAQPage</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">Content Body (HTML / Markdown)</label>
                  <textarea
                    rows={5}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="<p>Enter page content here...</p>"
                    className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#1558C9]"
                  />
                </div>
              </div>

              {/* Granular SEO Metadata Settings */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1558C9] flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    SEO & Open Graph Configuration
                  </h4>
                  <span className="text-[11px] text-gray-400">Validated by AI SEO Engine</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      SEO Title ({formData.metaTitle.length}/60 chars)
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      placeholder="Optimal title between 40 and 65 chars"
                      className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Primary Target Keyword</label>
                    <input
                      type="text"
                      value={formData.primaryKeyword}
                      onChange={(e) => setFormData({ ...formData, primaryKeyword: e.target.value })}
                      placeholder="e.g. digital marketplace"
                      className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Meta Description ({formData.metaDescription.length}/160 chars)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="Compelling description between 120 and 160 characters..."
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">H1 Heading</label>
                    <input
                      type="text"
                      value={formData.h1Heading}
                      onChange={(e) => setFormData({ ...formData, h1Heading: e.target.value })}
                      placeholder="Primary on-page H1 heading"
                      className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Canonical URL (Optional)</label>
                    <input
                      type="url"
                      value={formData.canonicalUrl}
                      onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                      placeholder="https://nexvora.com/custom-url"
                      className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#1558C9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Secondary Keywords (comma separated)</label>
                  <input
                    type="text"
                    value={formData.secondaryKeywords}
                    onChange={(e) => setFormData({ ...formData, secondaryKeywords: e.target.value })}
                    placeholder="react templates, saas software, digital apps"
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-semibold text-xs rounded-xl flex items-center space-x-1.5 transition-all shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save Page'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


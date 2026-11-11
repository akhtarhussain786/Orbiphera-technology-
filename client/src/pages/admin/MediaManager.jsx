import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  Upload, Image as ImageIcon, Trash2, Copy, Check, Search,
  Edit2, ExternalLink, X, FileCheck
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'

export default function MediaManager() {
  const { getAuthHeader } = useAdminAuth()
  const [mediaList, setMediaList] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const fileInputRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const SERVER_HOST = API_URL.replace('/api', '')

  useEffect(() => {
    fetchMedia()
  }, [search])

  const fetchMedia = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/admin/media`, {
        params: { search },
        headers: getAuthHeader()
      })
      if (res.data.success) {
        setMediaList(res.data.media)
      }
    } catch (e) {
      toast.error('Failed to load media items')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WEBP, SVG)')
      return
    }

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('altText', file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '))

      const res = await axios.post(`${API_URL}/admin/media/upload`, formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.data.success) {
        toast.success('Image uploaded successfully!')
        fetchMedia()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleCopyUrl = (url, id) => {
    const fullUrl = url.startsWith('http') ? url : `${SERVER_HOST}${url}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedId(id)
    toast.success('Image URL copied to clipboard!')
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleSaveAltText = async (e) => {
    e.preventDefault()
    if (!editingItem) return

    try {
      await axios.put(`${API_URL}/admin/media/${editingItem._id}`, {
        altText: editingItem.altText,
        caption: editingItem.caption
      }, {
        headers: getAuthHeader()
      })
      toast.success('Image metadata & ALT text updated')
      setEditingItem(null)
      fetchMedia()
    } catch (e) {
      toast.error('Failed to update ALT text')
    }
  }

  const handleDeleteMedia = async (item) => {
    if (!window.confirm(`Delete image "${item.originalName}" permanently?`)) return

    try {
      await axios.delete(`${API_URL}/admin/media/${item._id}`, {
        headers: getAuthHeader()
      })
      toast.success('Media deleted successfully')
      fetchMedia()
    } catch (e) {
      toast.error('Failed to delete media item')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Media Library & Assets</h2>
          <p className="text-sm text-gray-400 mt-1">
            Upload, optimize, and manage image ALT tags for technical SEO compliance.
          </p>
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(255,200,0,0.25)] transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#10151E] border border-white/10 rounded-2xl p-4">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media files by name or ALT text..."
            className="w-full pl-10 pr-4 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#1558C9]"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 text-xs">
          Loading media library...
        </div>
      ) : mediaList.length === 0 ? (
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-12 text-center">
          <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-white">No images uploaded yet</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            Upload product screenshots, logos, and banners here. Uploaded media is served with modern headers and cached for performance.
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs rounded-xl transition-colors"
          >
            Select an image to upload
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaList.map((item) => {
            const fullUrl = item.url.startsWith('http') ? item.url : `${SERVER_HOST}${item.url}`
            return (
              <div
                key={item._id}
                className="bg-[#10151E] border border-white/10 rounded-xl overflow-hidden group hover:border-[#1558C9] transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square bg-[#0B0E14] overflow-hidden flex items-center justify-center">
                  <img
                    src={fullUrl}
                    alt={item.altText || item.originalName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleCopyUrl(item.url, item._id)}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-white"
                      title="Copy URL"
                    >
                      {copiedId === item._id ? <Check className="w-3.5 h-3.5 text-[#FFC800]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-white"
                      title="Edit ALT Text"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMedia(item)}
                      className="p-1.5 rounded-lg bg-red-500/30 hover:bg-red-500/50 text-red-300"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-2.5">
                  <p className="text-[11px] font-medium text-white truncate" title={item.originalName}>
                    {item.originalName}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                    ALT: <span className="text-gray-300">{item.altText || 'Missing!'}</span>
                  </p>
                  <p className="text-[9px] text-gray-500 mt-0.5">
                    {(item.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Edit ALT Text Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#10151E] border border-white/10 rounded-2xl max-w-md w-full p-6 text-left shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-sm font-bold text-white">Edit Image SEO Metadata</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAltText} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Image ALT Text (Critical for SEO & Accessibility)
                </label>
                <input
                  type="text"
                  value={editingItem.altText || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, altText: e.target.value })}
                  placeholder="Descriptive keywords describing image..."
                  className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Caption / Notes</label>
                <input
                  type="text"
                  value={editingItem.caption || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  placeholder="Optional caption..."
                  className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FFC800] text-[#111827] font-semibold text-xs rounded-xl hover:bg-[#E6B400]"
                >
                  Save Metadata
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


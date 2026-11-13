import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Menu, Plus, Trash2, ArrowUp, ArrowDown, Save, ExternalLink } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'

export default function NavigationManager() {
  const { getAuthHeader } = useAdminAuth()
  const [activeTab, setActiveTab] = useState('header')
  const [menus, setMenus] = useState({ header: [], footer: [] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/navigation`)
      if (res.data.success) {
        setMenus(res.data.menus)
      }
    } catch (e) {
      toast.error('Failed to load navigation menus')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveMenu = async (location) => {
    try {
      setSaving(true)
      const items = menus[location] || []
      await axios.put(`${API_URL}/navigation/admin/${location}`, { items }, {
        headers: getAuthHeader()
      })
      toast.success(`${location.toUpperCase()} navigation updated successfully!`)
    } catch (e) {
      toast.error('Could not save menu: ' + (e.response?.data?.message || e.message))
    } finally {
      setSaving(false)
    }
  }

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      label: 'New Link',
      url: '/custom-path',
      isExternal: false,
      sortOrder: (menus[activeTab]?.length || 0) + 1,
      category: activeTab === 'footer' ? 'products' : ''
    }

    setMenus(prev => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] || []), newItem]
    }))
  }

  const handleRemoveItem = (id) => {
    setMenus(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(i => i.id !== id)
    }))
  }

  const handleMove = (index, direction) => {
    const list = [...menus[activeTab]]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= list.length) return

    const temp = list[index]
    list[index] = list[targetIndex]
    list[targetIndex] = temp

    // re-index sortOrder
    list.forEach((item, idx) => {
      item.sortOrder = idx + 1
    })

    setMenus(prev => ({
      ...prev,
      [activeTab]: list
    }))
  }

  const handleUpdateField = (id, field, value) => {
    setMenus(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(item => item.id === id ? { ...item, [field]: value } : item)
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#FFC800] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const currentList = menus[activeTab] || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Navigation Menus Management</h2>
          <p className="text-sm text-gray-400 mt-1">
            Configure header and footer navigation links, labels, and hierarchy dynamically.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddItem}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-medium text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Link</span>
          </button>
          <button
            onClick={() => handleSaveMenu(activeTab)}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(255,200,0,0.25)] transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Location Switcher */}
      <div className="flex space-x-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('header')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'header'
              ? 'bg-[#1558C9] text-white shadow-lg'
              : 'bg-[#10151E] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          Header Navigation Bar ({menus.header.length} items)
        </button>
        <button
          onClick={() => setActiveTab('footer')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'footer'
              ? 'bg-[#1558C9] text-white shadow-lg'
              : 'bg-[#10151E] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          Footer Multi-Column Menu ({menus.footer.length} items)
        </button>
      </div>

      {/* Menu Items List */}
      <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl space-y-3">
        {currentList.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-xs">
            No navigation items in this menu yet. Click "Add Link" above.
          </div>
        ) : (
          currentList.map((item, index) => (
            <div
              key={item.id}
              className="bg-[#0B0E14] border border-white/10 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
            >
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <span className="text-xs font-mono text-gray-500 w-5 text-center">#{index + 1}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 sm:w-[500px]">
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-0.5">Label Text</label>
                    <input
                      type="text"
                      value={item.label || ''}
                      onChange={(e) => handleUpdateField(item.id, 'label', e.target.value)}
                      placeholder="e.g. Products"
                      className="w-full px-3 py-1.5 bg-[#10151E] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#1558C9]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 mb-0.5">Target URL</label>
                    <input
                      type="text"
                      value={item.url || ''}
                      onChange={(e) => handleUpdateField(item.id, 'url', e.target.value)}
                      placeholder="/marketplace"
                      className="w-full px-3 py-1.5 bg-[#10151E] border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-[#1558C9]"
                    />
                  </div>
                  {activeTab === 'footer' && (
                    <div>
                      <label className="block text-[10px] text-gray-500 mb-0.5">Footer Column Category</label>
                      <select
                        value={item.category || 'products'}
                        onChange={(e) => handleUpdateField(item.id, 'category', e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#10151E] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#1558C9]"
                      >
                        <option value="products">Products Column</option>
                        <option value="company">Company Column</option>
                        <option value="support">Support Column</option>
                        <option value="legal">Legal Column</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-1.5 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleMove(index, -1)}
                  disabled={index === 0}
                  className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-white/5"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 1)}
                  disabled={index === currentList.length - 1}
                  className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-white/5"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 ml-2"
                  title="Remove link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


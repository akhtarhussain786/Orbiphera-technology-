import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  Package, Plus, Save, Trash2, Edit3, ArrowUp, ArrowDown,
  Upload, ExternalLink, Eye, EyeOff, Check, X, RefreshCw, Image as ImageIcon,
  Sparkles, Layers, Laptop, CheckCircle2, Search, SlidersHorizontal
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'

const DEFAULT_PRODUCTS = [
  {
    id: 'erp-system',
    title: 'ERP Management System',
    category: 'ENTERPRISE ERP',
    badge: 'Multi-Branch & Finance',
    desc: 'Centralized enterprise platform streamlining multi-branch inventory, accounts, GST invoicing, supply chain, and staff permissions.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=480&fit=crop&q=80',
    features: [
      'Automated GST & Invoicing Engine',
      'Multi-Warehouse Inventory Tracking',
      'Real-Time Balance Sheet & P&L Ledgers',
      'Granular Role-Based Access (RBAC)'
    ],
    detailsLink: '/software',
    demoLink: '/request-demo?product=erp',
    isActive: true
  },
  {
    id: 'ems-workforce',
    title: 'Employee Management System (EMS)',
    category: 'WORKFORCE & PAYROLL',
    badge: 'GPS & Attendance OS',
    desc: 'Smart workforce administration featuring GPS geo-fenced mobile attendance, automated monthly payroll calculations, and leave approvals.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=480&fit=crop&q=80',
    features: [
      'GPS Geo-Fenced Mobile Punch In/Out',
      'Automated Salary, PF & Tax Computation',
      'Shift Rosters & Leave Workflows',
      'Live Field Staff Tracking & Reports'
    ],
    detailsLink: '/software',
    demoLink: '/request-demo?product=ems',
    isActive: true
  },
  {
    id: 'institute-management',
    title: 'Institute & School Management Software',
    category: 'EDUCATION & ACADEMICS',
    badge: 'Campus Operating System',
    desc: 'End-to-end campus software managing student admissions, automated fee reconciliation, class schedules, exams, and parent communications.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=480&fit=crop&q=80',
    features: [
      'Online Admissions & Verification',
      'Automated Fee Dues & Payment Links',
      'Exam Result Cards & Grade Ledgers',
      'Student & Guardian Mobile Apps'
    ],
    detailsLink: '/templates/eduprime-education-institute',
    demoLink: '/request-demo?product=institute',
    isActive: true
  },
  {
    id: 'gym-management',
    title: 'Gym & Fitness Management Software',
    category: 'HEALTH & FITNESS',
    badge: 'Membership Portal',
    desc: 'Fitness studio and gym administration system managing member subscriptions, trainer slots, biometric turnstile integration, and POS.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=480&fit=crop&q=80',
    features: [
      'Member Plans, Renewals & WhatsApp Alerts',
      'Biometric Machine & QR Access Integration',
      'Trainer Booking & Class Schedules',
      'POS Billing for Supplements & Passes'
    ],
    detailsLink: '/software',
    demoLink: '/request-demo?product=gym',
    isActive: true
  },
  {
    id: 'custom-business-suite',
    title: 'Custom Business Software Solutions',
    category: 'BESPOKE AUTOMATION',
    badge: 'Tailored SaaS Architecture',
    desc: 'Bespoke corporate management portals engineered specifically for proprietary workflows, custom APIs, high-volume database queries, and zero license lock-in.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=480&fit=crop&q=80',
    features: [
      'Tailored Business Logic & Custom Dashboards',
      'MySQL, PostgreSQL & MongoDB Clusters',
      'Third-Party Payment & SMS Gateways',
      'Full Source Code & 100% Data Ownership'
    ],
    detailsLink: '/custom-development',
    demoLink: '/request-demo?product=custom',
    isActive: true
  }
]

export default function ProductsManager() {
  const { getAuthHeader } = useAdminAuth()
  const [sectionData, setSectionData] = useState({
    title: 'Our Products & Digital Solutions.',
    subtitle: 'Production-ready enterprise software systems designed for rapid deployment, high data integrity, and intuitive day-to-day operations.',
    badgeText: 'TURNKEY SOFTWARE SUITES',
    exploreButtonText: 'Explore All Software',
    exploreButtonLink: '/software',
    isActive: true
  })
  const [products, setProducts] = useState(DEFAULT_PRODUCTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: '',
    badge: '',
    desc: '',
    image: '',
    features: [],
    detailsLink: '/software',
    demoLink: '/request-demo',
    isActive: true
  })
  const [newFeatureText, setNewFeatureText] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || '/api'
  const SERVER_HOST = API_URL.replace('/api', '')

  useEffect(() => {
    fetchProductsSection()
  }, [])

  const fetchProductsSection = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/content/products_showcase`)
      if (res.data?.success && res.data.section) {
        const sec = res.data.section
        setSectionData({
          title: sec.title || 'Our Products & Digital Solutions.',
          subtitle: sec.subtitle || 'Production-ready enterprise software systems designed for rapid deployment, high data integrity, and intuitive day-to-day operations.',
          badgeText: sec.data?.badgeText || 'TURNKEY SOFTWARE SUITES',
          exploreButtonText: sec.data?.exploreButtonText || 'Explore All Software',
          exploreButtonLink: sec.data?.exploreButtonLink || '/software',
          isActive: sec.isActive !== undefined ? sec.isActive : true
        })
        if (Array.isArray(sec.data?.products) && sec.data.products.length > 0) {
          setProducts(sec.data.products)
        }
      }
    } catch (e) {
      toast.error('Failed to load products: ' + (e.response?.data?.message || e.message))
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAll = async (productsToSave = products, extraSection = sectionData) => {
    try {
      setSaving(true)
      const res = await axios.put(`${API_URL}/content/admin/products_showcase`, {
        title: extraSection.title,
        subtitle: extraSection.subtitle,
        isActive: extraSection.isActive,
        data: {
          badgeText: extraSection.badgeText,
          exploreButtonText: extraSection.exploreButtonText,
          exploreButtonLink: extraSection.exploreButtonLink,
          products: productsToSave
        }
      }, {
        headers: getAuthHeader()
      })

      if (res.data?.success) {
        toast.success('All Products & Solutions saved successfully!')
      }
    } catch (err) {
      toast.error('Failed to save products: ' + (err.response?.data?.message || err.message))
    } finally {
      setSaving(false)
    }
  }

  const openAddModal = () => {
    setEditingIndex(null)
    setFormData({
      id: `prod-${Date.now()}`,
      title: '',
      category: 'ENTERPRISE ERP',
      badge: 'Multi-Branch & Finance',
      desc: '',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=480&fit=crop&q=80',
      features: ['Automated GST & Invoicing Engine', 'Multi-Warehouse Inventory Tracking'],
      detailsLink: '/software',
      demoLink: '/request-demo',
      isActive: true
    })
    setNewFeatureText('')
    setIsModalOpen(true)
  }

  const openEditModal = (idx) => {
    setEditingIndex(idx)
    const prod = products[idx]
    setFormData({
      id: prod.id || `prod-${Date.now()}`,
      title: prod.title || '',
      category: prod.category || '',
      badge: prod.badge || '',
      desc: prod.desc || '',
      image: prod.image || '',
      features: Array.isArray(prod.features) ? [...prod.features] : [],
      detailsLink: prod.detailsLink || '/software',
      demoLink: prod.demoLink || '/request-demo',
      isActive: prod.isActive !== false
    })
    setNewFeatureText('')
    setIsModalOpen(true)
  }

  const handleModalSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      toast.error('Product title is required')
      return
    }

    const updated = [...products]
    if (editingIndex !== null) {
      updated[editingIndex] = { ...formData }
      toast.success(`Updated "${formData.title}"`)
    } else {
      updated.unshift({ ...formData })
      toast.success(`Added "${formData.title}"`)
    }

    setProducts(updated)
    setIsModalOpen(false)
    handleSaveAll(updated)
  }

  const handleDeleteProduct = (indexToDelete) => {
    const item = products[indexToDelete]
    if (!window.confirm(`Are you sure you want to remove "${item.title}"?`)) return

    const updated = products.filter((_, idx) => idx !== indexToDelete)
    setProducts(updated)
    handleSaveAll(updated)
    toast.success(`Removed "${item.title}"`)
  }

  const handleToggleActive = (idx) => {
    const updated = [...products]
    updated[idx].isActive = !updated[idx].isActive
    setProducts(updated)
    handleSaveAll(updated)
    toast.success(`${updated[idx].title} is now ${updated[idx].isActive ? 'Active' : 'Hidden'}`)
  }

  const handleMove = (idx, direction) => {
    if (direction === 'up' && idx === 0) return
    if (direction === 'down' && idx === products.length - 1) return

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1
    const updated = [...products]
    const temp = updated[idx]
    updated[idx] = updated[targetIdx]
    updated[targetIdx] = temp

    setProducts(updated)
    handleSaveAll(updated)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WEBP)')
      return
    }

    try {
      setUploadingImage(true)
      const data = new FormData()
      data.append('file', file)
      data.append('altText', formData.title || 'Product Mockup')

      const res = await axios.post(`${API_URL}/admin/media/upload`, data, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.data?.success && res.data.media?.url) {
        setFormData(prev => ({ ...prev, image: res.data.media.url }))
        toast.success('Product image uploaded successfully!')
      }
    } catch (err) {
      toast.error('Upload failed: ' + (err.response?.data?.message || err.message))
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const addFeatureItem = () => {
    if (!newFeatureText.trim()) return
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, newFeatureText.trim()]
    }))
    setNewFeatureText('')
  }

  const removeFeatureItem = (featIdx) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== featIdx)
    }))
  }

  const getFullImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=480&fit=crop&q=80'
    if (img.startsWith('http://') || img.startsWith('https://')) return img
    return `${SERVER_HOST}${img}`
  }

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'all' 
      ? true 
      : filter === 'active' 
        ? p.isActive !== false 
        : p.isActive === false
    
    const matchesSearch = searchTerm === '' ||
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.badge?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.desc?.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center text-[#E50914]">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Products &amp; Digital Solutions</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage turnkey software suites, mockups, core feature checklists, and demo links displayed on the homepage.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/#products"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </a>

          <button
            onClick={openAddModal}
            className="flex items-center space-x-1.5 px-4 py-2 bg-[#E50914] hover:brightness-110 text-white font-black text-xs rounded-xl shadow-[0_0_20px_rgba(229, 9, 20,0.25)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Software Product</span>
          </button>

          <button
            onClick={() => handleSaveAll()}
            disabled={saving}
            className="flex items-center space-x-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin text-[#E50914]" /> : <Save className="w-4 h-4 text-[#E50914]" />}
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* Section Header Settings Box */}
      <div className="p-6 rounded-2xl bg-[#10151E] border border-white/10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-[#E50914]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Homepage Section Banner &amp; Header Settings</span>
          </div>

          <label className="flex items-center space-x-2 cursor-pointer">
            <span className="text-xs text-slate-300 font-medium">Show Section on Homepage</span>
            <input
              type="checkbox"
              checked={sectionData.isActive}
              onChange={(e) => setSectionData({ ...sectionData, isActive: e.target.checked })}
              className="w-4 h-4 accent-[#E50914] rounded cursor-pointer"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Top Badge Text
            </label>
            <input
              type="text"
              value={sectionData.badgeText}
              onChange={(e) => setSectionData({ ...sectionData, badgeText: e.target.value })}
              placeholder="e.g. TURNKEY SOFTWARE SUITES"
              className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Main Headline Title
            </label>
            <input
              type="text"
              value={sectionData.title}
              onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
              placeholder="e.g. Our Products & Digital Solutions."
              className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Section Subtitle Description
            </label>
            <input
              type="text"
              value={sectionData.subtitle}
              onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })}
              placeholder="e.g. Production-ready enterprise software systems designed for rapid deployment..."
              className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Header Action Button
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={sectionData.exploreButtonText}
                onChange={(e) => setSectionData({ ...sectionData, exploreButtonText: e.target.value })}
                placeholder="Button Text"
                className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
              />
              <input
                type="text"
                value={sectionData.exploreButtonLink}
                onChange={(e) => setSectionData({ ...sectionData, exploreButtonLink: e.target.value })}
                placeholder="Button Link (/software)"
                className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Stats & Filter Pills */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#E50914] text-white'
                : 'bg-[#10151E] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'active'
                ? 'bg-[#E50914] text-white'
                : 'bg-[#10151E] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            Active ({products.filter(p => p.isActive !== false).length})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'inactive'
                ? 'bg-[#E50914] text-white'
                : 'bg-[#10151E] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            Hidden ({products.filter(p => p.isActive === false).length})
          </button>
        </div>

        {/* Right Search Box */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search software products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 bg-[#10151E] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod, idx) => {
          const actualIndex = products.findIndex(p => (p.id && p.id === prod.id) || p.title === prod.title)
          return (
            <div
              key={prod.id || `${prod.title}-${idx}`}
              className={`flex flex-col justify-between rounded-2xl bg-[#10151E] border transition-all duration-300 overflow-hidden ${
                prod.isActive !== false ? 'border-white/10 hover:border-[#E50914]/60' : 'border-red-500/20 opacity-60'
              }`}
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] bg-[#0B0E14] overflow-hidden group">
                  <img
                    src={getFullImageUrl(prod.image)}
                    alt={prod.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10151E] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-white border border-white/15">
                      {prod.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-white px-2 py-0.5 rounded bg-[#E50914]">
                      {prod.badge}
                    </span>
                  </div>

                  {/* Move Up/Down Controls overlay on image */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center space-x-1 bg-black/70 backdrop-blur-md px-1.5 py-1 rounded-lg border border-white/10">
                    <button
                      type="button"
                      disabled={actualIndex === 0}
                      onClick={() => handleMove(actualIndex, 'up')}
                      className="p-1 text-slate-300 hover:text-[#E50914] disabled:opacity-30 cursor-pointer"
                      title="Move Left/Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={actualIndex === products.length - 1}
                      onClick={() => handleMove(actualIndex, 'down')}
                      className="p-1 text-slate-300 hover:text-[#E50914] disabled:opacity-30 cursor-pointer"
                      title="Move Right/Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                      {prod.title}
                    </h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      prod.isActive !== false ? 'bg-[#E50914]/10 text-[#E50914] border border-[#E50914]/30' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {prod.isActive !== false ? 'Active' : 'Hidden'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {prod.desc}
                  </p>

                  {/* Core Features */}
                  {Array.isArray(prod.features) && prod.features.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono font-bold text-[#E50914] uppercase">
                        Features ({prod.features.length}):
                      </span>
                      <div className="space-y-1">
                        {prod.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center space-x-1.5 text-[11px] text-slate-300 truncate">
                            <CheckCircle2 className="w-3 h-3 text-[#E50914] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                        {prod.features.length > 3 && (
                          <span className="text-[10px] text-slate-500 italic block">
                            +{prod.features.length - 3} more features
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 border-t border-white/5 flex items-center justify-between gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => handleToggleActive(actualIndex)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title={prod.isActive !== false ? 'Hide Product' : 'Make Active'}
                >
                  {prod.isActive !== false ? <Eye className="w-4 h-4 text-[#E50914]" /> : <EyeOff className="w-4 h-4 text-red-400" />}
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(actualIndex)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(actualIndex)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-[#10151E] border border-white/10 space-y-3">
          <Package className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">No products found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* =========================================================================
          ADD / EDIT PRODUCT MODAL
          ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#10151E] border border-white/15 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center text-[#E50914]">
                  <Package className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  {editingIndex !== null ? 'Edit Software Product' : 'Add New Software Product'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              {/* Product Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Product / Software Title <span className="text-[#E50914]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. ERP Management System"
                  className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
                />
              </div>

              {/* Category & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Category Tag (Top Left)
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. ENTERPRISE ERP"
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Highlight Badge (Top Right)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Multi-Branch & Finance"
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Product Overview / Description
                </label>
                <textarea
                  rows="3"
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Describe what this software suite solves, target business size, and key capabilities..."
                  className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
                />
              </div>

              {/* Image Upload & URL */}
              <div className="p-4 rounded-xl bg-[#0B0E14] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>Card Mockup / Screenshot Image</span>
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="flex items-center space-x-1.5 px-3 py-1 bg-[#E50914] hover:brightness-110 text-white rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Or paste image URL (https://... or /uploads/...)"
                    className="flex-1 px-3.5 py-2 bg-[#10151E] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
                  />
                  {formData.image && (
                    <div className="w-12 h-10 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black">
                      <img
                        src={getFullImageUrl(formData.image)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Core Features Manager */}
              <div className="p-4 rounded-xl bg-[#0B0E14] border border-white/10 space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">
                  Core Features Checklist (Bullet Points)
                </label>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addFeatureItem()
                      }
                    }}
                    placeholder="e.g. Automated GST & Invoicing Engine (Press Enter)"
                    className="flex-1 px-3.5 py-2 bg-[#10151E] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
                  />
                  <button
                    type="button"
                    onClick={addFeatureItem}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Features List */}
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {formData.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#10151E] border border-white/5 text-xs text-slate-200"
                    >
                      <div className="flex items-center space-x-2 truncate mr-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeatureItem(fIdx)}
                        className="p-1 text-slate-400 hover:text-red-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {formData.features.length === 0 && (
                    <span className="text-[11px] text-slate-500 italic block">No feature bullets added yet.</span>
                  )}
                </div>
              </div>

              {/* Target Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    "View Details" Button Link
                  </label>
                  <input
                    type="text"
                    value={formData.detailsLink}
                    onChange={(e) => setFormData({ ...formData, detailsLink: e.target.value })}
                    placeholder="/software or /templates/..."
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    "Request Demo" Button Link
                  </label>
                  <input
                    type="text"
                    value={formData.demoLink}
                    onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                    placeholder="/request-demo?product=erp"
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 accent-[#E50914] rounded cursor-pointer"
                  />
                  <span className="text-xs font-medium text-slate-300">
                    Product is Active and visible on Homepage
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-black text-white bg-[#E50914] hover:brightness-110 shadow-[0_0_20px_rgba(229, 9, 20,0.25)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{editingIndex !== null ? 'Save Changes' : 'Create Product'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}


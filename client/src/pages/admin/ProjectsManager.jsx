import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  Briefcase, Plus, Save, Trash2, Edit3, ArrowUp, ArrowDown,
  Upload, ExternalLink, Eye, EyeOff, Check, X, RefreshCw, Image as ImageIcon
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'

const DEFAULT_PROJECTS = [
  {
    id: 'medflow-hms',
    client: 'MedFlow Health Systems',
    title: 'Clinical Workflow & EHR Platform',
    problem: 'Manual OPD patient queues and fragmented paper records slowed physician turnaround by 45%.',
    result: '+310% patient throughput & 99.98% uptime across 14 hospital branches',
    metric: '+310% Throughput',
    tags: ['React.js', 'Node.js', 'PostgreSQL', 'HIPAA Ready'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=540&fit=crop',
    link: '/software/medflow-clinic-hms',
    isActive: true
  },
  {
    id: 'eduprime-erp',
    client: 'EduPrime Global Academies',
    title: 'Unified Multi-Campus Academic OS',
    problem: 'Disjointed spreadsheets for admissions, attendance, and fee tracking caused high operational errors.',
    result: '65% reduction in admission processing time and 100% automated fee reconciliation',
    metric: '65% Time Saved',
    tags: ['React', 'Express', 'MySQL', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=540&fit=crop',
    link: '/templates/eduprime-education-institute',
    isActive: true
  },
  {
    id: 'omnicrm-suite',
    client: 'OmniTrade Enterprises',
    title: 'B2B Sales Velocity & CRM Engine',
    problem: 'Sales teams took over 48 hours to generate proposals and suffered a 38% lead drop-off.',
    result: '4.2x quote turnaround velocity with 28% higher deal close rate in first quarter',
    metric: '4.2x Velocity',
    tags: ['Node.js', 'React', 'MongoDB', 'RBAC Security'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=540&fit=crop',
    link: '/software/omnicrm-enterprise-suite',
    isActive: true
  },
  {
    id: 'shopsphere-commerce',
    client: 'ShopSphere Retail Brands',
    title: 'High-Concurrency Headless Commerce',
    problem: 'Legacy store dropped transactions during peak sales surges due to slow checkout latency.',
    result: '3.8x checkout conversion rate with sub-100ms global page loads on flash drops',
    metric: '3.8x Conversion',
    tags: ['Next.js', 'Redux', 'Node.js', 'Redis'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&h=540&fit=crop',
    link: '/templates/shopsphere-ecommerce',
    isActive: true
  }
]

export default function ProjectsManager() {
  const { getAuthHeader } = useAdminAuth()
  const [sectionData, setSectionData] = useState({
    title: 'Featured projects.',
    subtitle: 'Real software built for real businesses with verified outcomes.',
    isActive: true
  })
  const [projects, setProjects] = useState(DEFAULT_PROJECTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState('all')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    client: '',
    title: '',
    problem: '',
    result: '',
    metric: '',
    tags: '',
    image: '',
    link: '',
    isActive: true
  })
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || '/api'
  const SERVER_HOST = API_URL.replace('/api', '')

  useEffect(() => {
    fetchProjectsSection()
  }, [])

  const fetchProjectsSection = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/content/featured_projects`)
      if (res.data?.success && res.data.section) {
        const sec = res.data.section
        setSectionData({
          title: sec.title || 'Featured projects.',
          subtitle: sec.subtitle || 'Real software built for real businesses with verified outcomes.',
          isActive: sec.isActive !== undefined ? sec.isActive : true
        })
        if (Array.isArray(sec.data?.projects) && sec.data.projects.length > 0) {
          setProjects(sec.data.projects)
        }
      }
    } catch (e) {
      toast.error('Failed to load featured projects: ' + (e.response?.data?.message || e.message))
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAll = async (projectsToSave = projects, extraSection = sectionData) => {
    try {
      setSaving(true)
      const res = await axios.put(`${API_URL}/content/admin/featured_projects`, {
        title: extraSection.title,
        subtitle: extraSection.subtitle,
        isActive: extraSection.isActive,
        data: {
          projects: projectsToSave
        }
      }, {
        headers: getAuthHeader()
      })

      if (res.data?.success) {
        toast.success('All Featured Projects updated successfully!')
      }
    } catch (e) {
      toast.error('Failed to save projects: ' + (e.response?.data?.message || e.message))
    } finally {
      setSaving(false)
    }
  }

  const openAddModal = () => {
    setEditingIndex(null)
    setFormData({
      id: 'project-' + Date.now(),
      client: '',
      title: '',
      problem: '',
      result: '',
      metric: '+100% Growth',
      tags: 'React, Node.js, Cloud',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=540&fit=crop',
      link: '/software',
      isActive: true
    })
    setIsModalOpen(true)
  }

  const openEditModal = (project, index) => {
    setEditingIndex(index)
    setFormData({
      id: project.id || 'project-' + Date.now(),
      client: project.client || '',
      title: project.title || '',
      problem: project.problem || '',
      result: project.result || '',
      metric: project.metric || '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || ''),
      image: project.image || '',
      link: project.link || '',
      isActive: project.isActive !== undefined ? project.isActive : true
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingIndex(null)
  }

  const handleModalSubmit = async (e) => {
    e.preventDefault()

    if (!formData.client.trim() || !formData.title.trim()) {
      toast.error('Please provide at least Client Name and Project Title')
      return
    }

    const parsedTags = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : []

    const newProject = {
      id: formData.id || 'project-' + Date.now(),
      client: formData.client.trim(),
      title: formData.title.trim(),
      problem: formData.problem.trim(),
      result: formData.result.trim(),
      metric: formData.metric.trim() || 'Verified',
      tags: parsedTags,
      image: formData.image.trim(),
      link: formData.link.trim() || '/software',
      isActive: Boolean(formData.isActive)
    }

    let updatedProjects
    if (editingIndex !== null && editingIndex >= 0) {
      updatedProjects = [...projects]
      updatedProjects[editingIndex] = newProject
    } else {
      updatedProjects = [newProject, ...projects]
    }

    setProjects(updatedProjects)
    closeModal()
    await handleSaveAll(updatedProjects)
  }

  const handleDeleteProject = async (indexToDelete) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    const updated = projects.filter((_, i) => i !== indexToDelete)
    setProjects(updated)
    await handleSaveAll(updated)
  }

  const handleToggleProjectActive = async (indexToToggle) => {
    const updated = [...projects]
    updated[indexToToggle] = {
      ...updated[indexToToggle],
      isActive: !updated[indexToToggle].isActive
    }
    setProjects(updated)
    await handleSaveAll(updated)
  }

  const handleMove = async (index, direction) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= projects.length) return
    const updated = [...projects]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setProjects(updated)
    await handleSaveAll(updated)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WEBP, SVG)')
      return
    }

    try {
      setUploadingImage(true)
      const data = new FormData()
      data.append('file', file)
      data.append('altText', formData.title || file.name)

      const res = await axios.post(`${API_URL}/admin/media/upload`, data, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.data?.success && res.data.media?.url) {
        setFormData(prev => ({
          ...prev,
          image: res.data.media.url
        }))
        toast.success('Project screenshot uploaded successfully!')
      }
    } catch (err) {
      toast.error('Upload failed: ' + (err.response?.data?.message || err.message))
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const getFullImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=540&fit=crop'
    if (img.startsWith('http://') || img.startsWith('https://')) return img
    return `${SERVER_HOST}${img}`
  }

  const filteredProjects = projects.filter(p => {
    if (filter === 'active') return p.isActive !== false
    if (filter === 'inactive') return p.isActive === false
    return true
  })

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] space-y-3">
        <RefreshCw className="w-8 h-8 text-[#FFC800] animate-spin" />
        <p className="text-sm text-gray-400">Loading Featured Projects & Case Studies...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#10151E] border border-white/10 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#F5B700]/15 border border-[#F5B700]/30 flex items-center justify-center text-[#F5B700]">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Featured Projects & Case Studies</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5B700]/20 text-[#FFC800] border border-[#F5B700]/30 font-semibold">
                Homepage Work
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Manage showcase projects, screenshots, metrics, problems, results, and tech tags.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={openAddModal}
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#F5B700] hover:bg-[#D9A200] text-[#111827] font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(245,183,0,0.3)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Project</span>
          </button>

          <button
            onClick={() => handleSaveAll()}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/10 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All'}</span>
          </button>
        </div>
      </div>

      {/* Section Headings Configuration */}
      <div className="bg-[#10151E] border border-white/10 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#F5B700]" />
            <span>Homepage Section Headings</span>
          </h3>
          <label className="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={sectionData.isActive}
              onChange={(e) => {
                const next = { ...sectionData, isActive: e.target.checked }
                setSectionData(next)
                handleSaveAll(projects, next)
              }}
              className="rounded accent-[#F5B700]"
            />
            <span>Show Section on Homepage</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Section Title (e.g. Featured projects.)
            </label>
            <input
              type="text"
              value={sectionData.title}
              onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Section Subtitle / Description
            </label>
            <input
              type="text"
              value={sectionData.subtitle}
              onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          {[
            { id: 'all', label: `All Projects (${projects.length})` },
            { id: 'active', label: `Active (${projects.filter(p => p.isActive !== false).length})` },
            { id: 'inactive', label: `Hidden / Drafts (${projects.filter(p => p.isActive === false).length})` }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === t.id
                  ? 'bg-[#F5B700] text-[#111827]'
                  : 'bg-[#10151E] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-gray-400">
          Showing {filteredProjects.length} of {projects.length} project cards
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((project, index) => {
          const originalIndex = projects.findIndex(p => (p.id ? p.id === project.id : p.title === project.title))
          const isItemActive = project.isActive !== false

          return (
            <div
              key={project.id || index}
              className={`bg-[#10151E] border rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col justify-between ${
                isItemActive ? 'border-white/10 hover:border-[#F5B700]/50' : 'border-red-500/20 opacity-60'
              }`}
            >
              {/* Card Top: Browser Bar + Client + Controls */}
              <div>
                <div className="px-4 py-2.5 bg-[#0B0E14] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="text-[11px] font-mono text-gray-400 pl-2">
                      {project.client || 'Client Name'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1">
                    {/* Order up/down */}
                    <button
                      onClick={() => handleMove(originalIndex, -1)}
                      disabled={originalIndex === 0}
                      title="Move Up"
                      className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-20 hover:bg-white/5"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(originalIndex, 1)}
                      disabled={originalIndex === projects.length - 1}
                      title="Move Down"
                      className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-20 hover:bg-white/5"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Active toggle */}
                    <button
                      onClick={() => handleToggleProjectActive(originalIndex)}
                      title={isItemActive ? 'Published (Click to hide)' : 'Hidden (Click to publish)'}
                      className={`p-1 rounded ml-1 ${isItemActive ? 'text-green-400 hover:bg-green-400/10' : 'text-gray-500 hover:bg-white/5'}`}
                    >
                      {isItemActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Screenshot Frame with Metric Pill */}
                <div className="relative aspect-[16/9] bg-[#05070A] overflow-hidden group">
                  <img
                    src={getFullImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=540&fit=crop'
                    }}
                  />

                  {project.metric && (
                    <div className="absolute top-2.5 right-2.5 bg-[#111827]/90 backdrop-blur-xs text-[#F5B700] border border-[#F5B700]/60 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono shadow-md">
                      {project.metric}
                    </div>
                  )}

                  {!isItemActive && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-red-500/80 text-white">
                        Hidden from public
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body Details */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#F5B700] uppercase tracking-wider">
                      {project.client}
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5 leading-snug">
                      {project.title}
                    </h4>
                  </div>

                  {project.problem && (
                    <div className="text-xs text-gray-300 leading-relaxed bg-[#0B0E14] p-2.5 rounded-xl border border-white/5">
                      <span className="font-semibold text-white">Problem: </span>
                      {project.problem}
                    </div>
                  )}

                  {project.result && (
                    <div className="text-xs text-[#F5B700] bg-[#F5B700]/10 p-2.5 rounded-xl border border-[#F5B700]/20 font-medium">
                      <span className="font-bold text-white">Result: </span>
                      {project.result}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(Array.isArray(project.tags) ? project.tags : []).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white/5 text-gray-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-4 py-3 bg-[#0B0E14] border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-gray-400 font-mono truncate max-w-[180px]">
                  <ExternalLink className="w-3 h-3 text-[#F5B700] shrink-0" />
                  <span className="truncate">{project.link || '/software'}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(project, originalIndex)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-[#F5B700] hover:text-[#111827] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteProject(originalIndex)}
                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-[#10151E] rounded-2xl border border-white/10 space-y-3">
          <Briefcase className="w-10 h-10 text-gray-500 mx-auto" />
          <h4 className="text-sm font-semibold text-white">No projects found for current filter</h4>
          <p className="text-xs text-gray-400">Click &ldquo;Add New Project&rdquo; to create your first case study card.</p>
        </div>
      )}

      {/* CREATE / EDIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#10151E] border border-white/15 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0B0E14] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F5B700]/20 flex items-center justify-center text-[#F5B700]">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingIndex !== null ? 'Edit Featured Project' : 'Add New Featured Project'}
                  </h3>
                  <p className="text-[11px] text-gray-400">Card will update immediately on the live homepage work section.</p>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleModalSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Row 1: Client & Metric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Client / Organization Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MedFlow Health Systems"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Highlight Metric Pill Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +310% Throughput"
                    value={formData.metric}
                    onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                  />
                </div>
              </div>

              {/* Row 2: Project Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Project Title / System Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clinical Workflow & EHR Platform"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                />
              </div>

              {/* Row 3: Problem statement */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Problem (1-2 sentences on client challenge)
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Manual patient queues and fragmented paper records slowed turnaround by 45%."
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                />
              </div>

              {/* Row 4: Result / Impact */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Result & Outcome (Key impact achieved)
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. +310% patient throughput & 99.98% uptime across 14 hospital branches"
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                />
              </div>

              {/* Row 5: Screenshot Image URL + File Upload */}
              <div className="space-y-2 bg-[#0B0E14] p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#F5B700]" />
                    <span>Project Screenshot Image</span>
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
                    className="flex items-center space-x-1.5 px-3 py-1 bg-[#F5B700] hover:bg-[#D9A200] text-[#111827] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Or paste image URL (https://... or /uploads/...)"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#10151E] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                />

                {formData.image && (
                  <div className="mt-2 relative aspect-[16/8] rounded-lg overflow-hidden border border-white/10 bg-black/40">
                    <img
                      src={getFullImageUrl(formData.image)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=540&fit=crop'
                      }}
                    />
                    <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-[10px] text-gray-300 px-2 py-0.5 rounded font-mono">
                      Image Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Row 6: Tech Tags */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Technology Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="React.js, Node.js, PostgreSQL, HIPAA Ready"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                />
              </div>

              {/* Row 7: Link & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Case Study Link / Product URL
                  </label>
                  <input
                    type="text"
                    placeholder="/software/medflow-clinic-hms"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center space-x-2.5 text-xs font-semibold text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#F5B700]"
                    />
                    <span>Active & Visible on Homepage</span>
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold text-[#111827] bg-[#F5B700] hover:bg-[#D9A200] transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{editingIndex !== null ? 'Save Project' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


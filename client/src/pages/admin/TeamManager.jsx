import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  UserCheck, Plus, Save, Trash2, Edit3, ArrowUp, ArrowDown,
  Upload, Eye, EyeOff, Check, X, RefreshCw, User, Image as ImageIcon
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'

const DEFAULT_MEMBERS = [
  {
    id: 'team-1',
    name: 'Vikram Sharma',
    role: 'Chief Technology Officer & Lead Architect',
    credentials: 'Ex-Enterprise Systems Architect',
    bio: '12+ years designing distributed systems, high-concurrency APIs, and enterprise cloud migrations.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop&crop=faces&q=80',
    touchpoint: 'Architecture Lead',
    status: 'Direct Sprint Access',
    isActive: true
  },
  {
    id: 'team-2',
    name: 'Ananya Roy',
    role: 'Head of Product Design & UX',
    credentials: 'Design Systems Lead',
    bio: 'Specialist in multi-platform design systems, interaction design, and WCAG accessibility compliance.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&crop=faces&q=80',
    touchpoint: 'UX & Design Review',
    status: 'Direct Sprint Access',
    isActive: true
  },
  {
    id: 'team-3',
    name: 'Rohan Mehta',
    role: 'Principal Full-Stack Engineer',
    credentials: 'Full-Stack Performance Specialist',
    bio: 'Core expert in React, Next.js, Node microservices, real-time WebSockets, and state machines.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&crop=faces&q=80',
    touchpoint: 'Core Systems Lead',
    status: 'Direct Sprint Access',
    isActive: true
  },
  {
    id: 'team-4',
    name: 'Priya Nair',
    role: 'Lead Cloud & DevOps Engineer',
    credentials: 'AWS & Kubernetes Certified',
    bio: 'ISO 27001 compliance lead, Docker/Kubernetes cluster orchestrator, and zero-downtime CI/CD architect.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&crop=faces&q=80',
    touchpoint: 'DevOps & Security',
    status: 'Direct Sprint Access',
    isActive: true
  }
]

export default function TeamManager() {
  const { getAuthHeader } = useAdminAuth()
  const [sectionData, setSectionData] = useState({
    title: 'Senior engineers. Direct access. No account manager filters.',
    subtitle: 'You collaborate directly with the technical specialists building and deploying your codebase.',
    isActive: true
  })
  const [members, setMembers] = useState(DEFAULT_MEMBERS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState('all')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    credentials: '',
    bio: '',
    image: '',
    touchpoint: 'Sprint Leader',
    status: 'Active Sprint',
    isActive: true
  })
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const SERVER_HOST = API_URL.replace('/api', '')

  useEffect(() => {
    fetchTeamSection()
  }, [])

  const fetchTeamSection = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/content/team_members`)
      if (res.data?.success && res.data.section) {
        const sec = res.data.section
        setSectionData({
          title: sec.title || 'Senior engineers. Direct access. No account manager filters.',
          subtitle: sec.subtitle || 'You collaborate directly with the technical specialists building and deploying your codebase.',
          isActive: sec.isActive !== undefined ? sec.isActive : true
        })
        if (Array.isArray(sec.data?.members) && sec.data.members.length > 0) {
          setMembers(sec.data.members)
        }
      }
    } catch (e) {
      toast.error('Failed to load team members: ' + (e.response?.data?.message || e.message))
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAll = async (membersToSave = members, extraSection = sectionData) => {
    try {
      setSaving(true)
      const res = await axios.put(`${API_URL}/content/admin/team_members`, {
        title: extraSection.title,
        subtitle: extraSection.subtitle,
        isActive: extraSection.isActive,
        data: {
          members: membersToSave
        }
      }, {
        headers: getAuthHeader()
      })

      if (res.data?.success) {
        toast.success('Engineering Team updated successfully!')
      }
    } catch (e) {
      toast.error('Failed to save team: ' + (e.response?.data?.message || e.message))
    } finally {
      setSaving(false)
    }
  }

  const openAddModal = () => {
    setEditingIndex(null)
    setFormData({
      id: 'team-' + Date.now(),
      name: '',
      role: '',
      credentials: 'Ex-Senior Systems Architect',
      bio: '',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&crop=face',
      touchpoint: 'Sprint Leader',
      status: 'Active Sprint',
      isActive: true
    })
    setIsModalOpen(true)
  }

  const openEditModal = (member, index) => {
    setEditingIndex(index)
    setFormData({
      id: member.id || 'team-' + Date.now(),
      name: member.name || '',
      role: member.role || '',
      credentials: member.credentials || '',
      bio: member.bio || '',
      image: member.image || '',
      touchpoint: member.touchpoint || 'Sprint Leader',
      status: member.status || 'Active Sprint',
      isActive: member.isActive !== undefined ? member.isActive : true
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingIndex(null)
  }

  const handleModalSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.role.trim()) {
      toast.error('Please enter Member Name and Role')
      return
    }

    const newMember = {
      id: formData.id || 'team-' + Date.now(),
      name: formData.name.trim(),
      role: formData.role.trim(),
      credentials: formData.credentials.trim() || 'Core Specialist',
      bio: formData.bio.trim(),
      image: formData.image.trim(),
      touchpoint: formData.touchpoint.trim() || 'Sprint Leader',
      status: formData.status.trim() || 'Active Sprint',
      isActive: Boolean(formData.isActive)
    }

    let updatedMembers
    if (editingIndex !== null && editingIndex >= 0) {
      updatedMembers = [...members]
      updatedMembers[editingIndex] = newMember
    } else {
      updatedMembers = [...members, newMember]
    }

    setMembers(updatedMembers)
    closeModal()
    await handleSaveAll(updatedMembers)
  }

  const handleDeleteMember = async (indexToDelete) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return
    const updated = members.filter((_, i) => i !== indexToDelete)
    setMembers(updated)
    await handleSaveAll(updated)
  }

  const handleToggleActive = async (indexToToggle) => {
    const updated = [...members]
    updated[indexToToggle] = {
      ...updated[indexToToggle],
      isActive: !updated[indexToToggle].isActive
    }
    setMembers(updated)
    await handleSaveAll(updated)
  }

  const handleMove = async (index, direction) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= members.length) return
    const updated = [...members]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setMembers(updated)
    await handleSaveAll(updated)
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
      data.append('altText', formData.name || 'Team Member Photo')

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
        toast.success('Team member photo uploaded successfully!')
      }
    } catch (err) {
      toast.error('Upload failed: ' + (err.response?.data?.message || err.message))
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const getFullImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&crop=face'
    if (img.startsWith('http://') || img.startsWith('https://')) return img
    return `${SERVER_HOST}${img}`
  }

  const filteredMembers = members.filter(m => {
    if (filter === 'active') return m.isActive !== false
    if (filter === 'inactive') return m.isActive === false
    return true
  })

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] space-y-3">
        <RefreshCw className="w-8 h-8 text-[#FFC800] animate-spin" />
        <p className="text-sm text-gray-400">Loading Engineering Team Members...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#10151E] border border-white/10 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#F5B700]/15 border border-[#F5B700]/30 flex items-center justify-center text-[#F5B700]">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Core Leadership &amp; Engineering Team</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5B700]/20 text-[#FFC800] border border-[#F5B700]/30 font-semibold">
                Homepage
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Manage senior engineers, roles, credentials, bios, and headshots displayed on the homepage.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={openAddModal}
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#F5B700] hover:bg-[#D9A200] text-[#111827] font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(245,183,0,0.3)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Member</span>
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
                handleSaveAll(members, next)
              }}
              className="rounded accent-[#F5B700]"
            />
            <span>Show Team Section on Homepage</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Section Title (Headline)
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
            { id: 'all', label: `All Members (${members.length})` },
            { id: 'active', label: `Active (${members.filter(m => m.isActive !== false).length})` },
            { id: 'inactive', label: `Hidden / Drafts (${members.filter(m => m.isActive === false).length})` }
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
          Showing {filteredMembers.length} of {members.length} engineers
        </span>
      </div>

      {/* Members Grid (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredMembers.map((member, index) => {
          const originalIndex = members.findIndex(m => (m.id ? m.id === member.id : m.name === member.name))
          const isItemActive = member.isActive !== false
          const photoUrl = getFullImageUrl(member.image)

          return (
            <div
              key={member.id || index}
              className={`bg-[#10151E] border rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col justify-between ${
                isItemActive ? 'border-white/10 hover:border-[#F5B700]/50' : 'border-red-500/20 opacity-60'
              }`}
            >
              <div className="p-4 space-y-3">
                {/* Photo with Credentials Badge Overlay */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#05070A] border border-white/10 group">
                  <img
                    src={photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&crop=face'
                    }}
                  />

                  {/* Credentials Pill on Photo */}
                  <div className="absolute bottom-2 left-2 right-2 bg-[#111827]/95 backdrop-blur-xs text-white text-[10px] font-mono font-semibold px-2 py-1 rounded-md border border-white/15 truncate shadow-md">
                    {member.credentials || 'Senior Specialist'}
                  </div>

                  {!isItemActive && (
                    <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-red-500/80 text-white">
                        Hidden
                      </span>
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight leading-snug">
                    {member.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#F5B700] bg-[#0B0E14] px-2 py-0.5 rounded inline-block mt-1 mb-1.5 border border-[#F5B700]/30 leading-tight">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                {/* Touchpoint Status */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="font-semibold text-white">{member.touchpoint || 'Sprint Leader'}</span>
                  <span className="font-mono text-[#10B981] font-bold">● {member.status || 'Active Sprint'}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-4 py-2.5 bg-[#0B0E14] border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleMove(originalIndex, -1)}
                    disabled={originalIndex === 0}
                    title="Move Left"
                    className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-20 hover:bg-white/5"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(originalIndex, 1)}
                    disabled={originalIndex === members.length - 1}
                    title="Move Right"
                    className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-20 hover:bg-white/5"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleToggleActive(originalIndex)}
                    title={isItemActive ? 'Published (Click to hide)' : 'Hidden (Click to publish)'}
                    className={`p-1 rounded ml-1 ${isItemActive ? 'text-green-400 hover:bg-green-400/10' : 'text-gray-500 hover:bg-white/5'}`}
                  >
                    {isItemActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => openEditModal(member, originalIndex)}
                    className="flex items-center space-x-1 px-2.5 py-1 bg-white/10 hover:bg-[#F5B700] hover:text-[#111827] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteMember(originalIndex)}
                    className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Delete member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 bg-[#10151E] rounded-2xl border border-white/10 space-y-3">
          <User className="w-10 h-10 text-gray-500 mx-auto" />
          <h4 className="text-sm font-semibold text-white">No team members found for current filter</h4>
          <p className="text-xs text-gray-400">Click &ldquo;Add Member&rdquo; to add your leadership or engineering specialist.</p>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#10151E] border border-white/15 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0B0E14] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F5B700]/20 flex items-center justify-center text-[#F5B700]">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingIndex !== null ? 'Edit Team Member' : 'Add Team Member'}
                  </h3>
                  <p className="text-[11px] text-gray-400">Changes will reflect live on the website leadership section.</p>
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
              {/* Row 1: Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Role / Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Technology Officer & Lead Architect"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                  />
                </div>
              </div>

              {/* Row 2: Credentials Badge */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Credentials Pill Badge (shown on photo) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ex-Enterprise Systems Architect or AWS & Kubernetes Certified"
                  value={formData.credentials}
                  onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                />
              </div>

              {/* Row 3: Photo Upload & URL */}
              <div className="space-y-2 bg-[#0B0E14] p-3 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#F5B700]" />
                    <span>Member Headshot / Photo</span>
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
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Photo'}</span>
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Or paste photo URL (https://... or /uploads/...)"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-3.5 py-2 bg-[#10151E] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                  />

                  {formData.image && (
                    <img
                      src={getFullImageUrl(formData.image)}
                      alt="Preview"
                      className="w-10 h-10 rounded-xl object-cover border border-[#F5B700]"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  )}
                </div>
              </div>

              {/* Row 4: Bio */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Bio / Technical Expertise Summary
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. 12+ years designing distributed systems, high-concurrency APIs, and enterprise cloud migrations."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                />
              </div>

              {/* Row 5: Touchpoint Role & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Touchpoint Label (e.g. Sprint Leader)
                  </label>
                  <input
                    type="text"
                    placeholder="Sprint Leader / Design Lead"
                    value={formData.touchpoint}
                    onChange={(e) => setFormData({ ...formData, touchpoint: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Status Label (e.g. Active Sprint)
                  </label>
                  <input
                    type="text"
                    placeholder="Active Sprint"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="pt-2">
                <label className="flex items-center space-x-2.5 text-xs font-semibold text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#F5B700]"
                  />
                  <span>Active &amp; Visible on Homepage</span>
                </label>
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
                  <span>{editingIndex !== null ? 'Save Changes' : 'Create Member'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


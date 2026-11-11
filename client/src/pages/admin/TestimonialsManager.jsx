import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  Quote, Plus, Save, Trash2, Edit3, ArrowUp, ArrowDown,
  Upload, Eye, EyeOff, Check, X, RefreshCw, Star, User
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'

const DEFAULT_REVIEWS = [
  {
    id: 'review-1',
    headline: 'Things were visible, high-velocity, and efficient.',
    body: 'It was really good working with Yatharth IT Solutions and their engineering team, because they were attentive to our technical needs. It was collaborative, and as a client I can track the code commits and progress of the project. We used transparent sprint management, so things were visible and efficient. If you are looking for scalable software or mobile apps, I highly recommend them!',
    companyLogo: 'SPACECROP',
    authorName: 'Mary Grace Gasco',
    authorRole: 'Chief Executive Officer',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop',
    isActive: true
  },
  {
    id: 'review-2',
    headline: 'The architecture & result is just amazing.',
    body: 'Yatharth IT Solutions is the right choice, I would highly recommend them, since they have been professional and competent from the very first moment. Our platform is wonderful, attractive, easy to use with the perfect design system. The team worked closely with us to provide a system that met all criteria. The result is just amazing.',
    companyLogo: 'NON STOP NANNY',
    authorName: 'Adrienn Asztalos',
    authorRole: 'Founder',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop',
    isActive: true
  },
  {
    id: 'review-3',
    headline: 'A crucial engineering partner since our inception.',
    body: "They have been a crucial engineering partner since our company's inception. They manage our full web infrastructure, greatly enhancing our exposure and returns through outstanding architecture. Beyond web development, they've restructured our internal systems and automated data workflows.",
    companyLogo: 'RENTA STAY',
    authorName: 'Zaid Rauf',
    authorRole: 'Chief Technology Officer',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop',
    isActive: true
  },
  {
    id: 'review-4',
    headline: 'We will surely continue working with them.',
    body: 'We have already done two projects of different nature, ie a software adaptation and an enterprise web platform, with the team at Yatharth IT. They have always been professional and flexible in adapting to our needs and are not afraid of incorporating new knowledge to their skills if the project requires it. We will surely continue working with them as the projects evolve.',
    companyLogo: 'BOTTEGA POLANCO',
    authorName: 'BOTTEGA Hospitality',
    authorRole: 'Chief Executive Officer',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop',
    isActive: true
  },
  {
    id: 'review-5',
    headline: 'Reliable and trustable engineering company.',
    body: 'These engineers are great workers, full of technical depth and dedication. I have been working with them for more than a year with several websites and cloud platforms, and planning to stay longer. Reliable and trustable engineering company. Highly recommendable.',
    companyLogo: 'TRADERS HUB',
    authorName: 'Sergio',
    authorRole: 'Founder & CEO',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop',
    isActive: true
  },
  {
    id: 'review-6',
    headline: 'Good customer service and deep commitment.',
    body: 'I was very happy with overall my platform build. Easy to understand, maintain, and update. It was very nice that their team explained and arranged every architectural component for me. I also like the user-friendly design system and continuous commitment I received.',
    companyLogo: 'SOLEIMANI CONSULTING',
    authorName: 'Saeedeh Soleimani',
    authorRole: 'Coach & Consultant',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop',
    isActive: true
  }
]

export default function TestimonialsManager() {
  const { getAuthHeader } = useAdminAuth()
  const [sectionData, setSectionData] = useState({
    title: "Don't just take our word for it.",
    subtitle: 'Verified feedback from founders, CTOs, and product directors.',
    isActive: true
  })
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState('all')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    headline: '',
    body: '',
    companyLogo: '',
    authorName: '',
    authorRole: '',
    rating: 5,
    avatar: '',
    isActive: true
  })
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const avatarInputRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const SERVER_HOST = API_URL.replace('/api', '')

  useEffect(() => {
    fetchTestimonialsSection()
  }, [])

  const fetchTestimonialsSection = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/content/testimonials`)
      if (res.data?.success && res.data.section) {
        const sec = res.data.section
        setSectionData({
          title: sec.title || "Don't just take our word for it.",
          subtitle: sec.subtitle || 'Verified feedback from founders, CTOs, and product directors.',
          isActive: sec.isActive !== undefined ? sec.isActive : true
        })
        if (Array.isArray(sec.data?.reviews) && sec.data.reviews.length > 0) {
          setReviews(sec.data.reviews)
        }
      }
    } catch (e) {
      toast.error('Failed to load testimonials: ' + (e.response?.data?.message || e.message))
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAll = async (reviewsToSave = reviews, extraSection = sectionData) => {
    try {
      setSaving(true)
      const res = await axios.put(`${API_URL}/content/admin/testimonials`, {
        title: extraSection.title,
        subtitle: extraSection.subtitle,
        isActive: extraSection.isActive,
        data: {
          reviews: reviewsToSave
        }
      }, {
        headers: getAuthHeader()
      })

      if (res.data?.success) {
        toast.success('Testimonials updated successfully!')
      }
    } catch (e) {
      toast.error('Failed to save testimonials: ' + (e.response?.data?.message || e.message))
    } finally {
      setSaving(false)
    }
  }

  const openAddModal = () => {
    setEditingIndex(null)
    setFormData({
      id: 'review-' + Date.now(),
      headline: '',
      body: '',
      companyLogo: '',
      authorName: '',
      authorRole: '',
      rating: 5,
      avatar: '',
      isActive: true
    })
    setIsModalOpen(true)
  }

  const openEditModal = (review, index) => {
    setEditingIndex(index)
    setFormData({
      id: review.id || 'review-' + Date.now(),
      headline: review.headline || '',
      body: review.body || '',
      companyLogo: review.companyLogo || '',
      authorName: review.authorName || '',
      authorRole: review.authorRole || '',
      rating: Number(review.rating) || 5,
      avatar: review.avatar || '',
      isActive: review.isActive !== undefined ? review.isActive : true
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingIndex(null)
  }

  const handleModalSubmit = async (e) => {
    e.preventDefault()

    if (!formData.authorName.trim() || !formData.headline.trim() || !formData.body.trim()) {
      toast.error('Please enter Client Name, Headline, and Review text')
      return
    }

    const newReview = {
      id: formData.id || 'review-' + Date.now(),
      headline: formData.headline.trim(),
      body: formData.body.trim(),
      companyLogo: formData.companyLogo.trim() || 'VERIFIED CLIENT',
      authorName: formData.authorName.trim(),
      authorRole: formData.authorRole.trim() || 'Client',
      rating: Number(formData.rating) || 5,
      avatar: formData.avatar.trim(),
      isActive: Boolean(formData.isActive)
    }

    let updatedReviews
    if (editingIndex !== null && editingIndex >= 0) {
      updatedReviews = [...reviews]
      updatedReviews[editingIndex] = newReview
    } else {
      updatedReviews = [newReview, ...reviews]
    }

    setReviews(updatedReviews)
    closeModal()
    await handleSaveAll(updatedReviews)
  }

  const handleDeleteReview = async (indexToDelete) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return
    const updated = reviews.filter((_, i) => i !== indexToDelete)
    setReviews(updated)
    await handleSaveAll(updated)
  }

  const handleToggleActive = async (indexToToggle) => {
    const updated = [...reviews]
    updated[indexToToggle] = {
      ...updated[indexToToggle],
      isActive: !updated[indexToToggle].isActive
    }
    setReviews(updated)
    await handleSaveAll(updated)
  }

  const handleMove = async (index, direction) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= reviews.length) return
    const updated = [...reviews]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setReviews(updated)
    await handleSaveAll(updated)
  }

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WEBP)')
      return
    }

    try {
      setUploadingAvatar(true)
      const data = new FormData()
      data.append('file', file)
      data.append('altText', formData.authorName || 'Client Avatar')

      const res = await axios.post(`${API_URL}/admin/media/upload`, data, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.data?.success && res.data.media?.url) {
        setFormData(prev => ({
          ...prev,
          avatar: res.data.media.url
        }))
        toast.success('Avatar uploaded successfully!')
      }
    } catch (err) {
      toast.error('Upload failed: ' + (err.response?.data?.message || err.message))
    } finally {
      setUploadingAvatar(false)
      if (avatarInputRef.current) avatarInputRef.current.value = ''
    }
  }

  const getFullAvatarUrl = (img) => {
    if (!img) return null
    if (img.startsWith('http://') || img.startsWith('https://')) return img
    return `${SERVER_HOST}${img}`
  }

  const filteredReviews = reviews.filter(r => {
    if (filter === 'active') return r.isActive !== false
    if (filter === 'inactive') return r.isActive === false
    return true
  })

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] space-y-3">
        <RefreshCw className="w-8 h-8 text-[#FFC800] animate-spin" />
        <p className="text-sm text-gray-400">Loading Testimonials & Client Reviews...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#10151E] border border-white/10 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#F5B700]/15 border border-[#F5B700]/30 flex items-center justify-center text-[#F5B700]">
            <Quote className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Client Testimonials & Reviews</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5B700]/20 text-[#FFC800] border border-[#F5B700]/30 font-semibold">
                Homepage
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Add and manage client testimonials, star ratings, quotes, company names, and avatars.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={openAddModal}
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#F5B700] hover:bg-[#D9A200] text-[#111827] font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(245,183,0,0.3)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Testimonial</span>
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
                handleSaveAll(reviews, next)
              }}
              className="rounded accent-[#F5B700]"
            />
            <span>Show Reviews Section on Homepage</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Section Title (e.g. Don&apos;t just take our word for it.)
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
            { id: 'all', label: `All Reviews (${reviews.length})` },
            { id: 'active', label: `Active (${reviews.filter(r => r.isActive !== false).length})` },
            { id: 'inactive', label: `Hidden / Drafts (${reviews.filter(r => r.isActive === false).length})` }
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
          Showing {filteredReviews.length} of {reviews.length} reviews
        </span>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredReviews.map((review, index) => {
          const originalIndex = reviews.findIndex(r => (r.id ? r.id === review.id : r.authorName === review.authorName))
          const isItemActive = review.isActive !== false
          const avatarUrl = getFullAvatarUrl(review.avatar)

          return (
            <div
              key={review.id || index}
              className={`bg-[#10151E] border rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col justify-between ${
                isItemActive ? 'border-white/10 hover:border-[#F5B700]/50' : 'border-red-500/20 opacity-60'
              }`}
            >
              <div className="p-5 space-y-4">
                {/* Top: Stars + Company + Action controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex text-[#10B981] space-x-0.5">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#10B981]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider pl-1.5 border-l border-white/10">
                      {review.companyLogo}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1">
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
                      disabled={originalIndex === reviews.length - 1}
                      title="Move Down"
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
                </div>

                {/* Headline */}
                <h4 className="text-base font-bold text-white leading-snug">
                  &ldquo;{review.headline}&rdquo;
                </h4>

                {/* Review body */}
                <p className="text-xs text-gray-300 leading-relaxed bg-[#0B0E14] p-3 rounded-xl border border-white/5">
                  {review.body}
                </p>

                {/* Author Info + Avatar */}
                <div className="flex items-center space-x-3 pt-1">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={review.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-[#F5B700]/40 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#F5B700]/15 border border-[#F5B700]/30 text-[#F5B700] flex items-center justify-center font-bold text-xs shrink-0">
                      {review.authorName.charAt(0) || <User className="w-4 h-4" />}
                    </div>
                  )}

                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block truncate">
                      {review.authorName}
                    </span>
                    <span className="text-[11px] text-gray-400 block truncate">
                      {review.authorRole} · <strong className="text-gray-300">{review.companyLogo}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3 bg-[#0B0E14] border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-mono">
                  {isItemActive ? '● Active on Homepage' : '○ Hidden'}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(review, originalIndex)}
                    className="flex items-center space-x-1 px-3 py-1 bg-white/10 hover:bg-[#F5B700] hover:text-[#111827] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteReview(originalIndex)}
                    className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Delete review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12 bg-[#10151E] rounded-2xl border border-white/10 space-y-3">
          <Quote className="w-10 h-10 text-gray-500 mx-auto" />
          <h4 className="text-sm font-semibold text-white">No reviews found for current filter</h4>
          <p className="text-xs text-gray-400">Click &ldquo;Add Testimonial&rdquo; to add your client review.</p>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#10151E] border border-white/15 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0B0E14] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F5B700]/20 flex items-center justify-center text-[#F5B700]">
                  <Quote className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingIndex !== null ? 'Edit Testimonial' : 'Add New Client Testimonial'}
                  </h3>
                  <p className="text-[11px] text-gray-400">Updates will reflect live on the website client reviews section.</p>
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
              {/* Row 1: Client Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Client Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mary Grace Gasco"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Designation / Role <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Executive Officer / Founder"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                  />
                </div>
              </div>

              {/* Row 2: Company Name & Star Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Company Name / Brand <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SPACECROP or BOTTEGA Hospitality"
                    value={formData.companyLogo}
                    onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <div className="flex items-center space-x-1 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? 'fill-[#10B981] text-[#10B981]'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-gray-400 pl-2 font-mono">{formData.rating} Stars</span>
                  </div>
                </div>
              </div>

              {/* Row 3: Headline */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Quote Headline (Key statement) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Things were visible, high-velocity, and efficient."
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                />
              </div>

              {/* Row 4: Review Body */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Full Review / Testimonial Body <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="e.g. It was really good working with Yatharth IT Solutions and their engineering team..."
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                />
              </div>

              {/* Row 5: Client Avatar Photo */}
              <div className="space-y-2 bg-[#0B0E14] p-3 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-[#F5B700]" />
                    <span>Client Photo / Avatar (Optional)</span>
                  </label>

                  <input
                    type="file"
                    ref={avatarInputRef}
                    onChange={handleAvatarUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="flex items-center space-x-1.5 px-3 py-1 bg-[#F5B700] hover:bg-[#D9A200] text-[#111827] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingAvatar ? 'Uploading...' : 'Upload Photo'}</span>
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Or paste photo URL (https://... or /uploads/...)"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    className="flex-1 px-3.5 py-2 bg-[#10151E] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#F5B700]"
                  />

                  {formData.avatar && (
                    <img
                      src={getFullAvatarUrl(formData.avatar)}
                      alt="Preview"
                      className="w-9 h-9 rounded-full object-cover border border-[#F5B700]"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  )}
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
                  <span>Publish & Display on Homepage</span>
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
                  disabled={uploadingAvatar}
                  className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold text-[#111827] bg-[#F5B700] hover:bg-[#D9A200] transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{editingIndex !== null ? 'Save Changes' : 'Create Testimonial'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

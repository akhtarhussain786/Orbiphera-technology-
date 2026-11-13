import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Layout, Save, Plus, Trash2, HelpCircle, Shield, Award, CheckCircle2 } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'
import ProjectsManager from './ProjectsManager'
import ProductsManager from './ProductsManager'
import TestimonialsManager from './TestimonialsManager'
import TeamManager from './TeamManager'

export default function ContentManager() {
  const { getAuthHeader } = useAdminAuth()
  const [activeSection, setActiveSection] = useState('hero')
  const [sectionsData, setSectionsData] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    fetchSections()
  }, [])

  const fetchSections = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/content`)
      if (res.data.success) {
        const map = {}
        res.data.sections.forEach(s => {
          map[s.sectionKey] = s
        })
        setSectionsData(map)
      }
    } catch (e) {
      toast.error('Failed to load content sections')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSection = async (sectionKey) => {
    try {
      setSaving(true)
      const sec = sectionsData[sectionKey]
      await axios.put(`${API_URL}/content/admin/${sectionKey}`, {
        title: sec.title,
        subtitle: sec.subtitle,
        data: sec.data,
        isActive: sec.isActive
      }, {
        headers: getAuthHeader()
      })
      toast.success(`${sectionKey.toUpperCase()} section saved successfully!`)
    } catch (e) {
      toast.error('Could not save section: ' + (e.response?.data?.message || e.message))
    } finally {
      setSaving(false)
    }
  }

  const updateCurrentSection = (fields) => {
    setSectionsData(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        ...fields
      }
    }))
  }

  const updateSectionData = (subFields) => {
    setSectionsData(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        data: {
          ...(prev[activeSection]?.data || {}),
          ...subFields
        }
      }
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#FFC800] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const current = sectionsData[activeSection] || { title: '', subtitle: '', data: {} }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Website Content Management</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage public website text, headings, homepage cards, and FAQs without touching code.
          </p>
        </div>
        {activeSection !== 'products_showcase' && activeSection !== 'featured_projects' && activeSection !== 'testimonials' && activeSection !== 'team_members' && (
          <button
            onClick={() => handleSaveSection(activeSection)}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(255,200,0,0.25)] transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Section'}</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {[
          { key: 'hero', label: 'Hero Banner' },
          { key: 'products_showcase', label: 'Products & Solutions (Homepage)' },
          { key: 'featured_projects', label: 'Featured Projects (Work)' },
          { key: 'testimonials', label: 'Client Reviews' },
          { key: 'team_members', label: 'Leadership & Team' },
          { key: 'why_nexvora', label: 'Why Choose Us' },
          { key: 'faq', label: 'Frequently Asked Questions' },
          { key: 'maintenance_plans', label: 'Maintenance Plans' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSection === tab.key
                ? 'bg-[#1558C9] text-white shadow-lg'
                : 'bg-[#10151E] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Editor Content Area */}
      {activeSection === 'products_showcase' ? (
        <ProductsManager />
      ) : activeSection === 'featured_projects' ? (
        <ProjectsManager />
      ) : activeSection === 'testimonials' ? (
        <TestimonialsManager />
      ) : activeSection === 'team_members' ? (
        <TeamManager />
      ) : (
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Common Section Header Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Section Main Heading</label>
            <input
              type="text"
              value={current.title || ''}
              onChange={(e) => updateCurrentSection({ title: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Section Subtitle / Description</label>
            <input
              type="text"
              value={current.subtitle || ''}
              onChange={(e) => updateCurrentSection({ subtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
            />
          </div>
        </div>

        {/* 1. HERO SECTION SPECIFICS */}
        {activeSection === 'hero' && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFC800]">Hero Action & Badges</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Top Badge Text</label>
                <input
                  type="text"
                  value={current.data?.badge || ''}
                  onChange={(e) => updateSectionData({ badge: e.target.value })}
                  placeholder="Premium Digital Marketplace"
                  className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Primary CTA Label</label>
                <input
                  type="text"
                  value={current.data?.primaryCtaText || ''}
                  onChange={(e) => updateSectionData({ primaryCtaText: e.target.value })}
                  placeholder="Explore Marketplace"
                  className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Secondary CTA Label</label>
                <input
                  type="text"
                  value={current.data?.secondaryCtaText || ''}
                  onChange={(e) => updateSectionData({ secondaryCtaText: e.target.value })}
                  placeholder="Build My Solution"
                  className="w-full px-3.5 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. WHY CHOOSE US CARDS */}
        {activeSection === 'why_nexvora' && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFC800]">Value Proposition Feature Cards</h4>
              <button
                type="button"
                onClick={() => {
                  const cards = [...(current.data?.cards || [])]
                  cards.push({ title: 'New Highlight', description: 'Feature description...' })
                  updateSectionData({ cards })
                }}
                className="text-xs text-[#FFC800] hover:underline flex items-center"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Card
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(current.data?.cards || []).map((card, idx) => (
                <div key={idx} className="bg-[#0B0E14] border border-white/10 p-4 rounded-xl relative group">
                  <button
                    type="button"
                    onClick={() => {
                      const cards = current.data.cards.filter((_, i) => i !== idx)
                      updateSectionData({ cards })
                    }}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">Card Title</label>
                  <input
                    type="text"
                    value={card.title || ''}
                    onChange={(e) => {
                      const cards = [...current.data.cards]
                      cards[idx].title = e.target.value
                      updateSectionData({ cards })
                    }}
                    className="w-full px-3 py-1.5 bg-[#10151E] border border-white/10 rounded-lg text-white text-xs mb-2 focus:outline-none focus:border-[#1558C9]"
                  />
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">Card Description</label>
                  <textarea
                    rows={2}
                    value={card.description || ''}
                    onChange={(e) => {
                      const cards = [...current.data.cards]
                      cards[idx].description = e.target.value
                      updateSectionData({ cards })
                    }}
                    className="w-full px-3 py-1.5 bg-[#10151E] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#1558C9]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. FAQ SECTION */}
        {activeSection === 'faq' && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFC800]">Frequently Asked Questions List</h4>
              <button
                type="button"
                onClick={() => {
                  const faqs = [...(current.data?.faqs || [])]
                  faqs.push({ question: 'New Question?', answer: 'Answer content...' })
                  updateSectionData({ faqs })
                }}
                className="text-xs text-[#FFC800] hover:underline flex items-center"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add FAQ Item
              </button>
            </div>

            <div className="space-y-3">
              {(current.data?.faqs || []).map((faq, idx) => (
                <div key={idx} className="bg-[#0B0E14] border border-white/10 p-4 rounded-xl relative group">
                  <button
                    type="button"
                    onClick={() => {
                      const faqs = current.data.faqs.filter((_, i) => i !== idx)
                      updateSectionData({ faqs })
                    }}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="mb-2">
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">Question #{idx + 1}</label>
                    <input
                      type="text"
                      value={faq.question || ''}
                      onChange={(e) => {
                        const faqs = [...current.data.faqs]
                        faqs[idx].question = e.target.value
                        updateSectionData({ faqs })
                      }}
                      className="w-full px-3 py-1.5 bg-[#10151E] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#1558C9]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">Answer</label>
                    <textarea
                      rows={2}
                      value={faq.answer || ''}
                      onChange={(e) => {
                        const faqs = [...current.data.faqs]
                        faqs[idx].answer = e.target.value
                        updateSectionData({ faqs })
                      }}
                      className="w-full px-3 py-1.5 bg-[#10151E] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#1558C9]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. MAINTENANCE PLANS */}
        {activeSection === 'maintenance_plans' && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFC800]">Annual Support Packages</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(current.data?.plans || []).map((plan, idx) => (
                <div key={idx} className="bg-[#0B0E14] border border-white/10 p-4 rounded-xl">
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">Plan Name</label>
                  <input
                    type="text"
                    value={plan.name || ''}
                    onChange={(e) => {
                      const plans = [...current.data.plans]
                      plans[idx].name = e.target.value
                      updateSectionData({ plans })
                    }}
                    className="w-full px-3 py-1.5 bg-[#10151E] border border-white/10 rounded-lg text-white text-xs mb-2 focus:outline-none focus:border-[#1558C9]"
                  />
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">Price Tag</label>
                  <input
                    type="text"
                    value={plan.price || ''}
                    onChange={(e) => {
                      const plans = [...current.data.plans]
                      plans[idx].price = e.target.value
                      updateSectionData({ plans })
                    }}
                    className="w-full px-3 py-1.5 bg-[#10151E] border border-white/10 rounded-lg text-white text-xs mb-2 focus:outline-none focus:border-[#1558C9]"
                  />
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">Features (comma separated)</label>
                  <textarea
                    rows={3}
                    value={Array.isArray(plan.features) ? plan.features.join(', ') : (plan.features || '')}
                    onChange={(e) => {
                      const plans = [...current.data.plans]
                      plans[idx].features = e.target.value.split(',').map(s => s.trim())
                      updateSectionData({ plans })
                    }}
                    className="w-full px-3 py-1.5 bg-[#10151E] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#1558C9]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      )}
    </div>
  )
}


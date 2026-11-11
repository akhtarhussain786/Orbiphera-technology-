import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, Sparkles, FileText } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import SeoHead from '../components/common/SeoHead'
import PageBackground from '../components/common/PageBackground'

export default function RequestQuote() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    projectScope: 'Web Application / SaaS',
    estimatedBudget: '₹50,000 - ₹1,50,000',
    targetTimeline: '1-2 Months',
    projectDescription: '',
    needHosting: false,
    needMaintenance: false,
    needSourceCode: true
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.firstName || !formData.email || !formData.projectDescription) {
      toast.error('Please fill out all required fields (*)')
      return
    }

    try {
      setSubmitting(true)
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()
      const richMessage = `
[QUOTE ESTIMATION REQUEST]
Scope: ${formData.projectScope}
Budget: ${formData.estimatedBudget}
Timeline: ${formData.targetTimeline}
Source Code Requested: ${formData.needSourceCode ? 'Yes' : 'No'}
Hosting Setup: ${formData.needHosting ? 'Yes' : 'No'}
Annual Maintenance: ${formData.needMaintenance ? 'Yes' : 'No'}

Project Scope Overview:
${formData.projectDescription}
      `.trim()

      await axios.post(`${API_URL}/inquiries`, {
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.companyName,
        serviceType: `Quote: ${formData.projectScope}`,
        budget: formData.estimatedBudget,
        message: richMessage
      })
      setSubmitted(true)
      toast.success('Your project specifications were submitted to engineering!')
    } catch (err) {
      toast.error('Could not submit quotation request. Please check inputs.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-32 sm:pt-36 pb-20 relative overflow-hidden">
      <PageBackground />
      <SeoHead
        title="Request a Custom Project Quote"
        description="Submit your software or website project requirements to get an accurate architectural estimate and commercial proposal."
        keywords="software quote, website estimation, custom application proposal, hire web developers"
      />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121214] border border-[#E50914]/30 text-[#E50914] text-xs font-mono font-bold tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
            <span>Architectural Cost & Scope Calculator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Request a Free{' '}
            <span className="text-[#E50914]">
              Engineering Proposal
            </span>
          </h1>
          <p className="text-white/60 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Outline your functional specifications and receive a transparent timeline and fixed-price quotation within 24 hours.
          </p>
        </div>

        <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(229, 9, 20,0.2)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Proposal Request Dispatched</h3>
              <p className="text-white/60 text-sm max-w-md mx-auto">
                Our technical architects are reviewing your specifications. You will receive an itemized proposal at <span className="text-white font-semibold">{formData.email}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-[#E50914] text-white text-xs font-bold rounded-xl hover:brightness-110 transition-all shadow-[0_0_20px_rgba(229, 9, 20,0.2)] cursor-pointer"
              >
                Submit Another Proposal Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E50914]">1. Client Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">First Name *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      placeholder="e.g. Yash"
                      className="w-full px-3.5 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Last Name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      placeholder="e.g. Sharma"
                      className="w-full px-3.5 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Business Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="yash@enterprise.com"
                      className="w-full px-3.5 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Reliance, MediCare Labs, EduTech Hub (Optional)"
                    className="w-full px-3.5 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                  />
                </div>
              </div>

              {/* Project Scope & Parameters */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E50914]">2. Scope & Target Parameters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Solution Category</label>
                    <select
                      value={formData.projectScope}
                      onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                    >
                      <option value="Web Application / SaaS" className="bg-[#0B0B0C] text-white">Web Application / SaaS</option>
                      <option value="Hospital & Clinic OS" className="bg-[#0B0B0C] text-white">Hospital & Clinic OS</option>
                      <option value="Education & LMS Portal" className="bg-[#0B0B0C] text-white">Education & LMS Portal</option>
                      <option value="CRM & Lead Automation" className="bg-[#0B0B0C] text-white">CRM & Lead Automation</option>
                      <option value="E-Commerce Platform" className="bg-[#0B0B0C] text-white">E-Commerce Platform</option>
                      <option value="Custom Mobile App" className="bg-[#0B0B0C] text-white">Custom Mobile App (Flutter/React Native)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Estimated Budget</label>
                    <select
                      value={formData.estimatedBudget}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                    >
                      <option value="₹25,000 - ₹50,000" className="bg-[#0B0B0C] text-white">₹25,000 - ₹50,000</option>
                      <option value="₹50,000 - ₹1,50,000" className="bg-[#0B0B0C] text-white">₹50,000 - ₹1,50,000</option>
                      <option value="₹1,50,000 - ₹3,50,000" className="bg-[#0B0B0C] text-white">₹1,50,000 - ₹3,50,000</option>
                      <option value="₹3,50,000+" className="bg-[#0B0B0C] text-white">₹3,50,000+ (Enterprise)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Desired Timeline</label>
                    <select
                      value={formData.targetTimeline}
                      onChange={(e) => setFormData({ ...formData, targetTimeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                    >
                      <option value="Urgent (< 2 Weeks)" className="bg-[#0B0B0C] text-white">Urgent (&lt; 2 Weeks)</option>
                      <option value="1 Month" className="bg-[#0B0B0C] text-white">1 Month</option>
                      <option value="2-3 Months" className="bg-[#0B0B0C] text-white">2-3 Months</option>
                      <option value="Flexible / Strategic" className="bg-[#0B0B0C] text-white">Flexible / Strategic</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Project Functional Overview & Deliverables *</label>
                  <textarea
                    rows={4}
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    required
                    placeholder="Detail the modules, user roles, integrations (payment, SMS, third-party APIs) and key outcomes..."
                    className="w-full px-3.5 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                  />
                </div>
              </div>

              {/* Inclusions Checkbox Options */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E50914]">3. Requested Inclusions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-white">
                  <label className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer hover:border-[#E50914]/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.needSourceCode}
                      onChange={(e) => setFormData({ ...formData, needSourceCode: e.target.checked })}
                      className="rounded border-white/20 bg-[#0F0F11] text-[#E50914] focus:ring-0"
                    />
                    <span>100% Unminified Source Code</span>
                  </label>

                  <label className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer hover:border-[#E50914]/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.needHosting}
                      onChange={(e) => setFormData({ ...formData, needHosting: e.target.checked })}
                      className="rounded border-white/20 bg-[#0F0F11] text-[#E50914] focus:ring-0"
                    />
                    <span>Cloud VPS & Docker Setup</span>
                  </label>

                  <label className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer hover:border-[#E50914]/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.needMaintenance}
                      onChange={(e) => setFormData({ ...formData, needMaintenance: e.target.checked })}
                      className="rounded border-white/20 bg-[#0F0F11] text-[#E50914] focus:ring-0"
                    />
                    <span>1-Year Maintenance & SLA</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#E50914] hover:brightness-110 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_30px_rgba(229, 9, 20,0.18)] flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#0B0B0C]" />
                <span>{submitting ? 'Generating Proposal Request...' : 'Submit Requirements & Request Quotation'}</span>
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}

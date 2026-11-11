import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import SeoHead from '../components/common/SeoHead'
import PageBackground from '../components/common/PageBackground'
import { useSettings } from '../context/SettingsContext'

export default function Contact() {
  const { settings } = useSettings()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: 'Website',
    projectDescription: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.firstName || !formData.email || !formData.projectDescription) {
      toast.error('Please complete all mandatory fields (*)')
      return
    }

    try {
      setSubmitting(true)
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()
      await axios.post(`${API_URL}/inquiries`, {
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.companyName,
        serviceType: formData.projectType,
        message: formData.projectDescription
      })
      setSubmitted(true)
      toast.success('Your message has been dispatched to our engineering desk!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-32 sm:pt-36 pb-20 relative overflow-hidden">
      <PageBackground />
      <SeoHead
        title="Contact Us & Engineering Consultation"
        description="Get in touch for template customizations, enterprise CRM software, or bespoke digital application development."
        keywords="contact developers, hire software engineers, software consultation, website estimate"
      />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121214] border border-[#E50914]/30 text-[#E50914] text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
            <span>24/7 Solution Architecture Support</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Let's Engineer Your Next{' '}
            <span className="text-[#E50914]">
              Digital Breakthrough
            </span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Have a question about our website templates, enterprise software licensing, or custom web development? We respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Details Card */}
          <div className="bg-[#121214] border border-white/10 rounded-3xl p-8 space-y-8 shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Direct Coordination</h3>
              <p className="text-xs text-white/60">
                Reach our solution architects and sales team directly.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-2xl bg-white/5 text-[#E50914] border border-white/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-white/60 uppercase tracking-wider block">Email Inquiries</span>
                  <a href={`mailto:${settings?.contactEmail || 'contact@yathartitsolutions.com'}`} className="text-white font-semibold hover:text-[#E50914] transition-colors">
                    {settings?.contactEmail || 'contact@yathartitsolutions.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-2xl bg-white/5 text-[#E50914] border border-white/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-white/60 uppercase tracking-wider block">Call / WhatsApp</span>
                  <a href={`tel:${settings?.contactPhone || '+919876543210'}`} className="text-white font-semibold hover:text-[#E50914] transition-colors">
                    {settings?.contactPhone || '+91 98765 43210'}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-2xl bg-white/5 text-[#E50914] border border-white/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-white/60 uppercase tracking-wider block">Headquarters</span>
                  <p className="text-white font-semibold">
                    {settings?.address || 'Yatharth IT Solutions, Digital Tech Hub, India'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <span className="text-xs text-white block mb-2 font-bold">Service Level Agreement</span>
              <p className="text-xs text-white/60 leading-relaxed">
                All inquiries submitted through this official portal are ingested into our Admin CRM with immutable timestamp tracking.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-2 bg-[#121214] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(229, 9, 20,0.2)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Thank You for Reaching Out!</h3>
                <p className="text-white/60 text-sm max-w-md mx-auto">
                  Your project scope has been securely received by our engineering team. An architect will review your parameters and follow up shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      companyName: '',
                      projectType: 'Website',
                      projectDescription: ''
                    })
                  }}
                  className="px-6 py-2.5 bg-[#E50914] text-white text-xs font-bold rounded-xl hover:brightness-110 transition-all shadow-[0_0_20px_rgba(229, 9, 20,0.2)] cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-white">Send Us a Project Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">First Name *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      placeholder="e.g. Aditya"
                      className="w-full px-4 py-3 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 placeholder-white/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">Last Name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      placeholder="e.g. Verma"
                      className="w-full px-4 py-3 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 placeholder-white/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">Work Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="aditya@company.com"
                      className="w-full px-4 py-3 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 placeholder-white/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 placeholder-white/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">Company / Organization</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Company Name (Optional)"
                      className="w-full px-4 py-3 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 placeholder-white/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">Project Scope / Category</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 placeholder-white/40 transition-colors"
                    >
                      <option value="Website" className="bg-[#0B0B0C] text-white">Website Template Customization</option>
                      <option value="Web application" className="bg-[#0B0B0C] text-white">Custom Web Application / SaaS</option>
                      <option value="CRM" className="bg-[#0B0B0C] text-white">CRM & Lead Pipeline System</option>
                      <option value="Hospital management" className="bg-[#0B0B0C] text-white">Hospital Management System</option>
                      <option value="Institute management" className="bg-[#0B0B0C] text-white">Institute & Education Portal</option>
                      <option value="E-commerce" className="bg-[#0B0B0C] text-white">E-Commerce Storefront</option>
                      <option value="Mobile application" className="bg-[#0B0B0C] text-white">Mobile Application</option>
                      <option value="Other" className="bg-[#0B0B0C] text-white">Other Digital Solution</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">Project Brief & Questions *</label>
                  <textarea
                    rows={4}
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    required
                    placeholder="Tell us about your objectives, timeline, or product questions..."
                    className="w-full px-4 py-3 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 placeholder-white/40 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#E50914] hover:brightness-110 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_30px_rgba(229, 9, 20,0.18)] flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#0B0B0C]" />
                  <span>{submitting ? 'Transmitting Scope...' : 'Submit Inquiry & Request Callback'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

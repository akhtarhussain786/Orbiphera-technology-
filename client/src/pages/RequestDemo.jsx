import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Video, CheckCircle2, Laptop } from 'lucide-react'
import axios from 'axios'
import Button from '../components/ui/Button'
import SeoHead from '../components/common/SeoHead'
import PageBackground from '../components/common/PageBackground'
import { useSettings } from '../context/SettingsContext'
import toast from 'react-hot-toast'

export default function RequestDemo() {
  const { settings } = useSettings()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    softwareSelected: 'NexCare Hospital OS',
    preferredDate: '',
    preferredTime: '11:00 AM - 12:00 PM',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || '/api'
  const siteName = settings?.siteName || 'Orbiphera Technologies'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.firstName || !formData.email || !formData.preferredDate) {
      toast.error('Please complete all required fields')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(`${API_URL}/inquiries`, {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        company: formData.organization,
        serviceType: `Demo Request: ${formData.softwareSelected}`,
        message: `Requested software walkthrough: ${formData.softwareSelected}\nPreferred Date: ${formData.preferredDate}\nPreferred Time Window: ${formData.preferredTime}\nNotes: ${formData.notes || 'None'}`
      })

      if (res.data.success) {
        setSubmitted(true)
        toast.success('Your demonstration request has been scheduled! Our solutions architect will contact you.')
      }
    } catch (e) {
      toast.error('Could not schedule demo. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-28 pb-24 relative overflow-hidden">
      <PageBackground />
      <SeoHead
        title={`Schedule a Live Software Demonstration | ${siteName}`}
        description="Book an interactive walkthrough of our enterprise ERP solutions: NexCare Hospital OS, ClassPilot, StockPilot, and StayPilot."
        keywords="software demo, schedule erp demo, hospital software demo, school management walkthrough"
      />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121214] border border-[#E50914]/30 text-xs font-mono font-bold text-[#E50914] uppercase tracking-wider shadow-sm">
            <Laptop className="w-3.5 h-3.5 text-[#E50914]" />
            <span>1-on-1 Interactive Walkthrough</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Schedule a Live{' '}
            <span className="text-[#E50914]">
              Software Demo
            </span>
          </h1>
          <p className="text-sm sm:text-base text-white/60 font-normal leading-relaxed">
            Experience our production-grade management platforms in action. See the admin workflows, live database operations, and user interfaces.
          </p>
        </div>

        {/* Demo Booking Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#121214] border border-white/10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center mx-auto text-[#E50914] shadow-[0_0_20px_rgba(229, 9, 20,0.2)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">Demo Scheduled Successfully!</h3>
                <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                  Thank you, <span className="text-white font-semibold">{formData.firstName}</span>. Our lead architect will email you a Google Meet invitation link for <span className="text-white font-semibold">{formData.softwareSelected}</span>.
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => setSubmitted(false)}
                className="mt-4"
              >
                Schedule Another Demo
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Software Selection Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#E50914] block">
                  Select Software Solution for Walkthrough *
                </label>
                <select
                  value={formData.softwareSelected}
                  onChange={(e) => setFormData({ ...formData, softwareSelected: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0F0F11] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                >
                  <option value="NexCare Hospital OS" className="bg-[#0B0B0C] text-white">NexCare Hospital OS (Clinical EHR, OPD/IPD, Pharmacy POS)</option>
                  <option value="ClassPilot Education ERP" className="bg-[#0B0B0C] text-white">ClassPilot Education ERP (Student Portal, Fees, Exam Report)</option>
                  <option value="StockPilot Inventory OS" className="bg-[#0B0B0C] text-white">StockPilot Inventory OS (Multi-Warehouse, Barcode Scanning)</option>
                  <option value="StayPilot Hotel & Resort PMS" className="bg-[#0B0B0C] text-white">StayPilot Hotel & Resort PMS (Room Grid, POS, Housekeeping)</option>
                  <option value="Custom Bespoke Platform" className="bg-[#0B0B0C] text-white">Bespoke Custom Software Architecture</option>
                </select>
              </div>

              {/* Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-white/60 font-semibold">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. Rahul"
                    className="w-full px-4 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/60 font-semibold">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Singhania"
                    className="w-full px-4 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-white/60 font-semibold">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/60 font-semibold">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/60 font-semibold">Organization / Company Name</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. Apex Hospital, Skyline Academy, Global Retail Inc"
                  className="w-full px-4 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                />
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs text-white/60 font-semibold flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-[#E50914]" /> Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/60 font-semibold flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-[#E50914]" /> Preferred Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                  >
                    <option value="10:00 AM - 11:00 AM" className="bg-[#0B0B0C] text-white">10:00 AM - 11:00 AM IST</option>
                    <option value="11:00 AM - 12:00 PM" className="bg-[#0B0B0C] text-white">11:00 AM - 12:00 PM IST</option>
                    <option value="02:00 PM - 03:00 PM" className="bg-[#0B0B0C] text-white">02:00 PM - 03:00 PM IST</option>
                    <option value="04:00 PM - 05:00 PM" className="bg-[#0B0B0C] text-white">04:00 PM - 05:00 PM IST</option>
                    <option value="06:00 PM - 07:00 PM" className="bg-[#0B0B0C] text-white">06:00 PM - 07:00 PM IST</option>
                  </select>
                </div>
              </div>

              {/* Extra Notes */}
              <div className="space-y-1.5">
                <label className="text-xs text-white/60 font-semibold">Specific Features You Would Like to See</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Please demonstrate role permissions, multi-branch invoicing, and export features..."
                  className="w-full px-4 py-2.5 bg-[#0F0F11] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/40 transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full mt-4"
                icon={Video}
                iconPosition="left"
              >
                Confirm Walkthrough Booking
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Mail, Search, Trash2, Eye, CheckCircle2, MessageSquare,
  Clock, IndianRupee, FileText, X
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'

export default function InquiriesManager() {
  const { getAuthHeader } = useAdminAuth()
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [savingNotes, setSavingNotes] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    fetchInquiries()
  }, [search, statusFilter])

  const fetchInquiries = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/admin/inquiries`, {
        params: { search, status: statusFilter },
        headers: getAuthHeader()
      })
      if (res.data.success) {
        setInquiries(res.data.inquiries)
      }
    } catch (e) {
      toast.error('Failed to load enquiries')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(`${API_URL}/admin/inquiries/${id}/status`, { status }, {
        headers: getAuthHeader()
      })
      toast.success(`Enquiry marked as ${status}`)
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry(prev => ({ ...prev, status }))
      }
      fetchInquiries()
    } catch (e) {
      toast.error('Could not update enquiry status')
    }
  }

  const handleSaveNotes = async (e) => {
    e.preventDefault()
    if (!selectedInquiry) return

    try {
      setSavingNotes(true)
      await axios.patch(`${API_URL}/admin/inquiries/${selectedInquiry._id}/status`, {
        status: selectedInquiry.status,
        adminNotes: selectedInquiry.adminNotes,
        quotedAmount: selectedInquiry.quotedAmount
      }, {
        headers: getAuthHeader()
      })
      toast.success('Notes and quote updated!')
      fetchInquiries()
    } catch (e) {
      toast.error('Could not save notes')
    } finally {
      setSavingNotes(false)
    }
  }

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return

    try {
      await axios.delete(`${API_URL}/admin/inquiries/${id}`, {
        headers: getAuthHeader()
      })
      toast.success('Inquiry deleted')
      setSelectedInquiry(null)
      fetchInquiries()
    } catch (e) {
      toast.error('Could not delete inquiry')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Contact Enquiries & Quotations</h2>
          <p className="text-sm text-gray-400 mt-1">
            Review customer project scopes, update sales pipeline status, and maintain notes.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#10151E] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries by name, company, email..."
            className="w-full pl-10 pr-4 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#1558C9]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['all', 'New', 'Contacted', 'Proposal Sent', 'Won', 'Lost'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                statusFilter === st ? 'bg-[#1558C9] text-white' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-[#10151E] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0E14] text-gray-400 font-semibold uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Client Name & Email</th>
                <th className="py-3.5 px-4">Project Type</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-500">
                    Loading inquiries...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-500">
                    No inquiries received yet matching filter.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{inq.firstName} {inq.lastName}</div>
                      <div className="text-[11px] text-gray-500 font-mono">{inq.email} • {inq.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#1558C9]/10 text-[#1558C9] border border-[#1558C9]/20 font-medium">
                        {inq.projectType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-400">
                      {inq.companyName || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateStatus(inq._id, e.target.value)}
                        className={`text-xs px-2.5 py-1 rounded-full border bg-transparent font-semibold cursor-pointer focus:outline-none ${
                          inq.status === 'New'
                            ? 'text-amber-400 border-amber-500/30'
                            : inq.status === 'Won'
                            ? 'text-emerald-400 border-emerald-500/30'
                            : inq.status === 'Contacted'
                            ? 'text-cyan-400 border-cyan-500/30'
                            : 'text-gray-400 border-white/10'
                        }`}
                      >
                        <option value="New" className="bg-[#10151E] text-white">New</option>
                        <option value="Contacted" className="bg-[#10151E] text-white">Contacted</option>
                        <option value="Proposal Sent" className="bg-[#10151E] text-white">Proposal Sent</option>
                        <option value="In Discussion" className="bg-[#10151E] text-white">In Discussion</option>
                        <option value="Won" className="bg-[#10151E] text-white">Won</option>
                        <option value="Lost" className="bg-[#10151E] text-white">Lost</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                          title="View Details & Notes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(inq._id)}
                          className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail & Notes Drawer Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#10151E] border border-white/10 rounded-2xl max-w-2xl w-full p-6 text-left shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Inquiry: {selectedInquiry.firstName} {selectedInquiry.lastName}
                </h3>
                <p className="text-xs text-gray-400">
                  {selectedInquiry.email} • {selectedInquiry.phone}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0B0E14] p-3 rounded-xl border border-white/5">
                <div>
                  <span className="text-gray-500 block text-[10px]">Project Type</span>
                  <span className="text-white font-medium">{selectedInquiry.projectType}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Company</span>
                  <span className="text-white font-medium">{selectedInquiry.companyName || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Budget</span>
                  <span className="text-white font-medium">{selectedInquiry.budget || 'Flexible'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Timeline</span>
                  <span className="text-white font-medium">{selectedInquiry.timeline || 'Immediate'}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 font-semibold block mb-1">Project Description & Scope:</span>
                <div className="p-3 bg-[#0B0E14] rounded-xl border border-white/5 text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.projectDescription}
                </div>
              </div>

              {selectedInquiry.requiredFeatures && (
                <div>
                  <span className="text-gray-400 font-semibold block mb-1">Required Features:</span>
                  <div className="p-3 bg-[#0B0E14] rounded-xl border border-white/5 text-gray-300">
                    {selectedInquiry.requiredFeatures}
                  </div>
                </div>
              )}

              {/* Internal Admin Notes & Quote Form */}
              <form onSubmit={handleSaveNotes} className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFC800]">Internal Sales Notes & Quotation</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Quote Amount (INR)</label>
                    <input
                      type="number"
                      value={selectedInquiry.quotedAmount || ''}
                      onChange={(e) => setSelectedInquiry({ ...selectedInquiry, quotedAmount: e.target.value })}
                      placeholder="e.g. 75000"
                      className="w-full px-3 py-1.5 bg-[#0B0E14] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#1558C9]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Pipeline Status</label>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => setSelectedInquiry({ ...selectedInquiry, status: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#0B0E14] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#1558C9]"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Won">Won</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Admin Internal Notes</label>
                  <textarea
                    rows={3}
                    value={selectedInquiry.adminNotes || ''}
                    onChange={(e) => setSelectedInquiry({ ...selectedInquiry, adminNotes: e.target.value })}
                    placeholder="Log discussion notes, client requirements, call summary..."
                    className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedInquiry(null)}
                    className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={savingNotes}
                    className="px-4 py-2 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-semibold text-xs rounded-xl"
                  >
                    {savingNotes ? 'Saving...' : 'Save Notes & Status'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


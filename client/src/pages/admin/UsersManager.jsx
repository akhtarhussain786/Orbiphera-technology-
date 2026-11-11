import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Users, UserPlus, Shield, ShieldCheck, Trash2, Edit2,
  CheckCircle, XCircle, Search, X, Lock
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'

export default function UsersManager() {
  const { admin: currentAdmin, getAuthHeader } = useAdminAuth()
  const [adminUsers, setAdminUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
    phone: ''
  })

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/admin/users`, {
        headers: getAuthHeader()
      })
      if (res.data.success) {
        setAdminUsers(res.data.adminUsers || [])
      }
    } catch (e) {
      toast.error('Failed to load admin users')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenCreate = () => {
    setEditingUser(null)
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'admin',
      phone: ''
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'admin',
      phone: user.phone || ''
    })
    setIsModalOpen(true)
  }

  const handleSaveUser = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      if (editingUser) {
        await axios.put(`${API_URL}/admin/users/${editingUser._id}`, formData, {
          headers: getAuthHeader()
        })
        toast.success('Admin user updated successfully!')
      } else {
        await axios.post(`${API_URL}/admin/users`, formData, {
          headers: getAuthHeader()
        })
        toast.success('Admin account created successfully!')
      }
      setIsModalOpen(false)
      fetchUsers()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save admin user')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleStatus = async (user) => {
    try {
      const res = await axios.patch(`${API_URL}/admin/users/${user._id}/toggle-status`, {}, {
        headers: getAuthHeader()
      })
      toast.success(`Account ${res.data.isActive ? 'activated' : 'deactivated'}`)
      fetchUsers()
    } catch (e) {
      toast.error(e.response?.data?.message || 'Could not update status')
    }
  }

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Permanently delete admin account for "${user.email}"?`)) return

    try {
      await axios.delete(`${API_URL}/admin/users/${user._id}`, {
        headers: getAuthHeader()
      })
      toast.success('Admin user deleted')
      fetchUsers()
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to delete user')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Admin Users & RBAC Permissions</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage administrative operators, access levels, roles, and security authentication.
          </p>
        </div>
        {currentAdmin?.role === 'super_admin' && (
          <button
            onClick={handleOpenCreate}
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(255,200,0,0.25)] transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Admin User</span>
          </button>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-[#10151E] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0E14] text-gray-400 font-semibold uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Operator Name & Email</th>
                <th className="py-3.5 px-4">Assigned Role</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4">Last Activity</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-500">
                    Loading admin users...
                  </td>
                </tr>
              ) : adminUsers.map((user) => (
                <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white flex items-center space-x-2">
                      <span>{user.name}</span>
                      {user._id === currentAdmin?._id && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-[#1558C9]/20 text-[#1558C9] rounded">You</span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-500 font-mono">{user.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full font-semibold capitalize ${
                      user.role === 'super_admin'
                        ? 'bg-[#FFC800]/10 text-[#FFC800] border border-[#FFC800]/30'
                        : user.role === 'admin'
                        ? 'bg-[#1558C9]/10 text-[#1558C9] border border-[#1558C9]/30'
                        : user.role === 'seo_manager'
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                        : 'bg-white/5 text-gray-400 border border-white/10'
                    }`}>
                      <ShieldCheck className="w-3 h-3" />
                      <span>{user.role.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(user)}
                      disabled={user._id === currentAdmin?._id}
                      className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors disabled:opacity-50 ${
                        user.isActive
                          ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'
                          : 'text-red-400 bg-red-500/10 border border-red-500/30'
                      }`}
                    >
                      {user.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span>{user.isActive ? 'Active' : 'Disabled'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-gray-400">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never logged in'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {currentAdmin?.role === 'super_admin' && (
                      <div className="inline-flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                          title="Edit user"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {user._id !== currentAdmin?._id && (
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Admin User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#10151E] border border-white/10 rounded-2xl max-w-md w-full p-6 text-left shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-sm font-bold text-white">
                {editingUser ? `Edit Operator: ${editingUser.name}` : 'New Admin Account'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="operator@yathartitsolutions.com"
                  className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  {editingUser ? 'New Password (Leave blank to keep existing)' : 'Password *'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingUser}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Assigned Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#1558C9]"
                >
                  <option value="admin">Admin (Standard Access)</option>
                  <option value="super_admin">SuperAdmin (Full Permissions)</option>
                  <option value="editor">Editor (Pages & Content Only)</option>
                  <option value="seo_manager">SEO Manager (SEO Engine & Audits)</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#FFC800] text-[#111827] font-semibold text-xs rounded-xl hover:bg-[#E6B400]"
                >
                  {saving ? 'Saving...' : 'Save Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


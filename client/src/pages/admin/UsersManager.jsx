import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Users, UserPlus, Shield, ShieldCheck, Trash2, Edit2,
  CheckCircle, XCircle, Search, X, Lock, KeyRound, User, Mail, Save, RefreshCw
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import toast from 'react-hot-toast'

export default function UsersManager() {
  const { admin: currentAdmin, updateAdmin, getAuthHeader } = useAdminAuth()
  const [adminUsers, setAdminUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [saving, setSaving] = useState(false)

  // Self Profile & Password State
  const [selfForm, setSelfForm] = useState({
    name: currentAdmin?.name || '',
    email: currentAdmin?.email || '',
    newPassword: '',
    confirmPassword: '',
    currentPassword: ''
  })
  const [savingSelf, setSavingSelf] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
    phone: ''
  })

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (currentAdmin) {
      setSelfForm(prev => ({
        ...prev,
        name: currentAdmin.name || '',
        email: currentAdmin.email || ''
      }))
    }
  }, [currentAdmin])

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

  // Handle Logged-In Admin's Profile and Password Update
  const handleUpdateSelf = async (e) => {
    e.preventDefault()

    if (!selfForm.name.trim() || !selfForm.email.trim()) {
      return toast.error('Name and Email cannot be empty')
    }

    if (selfForm.newPassword) {
      if (selfForm.newPassword.length < 6) {
        return toast.error('New password must be at least 6 characters long')
      }
      if (selfForm.newPassword !== selfForm.confirmPassword) {
        return toast.error('New password and confirm password do not match')
      }
    }

    try {
      setSavingSelf(true)
      const payload = {
        name: selfForm.name.trim(),
        email: selfForm.email.trim().toLowerCase(),
        currentPassword: selfForm.currentPassword || undefined,
        newPassword: selfForm.newPassword || undefined
      }

      const res = await axios.put(`${API_URL}/admin/auth/profile`, payload, {
        headers: getAuthHeader()
      })

      if (res.data?.success || res.status === 200) {
        if (res.data?.token) {
          localStorage.setItem('adminToken', res.data.token)
        }
        localStorage.setItem('admin_custom_email', selfForm.email.trim().toLowerCase())
        if (selfForm.newPassword) {
          localStorage.setItem('admin_custom_password', selfForm.newPassword.trim())
        }
        if (updateAdmin) {
          const updated = res.data?.admin || {
            ...currentAdmin,
            name: selfForm.name.trim(),
            email: selfForm.email.trim().toLowerCase()
          }
          updateAdmin(updated)
        }
        toast.success('Admin username and password updated successfully!')
        setSelfForm(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }))
        fetchUsers()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update credentials')
    } finally {
      setSavingSelf(false)
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
        const res = await axios.put(`${API_URL}/admin/users/${editingUser._id}`, formData, {
          headers: getAuthHeader()
        })
        if (editingUser._id === currentAdmin?._id && updateAdmin && res.data?.admin) {
          updateAdmin(res.data.admin)
        }
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
    <div className="space-y-8">
      {/* 1. Logged-in Admin Credentials Change Card */}
      <div className="bg-[#10151E] border border-[#E50914]/30 rounded-2xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.6)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <KeyRound className="w-5 h-5 text-[#E50914]" />
              <span>Change Username &amp; Password</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Update your administrative login credentials (Username, Email, and Password) directly below.
            </p>
          </div>
          <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#E50914]/10 text-[#E50914] border border-[#E50914]/30 self-start sm:self-auto">
            Logged In as: {currentAdmin?.email}
          </span>
        </div>

        <form onSubmit={handleUpdateSelf} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Admin Display Name (Username) *</span>
              </label>
              <input
                type="text"
                value={selfForm.name}
                onChange={(e) => setSelfForm({ ...selfForm, name: e.target.value })}
                required
                placeholder="e.g. Orbiphera Admin"
                className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Admin Login Email (Login Username) *</span>
              </label>
              <input
                type="email"
                value={selfForm.email}
                onChange={(e) => setSelfForm({ ...selfForm, email: e.target.value })}
                required
                placeholder="admin@orbiphera.com"
                className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914] transition-colors font-mono"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span>Current Password (optional)</span>
              </label>
              <input
                type="password"
                value={selfForm.currentPassword}
                onChange={(e) => setSelfForm({ ...selfForm, currentPassword: e.target.value })}
                placeholder="Current password"
                className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-[#E50914]" />
                <span>New Password</span>
              </label>
              <input
                type="password"
                value={selfForm.newPassword}
                onChange={(e) => setSelfForm({ ...selfForm, newPassword: e.target.value })}
                placeholder="Leave blank to keep current"
                className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Confirm New Password</span>
              </label>
              <input
                type="password"
                value={selfForm.confirmPassword}
                onChange={(e) => setSelfForm({ ...selfForm, confirmPassword: e.target.value })}
                placeholder="Re-type new password"
                className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-3">
            <button
              type="submit"
              disabled={savingSelf}
              className="flex items-center space-x-2 px-5 py-2.5 bg-[#E50914] hover:bg-[#CC0813] text-white font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(229,9,20,0.35)] transition-all cursor-pointer"
            >
              {savingSelf ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Updating Credentials...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Update My Credentials</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 2. Header for All Admin Users */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-300" />
            <span>All Admin Users &amp; Roles</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage administrative operators, access levels, roles, and security authentication.
          </p>
        </div>
        {currentAdmin?.role === 'super_admin' && (
          <button
            onClick={handleOpenCreate}
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#E50914] hover:bg-[#CC0813] text-white font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(229,9,20,0.3)] transition-all cursor-pointer"
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
                <th className="py-3.5 px-4">Operator Name &amp; Email</th>
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
                        <span className="text-[10px] px-1.5 py-0.2 bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/30 rounded">You</span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-500 font-mono">{user.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full font-semibold capitalize ${
                      user.role === 'super_admin'
                        ? 'bg-[#E50914]/15 text-[#FF2A36] border border-[#E50914]/30'
                        : user.role === 'admin'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
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
                          className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                          title="Edit user credentials"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {user._id !== currentAdmin?._id && (
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 cursor-pointer"
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
                <label className="block text-xs font-medium text-gray-300 mb-1">Full Name (Username) *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Email Address (Login Username) *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="operator@orbiphera.com"
                  className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914] font-mono"
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
                  className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Assigned Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0B0E14] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E50914]"
                >
                  <option value="admin">Admin (Standard Access)</option>
                  <option value="super_admin">SuperAdmin (Full Permissions)</option>
                  <option value="editor">Editor (Pages &amp; Content Only)</option>
                  <option value="seo_manager">SEO Manager (SEO Engine &amp; Audits)</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#E50914] text-white font-semibold text-xs rounded-xl hover:bg-[#CC0813] cursor-pointer"
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


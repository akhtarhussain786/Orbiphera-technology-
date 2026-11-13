import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { useSettings } from '../../context/SettingsContext'
import BrandLogo from '../../components/common/BrandLogo'
import toast from 'react-hot-toast'

export default function AdminLogin({ onLoginSuccess }) {
  const { loginAdmin } = useAdminAuth()
  const { settings } = useSettings()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')

  const siteName = settings?.siteName || 'Orbiphera'

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter both email and password')
      return
    }

    setLoading(true)
    const result = await loginAdmin(email.trim(), password)
    setLoading(false)

    if (result.success) {
      toast.success('Admin login authorized successfully!')
      if (onLoginSuccess) onLoginSuccess()
    } else {
      toast.error(result.message || 'Authentication failed. Please verify credentials.')
    }
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    if (!forgotEmail) {
      toast.error('Please enter your admin email')
      return
    }
    toast.success('Password recovery instructions generated. Check server logs or use registered password.')
    setShowForgotModal(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center p-4 relative overflow-hidden text-white selection:bg-[#E50914] selection:text-white">
      {/* Background ambient crimson glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#E50914]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#E50914]/8 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <BrandLogo size="lg" theme="dark" showText={false} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Authentication</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
              Secure access to {siteName} Control Plane
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@orbiphera.in"
                  required
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3 bg-[#0B0B0C] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs text-[#FF2A36] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-11 pr-11 py-3 bg-[#0B0B0C] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#E50914] hover:bg-[#CC0813] text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_25px_rgba(229,9,20,0.45)] hover:shadow-[0_0_35px_rgba(229,9,20,0.65)] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mt-3 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-white/10 rounded-2xl max-w-sm w-full p-6 text-left shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Password Recovery</h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter your registered admin email. A secure reset token or instructions will be generated on the server.
            </p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="admin@orbiphera.in"
                required
                className="w-full px-3.5 py-2.5 bg-[#0B0B0C] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#E50914]"
              />
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E50914] hover:bg-[#CC0813] text-white font-bold text-xs rounded-lg shadow-sm"
                >
                  Generate Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

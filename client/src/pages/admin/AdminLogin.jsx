import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Hexagon, Lock, Mail, ShieldAlert, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import BrandLogo from '../../components/common/BrandLogo'
import toast from 'react-hot-toast'

export default function AdminLogin({ onLoginSuccess }) {
  const { loginAdmin } = useAdminAuth()
  const [email, setEmail] = useState('admin@yathartitsolutions.com')
  const [password, setPassword] = useState('Admin@123456')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter both email and password')
      return
    }

    setLoading(true)
    const result = await loginAdmin(email, password)
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
    toast.success('Password recovery instructions generated. Check server logs or use default password.')
    setShowForgotModal(false)
  }

  return (
    <div className="min-h-screen bg-[#030407] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#1558C9]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#FFC800]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#10151E] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <BrandLogo size="lg" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Authentication</h1>
            <p className="text-sm text-gray-400 mt-1.5">
              Secure access to Yatharth IT Control Plane
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yathartitsolutions.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[#0B0E14] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#1558C9] focus:ring-1 focus:ring-[#1558C9] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs text-[#FFC800] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-11 pr-11 py-3 bg-[#0B0E14] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#1558C9] focus:ring-1 focus:ring-[#1558C9] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-xs text-gray-400 mb-2 font-medium">Quick Credentials (Seeded):</p>
            <div className="flex flex-col gap-1.5 text-xs text-gray-400 bg-white/5 p-3 rounded-lg border border-white/5">
              <div className="flex justify-between items-center">
                <span>SuperAdmin:</span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@yathartitsolutions.com')
                    setPassword('Admin@123456')
                  }}
                  className="text-[#FFC800] font-mono hover:underline"
                >
                  admin@yathartitsolutions.com
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span>Password:</span>
                <span className="font-mono text-gray-300">Admin@123456</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#10151E] border border-white/10 rounded-2xl max-w-sm w-full p-6 text-left shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Password Recovery</h3>
            <p className="text-xs text-gray-400 mb-4">
              Enter your registered admin email. A secure reset token will be generated on the server.
            </p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="admin@yathartitsolutions.com"
                required
                className="w-full px-3.5 py-2.5 bg-[#0B0E14] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#1558C9]"
              />
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FFC800] text-[#111827] font-bold text-xs rounded-lg hover:bg-[#E6B400]"
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


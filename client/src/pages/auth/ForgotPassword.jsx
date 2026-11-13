import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }

    try {
      setLoading(true)
      await axios.post(`${API_URL}/admin/auth/forgot-password`, { email })
      setSent(true)
      toast.success('Password recovery instructions generated!')
    } catch (e) {
      toast.error(e.response?.data?.message || 'Could not initiate reset')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-10 shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-[#111827] mb-2 tracking-tight">Reset Password</h1>
          <p className="text-[#475569] text-xs">
            Enter your registered account email to recover access.
          </p>
        </div>

        {sent ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <p className="text-sm text-[#475569]">
              Recovery instructions have been processed for <span className="text-[#111827] font-semibold">{email}</span>.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center space-x-1.5 text-xs text-[#111827] font-bold hover:underline pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-2">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl text-[#111827] placeholder-gray-400 text-sm focus:outline-none focus:border-[#111827] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" loading={loading} className="w-full">
              Send Password Reset Link
            </Button>

            <div className="text-center pt-2">
              <Link to="/login" className="text-xs text-[#475569] hover:text-[#111827] font-medium flex items-center justify-center space-x-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

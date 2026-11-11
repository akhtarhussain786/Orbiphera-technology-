import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSettings } from '../../context/SettingsContext'
import Button from '../../components/ui/Button'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { settings } = useSettings()
  const navigate = useNavigate()

  const siteName = settings?.siteName || 'Yatharth IT Solutions'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      toast.success('Login successful! Welcome back.')
      navigate('/')
    } else {
      toast.error(result.message)
    }
    
    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-10 shadow-xl">
        <div className="text-center mb-8 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">Welcome Back</h1>
          <p className="text-xs text-[#475569]">Sign in to your {siteName} account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl text-[#111827] text-xs focus:outline-none focus:border-[#111827] focus:bg-white transition-colors"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
                Password
              </label>
              <Link to="/auth/forgot-password" className="text-xs text-[#111827] font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl text-[#111827] text-xs focus:outline-none focus:border-[#111827] focus:bg-white transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            loading={loading} 
            className="w-full mt-2"
            icon={ArrowRight}
            iconPosition="right"
          >
            Sign In to Dashboard
          </Button>

          <div className="text-center text-xs text-[#475569] pt-2">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-[#111827] font-bold hover:underline">
              Create free account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

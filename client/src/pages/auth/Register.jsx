import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSettings } from '../../context/SettingsContext'
import Button from '../../components/ui/Button'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const Register = () => {
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const { settings } = useSettings()
  const navigate = useNavigate()

  const siteName = settings?.siteName || 'Yatharth IT Solutions'

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    
    setLoading(true)
    
    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    })
    
    if (result.success) {
      toast.success('Account created successfully! Welcome to the marketplace.')
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
          <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">Create Account</h1>
          <p className="text-xs text-[#475569]">Join {siteName} digital marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl text-[#111827] text-xs focus:outline-none focus:border-[#111827] focus:bg-white transition-colors"
                placeholder="John"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl text-[#111827] text-xs focus:outline-none focus:border-[#111827] focus:bg-white transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-1">
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

          <div className="space-y-1">
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl text-[#111827] text-xs focus:outline-none focus:border-[#111827] focus:bg-white transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-wider text-[#475569]">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
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
            Create Account & Get Started
          </Button>

          <div className="text-center text-xs text-[#475569] pt-2">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-[#111827] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

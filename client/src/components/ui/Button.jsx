import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

/**
 * Reusable SaaS Button Component
 * Specifications:
 * - Primary: bg lime (#E50914), text #0B0B0C, font-semibold, hover brightness-110 + glow
 * - Secondary: border white/15 (rgba(255,255,255,0.15)), text white, hover bg white/5
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props 
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0C] disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden cursor-pointer'
  
  const variants = {
    // Primary: bg lime, text #0B0B0C, font-semibold, hover brightness-110 + glow
    primary: 'bg-[#E50914] text-white font-semibold border border-[#E50914] hover:brightness-110 hover:shadow-[0_0_40px_rgba(229, 9, 20,0.18)]',
    // Secondary: border white/15, text white, hover bg white/5
    secondary: 'bg-transparent text-white border border-white/15 hover:bg-white/5 hover:border-white/25',
    // Accent (alias for primary lime)
    accent: 'bg-[#E50914] text-white font-semibold border border-[#E50914] hover:brightness-110 hover:shadow-[0_0_40px_rgba(229, 9, 20,0.18)]',
    // Outline: Transparent with lime border
    outline: 'bg-transparent text-[#E50914] border border-[#E50914]/30 hover:bg-[#E50914]/10 hover:border-[#E50914]',
    // Ghost: Muted text with subtle hover
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
    // Subtle: Dark surface
    subtle: 'bg-[#121214] text-slate-200 border border-white/10 hover:border-[#E50914]/30 hover:text-white'
  }
  
  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-7 py-3 text-base rounded-xl gap-2.5',
    xl: 'px-9 py-3.5 text-lg rounded-2xl gap-3'
  }
  
  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`
  
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
    </motion.button>
  )
}

export default Button

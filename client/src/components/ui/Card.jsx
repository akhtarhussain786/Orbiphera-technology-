import React from 'react'
import { motion } from 'framer-motion'

/**
 * Reusable SaaS Card Component
 * Specification:
 * - Background: #121214
 * - Border: 1px rgba(255, 255, 255, 0.08)
 * - Rounded: 2xl (1rem)
 * - Hover: border-lime/40 + translateY(-4px) + lime-glow shadow (0 0 40px rgba(229, 9, 20,0.18))
 */
const Card = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  ...props 
}) => {
  const baseClasses = 'bg-[#121214] border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-300'
  const hoverClasses = hover ? 'hover:border-[#E50914]/40 hover:shadow-[0_0_40px_rgba(229, 9, 20,0.18)]' : ''
  const glowClasses = glow ? 'border-[#E50914]/40 shadow-[0_0_40px_rgba(229, 9, 20,0.18)]' : ''
  
  const classes = `${baseClasses} ${hoverClasses} ${glowClasses} ${className}`
  
  const CardComponent = hover ? motion.div : 'div'
  const motionProps = hover ? {
    whileHover: { y: -4 },
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
  } : {}
  
  return (
    <CardComponent 
      className={classes}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  )
}

export default Card

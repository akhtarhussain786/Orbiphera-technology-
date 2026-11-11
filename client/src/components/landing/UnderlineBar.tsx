import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface UnderlineBarProps {
  className?: string
  heightClass?: string
  delay?: number
}

export const UnderlineBar: React.FC<UnderlineBarProps> = ({
  className = '',
  heightClass = 'h-3 sm:h-3.5',
  delay = 0.2
}) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.span
      initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`absolute -bottom-1 left-0 w-full ${heightClass} bg-[#FFE600] -z-10 rounded-sm origin-left ${className}`}
      aria-hidden="true"
    />
  )
}

export default UnderlineBar


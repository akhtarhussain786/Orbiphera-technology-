import React, { useEffect, useState } from 'react'

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable if pointer is fine (desktop mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      const isInteractive = target?.closest('a, button, input, select, textarea, [data-cursor-hover="true"]')
      setIsHovered(!!isInteractive)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      className="landing-cursor hidden lg:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        width: isHovered ? '42px' : '14px',
        height: isHovered ? '42px' : '14px',
        backgroundColor: isHovered ? 'rgba(255, 230, 0, 0.4)' : '#FFE600',
        border: isHovered ? '2px solid #0E0E10' : 'none',
        backdropFilter: isHovered ? 'blur(2px)' : 'none'
      }}
      aria-hidden="true"
    />
  )
}

export default CustomCursor


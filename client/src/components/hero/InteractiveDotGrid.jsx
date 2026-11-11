import React, { useEffect, useRef } from 'react'

/**
 * Lightweight, 60 FPS Interactive Dot-Grid Canvas
 * - Reacts to cursor proximity with smooth spring physics
 * - Lights up dots in Lime Green (#E50914) when cursor hovers
 * - Automatically disabled on mobile (< 768px) and when prefers-reduced-motion is active
 * - Idle-aware: pauses requestAnimationFrame when settled to save CPU/GPU cycles
 */
export default function InteractiveDotGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // 1. Accessibility & Mobile Check
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const isMobile = window.innerWidth < 768

    if (prefersReduced || isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = 0
    let height = 0
    let dots = []
    const gridGap = 34
    const interactRadius = 130
    const interactRadiusSq = interactRadius * interactRadius

    const mouse = {
      x: -9999,
      y: -9999,
      active: false
    }

    let isDirty = true
    let settleFrames = 0

    const initDots = () => {
      dots = []
      const cols = Math.ceil(width / gridGap) + 1
      const rows = Math.ceil(height / gridGap) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const bx = i * gridGap
          const by = j * gridGap
          dots.push({
            bx,
            by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
            radius: 1,
            targetRadius: 1,
            alpha: 0.12,
            targetAlpha: 0.12,
            isLime: false
          })
        }
      }
    }

    const handleResize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight }
      width = rect.width
      height = rect.height

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      initDots()
      isDirty = true
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    const parent = canvas.parentElement || window

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
      isDirty = true
      settleFrames = 0
    }

    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
      mouse.active = false
      isDirty = true
    }

    parent.addEventListener('mousemove', onMouseMove, { passive: true })
    parent.addEventListener('mouseleave', onMouseLeave, { passive: true })

    // Animation Loop
    const render = () => {
      if (!isDirty && settleFrames > 30) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      let moving = false

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]
        const dx = mouse.x - dot.bx
        const dy = mouse.y - dot.by
        const distSq = dx * dx + dy * dy

        let targetX = dot.bx
        let targetY = dot.by
        let targetRadius = 1
        let targetAlpha = 0.12
        let isLime = false

        if (distSq < interactRadiusSq && mouse.active) {
          const dist = Math.sqrt(distSq)
          const factor = (1 - dist / interactRadius)
          const angle = Math.atan2(dy, dx)
          // Gentle displacement away from cursor
          const force = factor * 14
          targetX = dot.bx - Math.cos(angle) * force
          targetY = dot.by - Math.sin(angle) * force

          targetRadius = 1 + factor * 1.8
          targetAlpha = 0.2 + factor * 0.75
          isLime = true
        }

        // Spring interpolation
        dot.x += (targetX - dot.x) * 0.2
        dot.y += (targetY - dot.y) * 0.2
        dot.radius += (targetRadius - dot.radius) * 0.2
        dot.alpha += (targetAlpha - dot.alpha) * 0.2
        dot.isLime = isLime

        if (Math.abs(dot.x - targetX) > 0.05 || Math.abs(dot.y - targetY) > 0.05) {
          moving = true
        }

        // Draw dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)

        if (dot.isLime) {
          ctx.fillStyle = `rgba(229, 9, 20, ${dot.alpha})`
          ctx.shadowColor = 'rgba(229, 9, 20, 0.65)'
          ctx.shadowBlur = dot.radius * 3.5
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`
          ctx.shadowBlur = 0
        }

        ctx.fill()
      }

      if (moving || mouse.active) {
        settleFrames = 0
      } else {
        settleFrames++
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      parent.removeEventListener('mousemove', onMouseMove)
      parent.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}


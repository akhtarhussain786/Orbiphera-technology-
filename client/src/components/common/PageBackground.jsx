import React from 'react'

/**
 * Reusable PageBackground Component
 * Provides layered ambient top lime glow, faint 48px grid lines with radial edge-mask,
 * and fixed SVG feTurbulence film-grain noise overlay across all pages.
 */
export default function PageBackground() {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
    >
      {/* 1. Layered Top Crimson Glow Radial Gradients */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(229,9,20,0.13),transparent_65%)] pointer-events-none" 
      />
      <div 
        className="absolute top-[35%] right-[-5%] w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.05),transparent_60%)] pointer-events-none" 
      />

      {/* 2. Faint 48px Grid Lines with Radial Mask Fade */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-80" />

      {/* 3. Fixed SVG feTurbulence Noise Overlay */}
      <div className="bg-noise" />
    </div>
  )
}


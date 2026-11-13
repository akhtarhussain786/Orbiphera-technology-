import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import AnnouncementBar from '../components/common/AnnouncementBar'
import SmoothScrollProvider from '../components/common/SmoothScrollProvider'
import CustomCursor from '../components/common/CustomCursor'
import ScrollProgressBar from '../components/common/ScrollProgressBar'
import Preloader from '../components/common/Preloader'
import PageBackground from '../components/common/PageBackground'
import MobileBottomNav from '../components/common/MobileBottomNav'

export default function MainLayout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <SmoothScrollProvider>
      {/* 0. Reusable Layered SaaS Page Background (Grid + Noise + Lime Glow) */}
      <PageBackground />

      {/* 1. Cinematic Brand Preloader (initial visit only) */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* 2. Desktop Custom Expanding Cursor */}
      <CustomCursor />

      {/* 3. Top Scroll Progress Indicator & Floating Scroll-To-Top Button */}
      <ScrollProgressBar />

      {/* Main Page Shell - Midnight Black #0B0B0C with Pure White text */}
      <div className="min-h-screen bg-[#0B0B0C] text-[#FFFFFF] flex flex-col justify-between selection:bg-[#E50914] selection:text-white">
        <div>
          {!isHomePage && <AnnouncementBar />}
          <Navbar />
          <main className="pb-16 md:pb-0">
            <Outlet context={{ preloaderDone }} />
          </main>
        </div>
        <Footer />
        {/* Mobile Bottom Dock App Bar with 5 Navigation Buttons */}
        <MobileBottomNav />
      </div>
    </SmoothScrollProvider>
  )
}

import React, { useEffect } from 'react'
import Lenis from 'lenis'
import SeoHead from '../components/common/SeoHead'
import CustomCursor from '../components/landing/CustomCursor'
import LandingNavbar from '../components/landing/Navbar'
import LandingHero from '../components/landing/Hero'
import LandingDisciplines from '../components/landing/Disciplines'
import LandingProcess from '../components/landing/Process'
import LandingProjects from '../components/landing/Projects'
import LandingTestimonials from '../components/landing/Testimonials'
import LandingRecognition from '../components/landing/Recognition'
import LandingTools from '../components/landing/Tools'
import LandingCtaRoast from '../components/landing/CtaRoast'
import LandingFooter from '../components/landing/Footer'

export const LandingPage: React.FC = () => {
  // Lenis smooth scroll initialized ONLY on this landing route
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let lenis: Lenis | null = null
    let rafId: number

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      })

      const raf = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    } catch (err) {
      console.warn('Lenis initialization notice:', err)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return (
    <div className="landing-root min-h-screen selection:bg-[#FFE600] selection:text-[#0E0E10]">
      <SeoHead
        title="We build software that scales | Orbiphera Technologies"
        description="A product team building custom websites, web and mobile apps, MVPs and AI features, from the first prototype through to production."
        keywords="Orbiphera Technologies, software development, react, flutter, nodejs, mvp development, web apps, enterprise software"
      />

      {/* Custom magnetic cursor only on this landing page */}
      <CustomCursor />

      {/* 1. Navbar */}
      <LandingNavbar />

      <main>
        {/* 2. Hero */}
        <LandingHero />

        {/* 3. Three Disciplines */}
        <LandingDisciplines />

        {/* 4. Four Phases Process */}
        <LandingProcess />

        {/* 5. Featured Projects (Dark) */}
        <LandingProjects />

        {/* 6. Testimonials */}
        <LandingTestimonials />

        {/* 7. Recognition */}
        <LandingRecognition />

        {/* 8. Tools Stack */}
        <LandingTools />

        {/* 9. CTA Website Roast */}
        <LandingCtaRoast />
      </main>

      {/* 10. Dark Footer */}
      <LandingFooter />
    </div>
  )
}

export default LandingPage


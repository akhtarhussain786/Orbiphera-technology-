import React from 'react'
import SeoHead from '../components/common/SeoHead'
import Hero from '../sections/Hero'
import TechStackSection from '../sections/TechStackSection'
import ServicesSection from '../sections/ServicesSection'
import ProductsSection from '../sections/ProductsSection'
import WhyChooseUs from '../sections/WhyChooseUs'
import PortfolioSection from '../sections/PortfolioSection'
import Testimonials from '../sections/Testimonials'
import ProjectInquiryCTA from '../sections/ProjectInquiryCTA'
import { FAQ_ITEMS } from '../sections/FAQ'
import { useSettings } from '../context/SettingsContext'

const Home = () => {
  const { settings } = useSettings()
  const siteName = settings?.siteName || 'Orbiphera Technologies'

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-[#FFFFFF] font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <SeoHead
        title={settings?.defaultMetaTitle || `${siteName} | Website, Software & App Development`}
        description={settings?.defaultMetaDescription || `${siteName} is a premier technical engineering firm building custom web applications, Flutter mobile apps, and enterprise ERP/EMS digital systems. Scalable, high-performance, and SEO-ready.`}
        keywords={`Orbiphera Technologies, website development company, custom software development, mobile app development, enterprise digital solutions, ${siteName}`}
        canonical="https://orbiphera.in/"
        faqs={FAQ_ITEMS.slice(0, 5)}
      />

      {/* 1. Master Hero Section: Interactive Headline, Canvas Grid & Direct CTAs */}
      <Hero />

      {/* 2. Tech Stack & Architecture: Infinite Running Marquee of Verified Technologies */}
      <TechStackSection />

      {/* 3. Core Engineering Services Grid */}
      <ServicesSection />

      {/* 4. Ready-to-Deploy Products & Enterprise Digital Solutions */}
      <ProductsSection />

      {/* 5. Featured Portfolio: Curated Deployments with Link to Full Portfolio */}
      <PortfolioSection limit={4} />

      {/* 6. Why Choose Us: 6 Core Engineering Pillars & Reliability Standards */}
      <WhyChooseUs />

      {/* 7. Verified Client Reviews & Real Industry Testimonials */}
      <Testimonials />

      {/* 8. Free Project Consultation & WhatsApp Inquiry Form */}
      <ProjectInquiryCTA />
    </div>
  )
}

export default Home

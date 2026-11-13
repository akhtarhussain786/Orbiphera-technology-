import React from 'react'
import SeoHead from '../components/common/SeoHead'
import Hero from '../sections/Hero'
import TechStackSection from '../sections/TechStackSection'
import ServicesSection from '../sections/ServicesSection'
import ProductsSection from '../sections/ProductsSection'
import WhyChooseUs from '../sections/WhyChooseUs'
import LocalTrustSection from '../sections/LocalTrustSection'
import CompanyAbout from '../sections/CompanyAbout'
import DevelopmentProcess from '../sections/DevelopmentProcess'
import PortfolioSection from '../sections/PortfolioSection'
import IndustriesSection from '../sections/IndustriesSection'
import TeamSection from '../sections/TeamSection'
import Testimonials from '../sections/Testimonials'
import FAQ, { FAQ_ITEMS } from '../sections/FAQ'
import ProjectCostEstimator from '../components/common/ProjectCostEstimator'
import ProjectInquiryCTA from '../sections/ProjectInquiryCTA'
import { useSettings } from '../context/SettingsContext'

const Home = () => {
  const { settings } = useSettings()
  const siteName = settings?.siteName || 'Orbiphera Technologies'

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-[#FFFFFF] font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <SeoHead
        title={settings?.defaultMetaTitle || 'Orbiphera Technologies | Website, Software & App Development'}
        description={settings?.defaultMetaDescription || 'Orbiphera Technologies is a premier software development, custom web applications, mobile apps, and enterprise digital solutions engineering company. Scalable, high-performance, and SEO-ready.'}
        keywords={`Orbiphera Technologies, Orbiphera Technology, website development company, custom software development, mobile app development, enterprise digital solutions, ${siteName}`}
        canonical="https://orbiphera.in/"
        faqs={FAQ_ITEMS}
      />

      {/* 1. Hero Section: Master Headline, Interactive Canvas Grid, Unified CTAs & Tech Badges */}
      <Hero />

      {/* 1.5. Tech Stack & Architecture: Infinite Running Marquee of Tech Logos & 6x2 Grid */}
      <TechStackSection />

      {/* 2. Our Services: 6 Core Digital & Software Engineering Services */}
      <ServicesSection />

      {/* 3. Featured Products & Digital Solutions: 5 Dashboard Cards */}
      <ProductsSection />

      {/* 4. Why Choose Us: 6 Core Company Strengths */}
      <WhyChooseUs />

      {/* 4.2. Local Authority: Why Businesses in Siwan Choose Us */}
      <LocalTrustSection />

      {/* 4.5. About Our Company: Mission, Line Reveal & Disciplines Matrix */}
      <CompanyAbout />

      {/* 5. Our Development Process: 5-Step Engineering Workflow */}
      <DevelopmentProcess />

      {/* 6. Portfolio & Completed Work: Category Filtered Showcase */}
      <PortfolioSection />

      {/* 7. Industries We Serve: 7 Enterprise Business Domains */}
      <IndustriesSection />

      {/* 8. Core Engineering Leadership & Architects */}
      <TeamSection />

      {/* 9. Verified Client Testimonials */}
      <Testimonials />

      {/* 10. Frequently Asked Questions */}
      <FAQ />

      {/* 10.5. Interactive Scope & Cost Estimator (Platform, Timeline, Modules & 1-Click WhatsApp Quote) */}
      <ProjectCostEstimator />

      {/* 11. Free Project Consultation & WhatsApp Inquiry Form */}
      <ProjectInquiryCTA />
    </div>
  )
}

export default Home

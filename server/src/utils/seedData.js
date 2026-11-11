import bcrypt from 'bcryptjs'
import AdminUser from '../models/AdminUser.model.js'
import WebsiteSetting from '../models/WebsiteSetting.model.js'
import NavigationMenu from '../models/NavigationMenu.model.js'
import ContentSection from '../models/ContentSection.model.js'
import Page from '../models/Page.model.js'
import Product from '../models/Product.model.js'
import Category from '../models/Category.model.js'
import SeoSetting from '../models/SeoSetting.model.js'

export async function seedInitialData() {
  try {
    console.log('🌱 Checking and seeding initial system data...')

    // 1. Ensure SuperAdmin exists
    const superAdminEmail = 'admin@yathartitsolutions.com'
    let existingSuperAdmin = await AdminUser.findOne({ email: superAdminEmail })
    const hashedPassword = await bcrypt.hash('Admin@123456', 10)
    if (!existingSuperAdmin) {
      await AdminUser.create({
        name: 'Super Admin',
        email: superAdminEmail,
        password: hashedPassword,
        role: 'super_admin',
        permissions: ['dashboard', 'pages', 'content', 'navigation', 'media', 'users', 'inquiries', 'seo', 'settings'],
        isActive: true
      })
      console.log(`✅ Seeded SuperAdmin: ${superAdminEmail}`)
    } else {
      // Ensure password hash is valid
      const valid = await bcrypt.compare('Admin@123456', existingSuperAdmin.password || '')
      if (!valid) {
        existingSuperAdmin.password = hashedPassword
        await existingSuperAdmin.save()
        console.log(`✅ Fixed SuperAdmin password hash for: ${superAdminEmail}`)
      }
    }

    // Also support admin@yatharth.com from legacy data
    const legacyEmail = 'admin@yatharth.com'
    let existingLegacy = await AdminUser.findOne({ email: legacyEmail })
    if (!existingLegacy) {
      await AdminUser.create({
        name: 'Yatharth Admin',
        email: legacyEmail,
        password: hashedPassword,
        role: 'super_admin',
        permissions: ['dashboard', 'pages', 'content', 'navigation', 'media', 'users', 'inquiries', 'seo', 'settings'],
        isActive: true
      })
      console.log(`✅ Seeded Admin: ${legacyEmail}`)
    } else {
      const validLegacy = await bcrypt.compare('Admin@123456', existingLegacy.password || '')
      if (!validLegacy) {
        existingLegacy.password = hashedPassword
        await existingLegacy.save()
        console.log(`✅ Fixed Admin password hash for: ${legacyEmail}`)
      }
    }

    // 2. Ensure Website Settings
    let existingSettings = await WebsiteSetting.findOne()
    if (!existingSettings) {
      existingSettings = await WebsiteSetting.create({
        siteName: 'Yatharth It Solutions',
        tagline: 'Digital Products. Limitless Possibilities.',
        contactEmail: 'contact@yathartitsolutions.com',
        contactPhone: '+91 98765 43210',
        address: 'Yathart IT Solutions, Digital Tech Hub, India',
        socialLinks: {
          twitter: 'https://twitter.com',
          linkedin: 'https://linkedin.com',
          github: 'https://github.com',
          instagram: 'https://instagram.com',
          facebook: 'https://facebook.com'
        },
        defaultMetaTitle: 'Yatharth It Solutions - Digital Products & Solutions Marketplace',
        defaultMetaDescription: 'Premium digital marketplace where businesses purchase ready-made website templates, business software, SaaS solutions, and custom digital engineering.',
        maintenanceMode: false
      })
      console.log('✅ Seeded Website Settings for Yatharth It Solutions')
    } else if (existingSettings.siteName === 'NEXVORA') {
      existingSettings.siteName = 'Yatharth It Solutions'
      existingSettings.contactEmail = 'contact@yathartitsolutions.com'
      existingSettings.defaultMetaTitle = 'Yatharth It Solutions - Digital Products & Solutions Marketplace'
      await existingSettings.save()
      console.log('✅ Updated Website Settings to Yatharth It Solutions in MongoDB')
    }

    // 3. Ensure Navigation Menus
    const headerMenu = await NavigationMenu.findOne({ location: 'header' })
    if (!headerMenu) {
      await NavigationMenu.create({
        location: 'header',
        items: [
          { id: '1', label: 'Discover', url: '/marketplace', sortOrder: 1 },
          { id: '2', label: 'Templates', url: '/templates', sortOrder: 2 },
          { id: '3', label: 'Software', url: '/software', sortOrder: 3 },
          { id: '4', label: 'Custom Solutions', url: '/custom-development', sortOrder: 4 },
          { id: '5', label: 'Pricing', url: '/#pricing', sortOrder: 5 },
          { id: '6', label: 'Contact', url: '/contact', sortOrder: 6 }
        ]
      })
      console.log('✅ Seeded Header Navigation Menu')
    }

    const footerMenu = await NavigationMenu.findOne({ location: 'footer' })
    if (!footerMenu) {
      await NavigationMenu.create({
        location: 'footer',
        items: [
          // Products
          { id: 'f1', label: 'Website Templates', url: '/templates', category: 'products', sortOrder: 1 },
          { id: 'f2', label: 'Software Solutions', url: '/software', category: 'products', sortOrder: 2 },
          { id: 'f3', label: 'Marketplace', url: '/marketplace', category: 'products', sortOrder: 3 },
          { id: 'f4', label: 'Categories', url: '/categories', category: 'products', sortOrder: 4 },
          // Company
          { id: 'f5', label: 'About Us', url: '/about', category: 'company', sortOrder: 5 },
          { id: 'f6', label: 'Custom Development', url: '/custom-development', category: 'company', sortOrder: 6 },
          { id: 'f7', label: 'Contact', url: '/contact', category: 'company', sortOrder: 7 },
          { id: 'f8', label: 'Request Quote', url: '/request-quote', category: 'company', sortOrder: 8 },
          // Support
          { id: 'f9', label: 'FAQ', url: '/#faq', category: 'support', sortOrder: 9 },
          { id: 'f10', label: 'Support Center', url: '/contact', category: 'support', sortOrder: 10 },
          { id: 'f11', label: 'Request Demo', url: '/request-demo', category: 'support', sortOrder: 11 },
          // Legal
          { id: 'f12', label: 'Terms of Service', url: '/terms', category: 'legal', sortOrder: 12 },
          { id: 'f13', label: 'Privacy Policy', url: '/privacy', category: 'legal', sortOrder: 13 }
        ]
      })
      console.log('✅ Seeded Footer Navigation Menu')
    }

    // 4. Ensure Default SEO Settings
    const existingSeoSetting = await SeoSetting.findOne()
    if (!existingSeoSetting) {
      await SeoSetting.create({
        automationMode: 'approval', // Default strict approval mode
        scanSchedule: '0 2 * * *',
        aiProvider: 'heuristic',
        aiModel: 'gpt-4o-mini',
        autoApplySafeMeta: false,
        isAutomationPaused: false,
        totalTokensUsed: 0,
        estimatedCostUsd: 0
      })
      console.log('✅ Seeded Default SEO Settings')
    }

    // 5. Ensure Initial Pages
    const pagesCount = await Page.countDocuments()
    if (pagesCount === 0) {
      const initialPages = [
        {
          title: 'Home',
          slug: 'home',
          template: 'landing',
          status: 'published',
          metaTitle: 'NEXVORA - Digital Products. Limitless Possibilities.',
          metaDescription: 'Premium digital marketplace where businesses purchase ready-made website templates, SaaS solutions, and custom digital development.',
          primaryKeyword: 'digital marketplace',
          secondaryKeywords: ['website templates', 'business software', 'saas solutions', 'custom web development'],
          h1Heading: 'Build Something Extraordinary With NEXVORA',
          schemaType: 'WebPage',
          content: '<h1>Build Something Extraordinary</h1><p>Welcome to NEXVORA, the ultimate platform for high-performance website templates and business software suites.</p>'
        },
        {
          title: 'Marketplace',
          slug: 'marketplace',
          template: 'default',
          status: 'published',
          metaTitle: 'Explore Digital Products Marketplace | NEXVORA',
          metaDescription: 'Browse hundreds of vetted website templates and production-ready business software applications for your enterprise.',
          primaryKeyword: 'buy website templates',
          secondaryKeywords: ['digital software store', 'react templates', 'business management systems'],
          h1Heading: 'Explore Digital Marketplace',
          schemaType: 'WebPage',
          content: '<h1>Digital Products Marketplace</h1><p>Browse our catalog of high-grade website templates and business software.</p>'
        },
        {
          title: 'Website Templates',
          slug: 'templates',
          template: 'default',
          status: 'published',
          metaTitle: 'Premium Responsive Website Templates | NEXVORA',
          metaDescription: 'High-converting responsive website templates built with modern React, Tailwind CSS, and Framer Motion. Instant download and deploy.',
          primaryKeyword: 'responsive website templates',
          secondaryKeywords: ['react website templates', 'business web themes', 'tailwind templates'],
          h1Heading: 'Standout Templates. Ready to Launch.',
          schemaType: 'WebPage',
          content: '<h1>Website Templates</h1><p>Professionally designed website templates built for modern businesses across all industries.</p>'
        },
        {
          title: 'Software Solutions',
          slug: 'software',
          template: 'default',
          status: 'published',
          metaTitle: 'Business Software Solutions & CRM Systems | NEXVORA',
          metaDescription: 'Enterprise-grade CRM, Hospital Management, Institute Portals, and Inventory Management software with clean architecture.',
          primaryKeyword: 'business management software',
          secondaryKeywords: ['crm software', 'hospital management system', 'institute erp'],
          h1Heading: 'Powerful Business Software Solutions',
          schemaType: 'WebPage',
          content: '<h1>Software Solutions</h1><p>Ready-to-deploy business software designed to streamline operations and accelerate company growth.</p>'
        },
        {
          title: 'Custom Development',
          slug: 'custom-development',
          template: 'landing',
          status: 'published',
          metaTitle: 'Custom Software & Web Application Development | NEXVORA',
          metaDescription: 'Need bespoke software? Our senior engineering team builds custom web applications, SaaS platforms, and mobile apps tailored to your workflow.',
          primaryKeyword: 'custom web development',
          secondaryKeywords: ['saas development company', 'custom software engineering', 'enterprise web apps'],
          h1Heading: 'Bespoke Digital Engineering & Custom Development',
          schemaType: 'WebPage',
          content: '<h1>Custom Development Services</h1><p>Transform your concept into a robust, scalable digital product with our dedicated engineering squad.</p>'
        },
        {
          title: 'Contact Us',
          slug: 'contact',
          template: 'contact',
          status: 'published',
          metaTitle: 'Contact NEXVORA Support & Sales Team',
          metaDescription: 'Get in touch with the NEXVORA engineering and product consultation team for project quotes, technical support, and partnership inquiries.',
          primaryKeyword: 'contact nexvora',
          secondaryKeywords: ['customer support', 'hire developers', 'software consultation'],
          h1Heading: 'Let\'s Discuss Your Next Digital Project',
          schemaType: 'ContactPage',
          content: '<h1>Contact Us</h1><p>Our team is available 24/7 to discuss project requirements, license queries, and custom engineering.</p>'
        },
        {
          title: 'Request a Quote',
          slug: 'request-quote',
          template: 'default',
          status: 'published',
          metaTitle: 'Request a Project Quote | Yathart IT Solutions',
          metaDescription: 'Submit your software or website requirements to get an accurate estimate and proposal from our solution architects within 24 hours.',
          primaryKeyword: 'software quote',
          secondaryKeywords: ['website estimation', 'custom app pricing', 'project proposal'],
          h1Heading: 'Request a Free Project Proposal',
          schemaType: 'WebPage',
          content: '<h1>Request a Quote</h1><p>Fill out the project scope to receive an architectural review and quote.</p>'
        },
        {
          title: 'About Us',
          slug: 'about',
          template: 'default',
          status: 'published',
          metaTitle: 'About NEXVORA - Digital Products & Solutions',
          metaDescription: 'Learn about NEXVORA and Yathart IT Solutions: mission, leadership, core engineering values, and our commitment to developer-first digital products.',
          primaryKeyword: 'about nexvora',
          secondaryKeywords: ['yathart it solutions', 'digital marketplace company'],
          h1Heading: 'Empowering Businesses With Modern Technology',
          schemaType: 'AboutPage',
          content: '<h1>About NEXVORA</h1><p>We build production-ready digital foundations so developers and business leaders can ship faster.</p>'
        },
        {
          title: 'Privacy Policy',
          slug: 'privacy',
          template: 'legal',
          status: 'published',
          metaTitle: 'Privacy Policy | NEXVORA',
          metaDescription: 'NEXVORA privacy policy outlining how customer data, transactions, and user confidentiality are securely handled.',
          primaryKeyword: 'privacy policy',
          h1Heading: 'Privacy Policy',
          schemaType: 'WebPage',
          content: '<h1>Privacy Policy</h1><p>We respect your privacy and are committed to protecting personal identifiable information.</p>'
        },
        {
          title: 'Terms of Service',
          slug: 'terms',
          template: 'legal',
          status: 'published',
          metaTitle: 'Terms of Service & Licensing | NEXVORA',
          metaDescription: 'Terms of service, licensing clauses, and usage rights for templates and software purchased on the NEXVORA marketplace.',
          primaryKeyword: 'terms of service',
          h1Heading: 'Terms of Service',
          schemaType: 'WebPage',
          content: '<h1>Terms of Service</h1><p>Please review the terms and licensing conditions governing your use of NEXVORA products.</p>'
        }
      ]

      await Page.insertMany(initialPages)
      console.log(`✅ Seeded ${initialPages.length} initial CMS Pages`)
    }

    // 6. Ensure Content Sections
    const sectionCount = await ContentSection.countDocuments()
    if (sectionCount === 0) {
      const initialSections = [
        {
          sectionKey: 'hero',
          title: 'Build Something Extraordinary',
          subtitle: 'Premium website templates, powerful business software, and custom digital solutions — everything you need to turn your next big idea into reality.',
          data: {
            badge: 'Premium Digital Marketplace',
            primaryCtaText: 'Explore Marketplace',
            primaryCtaLink: '/marketplace',
            secondaryCtaText: 'Build My Solution',
            secondaryCtaLink: '/custom-development',
            features: [
              'Ready-to-launch templates',
              'Business-focused software',
              'Flexible support plans'
            ]
          }
        },
        {
          sectionKey: 'why_nexvora',
          title: 'Why Choose NEXVORA',
          subtitle: 'Engineered for speed, built for scale, and backed by expert engineering support.',
          data: {
            cards: [
              {
                title: 'Production Ready Code',
                description: 'Clean, modern, and well-documented codebase built with React, Node.js, and best architectural practices.'
              },
              {
                title: 'Fully Customizable',
                description: 'Easily adapt any template or software to your exact branding and functional requirements.'
              },
              {
                title: 'Lifetime Free Updates',
                description: 'Get continuous improvements, security patches, and framework compatibility upgrades.'
              },
              {
                title: 'Dedicated Engineering Support',
                description: 'Direct access to senior developers for implementation guidance, hosting, and customization.'
              }
            ]
          }
        },
        {
          sectionKey: 'faq',
          title: 'Frequently Asked Questions',
          subtitle: 'Find answers to common questions about NEXVORA digital products and licenses.',
          data: {
            faqs: [
              {
                question: 'What does a template purchase include?',
                answer: 'A template purchase includes full source code, asset files, documentation, and installation guides with your selected license.'
              },
              {
                question: 'Can templates be customized for my company?',
                answer: 'Yes! The source code is 100% editable. You can customize branding, routes, and features yourself or contract our engineering team.'
              },
              {
                question: 'Do you offer custom web and CRM software development?',
                answer: 'Yes, we provide end-to-end bespoke digital engineering for healthcare, education, resorts, real estate, and enterprise CRM.'
              },
              {
                question: 'What is the refund and support policy?',
                answer: 'We provide technical support for all licensed products and evaluate refund requests on verified technical issues.'
              }
            ]
          }
        },
        {
          sectionKey: 'maintenance_plans',
          title: 'Annual Maintenance & Support Plans',
          subtitle: 'Keep your digital infrastructure secure, updated, and lightning fast.',
          data: {
            plans: [
              {
                name: 'Basic Care',
                price: '₹14,999/yr',
                features: ['Security Patches', 'Monthly Backups', 'Email Support', '99.9% Uptime Monitoring']
              },
              {
                name: 'Business Pro',
                price: '₹34,999/yr',
                features: ['All Basic Care items', 'Weekly Backups', 'Priority WhatsApp Support', 'Performance Optimization', 'Minor Feature Tweaks']
              },
              {
                name: 'Enterprise Dedicated',
                price: '₹79,999/yr',
                features: ['24/7 Dedicated Architect', 'Daily Automated Backups', 'Cloud Server Management', 'Custom Feature Development', 'SLA Guarantee']
              }
            ]
          }
        }
      ]

      await ContentSection.insertMany(initialSections)
      console.log(`✅ Seeded ${initialSections.length} Content Sections`)
    }

    // 7. Ensure Categories and Products if empty
    const productCount = await Product.countDocuments()
    if (productCount === 0) {
      // Create categories
      const catEducation = await Category.findOneAndUpdate(
        { slug: 'education-e-learning' },
        { name: 'Education & E-learning', slug: 'education-e-learning', description: 'Websites and software for schools, colleges, and training academies' },
        { upsert: true, new: true }
      )
      const catHealthcare = await Category.findOneAndUpdate(
        { slug: 'hospital-healthcare' },
        { name: 'Hospital & Healthcare', slug: 'hospital-healthcare', description: 'Clinical booking and hospital management platforms' },
        { upsert: true, new: true }
      )
      const catHospitality = await Category.findOneAndUpdate(
        { slug: 'hotels-resorts' },
        { name: 'Hotels & Resorts', slug: 'hotels-resorts', description: 'Room booking and luxury hospitality digital experiences' },
        { upsert: true, new: true }
      )
      const catEcommerce = await Category.findOneAndUpdate(
        { slug: 'ecommerce-retail' },
        { name: 'E-commerce & Retail', slug: 'ecommerce-retail', description: 'High-converting storefronts and retail inventory suites' },
        { upsert: true, new: true }
      )
      const catCrm = await Category.findOneAndUpdate(
        { slug: 'crm-enterprise' },
        { name: 'CRM & Enterprise', slug: 'crm-enterprise', description: 'Customer relationship and lead management systems' },
        { upsert: true, new: true }
      )

      const initialProducts = [
        {
          name: 'EduPrime',
          slug: 'eduprime-education-institute',
          type: 'template',
          category: catEducation._id,
          price: 4999,
          extendedPrice: 14999,
          description: 'Modern education institute website with course management, student portal, and event calendar.',
          shortDescription: 'Modern education institute website with student portal.',
          thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
          status: 'published',
          isFeatured: true,
          technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
          features: ['Course Catalog', 'Student Admission Form', 'Event Calendar', 'Faculty Directory', 'SEO Optimized'],
          metaTitle: 'EduPrime - Education & Institute Website Template | NEXVORA',
          metaDescription: 'Modern responsive education website template with course booking and admission inquiry management.'
        },
        {
          name: 'Medora',
          slug: 'medora-hospital-clinic',
          type: 'template',
          category: catHealthcare._id,
          price: 6999,
          extendedPrice: 19999,
          description: 'Professional hospital and clinic website with appointment booking, doctor profiles, and emergency services.',
          shortDescription: 'Professional hospital and clinic website with appointment booking.',
          thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop',
          status: 'published',
          isFeatured: true,
          technologies: ['React', 'Node.js', 'Tailwind CSS'],
          features: ['Doctor Profiles', 'Appointment Scheduler', 'Department Directory', 'Emergency Contact Bar'],
          metaTitle: 'Medora - Hospital & Clinic Website Template | NEXVORA',
          metaDescription: 'Healthcare clinic and hospital website template with instant doctor appointment booking.'
        },
        {
          name: 'StayLuxe',
          slug: 'stayluxe-resort-hotel',
          type: 'template',
          category: catHospitality._id,
          price: 5999,
          extendedPrice: 17999,
          description: 'Luxury hotel and resort website with room booking, gallery, amenities, and guest reviews.',
          shortDescription: 'Luxury hotel and resort website with room booking.',
          thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
          status: 'published',
          isFeatured: true,
          technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
          features: ['Room Showcase', 'Direct Booking Form', 'Virtual Photo Tour', 'Dining & Spa Showcase'],
          metaTitle: 'StayLuxe - Luxury Resort & Hotel Website Template | NEXVORA',
          metaDescription: 'High-end hospitality website template for luxury resorts, boutique hotels, and villas.'
        },
        {
          name: 'ShopSphere',
          slug: 'shopsphere-ecommerce',
          type: 'template',
          category: catEcommerce._id,
          price: 7999,
          extendedPrice: 24999,
          description: 'Complete e-commerce storefront with product catalog, cart, checkout flow, and review system.',
          shortDescription: 'Complete e-commerce storefront with cart & checkout flow.',
          thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400&fit=crop',
          status: 'published',
          isFeatured: true,
          technologies: ['React', 'Tailwind CSS', 'Redux'],
          features: ['Product Filtering', 'Shopping Cart', 'Instant Checkout', 'Customer Reviews', 'Mobile First'],
          metaTitle: 'ShopSphere - Modern E-Commerce Storefront Template | NEXVORA',
          metaDescription: 'Fast, responsive e-commerce storefront with cart, checkout, and inventory catalog.'
        },
        {
          name: 'OmniCRM Enterprise',
          slug: 'omnicrm-enterprise-suite',
          type: 'software',
          category: catCrm._id,
          price: 19999,
          extendedPrice: 49999,
          description: 'All-in-one Customer Relationship Management system with lead pipeline, quotation generator, and automated follow-ups.',
          shortDescription: 'All-in-one CRM system with lead pipeline & quotation generator.',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
          status: 'published',
          isFeatured: true,
          technologies: ['Node.js', 'Express', 'React', 'MongoDB'],
          features: ['Lead Scoring Pipeline', 'Client Activity Timeline', 'PDF Invoicing', 'Role-based Permissions', 'Analytics Dashboard'],
          metaTitle: 'OmniCRM - Enterprise Lead & Sales Management Software | NEXVORA',
          metaDescription: 'Powerful business CRM software to track deals, automate customer communications, and increase revenue.'
        },
        {
          name: 'MedFlow Clinic HMS',
          slug: 'medflow-clinic-hms',
          type: 'software',
          category: catHealthcare._id,
          price: 24999,
          extendedPrice: 59999,
          description: 'Hospital & Clinic Management Software with patient records, billing, prescription management, and appointment queues.',
          shortDescription: 'Hospital & Clinic Management Software with billing and OPD queues.',
          thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop',
          status: 'published',
          isFeatured: true,
          technologies: ['Node.js', 'React', 'MongoDB', 'Chart.js'],
          features: ['OPD/IPD Management', 'Electronic Medical Records', 'Pharmacy Inventory', 'Doctor Fee Billing'],
          metaTitle: 'MedFlow - Hospital & Clinic Management ERP Software | NEXVORA',
          metaDescription: 'Complete clinical software for patient registration, doctor schedules, and digital health records.'
        }
      ]

      await Product.insertMany(initialProducts)
      console.log(`✅ Seeded ${initialProducts.length} initial Products`)
    }

    console.log('🎉 Seeding check complete!')
  } catch (error) {
    console.error('❌ Error during initial data seed:', error)
  }
}

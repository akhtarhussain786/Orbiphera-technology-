import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const DATA_DIR = path.resolve('server/data')
const STORE_PATH = path.join(DATA_DIR, 'persistent_store.json')

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

const DEFAULT_PASSWORD_HASH = bcrypt.hashSync('Admin@123456', 10)

const INITIAL_DATA = {
  websiteSettings: {
    siteName: 'Yatharth IT Solutions',
    tagline: 'Engineering Digital Solutions. Building the Future.',
    preloaderTitle: '',
    preloaderSubtitle: '',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
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
    defaultMetaTitle: 'Yatharth IT Solutions - Software Development & IT Solutions Company',
    defaultMetaDescription: 'We design and develop powerful software, mobile applications, websites, and scalable digital platforms that help businesses grow faster.',
    defaultOgImage: '',
    googleAnalyticsId: '',
    googleSearchConsoleKey: '',
    maintenanceMode: false,
    customHeaderScripts: '',
    customFooterScripts: ''
  },
  adminUsers: [
    {
      _id: 'admin_1',
      name: 'Super Admin',
      email: 'admin@yathartitsolutions.com',
      password: DEFAULT_PASSWORD_HASH,
      role: 'super_admin',
      permissions: ['dashboard', 'pages', 'content', 'navigation', 'media', 'users', 'inquiries', 'seo', 'settings'],
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'admin_2',
      name: 'Yatharth Admin',
      email: 'admin@yatharth.com',
      password: DEFAULT_PASSWORD_HASH,
      role: 'super_admin',
      permissions: ['dashboard', 'pages', 'content', 'navigation', 'media', 'users', 'inquiries', 'seo', 'settings'],
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ],
  navigation: {
    header: [
      { id: '1', label: 'Discover', url: '/marketplace', sortOrder: 1 },
      { id: '2', label: 'Templates', url: '/templates', sortOrder: 2 },
      { id: '3', label: 'Software', url: '/software', sortOrder: 3 },
      { id: '4', label: 'Custom Solutions', url: '/custom-development', sortOrder: 4 },
      { id: '5', label: 'Pricing', url: '/#pricing', sortOrder: 5 },
      { id: '6', label: 'Contact', url: '/contact', sortOrder: 6 }
    ],
    footer: [
      { id: 'f1', label: 'Website Templates', url: '/templates', category: 'products', sortOrder: 1 },
      { id: 'f2', label: 'Software Solutions', url: '/software', category: 'products', sortOrder: 2 },
      { id: 'f3', label: 'Marketplace', url: '/marketplace', category: 'products', sortOrder: 3 },
      { id: 'f4', label: 'Categories', url: '/categories', category: 'products', sortOrder: 4 },
      { id: 'f5', label: 'About Us', url: '/about', category: 'company', sortOrder: 5 },
      { id: 'f6', label: 'Custom Development', url: '/custom-development', category: 'company', sortOrder: 6 },
      { id: 'f7', label: 'Contact', url: '/contact', category: 'company', sortOrder: 7 },
      { id: 'f8', label: 'Request Quote', url: '/request-quote', category: 'company', sortOrder: 8 },
      { id: 'f9', label: 'FAQ', url: '/#faq', category: 'support', sortOrder: 9 },
      { id: 'f10', label: 'Support Center', url: '/contact', category: 'support', sortOrder: 10 },
      { id: 'f11', label: 'Request Demo', url: '/request-demo', category: 'support', sortOrder: 11 },
      { id: 'f12', label: 'Terms of Service', url: '/terms', category: 'legal', sortOrder: 12 },
      { id: 'f13', label: 'Privacy Policy', url: '/privacy', category: 'legal', sortOrder: 13 }
    ]
  },
  contentSections: [
    {
      _id: 'sec_1',
      sectionKey: 'hero',
      title: 'Build Something Extraordinary With Yatharth IT Solutions',
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
      },
      isActive: true,
      sortOrder: 1
    },
    {
      _id: 'sec_2',
      sectionKey: 'why_nexvora',
      title: 'Why Choose Yatharth IT Solutions',
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
      },
      isActive: true,
      sortOrder: 2
    },
    {
      _id: 'sec_3',
      sectionKey: 'faq',
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our digital products and licenses.',
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
      },
      isActive: true,
      sortOrder: 3
    }
  ],
  pages: [
    {
      _id: 'page_1',
      title: 'Home',
      slug: 'home',
      template: 'landing',
      status: 'published',
      metaTitle: 'Yatharth It Solutions - Digital Products. Limitless Possibilities.',
      metaDescription: 'Premium digital marketplace where businesses purchase ready-made website templates, SaaS solutions, and custom digital development.',
      primaryKeyword: 'digital marketplace',
      secondaryKeywords: ['website templates', 'business software', 'saas solutions'],
      h1Heading: 'Build Something Extraordinary With Yatharth IT Solutions',
      schemaType: 'WebPage',
      content: '<h1>Build Something Extraordinary</h1><p>Welcome to Yatharth IT Solutions marketplace.</p>'
    },
    {
      _id: 'page_2',
      title: 'Marketplace',
      slug: 'marketplace',
      template: 'default',
      status: 'published',
      metaTitle: 'Explore Digital Products Marketplace | Yatharth It Solutions',
      metaDescription: 'Browse hundreds of vetted website templates and production-ready business software applications.',
      primaryKeyword: 'buy website templates',
      secondaryKeywords: ['digital software store', 'react templates'],
      h1Heading: 'Explore Digital Marketplace',
      schemaType: 'WebPage',
      content: '<h1>Digital Products Marketplace</h1>'
    }
  ],
  products: [
    {
      _id: 'prod_1',
      name: 'EduPrime',
      slug: 'eduprime-education-institute',
      type: 'template',
      category: 'Education & E-learning',
      price: 4999,
      extendedPrice: 14999,
      description: 'Modern education institute website with course management, student portal, and event calendar.',
      shortDescription: 'Modern education institute website with student portal.',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      status: 'published',
      isFeatured: true,
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      features: ['Course Catalog', 'Student Admission Form', 'Event Calendar', 'Faculty Directory', 'SEO Optimized'],
      metaTitle: 'EduPrime - Education & Institute Website Template',
      metaDescription: 'Modern responsive education website template with course booking and admission inquiry management.'
    },
    {
      _id: 'prod_2',
      name: 'Medora',
      slug: 'medora-hospital-clinic',
      type: 'template',
      category: 'Hospital & Healthcare',
      price: 6999,
      extendedPrice: 19999,
      description: 'Professional hospital and clinic website with appointment booking, doctor profiles, and emergency services.',
      shortDescription: 'Professional hospital and clinic website with appointment booking.',
      thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop',
      status: 'published',
      isFeatured: true,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
      features: ['Doctor Profiles', 'Appointment Scheduler', 'Department Directory', 'Emergency Contact Bar'],
      metaTitle: 'Medora - Hospital & Clinic Website Template',
      metaDescription: 'Healthcare clinic and hospital website template with instant doctor appointment booking.'
    },
    {
      _id: 'prod_3',
      name: 'StayLuxe',
      slug: 'stayluxe-resort-hotel',
      type: 'template',
      category: 'Hotels & Resorts',
      price: 5999,
      extendedPrice: 17999,
      description: 'Luxury hotel and resort website with room booking, gallery, amenities, and guest reviews.',
      shortDescription: 'Luxury hotel and resort website with room booking.',
      thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
      status: 'published',
      isFeatured: true,
      technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
      features: ['Room Showcase', 'Direct Booking Form', 'Virtual Photo Tour', 'Dining & Spa Showcase'],
      metaTitle: 'StayLuxe - Luxury Resort & Hotel Website Template',
      metaDescription: 'High-end hospitality website template for luxury resorts, boutique hotels, and villas.'
    },
    {
      _id: 'prod_4',
      name: 'ShopSphere',
      slug: 'shopsphere-ecommerce',
      type: 'template',
      category: 'E-commerce & Retail',
      price: 7999,
      extendedPrice: 24999,
      description: 'Complete e-commerce storefront with product catalog, cart, checkout flow, and review system.',
      shortDescription: 'Complete e-commerce storefront with cart & checkout flow.',
      thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400&fit=crop',
      status: 'published',
      isFeatured: true,
      technologies: ['React', 'Tailwind CSS', 'Redux'],
      features: ['Product Filtering', 'Shopping Cart', 'Instant Checkout', 'Customer Reviews', 'Mobile First'],
      metaTitle: 'ShopSphere - Modern E-Commerce Storefront Template',
      metaDescription: 'Fast, responsive e-commerce storefront with cart, checkout, and inventory catalog.'
    },
    {
      _id: 'prod_5',
      name: 'OmniCRM Enterprise',
      slug: 'omnicrm-enterprise-suite',
      type: 'software',
      category: 'CRM & Enterprise',
      price: 19999,
      extendedPrice: 49999,
      description: 'All-in-one Customer Relationship Management system with lead pipeline, quotation generator, and automated follow-ups.',
      shortDescription: 'All-in-one CRM system with lead pipeline & quotation generator.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      status: 'published',
      isFeatured: true,
      technologies: ['Node.js', 'Express', 'React', 'MongoDB'],
      features: ['Lead Scoring Pipeline', 'Client Activity Timeline', 'PDF Invoicing', 'Role-based Permissions', 'Analytics Dashboard'],
      metaTitle: 'OmniCRM - Enterprise Lead & Sales Management Software',
      metaDescription: 'Powerful business CRM software to track deals, automate customer communications, and increase revenue.'
    },
    {
      _id: 'prod_6',
      name: 'MedFlow Clinic HMS',
      slug: 'medflow-clinic-hms',
      type: 'software',
      category: 'Hospital & Healthcare',
      price: 24999,
      extendedPrice: 59999,
      description: 'Hospital & Clinic Management Software with patient records, billing, prescription management, and appointment queues.',
      shortDescription: 'Hospital & Clinic Management Software with billing and OPD queues.',
      thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop',
      status: 'published',
      isFeatured: true,
      technologies: ['Node.js', 'React', 'MongoDB', 'Chart.js'],
      features: ['OPD/IPD Management', 'Electronic Medical Records', 'Pharmacy Inventory', 'Doctor Fee Billing'],
      metaTitle: 'MedFlow - Hospital & Clinic Management ERP Software',
      metaDescription: 'Complete clinical software for patient registration, doctor schedules, and digital health records.'
    }
  ],
  categories: [
    { _id: 'cat_1', name: 'Education & E-learning', slug: 'education-elearning', description: 'Websites and software for schools and colleges' },
    { _id: 'cat_2', name: 'Hospital & Healthcare', slug: 'hospital-healthcare', description: 'Clinical booking and hospital management platforms' },
    { _id: 'cat_3', name: 'Hotels & Resorts', slug: 'hotels-resorts', description: 'Room booking and luxury hospitality digital experiences' },
    { _id: 'cat_4', name: 'E-commerce & Retail', slug: 'ecommerce-retail', description: 'High-converting storefronts and retail inventory suites' },
    { _id: 'cat_5', name: 'Enterprise Software & ERP', slug: 'software', description: 'CRM, ERP and business OS' }
  ],
  inquiries: [],
  activityLogs: [
    {
      _id: 'log_init',
      adminEmail: 'admin@yathartitsolutions.com',
      action: 'SYSTEM_INITIALIZATION',
      entity: 'System',
      details: 'High-Availability local storage initialized for Yatharth IT Solutions.',
      createdAt: new Date().toISOString()
    }
  ],
  visitorMetrics: {
    totalVisitors: 124,
    todayVisitors: 28,
    pageViews: 412
  }
}

class LocalStore {
  constructor() {
    this.data = null
    this.load()
  }

  load() {
    try {
      if (fs.existsSync(STORE_PATH)) {
        const raw = fs.readFileSync(STORE_PATH, 'utf-8')
        this.data = JSON.parse(raw)
        // Ensure websiteSettings exist
        if (!this.data.websiteSettings) {
          this.data.websiteSettings = { ...INITIAL_DATA.websiteSettings }
          this.save()
        }
      } else {
        this.data = JSON.parse(JSON.stringify(INITIAL_DATA))
        this.save()
      }
    } catch (e) {
      console.error('LocalStore load error, recreating store:', e.message)
      this.data = JSON.parse(JSON.stringify(INITIAL_DATA))
      this.save()
    }
  }

  save() {
    try {
      fs.writeFileSync(STORE_PATH, JSON.stringify(this.data, null, 2), 'utf-8')
    } catch (e) {
      console.error('LocalStore save error:', e.message)
    }
  }

  // --- Website Settings ---
  getSettings() {
    if (!this.data?.websiteSettings) {
      this.load()
    }
    return this.data.websiteSettings || INITIAL_DATA.websiteSettings
  }

  updateSettings(updates) {
    if (!this.data?.websiteSettings) this.load()
    this.data.websiteSettings = {
      ...this.data.websiteSettings,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    this.save()
    return this.data.websiteSettings
  }

  // --- Admin Users ---
  getAdminUsers() {
    if (!this.data?.adminUsers) this.load()
    return this.data.adminUsers || []
  }

  findAdminByEmail(email) {
    if (!email) return null
    const users = this.getAdminUsers()
    return users.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim()) || null
  }

  findAdminById(id) {
    if (!id) return null
    const users = this.getAdminUsers()
    return users.find(u => u._id === id || String(u._id) === String(id)) || null
  }

  createAdminUser(userData) {
    if (!this.data?.adminUsers) this.load()
    const newAdmin = {
      _id: userData._id || `admin_${Date.now()}`,
      name: userData.name || 'Admin',
      email: userData.email.toLowerCase().trim(),
      password: userData.password, // already hashed
      role: userData.role || 'admin',
      permissions: userData.permissions || ['dashboard', 'pages', 'content', 'navigation', 'media', 'inquiries', 'seo'],
      phone: userData.phone || null,
      isActive: userData.isActive !== undefined ? userData.isActive : true,
      createdAt: new Date().toISOString()
    }
    this.data.adminUsers.push(newAdmin)
    this.save()
    return newAdmin
  }

  updateAdminUser(id, updates) {
    if (!this.data?.adminUsers) this.load()
    const index = this.data.adminUsers.findIndex(u => u._id === id || String(u._id) === String(id))
    if (index >= 0) {
      this.data.adminUsers[index] = {
        ...this.data.adminUsers[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      this.save()
      return this.data.adminUsers[index]
    }
    return null
  }

  deleteAdminUser(id) {
    if (!this.data?.adminUsers) this.load()
    const initialLen = this.data.adminUsers.length
    this.data.adminUsers = this.data.adminUsers.filter(u => u._id !== id && String(u._id) !== String(id))
    if (this.data.adminUsers.length !== initialLen) {
      this.save()
      return true
    }
    return false
  }

  toggleAdminUserStatus(id) {
    if (!this.data?.adminUsers) this.load()
    const user = this.findAdminById(id)
    if (user) {
      user.isActive = !user.isActive
      this.save()
      return user
    }
    return null
  }

  // --- Navigation ---
  getNavigation() {
    if (!this.data?.navigation) this.load()
    return this.data.navigation || INITIAL_DATA.navigation
  }

  updateNavigation(location, items) {
    if (!this.data?.navigation) this.load()
    if (!this.data.navigation[location]) {
      this.data.navigation[location] = []
    }
    this.data.navigation[location] = items
    this.save()
    return this.data.navigation
  }

  // --- Content Sections ---
  getContentSections() {
    if (!this.data?.contentSections) this.load()
    return this.data.contentSections || []
  }

  getContentSectionByKey(key) {
    const sections = this.getContentSections()
    return sections.find(s => s.sectionKey === key) || null
  }

  updateContentSection(key, updates) {
    if (!this.data?.contentSections) this.load()
    const index = this.data.contentSections.findIndex(s => s.sectionKey === key)
    if (index >= 0) {
      this.data.contentSections[index] = {
        ...this.data.contentSections[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
    } else {
      this.data.contentSections.push({
        _id: 'sec_' + Date.now(),
        sectionKey: key,
        ...updates,
        updatedAt: new Date().toISOString()
      })
    }
    this.save()
    return this.getContentSectionByKey(key)
  }

  // --- Pages ---
  getPages() {
    if (!this.data?.pages) this.load()
    return this.data.pages || []
  }

  // --- Products ---
  getProducts() {
    if (!this.data?.products) this.load()
    return this.data.products || []
  }

  // --- Inquiries ---
  getInquiries() {
    if (!this.data?.inquiries) this.load()
    return this.data.inquiries || []
  }

  addInquiry(inquiry) {
    if (!this.data?.inquiries) this.load()
    const newInq = {
      _id: 'inq_' + Date.now(),
      ...inquiry,
      status: 'New',
      createdAt: new Date().toISOString()
    }
    this.data.inquiries.unshift(newInq)
    this.save()
    return newInq
  }

  // --- Activity Logs ---
  getActivityLogs() {
    if (!this.data?.activityLogs) this.load()
    return this.data.activityLogs || []
  }

  addActivityLog(log) {
    if (!this.data?.activityLogs) this.load()
    const newLog = {
      _id: 'log_' + Date.now(),
      ...log,
      createdAt: new Date().toISOString()
    }
    this.data.activityLogs.unshift(newLog)
    if (this.data.activityLogs.length > 50) {
      this.data.activityLogs.pop()
    }
    this.save()
    return newLog
  }

  // --- Stats ---
  getDashboardStats() {
    return {
      todayVisitors: 28,
      totalVisitors: 142,
      todayViews: 86,
      totalPages: this.getPages().length,
      publishedPages: this.getPages().filter(p => p.status === 'published').length,
      draftPages: this.getPages().filter(p => p.status === 'draft').length,
      totalProducts: this.getProducts().length,
      publishedProducts: this.getProducts().filter(p => p.status === 'published').length,
      totalUsers: 2,
      totalInquiries: this.getInquiries().length,
      newInquiries: this.getInquiries().filter(i => i.status === 'New').length,
      seoHealthScore: 92,
      recentActivities: this.getActivityLogs().slice(0, 8)
    }
  }
}

export const localStore = new LocalStore()
export default localStore

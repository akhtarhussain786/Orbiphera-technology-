import ContentSection from '../models/ContentSection.model.js'
import { logAdminActivity } from '../middleware/adminAuth.middleware.js'

const DEFAULT_PROJECTS = [
  {
    id: 'medflow-hms',
    client: 'MedFlow Health Systems',
    title: 'Clinical Workflow & EHR Platform',
    problem: 'Manual OPD patient queues and fragmented paper records slowed physician turnaround by 45%.',
    result: '+310% patient throughput & 99.98% uptime across 14 hospital branches',
    metric: '+310% Throughput',
    tags: ['React.js', 'Node.js', 'PostgreSQL', 'HIPAA Ready'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=540&fit=crop',
    link: '/software/medflow-clinic-hms',
    isActive: true
  },
  {
    id: 'eduprime-erp',
    client: 'EduPrime Global Academies',
    title: 'Unified Multi-Campus Academic OS',
    problem: 'Disjointed spreadsheets for admissions, attendance, and fee tracking caused high operational errors.',
    result: '65% reduction in admission processing time and 100% automated fee reconciliation',
    metric: '65% Time Saved',
    tags: ['React', 'Express', 'MySQL', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=540&fit=crop',
    link: '/templates/eduprime-education-institute',
    isActive: true
  },
  {
    id: 'omnicrm-suite',
    client: 'OmniTrade Enterprises',
    title: 'B2B Sales Velocity & CRM Engine',
    problem: 'Sales teams took over 48 hours to generate proposals and suffered a 38% lead drop-off.',
    result: '4.2x quote turnaround velocity with 28% higher deal close rate in first quarter',
    metric: '4.2x Velocity',
    tags: ['Node.js', 'React', 'MongoDB', 'RBAC Security'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=540&fit=crop',
    link: '/software/omnicrm-enterprise-suite',
    isActive: true
  },
  {
    id: 'shopsphere-commerce',
    client: 'ShopSphere Retail Brands',
    title: 'High-Concurrency Headless Commerce',
    problem: 'Legacy store dropped transactions during peak sales surges due to slow checkout latency.',
    result: '3.8x checkout conversion rate with sub-100ms global page loads on flash drops',
    metric: '3.8x Conversion',
    tags: ['Next.js', 'Redux', 'Node.js', 'Redis'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&h=540&fit=crop',
    link: '/templates/shopsphere-ecommerce',
    isActive: true
  }
]

const DEFAULT_PRODUCTS_SHOWCASE = [
  {
    id: 'erp-system',
    title: 'ERP Management System',
    category: 'ENTERPRISE ERP',
    badge: 'Multi-Branch & Finance',
    desc: 'Centralized enterprise platform streamlining multi-branch inventory, accounts, GST invoicing, supply chain, and staff permissions.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=480&fit=crop&q=80',
    features: [
      'Automated GST & Invoicing Engine',
      'Multi-Warehouse Inventory Tracking',
      'Real-Time Balance Sheet & P&L Ledgers',
      'Granular Role-Based Access (RBAC)'
    ],
    detailsLink: '/software',
    demoLink: '/request-demo?product=erp',
    isActive: true
  },
  {
    id: 'ems-workforce',
    title: 'Employee Management System (EMS)',
    category: 'WORKFORCE & PAYROLL',
    badge: 'GPS & Attendance OS',
    desc: 'Smart workforce administration featuring GPS geo-fenced mobile attendance, automated monthly payroll calculations, and leave approvals.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=480&fit=crop&q=80',
    features: [
      'GPS Geo-Fenced Mobile Punch In/Out',
      'Automated Salary, PF & Tax Computation',
      'Shift Rosters & Leave Workflows',
      'Live Field Staff Tracking & Reports'
    ],
    detailsLink: '/software',
    demoLink: '/request-demo?product=ems',
    isActive: true
  },
  {
    id: 'institute-management',
    title: 'Institute & School Management Software',
    category: 'EDUCATION & ACADEMICS',
    badge: 'Campus Operating System',
    desc: 'End-to-end campus software managing student admissions, automated fee reconciliation, class schedules, exams, and parent communications.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=480&fit=crop&q=80',
    features: [
      'Online Admissions & Verification',
      'Automated Fee Dues & Payment Links',
      'Exam Result Cards & Grade Ledgers',
      'Student & Guardian Mobile Apps'
    ],
    detailsLink: '/templates/eduprime-education-institute',
    demoLink: '/request-demo?product=institute',
    isActive: true
  },
  {
    id: 'gym-management',
    title: 'Gym & Fitness Management Software',
    category: 'HEALTH & FITNESS',
    badge: 'Membership Portal',
    desc: 'Fitness studio and gym administration system managing member subscriptions, trainer slots, biometric turnstile integration, and POS.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=480&fit=crop&q=80',
    features: [
      'Member Plans, Renewals & WhatsApp Alerts',
      'Biometric Machine & QR Access Integration',
      'Trainer Booking & Class Schedules',
      'POS Billing for Supplements & Passes'
    ],
    detailsLink: '/software',
    demoLink: '/request-demo?product=gym',
    isActive: true
  },
  {
    id: 'custom-business-suite',
    title: 'Custom Business Software Solutions',
    category: 'BESPOKE AUTOMATION',
    badge: 'Tailored SaaS Architecture',
    desc: 'Bespoke corporate management portals engineered specifically for proprietary workflows, custom APIs, high-volume database queries, and zero license lock-in.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=480&fit=crop&q=80',
    features: [
      'Tailored Business Logic & Custom Dashboards',
      'MySQL, PostgreSQL & MongoDB Clusters',
      'Third-Party Payment & SMS Gateways',
      'Full Source Code & 100% Data Ownership'
    ],
    detailsLink: '/custom-development',
    demoLink: '/request-demo?product=custom',
    isActive: true
  }
]

const DEFAULT_TESTIMONIALS = [
  {
    id: 'review-1',
    headline: 'Things were visible, high-velocity, and efficient.',
    body: 'It was really good working with Orbiphera Technologies and their engineering team, because they were attentive to our technical needs. It was collaborative, and as a client I can track the code commits and progress of the project. We used transparent sprint management, so things were visible and efficient. If you are looking for scalable software or mobile apps, I highly recommend them!',
    companyLogo: 'SPACECROP',
    authorName: 'Mary Grace Gasco',
    authorRole: 'Chief Executive Officer',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop',
    isActive: true
  },
  {
    id: 'review-2',
    headline: 'The architecture & result is just amazing.',
    body: 'Orbiphera Technologies is the right choice, I would highly recommend them, since they have been professional and competent from the very first moment. Our platform is wonderful, attractive, easy to use with the perfect design system. The team worked closely with us to provide a system that met all criteria. The result is just amazing.',
    companyLogo: 'NON STOP NANNY',
    authorName: 'Adrienn Asztalos',
    authorRole: 'Founder',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop',
    isActive: true
  },
  {
    id: 'review-3',
    headline: "A crucial engineering partner since our inception.",
    body: "They have been a crucial engineering partner since our company's inception. They manage our full web infrastructure, greatly enhancing our exposure and returns through outstanding architecture. Beyond web development, they've restructured our internal systems and automated data workflows.",
    companyLogo: 'RENTA STAY',
    authorName: 'Zaid Rauf',
    authorRole: 'Chief Technology Officer',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop',
    isActive: true
  },
  {
    id: 'review-4',
    headline: 'We will surely continue working with them.',
    body: 'We have already done two projects of different nature, ie a software adaptation and an enterprise web platform, with the team at Orbiphera Technologies. They have always been professional and flexible in adapting to our needs and are not afraid of incorporating new knowledge to their skills if the project requires it. We will surely continue working with them as the projects evolve.',
    companyLogo: 'BOTTEGA POLANCO',
    authorName: 'BOTTEGA Hospitality',
    authorRole: 'Chief Executive Officer',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop',
    isActive: true
  },
  {
    id: 'review-5',
    headline: 'Reliable and trustable engineering company.',
    body: 'These engineers are great workers, full of technical depth and dedication. I have been working with them for more than a year with several websites and cloud platforms, and planning to stay longer. Reliable and trustable engineering company. Highly recommendable.',
    companyLogo: 'TRADERS HUB',
    authorName: 'Sergio',
    authorRole: 'Founder & CEO',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop',
    isActive: true
  },
  {
    id: 'review-6',
    headline: 'Good customer service and deep commitment.',
    body: 'I was very happy with overall my platform build. Easy to understand, maintain, and update. It was very nice that their team explained and arranged every architectural component for me. I also like the user-friendly design system and continuous commitment I received.',
    companyLogo: 'SOLEIMANI CONSULTING',
    authorName: 'Saeedeh Soleimani',
    authorRole: 'Coach & Consultant',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop',
    isActive: true
  }
]

const DEFAULT_TEAM_MEMBERS = [
  {
    id: 'team-1',
    name: 'Vikram Sharma',
    role: 'Chief Technology Officer & Lead Architect',
    credentials: 'Ex-Enterprise Systems Architect',
    bio: '12+ years designing distributed systems, high-concurrency APIs, and enterprise cloud migrations.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop&crop=faces&q=80',
    touchpoint: 'Architecture Lead',
    status: 'Direct Sprint Access',
    isActive: true
  },
  {
    id: 'team-2',
    name: 'Ananya Roy',
    role: 'Head of Product Design & UX',
    credentials: 'Design Systems Lead',
    bio: 'Specialist in multi-platform design systems, interaction design, and WCAG accessibility compliance.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&crop=faces&q=80',
    touchpoint: 'UX & Design Review',
    status: 'Direct Sprint Access',
    isActive: true
  },
  {
    id: 'team-3',
    name: 'Rohan Mehta',
    role: 'Principal Full-Stack Engineer',
    credentials: 'Full-Stack Performance Specialist',
    bio: 'Core expert in React, Next.js, Node microservices, real-time WebSockets, and state machines.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&crop=faces&q=80',
    touchpoint: 'Core Systems Lead',
    status: 'Direct Sprint Access',
    isActive: true
  },
  {
    id: 'team-4',
    name: 'Priya Nair',
    role: 'Lead Cloud & DevOps Engineer',
    credentials: 'AWS & Kubernetes Certified',
    bio: 'ISO 27001 compliance lead, Docker/Kubernetes cluster orchestrator, and zero-downtime CI/CD architect.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&crop=faces&q=80',
    touchpoint: 'DevOps & Security',
    status: 'Direct Sprint Access',
    isActive: true
  }
]

export const getAllContentSections = async (req, res) => {
  try {
    let sections = await ContentSection.find().sort({ sortOrder: 1 })
    
    // Ensure products_showcase exists
    const hasProducts = sections.some(s => s.sectionKey === 'products_showcase')
    if (!hasProducts) {
      const prodSec = await ContentSection.create({
        sectionKey: 'products_showcase',
        title: 'Our Products & Digital Solutions.',
        subtitle: 'Production-ready enterprise software systems designed for rapid deployment, high data integrity, and intuitive day-to-day operations.',
        data: {
          badgeText: 'TURNKEY SOFTWARE SUITES',
          exploreButtonText: 'Explore All Software',
          exploreButtonLink: '/software',
          products: DEFAULT_PRODUCTS_SHOWCASE
        },
        isActive: true,
        sortOrder: 3
      })
      sections.push(prodSec)
    }

    // Ensure featured_projects exists
    const hasProjects = sections.some(s => s.sectionKey === 'featured_projects')
    if (!hasProjects) {
      const projSec = await ContentSection.create({
        sectionKey: 'featured_projects',
        title: 'Featured projects.',
        subtitle: 'Real software built for real businesses with verified outcomes.',
        data: {
          projects: DEFAULT_PROJECTS
        },
        isActive: true,
        sortOrder: 4
      })
      sections.push(projSec)
    }

    // Ensure testimonials exists
    const hasTestimonials = sections.some(s => s.sectionKey === 'testimonials')
    if (!hasTestimonials) {
      const testSec = await ContentSection.create({
        sectionKey: 'testimonials',
        title: "Don't just take our word for it.",
        subtitle: 'Verified feedback from founders, CTOs, and product directors.',
        data: {
          reviews: DEFAULT_TESTIMONIALS
        },
        isActive: true,
        sortOrder: 5
      })
      sections.push(testSec)
    }

    // Ensure team_members exists
    const hasTeam = sections.some(s => s.sectionKey === 'team_members')
    if (!hasTeam) {
      const teamSec = await ContentSection.create({
        sectionKey: 'team_members',
        title: 'Senior engineers. Direct access. No account manager filters.',
        subtitle: 'You collaborate directly with the technical specialists building and deploying your codebase.',
        data: {
          members: DEFAULT_TEAM_MEMBERS
        },
        isActive: true,
        sortOrder: 6
      })
      sections.push(teamSec)
    }

    res.json({ success: true, sections })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getContentSectionByKey = async (req, res) => {
  try {
    const { sectionKey } = req.params
    let section = await ContentSection.findOne({ sectionKey })
    
    if (!section && sectionKey === 'products_showcase') {
      section = await ContentSection.create({
        sectionKey: 'products_showcase',
        title: 'Our Products & Digital Solutions.',
        subtitle: 'Production-ready enterprise software systems designed for rapid deployment, high data integrity, and intuitive day-to-day operations.',
        data: {
          badgeText: 'TURNKEY SOFTWARE SUITES',
          exploreButtonText: 'Explore All Software',
          exploreButtonLink: '/software',
          products: DEFAULT_PRODUCTS_SHOWCASE
        },
        isActive: true,
        sortOrder: 3
      })
    }

    if (!section && sectionKey === 'featured_projects') {
      section = await ContentSection.create({
        sectionKey: 'featured_projects',
        title: 'Featured projects.',
        subtitle: 'Real software built for real businesses with verified outcomes.',
        data: {
          projects: DEFAULT_PROJECTS
        },
        isActive: true,
        sortOrder: 4
      })
    }

    if (!section && sectionKey === 'testimonials') {
      section = await ContentSection.create({
        sectionKey: 'testimonials',
        title: "Don't just take our word for it.",
        subtitle: 'Verified feedback from founders, CTOs, and product directors.',
        data: {
          reviews: DEFAULT_TESTIMONIALS
        },
        isActive: true,
        sortOrder: 5
      })
    }

    if (!section && sectionKey === 'team_members') {
      section = await ContentSection.create({
        sectionKey: 'team_members',
        title: 'Senior engineers. Direct access. No account manager filters.',
        subtitle: 'You collaborate directly with the technical specialists building and deploying your codebase.',
        data: {
          members: DEFAULT_TEAM_MEMBERS
        },
        isActive: true,
        sortOrder: 6
      })
    }

    if (section && sectionKey === 'team_members' && Array.isArray(section.data?.members)) {
      let updated = false
      section.data.members = section.data.members.map(m => {
        if (m.name === 'Vikram Sharma' && m.image && m.image.includes('1534528741775')) {
          m.image = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop&crop=faces&q=80'
          updated = true
        }
        if (m.name === 'Rohan Mehta' && m.image && m.image.includes('1507003211169')) {
          m.image = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&crop=faces&q=80'
          updated = true
        }
        return m
      })
      if (updated) {
        section.markModified('data')
        await section.save()
      }
    }

    if (!section) {
      return res.status(404).json({ success: false, message: 'Content section not found' })
    }
    res.json({ success: true, section })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateContentSection = async (req, res) => {
  try {
    const { sectionKey } = req.params
    const { title, subtitle, data, isActive } = req.body

    let section = await ContentSection.findOne({ sectionKey })
    if (!section) {
      section = new ContentSection({ sectionKey })
    }

    if (title !== undefined) section.title = title
    if (subtitle !== undefined) section.subtitle = subtitle
    if (data !== undefined) {
      section.data = data
      section.markModified('data')
    }
    if (isActive !== undefined) section.isActive = isActive

    await section.save()

    await logAdminActivity(req, {
      action: 'UPDATE_CONTENT_SECTION',
      entity: 'ContentSection',
      entityId: section._id,
      details: `Updated homepage content section: ${sectionKey}`
    })

    res.json({ success: true, section })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

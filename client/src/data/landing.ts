export interface NavLink {
  label: string
  href: string
  isDropdown?: boolean
  items?: { title: string; desc: string; href: string }[]
}

export interface DisciplineItem {
  id: string
  title: string
  description: string
  accentColor: string
  badgeText: string
  type: 'design' | 'engineering' | 'growth'
}

export interface ProcessPhase {
  number: string
  title: string
  sub1: { title: string; desc: string }
  sub2?: { title: string; desc: string }
}

export interface ProjectItem {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  glowColor: 'amber' | 'cyan' | 'emerald' | 'purple'
  screenshotUrl: string
  liveUrl: string
}

export interface TestimonialItem {
  id: string
  headline: string
  body: string
  clientName: string
  clientRole: string
  company: string
  companyLogoText: string
  rating: number
  verified: boolean
}

export interface PartnerLogo {
  id: string
  name: string
  category: string
  metric: string
}

export interface ToolItem {
  id: string
  name: string
  category: string
  color: string
  iconSlug: string
}

export interface FooterColumn {
  title: string
  links: { name: string; href: string }[]
}

export const LANDING_NAV_LINKS: NavLink[] = [
  {
    label: 'Services',
    href: '#disciplines',
    isDropdown: true,
    items: [
      { title: 'Product Design & UX', desc: 'Interface, systems & interactive prototypes', href: '#disciplines' },
      { title: 'Engineering & MVPs', desc: 'Modern web, mobile & cloud backends', href: '#disciplines' },
      { title: 'Growth & Cloud Scale', desc: 'SEO funnels, speed & analytics infrastructure', href: '#disciplines' }
    ]
  },
  { label: 'Work', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Tools', href: '#tools' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#roast' }
]

export const DISCIPLINES: DisciplineItem[] = [
  {
    id: 'product-design',
    title: 'Product design & UX',
    description: 'Interface, flow and design systems for products people have to use every day, not just look at once.',
    accentColor: '#EAF7EE',
    badgeText: 'Figma · Prototyping · Systems',
    type: 'design'
  },
  {
    id: 'engineering',
    title: 'Engineering',
    description: 'Web and mobile applications, MVPs and the platform work underneath them. Built to be handed over, extended and scaled.',
    accentColor: '#E5F5FA',
    badgeText: 'React · Flutter · Node · Cloud',
    type: 'engineering'
  },
  {
    id: 'growth',
    title: 'Growth',
    description: 'SEO, paid and social run by the same team that shipped the product, so the funnel and the build never drift apart.',
    accentColor: '#E8EFFD',
    badgeText: 'Performance · Conversion · SEO',
    type: 'growth'
  }
]

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    number: '01',
    title: 'Discover',
    sub1: {
      title: 'Research',
      desc: 'Market, users and the existing product. What already works stays.'
    },
    sub2: {
      title: 'Strategy',
      desc: 'Scope, priorities and the shape of the first release.'
    }
  },
  {
    number: '02',
    title: 'Design',
    sub1: {
      title: 'Concept',
      desc: 'Directions explored properly, then narrowed to one.'
    },
    sub2: {
      title: 'Handoff',
      desc: 'A design system and specs engineers can build from without guessing.'
    }
  },
  {
    number: '03',
    title: 'Build',
    sub1: {
      title: 'Development',
      desc: 'Built in the open, in a project tool you can watch.'
    },
    sub2: {
      title: 'QA',
      desc: 'Cross-device, accessibility and performance before anyone signs off.'
    }
  },
  {
    number: '04',
    title: 'Ship',
    sub1: {
      title: 'Launch',
      desc: 'Deploy, measure, and keep going after go-live.'
    }
  }
]

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'medflow-clinic',
    title: 'MedFlow Clinic HMS',
    category: 'Healthcare · Clinical Operating System',
    description: 'Automated OPD triage, multi-specialty doctor queue management, and instant digital prescriptions for hospital networks.',
    tags: ['React', 'Node.js', 'MongoDB', 'Cloud ERP'],
    glowColor: 'amber',
    screenshotUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop',
    liveUrl: '/software/medflow-clinic-hms'
  },
  {
    id: 'omnicrm-suite',
    title: 'OmniCRM Enterprise',
    category: 'SaaS · High-Velocity Sales Pipeline',
    description: 'Visual deal pipelines, client lifecycle automation, one-click PDF quotation engine, and role-based performance analytics.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'RBAC'],
    glowColor: 'cyan',
    screenshotUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    liveUrl: '/software/omnicrm-enterprise-suite'
  },
  {
    id: 'eduprime-os',
    title: 'EduPrime Institute OS',
    category: 'EdTech · Academic Campus Management',
    description: 'End-to-end student admission automation, automated fee collection alerts, exam grading, and parent portal.',
    tags: ['React', 'Express', 'MySQL', 'WebSockets'],
    glowColor: 'emerald',
    screenshotUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
    liveUrl: '/templates/eduprime-education-institute'
  },
  {
    id: 'shopsphere-retail',
    title: 'ShopSphere Retail OS',
    category: 'E-Commerce · High-Concurrency Engine',
    description: 'Headless multi-variant inventory storefront with sub-second page loads, automated tax calculations, and instant checkout.',
    tags: ['React', 'Redux', 'Node.js', 'Stripe'],
    glowColor: 'purple',
    screenshotUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop',
    liveUrl: '/templates/shopsphere-ecommerce'
  }
]

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    headline: 'We will surely continue working with them.',
    body: 'We have already done two projects of different nature, ie a software adaptation and an enterprise web platform, with the team at Yatharth IT. They have always been professional and flexible in adapting to our needs and are not afraid of incorporating new knowledge to their skills if the project requires it.',
    clientName: 'Santiago Rossi',
    clientRole: 'Chief Executive Officer',
    company: 'BOTTEGA Hospitality',
    companyLogoText: 'BOTTEGA POLANCO',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-2',
    headline: 'Shipped our cross-platform Flutter app 3 weeks ahead of schedule.',
    body: 'Their engineering precision was unmatched. From smooth 60fps animations on budget Android phones to rock-solid offline sync, Yatharth delivered an exceptional product that our clinical teams use daily without a single hitch.',
    clientName: 'Dr. Alistair Vance',
    clientRole: 'VP of Digital Health',
    company: 'NexGen Clinical Technologies',
    companyLogoText: 'NEXGEN LABS',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-3',
    headline: 'Our patient OPD wait times decreased by 65%.',
    body: 'Implementing MedFlow completely streamlined our clinic operations. Patient queues are transparent, doctors spend zero time fiddling with UI, and billing happens in 2 clicks. Highly recommended software architects.',
    clientName: 'Maya Thorne',
    clientRole: 'Operations Director',
    company: 'Apex Healthcare Network',
    companyLogoText: 'APEX HEALTH',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-4',
    headline: 'The code quality and test coverage gave our investors total confidence.',
    body: 'As a seed-stage startup, we needed a team that wrote scalable, production-grade code rather than throwing quick hacky scripts together. Yatharth built clean modules and comprehensive documentation.',
    clientName: 'Kenneth Chen',
    clientRole: 'Founder & CTO',
    company: 'Veloce Data Systems',
    companyLogoText: 'VELOCE DATA',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-5',
    headline: 'Zero downtime during our 10x Black Friday traffic spike.',
    body: 'Our e-commerce store processed over 85,000 concurrent transactions seamlessly. Their Redis caching layer, database query optimization, and CDN routing made everything blazing fast.',
    clientName: 'Elena Rostova',
    clientRole: 'Head of E-Commerce',
    company: 'Nordic Goods Co.',
    companyLogoText: 'NORDIC GOODS',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-6',
    headline: 'Transparent communication with zero surprises at billing.',
    body: 'Weekly sprint demonstrations, clear Jira roadmaps, and instant Slack updates. Working with them felt like having a top-tier Silicon Valley engineering department in-house.',
    clientName: 'Marcus Bell',
    clientRole: 'Managing Director',
    company: 'Elevate Digital Media',
    companyLogoText: 'ELEVATE MEDIA',
    rating: 5,
    verified: true
  }
]

export const RECOGNITIONS: PartnerLogo[] = [
  { id: 'rec-1', name: 'Clutch Top B2B Firm', category: 'Software Engineering', metric: '4.9/5.0 Rated' },
  { id: 'rec-2', name: 'GoodFirms Leader', category: 'Web App Development', metric: 'Top 1% Rated' },
  { id: 'rec-3', name: 'Trustpilot Excellent', category: 'Client Satisfaction', metric: '5.0 Verified' },
  { id: 'rec-4', name: 'AWS Certified Partner', category: 'Cloud Infrastructure', metric: 'Tier-1 Partner' },
  { id: 'rec-5', name: 'ISO 27001 Security', category: 'Data & Privacy', metric: 'Certified Audit' },
  { id: 'rec-6', name: 'Google Cloud Partner', category: 'Scalable Architecture', metric: 'Verified Stack' }
]

export const TOOL_TILES: ToolItem[] = [
  { id: 'tool-react', name: 'React & Next.js', category: 'Frontend', color: '#61DAFB', iconSlug: 'react' },
  { id: 'tool-flutter', name: 'Flutter & Dart', category: 'Mobile OS', color: '#02569B', iconSlug: 'flutter' },
  { id: 'tool-nodejs', name: 'Node.js & Express', category: 'Backend', color: '#68A063', iconSlug: 'node' },
  { id: 'tool-python', name: 'Python & FastAPI', category: 'AI & Data', color: '#3776AB', iconSlug: 'python' },
  { id: 'tool-postgres', name: 'PostgreSQL', category: 'Relational DB', color: '#4169E1', iconSlug: 'postgres' },
  { id: 'tool-mongo', name: 'MongoDB Atlas', category: 'Document DB', color: '#47A248', iconSlug: 'mongo' },
  { id: 'tool-docker', name: 'Docker Containers', category: 'DevOps', color: '#2496ED', iconSlug: 'docker' },
  { id: 'tool-aws', name: 'Amazon Web Services', category: 'Cloud Infra', color: '#FF9900', iconSlug: 'aws' },
  { id: 'tool-redis', name: 'Redis In-Memory', category: 'Caching Layer', color: '#DC382D', iconSlug: 'redis' },
  { id: 'tool-graphql', name: 'GraphQL & REST', category: 'API Layer', color: '#E10098', iconSlug: 'graphql' },
  { id: 'tool-tailwind', name: 'Tailwind CSS', category: 'Styling System', color: '#06B6D4', iconSlug: 'tailwind' },
  { id: 'tool-k8s', name: 'Kubernetes Orchestration', category: 'Infrastructure', color: '#326CE5', iconSlug: 'k8s' }
]

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Disciplines',
    links: [
      { name: 'Custom Software Development', href: '#disciplines' },
      { name: 'Cross-Platform Mobile Apps', href: '#disciplines' },
      { name: 'Web Applications & SaaS', href: '#disciplines' },
      { name: 'Cloud & Database Architecture', href: '#tools' },
      { name: 'AI & Business Automation', href: '#disciplines' }
    ]
  },
  {
    title: 'Featured Work',
    links: [
      { name: 'MedFlow Clinic HMS', href: '#projects' },
      { name: 'OmniCRM Enterprise Suite', href: '#projects' },
      { name: 'EduPrime Institute OS', href: '#projects' },
      { name: 'ShopSphere Retail OS', href: '#projects' },
      { name: 'Browse Software Catalog', href: '/software' }
    ]
  },
  {
    title: 'Process & Company',
    links: [
      { name: '4-Phase Development Roadmap', href: '#process' },
      { name: 'Technology Ecosystem', href: '#tools' },
      { name: 'Verified Client Reviews', href: '#reviews' },
      { name: 'Why Teams Choose Yatharth', href: '#recognition' },
      { name: 'Schedule Technical Demo', href: '/request-demo' }
    ]
  },
  {
    title: 'Legal & Security',
    links: [
      { name: 'Client Terms of Service', href: '/contact' },
      { name: 'Enterprise NDA & Privacy', href: '/contact' },
      { name: 'ISO Security Protocols', href: '/contact' },
      { name: 'Admin Portal', href: '/admin' }
    ]
  }
]


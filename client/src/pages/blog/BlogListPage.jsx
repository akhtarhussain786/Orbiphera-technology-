import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Tag,
  UserCheck
} from 'lucide-react'
import SeoHead from '../../components/common/SeoHead'
import { BLOG_POSTS } from '../../data/blogData'

export default function BlogListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Web Engineering', 'Mobile Engineering', 'Cost & Budgeting', 'Enterprise Strategy']

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' }
  ]

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0]

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white font-sans antialiased selection:bg-[#E50914] selection:text-white">
      <SeoHead
        title="Engineering Blog: Website & App Development Insights | Orbiphera"
        description="Authoritative insights on website development costs in India, Flutter vs native apps, choosing web development agencies, and custom ERP software by Orbiphera Technologies."
        keywords="Website Development Blog, App Development Insights, Website Development Cost in India, Flutter vs Native, Custom ERP Software"
        canonical="https://orbiphera.in/blog"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="pt-2">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 font-medium">
            <li>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li className="flex items-center space-x-2 text-[#FF2A36]">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
              <span className="font-semibold text-gray-200">Engineering Blog</span>
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#FF2A36] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Engineering & Strategy Digest</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Technical Insights for Business Founders & CTOs
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            In-depth guides on software costs in India, modern web architectures, Flutter vs native app comparisons, and enterprise digital transformation.
          </p>
        </header>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-b border-white/10 pb-6">
          {/* Category Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FFC800] text-[#111827] shadow-md shadow-[#FFC800]/20'
                    : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72 flex-shrink-0">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics & guides..."
              className="w-full pl-10 pr-4 py-2 bg-[#10151E] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC800] transition-colors"
            />
          </div>
        </div>

        {/* Featured Article Card (if no search filter applied) */}
        {!searchTerm && selectedCategory === 'All' && featuredPost && (
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#10151E] to-[#1558C9]/20 border border-white/15 shadow-2xl relative overflow-hidden group">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center space-x-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 text-[#FF2A36] font-bold uppercase tracking-wider">
                  Featured Guide
                </span>
                <span className="text-gray-400 font-mono flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-[#FFC800]" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#FFC800] transition-colors leading-snug">
                <Link to={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {featuredPost.summary}
              </p>

              <div className="pt-3 flex items-center justify-between">
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#FFC800] hover:underline"
                >
                  <span>Read Complete 2026 Checklist</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <span className="text-[11px] text-gray-500 font-mono hidden sm:inline">
                  Published by {featuredPost.author}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="p-6 rounded-3xl bg-[#10151E] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-[#FFC800]">
                    {post.category}
                  </span>
                  <span className="flex items-center text-[11px] font-mono">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#FFC800] transition-colors line-clamp-2">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-bold text-[#FFC800] group-hover:text-white flex items-center space-x-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-gray-500 font-mono text-[11px]">
                  {post.publishedDate}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Consultation CTA */}
        <section className="bg-[#10151E] border border-white/15 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h2 className="text-2xl font-black text-white">
            Have a Specific Technical Question or Architecture Need?
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Our engineering team is available for free 30-minute scoping consultations to audit your code, database, and performance bottlenecks.
          </p>
          <div className="pt-2">
            <Link
              to="/request-quote"
              className="px-6 py-3 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(255,200,0,0.25)]"
            >
              Consult With Our Engineers
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

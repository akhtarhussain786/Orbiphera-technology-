import React, { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  Clock,
  Calendar,
  Share2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  MessageSquare,
  Linkedin,
  Twitter,
  Link2,
  UserCheck,
  Sparkles
} from 'lucide-react'
import SeoHead from '../../components/common/SeoHead'
import { BLOG_POSTS } from '../../data/blogData'
import { SERVICES_DATA } from '../../data/servicesData'
import toast from 'react-hot-toast'

export default function BlogPostPage() {
  const { postSlug } = useParams()
  const post = BLOG_POSTS.find(p => p.slug === postSlug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` }
  ]

  const articleSchema = {
    title: post.title,
    description: post.metaDescription,
    author: post.author,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate,
    image: '/logo.png'
  }

  const currentUrl = `https://orbiphera.in/blog/${post.slug}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl)
    toast.success('Article link copied to clipboard!')
  }

  const relatedService = post.relatedService ? SERVICES_DATA[post.relatedService] : null
  const otherPosts = BLOG_POSTS.filter(p => p.slug !== post.slug)

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white font-sans antialiased selection:bg-[#E50914] selection:text-white">
      {/* Dynamic SEO & Article Schema */}
      <SeoHead
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        canonical={currentUrl}
        breadcrumbs={breadcrumbs}
        article={articleSchema}
        ogType="article"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-10 sm:space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="pt-2">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 font-medium overflow-x-auto whitespace-nowrap py-1">
            <li>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            </li>
            <li className="flex items-center space-x-2 text-[#FF2A36]">
              <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
              <span className="font-semibold text-gray-200 truncate">{post.category}</span>
            </li>
          </ol>
        </nav>

        {/* Article Header (H1) */}
        <header className="space-y-6">
          <div className="flex items-center space-x-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#FF2A36] font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-gray-400 font-mono flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-[#FFC800]" />
              {post.readTime}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400 font-mono">
              Published: {post.publishedDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
            {post.summary}
          </p>

          {/* Author Badge & Share Controls */}
          <div className="pt-4 border-t border-b border-white/10 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E50914] to-[#1558C9] flex items-center justify-center font-bold text-sm text-white">
                OP
              </div>
              <div>
                <p className="text-sm font-bold text-white flex items-center space-x-1.5">
                  <span>{post.author}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                </p>
                <p className="text-xs text-gray-400 font-mono">
                  {post.authorRole}
                </p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-400 font-medium hidden sm:inline">Share:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${currentUrl}`)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-emerald-600/30 text-gray-300 hover:text-emerald-400 transition-colors"
                title="Share on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-blue-600/30 text-gray-300 hover:text-blue-400 transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-sky-600/30 text-gray-300 hover:text-sky-400 transition-colors"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                title="Copy Article Link"
              >
                <Link2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Article Body Content */}
        <article className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed text-sm sm:text-base font-normal">
          <style>{`
            .prose h2 {
              font-size: 1.5rem;
              font-weight: 800;
              color: #FFFFFF;
              margin-top: 2rem;
              margin-bottom: 0.75rem;
              letter-spacing: -0.025em;
            }
            .prose h3 {
              font-size: 1.2rem;
              font-weight: 700;
              color: #FFC800;
              margin-top: 1.5rem;
              margin-bottom: 0.5rem;
            }
            .prose p {
              margin-bottom: 1rem;
              line-height: 1.75;
            }
            .prose ul {
              list-style-type: disc;
              padding-left: 1.5rem;
              margin-bottom: 1.25rem;
              space-y: 0.5rem;
            }
            .prose li {
              margin-bottom: 0.5rem;
            }
            .callout {
              padding: 1rem 1.25rem;
              background-color: rgba(229, 9, 20, 0.1);
              border-left: 3px solid #E50914;
              border-radius: 0.75rem;
              margin: 1.5rem 0;
              color: #F3F4F6;
              font-size: 0.925rem;
            }
            .cost-table {
              width: 100%;
              border-collapse: collapse;
              margin: 1.5rem 0;
              font-size: 0.85rem;
              border-radius: 0.75rem;
              overflow: hidden;
            }
            .cost-table th {
              background-color: #10151E;
              color: #FFC800;
              padding: 0.75rem 1rem;
              text-align: left;
              border-bottom: 1px solid rgba(255,255,255,0.1);
              font-weight: 700;
            }
            .cost-table td {
              background-color: #0A0D13;
              color: #E5E7EB;
              padding: 0.75rem 1rem;
              border-bottom: 1px solid rgba(255,255,255,0.05);
            }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Related Service Internal Linking Card */}
        {relatedService && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#10151E] border border-[#1558C9]/40 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[10px] font-mono uppercase text-[#FF2A36] font-bold">
                Related Engineering Discipline
              </span>
              <h3 className="text-lg font-bold text-white">
                {relatedService.h1}
              </h3>
              <p className="text-xs text-gray-400">
                {relatedService.subtitle}
              </p>
            </div>
            <Link
              to={`/services/${relatedService.slug}`}
              className="px-5 py-2.5 rounded-xl bg-[#1558C9] hover:bg-[#1249A8] text-white font-bold text-xs whitespace-nowrap transition-colors flex items-center space-x-1.5 flex-shrink-0"
            >
              <span>Explore Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Read Next Section */}
        <section className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Read More Engineering Guides
            </h2>
            <Link to="/blog" className="text-xs font-bold text-[#FFC800] hover:underline flex items-center">
              <span>View all guides</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPosts.slice(0, 2).map((other) => (
              <Link
                key={other.slug}
                to={`/blog/${other.slug}`}
                className="p-5 rounded-2xl bg-[#10151E] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#FFC800]">
                    {other.category} • {other.readTime}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#FFC800] transition-colors line-clamp-2">
                    {other.title}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#FFC800]" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Back to Blog Button */}
        <div className="pt-4">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

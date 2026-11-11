import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import SeoHead from '../components/common/SeoHead'
import PageBackground from '../components/common/PageBackground'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white flex items-center justify-center px-4 relative overflow-hidden">
      <PageBackground />
      <SeoHead title="404 — Page Not Found" />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center max-w-md p-8 sm:p-12 rounded-3xl bg-[#121214] border border-white/10 shadow-2xl relative z-10 space-y-4"
      >
        <span className="text-7xl font-black text-white font-mono tracking-wider block">
          4<span className="text-[#E50914]">0</span>4
        </span>
        <h2 className="text-2xl font-bold text-white tracking-tight">Endpoint Not Found</h2>
        <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
          The digital asset or page you requested could not be resolved. It may have been moved or updated.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button variant="secondary" size="md" onClick={() => window.history.back()} icon={ArrowLeft} iconPosition="left">
            Go Back
          </Button>
          <Link to="/">
            <Button variant="primary" size="md" icon={Home} iconPosition="left">
              Return Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound

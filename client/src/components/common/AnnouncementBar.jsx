import React, { useState } from 'react'
import { X, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '../../context/SettingsContext'

const AnnouncementBar = () => {
  const { settings } = useSettings()
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-[#121214] text-white relative overflow-hidden py-2 px-4 font-semibold text-xs border-b border-white/10 z-50 select-none shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center relative pr-8 sm:pr-0">
          <div className="inline-flex items-center space-x-2">
            <span className="hidden sm:inline-flex p-0.5 rounded bg-[#E50914]/10 border border-[#E50914]/30">
              <Sparkles className="w-3 h-3 text-[#E50914]" />
            </span>
            <span>
              Special Release: All website templates & software suites now include unminified source code & lifetime updates.
            </span>
            <Link 
              to="/marketplace" 
              className="inline-flex items-center text-[#E50914] underline font-black hover:opacity-80 transition-opacity ml-1"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AnnouncementBar

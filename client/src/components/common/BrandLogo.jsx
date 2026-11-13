import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '../../context/SettingsContext'

const SIZES = {
  xs: { box: 'w-8 h-8 rounded-lg', img: 'w-7 h-7' },
  sm: { box: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl', img: 'w-8 h-8 sm:w-9 sm:h-9' },
  md: { box: 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl', img: 'w-10 h-10 sm:w-11 sm:h-11' },
  lg: { box: 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl', img: 'w-12 h-12 sm:w-14 sm:h-14' },
  xl: { box: 'w-20 h-20 rounded-2xl', img: 'w-16 h-16' }
}

export default function BrandLogo({ 
  size = 'md', 
  className = '', 
  showText = false, 
  textClassName = '',
  theme = 'light',
  disableHover = false 
}) {
  const { settings } = useSettings()
  const [imgError, setImgError] = useState(false)
  const sizeConfig = SIZES[size] || SIZES.md

  const brandName = settings?.siteName || 'Orbiphera Technology'
  const logoSrc = (!imgError && settings?.logoUrl) ? settings.logoUrl : '/logo.png'
  const isLight = theme === 'light'

  return (
    <div className={`inline-flex items-center space-x-3 group flex-shrink-0 whitespace-nowrap ${className}`}>
      <motion.div
        className={`relative ${sizeConfig.box} flex items-center justify-center transition-all duration-300 flex-shrink-0`}
        whileHover={disableHover ? {} : { scale: 1.05 }}
        whileTap={disableHover ? {} : { scale: 0.96 }}
      >
        {!imgError ? (
          <img
            src={logoSrc}
            alt={brandName}
            onError={() => setImgError(true)}
            className={`${sizeConfig.img} object-contain relative z-10 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_10px_rgba(229,9,20,0.4)]`}
          />
        ) : (
          <span className="font-black text-[#E50914] text-base select-none font-mono">
            OP
          </span>
        )}
      </motion.div>

      {showText && (
        <div className="flex flex-col flex-shrink-0">
          <span className={`font-black tracking-tight transition-colors whitespace-nowrap text-white uppercase text-sm sm:text-base tracking-wider ${textClassName}`}>
            {brandName}
          </span>
        </div>
      )}
    </div>
  )
}

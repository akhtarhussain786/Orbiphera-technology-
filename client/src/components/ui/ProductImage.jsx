import React, { useState } from 'react'
import { ImageOff } from 'lucide-react'

const ProductImage = ({ 
  src, 
  alt, 
  className = '', 
  aspectRatio = '16/9',
  showZoom = true,
  fallbackIcon: FallbackIcon = ImageOff
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  return (
    <div 
      className={`relative overflow-hidden bg-gradient-to-br from-nexvora-cobalt/10 to-nexvora-bg-secondary ${className}`}
      style={{ aspectRatio }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-nexvora-bg-secondary" />
      )}
      
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-700 ${
            showZoom ? 'group-hover:scale-110' : ''
          } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <FallbackIcon className="w-12 h-12 text-nexvora-cobalt/60 mx-auto mb-2" />
            <p className="text-xs text-nexvora-text-muted">Preview</p>
          </div>
        </div>
      )}
      
      {!hasError && src && (
        <div className="absolute inset-0 bg-gradient-to-t from-nexvora-bg-primary/40 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  )
}

export default ProductImage

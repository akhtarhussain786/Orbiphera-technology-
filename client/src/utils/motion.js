import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Checks if user has requested reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Magnetic button / element hover attraction
 * Attracts the button slightly toward the mouse cursor on desktop
 */
export const initMagneticHover = (element, strength = 0.25) => {
  if (!element || typeof window === 'undefined') return () => {}
  
  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return () => {}

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1.1, 0.4)',
      overwrite: 'auto'
    })
  }

  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

/**
 * Word-by-word reveal using accessible inline-block wrappers
 */
export const splitWordsReveal = (element, triggerEl, options = {}) => {
  if (!element || prefersReducedMotion()) return null

  const text = element.innerText
  const words = text.split(' ')

  element.innerHTML = ''
  element.setAttribute('aria-label', text)

  const wordSpans = words.map((word, idx) => {
    const wrapper = document.createElement('span')
    wrapper.className = 'inline-block overflow-hidden py-0.5'
    wrapper.style.verticalAlign = 'bottom'

    const inner = document.createElement('span')
    inner.className = 'inline-block transform'
    inner.innerText = word + (idx < words.length - 1 ? '\u00A0' : '')
    wrapper.appendChild(inner)
    element.appendChild(wrapper)
    return inner
  })

  gsap.set(wordSpans, { yPercent: 110, opacity: 0 })

  const tl = gsap.timeline({
    scrollTrigger: triggerEl
      ? {
          trigger: triggerEl,
          start: options.start || 'top 85%',
          toggleActions: 'play none none none',
          ...options.scrollTrigger
        }
      : undefined
  })

  tl.to(wordSpans, {
    yPercent: 0,
    opacity: 1,
    duration: options.duration || 0.8,
    stagger: options.stagger || 0.035,
    ease: options.ease || 'power3.out',
    delay: options.delay || 0
  })

  return tl
}

/**
 * Staggered cards reveal on scroll
 */
export const initStaggerCards = (container, cardSelector = '.stagger-card', options = {}) => {
  if (!container || prefersReducedMotion()) return null

  const cards = container.querySelectorAll(cardSelector)
  if (!cards.length) return null

  gsap.set(cards, { opacity: 0, y: options.y || 35 })

  return gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: options.duration || 0.75,
    stagger: options.stagger || 0.08,
    ease: options.ease || 'power3.out',
    delay: options.delay || 0,
    scrollTrigger: {
      trigger: options.trigger || container,
      start: options.start || 'top 82%',
      toggleActions: 'play none none none'
    }
  })
}

/**
 * Standard section header reveal (Badge -> Title -> Subtitle)
 */
export const initHeaderReveal = (container, options = {}) => {
  if (!container || prefersReducedMotion()) return null

  const elements = container.querySelectorAll('.reveal-item')
  if (!elements.length) return null

  gsap.set(elements, { opacity: 0, y: 25 })

  return gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: options.start || 'top 85%',
      toggleActions: 'play none none none'
    }
  })
}

/**
 * Animated numerical counter on scroll
 */
export const initCounter = (element, targetValue, duration = 1.6) => {
  if (!element || prefersReducedMotion()) return null

  // Extract number, prefix, suffix
  const match = String(targetValue).match(/^([^0-9.]*)([0-9.]+)(.*)$/)
  if (!match) return null

  const prefix = match[1] || ''
  const numValue = parseFloat(match[2])
  const suffix = match[3] || ''
  const isDecimal = match[2].includes('.')
  const decimals = isDecimal ? match[2].split('.')[1].length : 0

  const counterObj = { val: 0 }

  return gsap.to(counterObj, {
    val: numValue,
    duration: duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      toggleActions: 'play none none none'
    },
    onUpdate: () => {
      const formatted = isDecimal ? counterObj.val.toFixed(decimals) : Math.floor(counterObj.val)
      element.innerText = `${prefix}${formatted}${suffix}`
    }
  })
}

/**
 * Cinematic clip-path image reveal
 */
export const initImageReveal = (container, imgElement, trigger = null) => {
  if (!container || prefersReducedMotion()) return null

  const targetTrigger = trigger || container

  gsap.set(container, {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
  })

  if (imgElement) {
    gsap.set(imgElement, { scale: 1.15, transformOrigin: '50% 50%' })
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: targetTrigger,
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  })

  tl.to(container, {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    duration: 0.9,
    ease: 'power3.inOut'
  })

  if (imgElement) {
    tl.to(
      imgElement,
      {
        scale: 1,
        duration: 1.1,
        ease: 'power2.out'
      },
      '-=0.7'
    )
  }

  return tl
}

/**
 * Ambient glow slow breathing pulse
 */
export const initPulseGlow = (element) => {
  if (!element || prefersReducedMotion()) return null

  return gsap.to(element, {
    scale: 1.18,
    opacity: 0.22,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
}

export { gsap, ScrollTrigger }

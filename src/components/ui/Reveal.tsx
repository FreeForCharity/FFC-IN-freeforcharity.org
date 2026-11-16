'use client'

import React, { useEffect, useRef } from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
}

/**
 * Fades and scales its content in as it scrolls into view, without an
 * animation library (Modern Web Guidance: ui-behaviors/scroll-reveal).
 *
 * The content renders visible, so it shows without JavaScript and is never
 * hidden from search engines or a slow first load. Only after the page has
 * loaded, and only for content still below the fold, is it hidden and then
 * revealed by an IntersectionObserver. Visitors who ask for reduced motion
 * see it plainly. The styles live in globals.css under [data-reveal].
 */
export default function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    // Already on screen when the page loads: leave it as it is.
    if (element.getBoundingClientRect().top < window.innerHeight) return

    element.dataset.reveal = 'hidden'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.dataset.reveal = 'shown'
        observer.disconnect()
      },
      // Start once the element is a little way into the viewport.
      { rootMargin: '0px 0px -15% 0px' }
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      delete element.dataset.reveal
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

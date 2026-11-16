'use client'

import React, { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

/**
 * Props for the AnimatedNumber component.
 *
 * @property value - The target number to animate to.
 * @property className - Optional CSS classes to apply.
 * @property id - Optional element ID.
 */
interface AnimatedNumberProps {
  value: number
  className?: string
  id?: string
}

// How long the count-up takes.
const DURATION_MS = 1500

/**
 * Counts up from 0 to `value` when the number scrolls into view, with an
 * IntersectionObserver and requestAnimationFrame instead of an animation
 * library.
 *
 * The real value is what renders on the server and without JavaScript, so
 * search engines and a slow first load never see "0". While the digits are
 * below or counting toward the value, screen readers get the real value from
 * a visually hidden copy instead; once settled, there is one plain number, so
 * copying or searching the page finds it once. The count-up only runs for a number that is still below
 * the fold when the page loads, and never for visitors who ask for reduced
 * motion. Printing shows the real value too.
 */
const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className = '', id }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    if (element.getBoundingClientRect().top < window.innerHeight) return

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const step = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1)
          const eased = 1 - Math.pow(1 - progress, 3) // ease-out
          setDisplayValue(Math.round(value * eased))
          if (progress < 1) frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
      },
      { rootMargin: '0px 0px -100px 0px' }
    )
    // Hide the final figure until the count-up starts.
    frame = requestAnimationFrame(() => setDisplayValue(0))
    observer.observe(element)
    // A page printed before the number scrolled into view shows the value.
    const stop = () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
    // Render synchronously: the browser lays out the printout right after
    // this event returns.
    const showValueForPrint = () => {
      stop()
      flushSync(() => setDisplayValue(value))
    }
    window.addEventListener('beforeprint', showValueForPrint)
    return () => {
      window.removeEventListener('beforeprint', showValueForPrint)
      stop()
      setDisplayValue(value)
    }
  }, [value])

  return (
    <span ref={ref} className={className} id={id}>
      {displayValue === value ? (
        value
      ) : (
        <>
          <span aria-hidden="true">{displayValue}</span>
          <span className="sr-only">{value}</span>
        </>
      )}
    </span>
  )
}

export default AnimatedNumber

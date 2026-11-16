'use client'

import React, { useEffect, useRef, useState } from 'react'

interface ScrollableTableProps {
  /** Names the scroll area for screen readers, e.g. "Analytics cookies". */
  label: string
  className?: string
  children: React.ReactNode
}

/**
 * A table that scrolls sideways on narrow screens instead of widening the
 * page (Modern Web Guidance: ui-components/responsive-table).
 *
 * The wrapper is a labelled region. Only while the table is wider than its
 * box does it join the tab order, so a keyboard user can reach it and scroll
 * it with the arrow keys; a table that fits adds no extra tab stop.
 */
export default function ScrollableTable({ label, className = '', children }: ScrollableTableProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [overflowing, setOverflowing] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const measure = () => setOverflowing(element.scrollWidth > element.clientWidth + 1)
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    const table = element.firstElementChild
    if (table) observer.observe(table)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={overflowing ? 0 : undefined}
      data-overflowing={overflowing ? 'true' : undefined}
      className={`overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0567B1] ${className}`}
    >
      {children}
    </div>
  )
}

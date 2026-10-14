'use client'

import { useEffect } from 'react'

/** Open the <details> group the URL hash names (or contains), then scroll to it. */
export function expandHashTarget(hash: string = window.location.hash): boolean {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  if (!id) return false
  const el = document.getElementById(id)
  if (!el) return false
  const details = el instanceof HTMLDetailsElement ? el : el.closest('details')
  if (details && !details.open) details.open = true
  el.scrollIntoView?.({ block: 'start' })
  return true
}

/**
 * Makes field-guide deep links work: /501c3/#officer-linkedin opens that
 * collapsed group and scrolls to it, on first load and on every in-page hash
 * change (the table of contents, the worksheet link, WHMCS deep links).
 */
export default function HashAutoExpand() {
  useEffect(() => {
    const onHash = () => {
      expandHashTarget()
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return null
}

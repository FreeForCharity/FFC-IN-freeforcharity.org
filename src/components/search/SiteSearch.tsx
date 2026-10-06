'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import searchIndex from '@/data/search-index.json'

/**
 * Client-side site search (issue #408): token-scored filtering over the
 * committed build-time index — no server, no search dependency, works in the
 * static export. Graceful without JS: the page shows the guides-hub link as
 * the fallback path.
 */

interface Entry {
  title: string
  description: string
  href: string
  type: 'page' | 'guide' | 'post'
}

type ProcessedEntry = Entry & {
  _lowerTitle: string
  _lowerDescription: string
}

const entries: ProcessedEntry[] = (searchIndex as unknown as { entries: Entry[] }).entries.map(
  (entry) => ({
    ...entry,
    _lowerTitle: entry.title.toLowerCase(),
    _lowerDescription: entry.description.toLowerCase(),
  })
)

const TYPE_LABEL: Record<Entry['type'], string> = {
  page: 'Page',
  guide: 'Guide',
  post: 'Blog post',
}

function score(entry: ProcessedEntry, tokens: string[]): number {
  const title = entry._lowerTitle
  const description = entry._lowerDescription
  let total = 0
  for (const token of tokens) {
    if (title.includes(token)) total += title.startsWith(token) ? 4 : 3
    else if (description.includes(token)) total += 1
    else return 0 // every token must match somewhere
  }
  return total
}

export default function SiteSearch() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (tokens.length === 0) return []
    return entries
      .map((entry) => ({ entry, s: score(entry, tokens) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.entry)
  }, [query])

  return (
    <div>
      <label
        htmlFor="site-search"
        className="block font-[var(--font-lato)] text-[16px] font-[600] text-[#333] mb-2"
      >
        Search guides, pages, and posts
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try “email”, “domain”, “990”, “volunteer”…"
        autoComplete="off"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 font-[var(--font-lato)] text-[17px] focus:border-[#0567B1] focus:outline-none"
      />

      <div aria-live="polite" className="mt-6">
        {query.trim() !== '' && results.length === 0 ? (
          <p className="font-[var(--font-lato)] text-[16px] text-[#555]">
            Nothing matched &ldquo;{query}&rdquo; — try a shorter word, browse the{' '}
            <Link href="/guides/" className="text-[#0567B1] underline">
              guides hub
            </Link>
            , or{' '}
            <Link href="/contact-us/" className="text-[#0567B1] underline">
              ask us directly
            </Link>
            .
          </p>
        ) : null}
        <ul className="space-y-4">
          {results.map((entry) => (
            <li key={entry.href} className="border border-gray-200 rounded-lg p-4">
              <Link href={entry.href} className="group block">
                <span className="flex items-baseline justify-between gap-3">
                  <span
                    className="font-[var(--font-lato)] text-[18px] font-[600] text-[#0567B1] group-hover:underline"
                    data-font="lato-font"
                  >
                    {entry.title}
                  </span>
                  <span className="shrink-0 text-[12px] font-[600] uppercase tracking-wide text-[#767672]">
                    {TYPE_LABEL[entry.type]}
                  </span>
                </span>
                <span className="mt-1 block font-[var(--font-lato)] text-[15px] leading-[24px] text-[#555]">
                  {entry.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

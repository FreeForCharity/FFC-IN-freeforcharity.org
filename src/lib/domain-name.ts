/**
 * Shared helpers for the /domains "Check your .org" tool.
 * Kept as pure functions so both the client component and the PHP endpoint
 * (which mirrors `toLabel`) — and the unit tests — agree on the rules.
 */

/**
 * Normalize a typed value to a bare DNS label — tolerant of pasted URLs and
 * stray whitespace (e.g. "  https://Example.com/ " -> "example").
 * The PHP endpoint mirrors this normalization (and additionally enforces
 * DNS-label validity: max 63 chars, no leading/trailing hyphen).
 */
export function toLabel(raw: string): string {
  const s = raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '') // strip a pasted protocol
    .replace(/^www\./, '') // strip a www. subdomain
    .replace(/[/?#].*$/, '') // strip a path, query string, or fragment
  // If it ends in .org/.com/.net, take the second-level label — this drops any
  // subdomain (sub.example.org -> example) without mis-parsing other TLDs.
  const m = s.match(/([a-z0-9-]+)\.(?:org|com|net)$/)
  return (m ? m[1] : s).replace(/[^a-z0-9-]/g, '') // DNS-label characters only
}

/** Instant, client-side naming-quality feedback (no server needed). */
export function nameNotes(label: string): string[] {
  const notes: string[] = []
  if (label.length > 20)
    notes.push('Long — shorter names are easier to type on a phone and remember.')
  if (label.includes('-'))
    notes.push('Has a hyphen — hyphens are easy to mishear out loud; avoid if you can.')
  if (/[0-9]/.test(label))
    notes.push('Has a number — “2” vs “two” causes confusion when you say it aloud.')
  return notes
}

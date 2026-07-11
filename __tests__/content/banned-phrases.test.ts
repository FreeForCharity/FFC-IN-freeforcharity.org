/**
 * Banned old-journey-order phrases guard.
 *
 * FFC's charity onboarding journey is gated: the website is built and
 * validated FIRST (on its free GitHub Pages address), and only then is the
 * free .org domain registered, followed by Microsoft 365 email. A past
 * content review found nine stale-copy stragglers that still asserted the
 * OLD order (domain registered before the website exists), which contradicts
 * the copy on /free-charity-web-hosting/, /charity-onboarding-journey/, and
 * /domains/.
 *
 * This test permanently guards against that copy creeping back in. It scans
 * all source files under src/ (ts/tsx/json — source, not build output, for
 * speed and stable line numbers) and fails with file:line locations if any
 * banned phrase reappears.
 *
 * NOTE: "you need the domain before email" (src/app/m365-email-guide/page.tsx)
 * is legitimate and intentionally NOT banned — email genuinely requires the
 * domain. The banned patterns below are scoped so that phrasing never matches.
 */
import fs from 'fs'
import path from 'path'

const SRC_DIR = path.join(__dirname, '..', '..', 'src')
const SCANNED_EXTENSIONS = new Set(['.ts', '.tsx', '.json'])

interface BannedPhrase {
  pattern: RegExp
  reason: string
}

const bannedPhrases: BannedPhrase[] = [
  {
    // The gated journey is website-first. "Your website comes first" is fine
    // and appears throughout src; "domain comes first" is the old order.
    pattern: /domain comes first/i,
    reason: 'Old journey order — the website comes first; the domain follows validation.',
  },
  {
    pattern: /launches it on your Cloudflare-managed domain/i,
    reason: 'Old journey order — sites launch on their free GitHub Pages address first.',
  },
  {
    pattern: /discount code to request a new domain/i,
    reason: 'Stale process — domains are registered by FFC after site validation, no codes.',
  },
  {
    pattern: /the domain we set up in the previous step/i,
    reason: 'Old journey order — the domain is not set up before the website.',
  },
  {
    pattern: /get your free domain from us/i,
    reason: 'Old queue-jump tip — the domain is purchased once your site is validated.',
  },
  {
    pattern: /registers your domain, sets up Microsoft 365, and builds your site/i,
    reason: 'Old journey order — build & validate the site first, then domain, then email.',
  },
  {
    pattern: /once your domain (name )?is set up/i,
    reason: 'Old journey order — nothing waits on the domain except email; the site comes first.',
  },
]

function collectSourceFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath))
    } else if (entry.isFile() && SCANNED_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }
  return files
}

describe('banned old-journey-order phrases', () => {
  const sourceFiles = collectSourceFiles(SRC_DIR)

  it('finds source files to scan', () => {
    expect(sourceFiles.length).toBeGreaterThan(0)
  })

  it.each(bannedPhrases.map((phrase) => [phrase.pattern.source, phrase]))(
    'no source file contains banned phrase: %s',
    (_source, phrase) => {
      const violations: string[] = []
      for (const file of sourceFiles) {
        // Prettier wraps long JSX prose across lines (with {' '} joiners), so a
        // per-line scan misses multi-word phrases. Match against a
        // whitespace-normalized view of the whole file instead.
        const normalized = fs
          .readFileSync(file, 'utf8')
          .replace(/\{['"]\s['"]\}/g, ' ') // JSX explicit-space joiners
          .replace(/\s+/g, ' ')
        const match = normalized.match((phrase as BannedPhrase).pattern)
        if (match) {
          violations.push(`${path.relative(SRC_DIR, file)}: “…${match[0]}…”`)
        }
      }
      if (violations.length > 0) {
        throw new Error(
          `Banned phrase /${(phrase as BannedPhrase).pattern.source}/ found.\n` +
            `Why banned: ${(phrase as BannedPhrase).reason}\n` +
            `Files (relative to src/):\n  ${violations.join('\n  ')}`
        )
      }
      expect(violations).toEqual([])
    }
  )
})

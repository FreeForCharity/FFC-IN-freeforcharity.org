/**
 * Image-path integrity tests for src/data/**
 *
 * Walks every data file and asserts that every imageUrl-shaped string
 * resolves to a real file under public/. Catches the failure mode where
 * a referenced image is renamed/deleted from public/ but the JSON entry
 * still points at the old path — invisible until a visitor lands on
 * the page and gets a broken card.
 *
 * Scope: local paths only. External HTTPS images (LinkedIn, GuideStar)
 * are not exercised by this test — they belong in the lychee/linkinator
 * external-link checks.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const repoRoot = resolve(__dirname, '..', '..')
const publicDir = join(repoRoot, 'public')
const dataDir = join(repoRoot, 'src', 'data')

const IMAGE_FIELDS = ['imageUrl', 'image', 'avatar', 'photo', 'src', 'heroImg']

function collectJsonFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      out.push(...collectJsonFiles(full))
    } else if (entry.endsWith('.json')) {
      out.push(full)
    }
  }
  return out
}

function* walkImagePaths(value: unknown, parentKey = ''): Generator<{ key: string; path: string }> {
  if (value === null || value === undefined) return
  if (typeof value === 'string') {
    if (IMAGE_FIELDS.includes(parentKey) && value.startsWith('/')) {
      yield { key: parentKey, path: value }
    }
    return
  }
  if (Array.isArray(value)) {
    for (const item of value) yield* walkImagePaths(item, parentKey)
    return
  }
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      yield* walkImagePaths(v, k)
    }
  }
}

describe('src/data image-path integrity', () => {
  const jsonFiles = collectJsonFiles(dataDir)

  it('finds at least one data JSON file', () => {
    expect(jsonFiles.length).toBeGreaterThan(0)
  })

  describe.each(jsonFiles.map((f) => [f.replace(repoRoot + '/', ''), f]))('%s', (_label, file) => {
    const parsed = JSON.parse(readFileSync(file as string, 'utf8'))
    const refs = [...walkImagePaths(parsed)]

    if (refs.length === 0) {
      // Some data files (faqs, testimonials) carry no image refs at
      // all. Skip them — they're not relevant to this invariant.
      it('has no local image paths to validate', () => {
        expect(refs.length).toBe(0)
      })
      return
    }

    it.each(refs.map((r) => [`${r.key}=${r.path}`, r]))(
      '%s resolves to an existing file in public/',
      (_l, ref) => {
        const r = ref as { key: string; path: string }
        const resolved = join(publicDir, r.path.replace(/^\//, ''))
        expect({ path: r.path, exists: existsSync(resolved) }).toEqual({
          path: r.path,
          exists: true,
        })
      }
    )
  })
})

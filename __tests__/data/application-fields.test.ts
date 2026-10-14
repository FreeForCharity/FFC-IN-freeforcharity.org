import fs from 'fs'
import path from 'path'
import {
  APPLICATION_FIELDS_POLICY,
  APPLICATION_FIELD_SECTIONS,
  APPLICATION_WORKSHEET,
  TRACK_KEYS,
  TRACKS,
  questionRequirement,
  resolveApplicationFieldLink,
  sectionsForTrack,
  textFor,
  worksheetForTrack,
} from '@/data/application-fields'
import { HELP_TOPICS, helpTopicsForTrack } from '@/data/application-help'
import guidesData from '@/data/guides.json'

const allFields = APPLICATION_FIELD_SECTIONS.flatMap((s) => s.fields)
const allHrefs = APPLICATION_FIELD_SECTIONS.flatMap((s) =>
  s.links.map((l) => (typeof l === 'string' ? l : l.href))
)
const appDir = path.join(process.cwd(), 'src', 'app')

describe('Application field guide data', () => {
  it('covers all 95 WHMCS fields in 27 sections', () => {
    expect(APPLICATION_FIELD_SECTIONS).toHaveLength(27)
    expect(allFields).toHaveLength(95)
  })

  it('opens with the required read-help-page tickbox on both forms', () => {
    const first = APPLICATION_FIELD_SECTIONS[0]
    expect(first.id).toBe('before-you-start')
    expect(first.fields).toEqual([
      expect.objectContaining({ slug: 'read-help-page', r33: 'R', r16: 'R' }),
    ])
  })

  it('has unique, kebab-case section anchors', () => {
    const ids = APPLICATION_FIELD_SECTIONS.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('keeps the anchors WHMCS deep-links to', () => {
    const ids = APPLICATION_FIELD_SECTIONS.map((s) => s.id)
    for (const id of [
      'before-you-start',
      'org-name',
      'legal-status',
      'ein',
      'mission',
      'candid',
      'charity-social',
      'officers',
      'officer-linkedin',
      'team-members',
      'contacts',
      'maintainer',
      'public-contact',
      'domain',
      'template',
      'site-content',
      'programs',
      'donations-volunteers',
      'site-leaders',
      'techsoup-email',
      'certifications',
    ]) {
      expect(ids).toContain(id)
    }
  })

  it('maps every field slug to exactly one section', () => {
    const slugs = allFields.map((f) => f.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('gives every field a label and puts it on at least one form', () => {
    for (const f of allFields) {
      expect(f.label.length).toBeGreaterThan(0)
      expect(['R', 'O', '-']).toContain(f.r33)
      expect(['R', 'O', '-']).toContain(f.r16)
      expect(f.r33 === '-' && f.r16 === '-').toBe(false)
    }
  })

  it('keeps the officer LinkedIn anchor required on both forms', () => {
    const section = APPLICATION_FIELD_SECTIONS.find((s) => s.id === 'officer-linkedin')
    expect(section).toBeDefined()
    for (const f of section!.fields) {
      expect(f.r33).toBe('R')
      expect(f.r16).toBe('R')
    }
  })

  it('explains the required-fields policy', () => {
    expect(APPLICATION_FIELDS_POLICY.title).toBe('Why every required field is required')
    expect(APPLICATION_FIELDS_POLICY.body.join(' ')).toMatch(/demand for them is very high/)
    expect(APPLICATION_FIELDS_POLICY.body.join(' ')).toMatch(/exceptions or waivers/)
  })

  it('gives every section why and how copy on each form', () => {
    for (const track of TRACK_KEYS) {
      for (const s of APPLICATION_FIELD_SECTIONS) {
        expect(textFor(s.why, track).length).toBeGreaterThan(0)
        expect(textFor(s.how, track).length).toBeGreaterThan(0)
      }
    }
  })

  it('resolves every link to readable text', () => {
    for (const href of allHrefs) {
      const link = resolveApplicationFieldLink(href)
      expect({ href, resolved: Boolean(link) }).toEqual({ href, resolved: true })
      expect(link!.label).not.toMatch(/^https?:\/\//)
    }
  })

  it('points internal links at routes that exist, and every other link is absolute', () => {
    for (const href of allHrefs) {
      if (href.startsWith('/')) {
        expect(href).toMatch(/^\/[a-z0-9-]+\/$/)
        const pagePath = path.join(appDir, href.replace(/^\/|\/$/g, ''), 'page.tsx')
        expect({ href, exists: fs.existsSync(pagePath) }).toEqual({ href, exists: true })
      } else {
        expect(href).toMatch(/^https:\/\//)
      }
    }
  })

  it('links ffcadmin.org only absolutely, and never to its retired intake-help or field guide', () => {
    for (const href of allHrefs) {
      expect(href).not.toMatch(/^\/(guides|intake-help|site-owner)\//)
      expect(href).not.toMatch(/intake-help|application-fields/)
    }
  })

  it('prefers the charity-facing pages on this site over the ffcadmin.org equivalents', () => {
    const byId = (id: string) =>
      APPLICATION_FIELD_SECTIONS.find((s) => s.id === id)!.links.map((l) =>
        typeof l === 'string' ? l : l.href
      )
    expect(byId('candid')).toContain('/guidestar-guide/')
    expect(byId('donations-volunteers')).toContain('/zeffy-donations-guide/')
    expect(byId('techsoup-email')).toEqual(
      expect.arrayContaining(['/m365-email-guide/', '/google-for-nonprofits-guide/'])
    )
    expect(byId('template')).toContain('/website-templates/')
    expect(byId('certifications')).toContain('/terms-of-service/')
    expect(allHrefs).not.toContain('https://ffcadmin.org/guides/candid/')
    expect(allHrefs).not.toContain('https://ffcadmin.org/guides/zeffy/')
    expect(allHrefs).not.toContain('https://ffcadmin.org/guides/microsoft-365-email/')
  })

  it('lists every field exactly once in the worksheet', () => {
    const worksheetSlugs = APPLICATION_WORKSHEET.flatMap((g) => g.items.flatMap((i) => i.fields))
    expect(new Set(worksheetSlugs).size).toBe(worksheetSlugs.length)
    expect([...worksheetSlugs].sort()).toEqual(allFields.map((f) => f.slug).sort())
  })

  it('follows the form order: worksheet and sections both start and end the same way', () => {
    expect(APPLICATION_WORKSHEET[0].items[0].fields).toEqual(['read-help-page'])
    expect(APPLICATION_WORKSHEET[APPLICATION_WORKSHEET.length - 1].title).toBe(
      'Final certifications'
    )
    expect(APPLICATION_FIELD_SECTIONS[APPLICATION_FIELD_SECTIONS.length - 1].id).toBe(
      'certifications'
    )
  })

  it('computes each question’s requirement per form', () => {
    expect(questionRequirement(['org-name'], '501c3')).toBe('R')
    expect(questionRequirement(['alternate-names'], 'pre501c3')).toBe('O')
    expect(questionRequirement(['chair-phone', 'chair-email'], '501c3')).toBe('R')
    expect(questionRequirement(['chair-phone', 'chair-email'], 'pre501c3')).toBe('-')
    expect(questionRequirement(['guidestar'], '501c3')).toBe('-')
    expect(questionRequirement(['zeffy-donation-url'], '501c3')).toBe('R')
    expect(questionRequirement(['zeffy-donation-url'], 'pre501c3')).toBe('O')
    for (const track of TRACK_KEYS) {
      expect(questionRequirement(['desired-domain', 'current-desired-domain'], track)).toBe('R')
    }
  })

  // The EIN is the one exception: a pre-501(c)(3) group without one may enter NONE.
  it('never suggests a placeholder answer such as NONE or N/A outside the pre-501(c)(3) EIN', () => {
    const dir = path.join(process.cwd(), 'src', 'components', 'application-guide')
    const files = [
      ...fs.readdirSync(dir).filter((f) => f.endsWith('.tsx')),
      ...fs.readdirSync(path.join(dir, 'help-topics')).map((f) => path.join('help-topics', f)),
    ]
      .filter((f) => f.endsWith('.tsx'))
      .map((f) => path.join(dir, f))
    // Page copy only: drop JSX attribute values (className="list-none", fill="none").
    const copy = [
      ...files.map((f) => fs.readFileSync(f, 'utf-8').replace(/\w+="[^"]*"/g, '')),
      ...APPLICATION_FIELDS_POLICY.body,
      ...TRACK_KEYS.flatMap((track) =>
        sectionsForTrack(track).flatMap((s) => [s.title, s.why, s.how, s.optionalWhy ?? ''])
      ),
      ...TRACK_KEYS.flatMap((track) =>
        worksheetForTrack(track).flatMap((g) => g.items.map((i) => i.label))
      ),
    ].join('\n')
    const placeholders = [...copy.matchAll(/\bnone\b|\bn\/a\b|none\.(org|com)/gi)]
    for (const m of placeholders) {
      // Only allowed inside a sentence about the EIN.
      const around = copy.slice(Math.max(0, m.index! - 160), m.index! + 40)
      expect({ match: around, aboutEin: /\bEIN\b/.test(around) }).toEqual({
        match: around,
        aboutEin: true,
      })
    }
  })

  it('keeps the EIN required on both forms, with NONE allowed only on the pre-501(c)(3) form', () => {
    const ein = APPLICATION_FIELD_SECTIONS.find((s) => s.id === 'ein')!
    expect(ein.fields.every((f) => f.r33 === 'R' && f.r16 === 'R')).toBe(true)
    const how501 = textFor(ein.how, '501c3')
    const howPre = textFor(ein.how, 'pre501c3')
    expect(how501).toMatch(/must enter yours/)
    expect(how501).not.toMatch(/\bnone\b/i)
    expect(howPre).toMatch(/free from the IRS/)
    expect(howPre).toMatch(/never pay/i)
    expect(howPre).toMatch(/Pre-501\(c\)\(3\) groups that do not have an EIN yet may enter NONE/)
    const label = (track: '501c3' | 'pre501c3') =>
      worksheetForTrack(track)
        .flatMap((g) => g.items)
        .find((i) => i.label.startsWith('EIN'))!.label
    expect(label('501c3')).not.toMatch(/\bnone\b/i)
    expect(label('pre501c3')).toMatch(/NONE/)
  })

  it('never mentions a coupon code', () => {
    const copy = JSON.stringify([APPLICATION_FIELD_SECTIONS, APPLICATION_WORKSHEET, HELP_TOPICS])
    expect(copy).not.toMatch(/coupon|promo code|discount code/i)
  })

  it('is registered on the guides hub', () => {
    expect(guidesData.guides.map((g) => g.href)).toContain('/application-guide/')
  })
})

describe('Per-form filtering', () => {
  it.each(TRACK_KEYS)('the %s guide shows only the fields its form asks', (track) => {
    const key = TRACKS[track].key
    const shown = sectionsForTrack(track).flatMap((s) => s.fields)
    expect(shown.length).toBe(allFields.filter((f) => f[key] !== '-').length)
    for (const f of shown) expect(f[key]).not.toBe('-')
  })

  it('drops sections the form does not ask at all, keeping the same ids', () => {
    const ids501 = sectionsForTrack('501c3').map((s) => s.id)
    const idsPre = sectionsForTrack('pre501c3').map((s) => s.id)
    expect(ids501).toContain('officers')
    expect(ids501).not.toContain('team-members')
    expect(ids501).not.toContain('techsoup-email')
    expect(idsPre).toContain('team-members')
    expect(idsPre).not.toContain('officers')
    expect(idsPre).not.toContain('other-board')
    for (const id of ['before-you-start', 'ein', 'candid', 'officer-linkedin', 'certifications']) {
      expect(ids501).toContain(id)
      expect(idsPre).toContain(id)
    }
  })

  it.each(TRACK_KEYS)('the %s worksheet lists only questions its form asks', (track) => {
    const items = worksheetForTrack(track).flatMap((g) => g.items)
    expect(items.length).toBeGreaterThan(20)
    for (const item of items) expect(['R', 'O']).toContain(item.requirement)
  })

  it('shows "why it’s optional" only where the form has an optional field', () => {
    const candid501 = sectionsForTrack('501c3').find((s) => s.id === 'candid')!
    const candidPre = sectionsForTrack('pre501c3').find((s) => s.id === 'candid')!
    expect(candid501.optionalWhy).toBeUndefined()
    expect(candidPre.optionalWhy).toMatch(/optional on the pre-501\(c\)\(3\) form/)
  })
})

describe('Help topics', () => {
  it('ties each topic to the right forms', () => {
    const slugs = (track: '501c3' | 'pre501c3') => helpTopicsForTrack(track).map((t) => t.slug)
    expect(slugs('pre501c3')).toContain('getting-501c3')
    expect(slugs('501c3')).not.toContain('getting-501c3')
    expect(slugs('501c3')).toContain('guidestar-candid')
    expect(slugs('pre501c3')).not.toContain('guidestar-candid')
    for (const shared of [
      'mission-statement',
      'board-requirements',
      'public-contact-info',
      'mailing-address',
      'social-media',
    ]) {
      expect(slugs('501c3')).toContain(shared)
      expect(slugs('pre501c3')).toContain(shared)
    }
  })

  it('expands real guide sections that the topic’s forms ask', () => {
    const ids = APPLICATION_FIELD_SECTIONS.map((s) => s.id)
    for (const topic of HELP_TOPICS) {
      for (const id of topic.sections) expect(ids).toContain(id)
      for (const track of topic.tracks) {
        const shown = sectionsForTrack(track).filter((s) => topic.sections.includes(s.id))
        expect({ topic: topic.slug, track, sections: shown.length > 0 }).toEqual({
          topic: topic.slug,
          track,
          sections: true,
        })
      }
    }
  })

  it('every section help reference names a known topic', () => {
    const known = HELP_TOPICS.map((t) => t.slug)
    for (const s of APPLICATION_FIELD_SECTIONS) {
      for (const slug of s.help ?? []) expect(known).toContain(slug)
    }
  })
})

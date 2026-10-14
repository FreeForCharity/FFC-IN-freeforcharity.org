import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe } from '../utils/axe'
import ChooserPage from '@/app/application-guide/page'
import Guide501c3Page from '@/app/501c3/application-guide/page'
import GuidePre501c3Page from '@/app/pre501c3/application-guide/page'
import Help501c3Route, {
  generateStaticParams as help501c3Params,
} from '@/app/501c3/help/[slug]/page'
import HelpPreRoute, {
  generateStaticParams as helpPreParams,
} from '@/app/pre501c3/help/[slug]/page'
import Page501c3 from '@/app/501c3/page'
import PagePre501c3 from '@/app/pre501c3/page'
import HelpTopicPage from '@/components/application-guide/HelpTopicPage'
import { WRONG_TRACK_WARNING } from '@/components/application-guide/WrongTrackWarning'
import { helpSlugOrNotFound } from '@/components/application-guide/help-route'
import Header from '@/components/header'
import {
  APPLICATION_FIELD_SECTIONS,
  TRACK_KEYS,
  sectionsForTrack,
  type Track,
} from '@/data/application-fields'
import { helpPath, helpTopicsForTrack } from '@/data/application-help'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

jest.mock('@/lib/assetPath', () => ({
  assetPath: (path: string) => path,
}))

const APPLY_URL: Record<Track, string> = {
  '501c3': 'https://freeforcharity.org/hub/cart.php?a=add&pid=33',
  pre501c3: 'https://freeforcharity.org/hub/cart.php?a=add&pid=16',
}
const OTHER: Record<Track, Track> = { '501c3': 'pre501c3', pre501c3: '501c3' }
const GUIDES: [Track, React.ComponentType][] = [
  ['501c3', Guide501c3Page],
  ['pre501c3', GuidePre501c3Page],
]

// next/link drops the trailing slash under Jest (the export adds it back via
// trailingSlash: true), so compare internal paths without it.
const norm = (href: string) => href.replace(/\/(?=#|$)/, '')
const hrefsIn = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('a')).map((a) => norm(a.getAttribute('href') ?? ''))

/** Every Apply link must be exactly this form's pid, and there must be at least one. */
function expectOnlyOwnApplyLinks(container: HTMLElement, track: Track) {
  const applyLinks = hrefsIn(container).filter((h) => h.includes('cart.php'))
  expect(applyLinks.length).toBeGreaterThan(0)
  for (const href of applyLinks) expect(href).toBe(APPLY_URL[track])
  expect(hrefsIn(container)).not.toContain(APPLY_URL[OTHER[track]])
}

/** The big warning is on the page, and every Apply button sits right under one. */
function expectWarnings(container: HTMLElement, track: Track) {
  const warnings = container.querySelectorAll('[data-testid="wrong-application-warning"]')
  expect(warnings.length).toBeGreaterThanOrEqual(2)
  const text = warnings[0].textContent ?? ''
  expect(text).toContain(WRONG_TRACK_WARNING[track].headline)
  expect(text).toContain('STOP: do not click Apply.')
  for (const apply of Array.from(container.querySelectorAll('a[href*="cart.php"]'))) {
    const block = apply.closest('section')!
    expect(block.querySelector('[data-testid="wrong-application-warning"]')).not.toBeNull()
  }
}

describe('Application guide chooser (/application-guide/)', () => {
  it('asks which application is yours and links both guides', () => {
    const { container } = render(<ChooserPage />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Which application is yours?' })
    ).toBeInTheDocument()
    expect(container.textContent).toMatch(/IRS determination letter/)
    const hrefs = hrefsIn(container)
    expect(hrefs).toContain('/501c3/application-guide')
    expect(hrefs).toContain('/pre501c3/application-guide')
    expect(hrefs.filter((h) => h.includes('cart.php'))).toEqual([])
  })
})

describe.each(GUIDES)('%s application guide', (track, Page) => {
  it('shows only that form’s fields, with stable section ids', () => {
    const { container } = render(<Page />)
    for (const section of sectionsForTrack(track)) {
      expect(container.querySelector(`#${section.id}`)).not.toBeNull()
    }
    const key = track === '501c3' ? 'r33' : 'r16'
    const notAsked = APPLICATION_FIELD_SECTIONS.flatMap((s) => s.fields).filter(
      (f) => f[key] === '-'
    )
    const rowLabels = Array.from(container.querySelectorAll('tbody th')).map((th) => th.textContent)
    for (const f of notAsked) expect(rowLabels).not.toContain(f.label)
    expect(container.querySelector('#worksheet')).not.toBeNull()
  })

  it('has the policy box, the save-your-answers box and the read-first note', () => {
    const { container } = render(<Page />)
    expect(
      screen.getByRole('heading', { name: 'Why every required field is required' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Save every answer in a Word document or Google Doc/ })
    ).toBeInTheDocument()
    expect(container.textContent).toMatch(/Read this whole page before you start/)
    expect(container.textContent).toMatch(/demand for them is very high/)
  })

  it('has an Apply button with the exact pid and no cross-form Apply links', () => {
    const { container } = render(<Page />)
    expectOnlyOwnApplyLinks(container, track)
  })

  it('shows the wrong-application warning at the top and next to Apply', () => {
    const { container } = render(<Page />)
    expectWarnings(container, track)
    // The warning sends the reader to the other form's guide, never its Apply.
    expect(hrefsIn(container)).toContain(`/${OTHER[track]}/application-guide`)
  })

  it('links sections to this form’s help pages only', () => {
    const { container } = render(<Page />)
    const hrefs = hrefsIn(container)
    for (const topic of helpTopicsForTrack(track)) {
      expect(hrefs).toContain(norm(helpPath(track, topic.slug)))
    }
    expect(hrefs.some((h) => h.startsWith(`/${OTHER[track]}/help/`))).toBe(false)
  })

  it('has no axe violations', async () => {
    const { container } = render(<Page />)
    expect(await axe(container)).toHaveNoViolations()
  }, 60000)
})

describe('Help pages', () => {
  it('builds each form’s topics only', () => {
    expect(help501c3Params().map((p) => p.slug)).not.toContain('getting-501c3')
    expect(helpPreParams().map((p) => p.slug)).not.toContain('guidestar-candid')
    expect(help501c3Params()).toHaveLength(helpTopicsForTrack('501c3').length)
    expect(helpPreParams()).toHaveLength(helpTopicsForTrack('pre501c3').length)
    expect(() => helpSlugOrNotFound('501c3', 'getting-501c3')).toThrow('NEXT_NOT_FOUND')
    expect(() => helpSlugOrNotFound('pre501c3', 'guidestar-candid')).toThrow('NEXT_NOT_FOUND')
  })

  const cases = TRACK_KEYS.flatMap((track) =>
    helpTopicsForTrack(track).map((t) => [track, t.slug] as const)
  )

  it.each(cases)('/%s/help/%s/ has the warning, its own Apply and a way back', (track, slug) => {
    const { container } = render(<HelpTopicPage track={track} slug={slug} />)
    expectWarnings(container, track)
    expectOnlyOwnApplyLinks(container, track)
    expect(hrefsIn(container)).toContain(`/${track}/application-guide`)
    expect(
      screen.getByRole('heading', { name: new RegExp(`What the .* application asks`) })
    ).toBeInTheDocument()
  })

  it('renders through the route components', async () => {
    const el501 = await Help501c3Route({ params: Promise.resolve({ slug: 'board-requirements' }) })
    const { container, unmount } = render(el501)
    expectOnlyOwnApplyLinks(container, '501c3')
    unmount()
    const elPre = await HelpPreRoute({ params: Promise.resolve({ slug: 'getting-501c3' }) })
    const pre = render(elPre)
    expectOnlyOwnApplyLinks(pre.container, 'pre501c3')
    expect(pre.container.querySelector('#fiscal-sponsorship')).not.toBeNull()
    expect(pre.container.querySelector('#form-1023')).not.toBeNull()
  })

  it.each([
    ['501c3', 'board-requirements'],
    ['pre501c3', 'getting-501c3'],
  ] as const)(
    '/%s/help/%s/ has no axe violations',
    async (track, slug) => {
      const { container } = render(<HelpTopicPage track={track} slug={slug} />)
      expect(await axe(container)).toHaveNoViolations()
    },
    60000
  )
})

describe('Onboarding pages link their own application guide', () => {
  it.each([
    ['501c3', Page501c3],
    ['pre501c3', PagePre501c3],
  ] as const)(
    '/%s/ links /%s/application-guide/ and nothing on ffcadmin’s old guides',
    (track, Page) => {
      const { container } = render(<Page />)
      const hrefs = hrefsIn(container)
      expect(hrefs).toContain(`/${track}/application-guide`)
      expect(hrefs).toContain(`/${track}/application-guide#worksheet`)
      for (const href of hrefs) {
        expect(href).not.toMatch(/ffcadmin\.org\/(guides\/application-fields|intake-help)/)
        expect(href).not.toMatch(new RegExp(`^/${OTHER[track]}/(application-guide|help)/`))
      }
    }
  )
})

describe('Navigation', () => {
  const NAV = [
    ['501(c)(3) Application Guide', '/501c3/application-guide'],
    ['Pre-501(c)(3) Application Guide', '/pre501c3/application-guide'],
  ]

  function expectAfterOnboardingGuides(scope: HTMLElement) {
    const labels = within(scope)
      .getAllByRole('link')
      .map((a) => a.textContent)
    const pre = labels.indexOf('Pre501c3 Onboarding Guide')
    expect(labels.indexOf('501c3 Onboarding Guide')).toBe(pre - 1)
    expect(labels[pre + 1]).toBe(NAV[0][0])
    expect(labels[pre + 2]).toBe(NAV[1][0])
  }

  it('lists both application guides in the desktop Help for Charities dropdown', () => {
    const { container } = render(<Header />)
    const desktop = container.querySelector('nav')!
    fireEvent.mouseEnter(within(desktop).getByText('Help for Charities').closest('li')!)
    for (const [label, href] of NAV) {
      expect(within(desktop).getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
    expectAfterOnboardingGuides(desktop)
  })

  it('lists both application guides in the mobile menu', () => {
    const { container } = render(<Header />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    const mobile = container.querySelector('.lg\\:hidden.absolute') as HTMLElement
    expect(mobile).not.toBeNull()
    for (const [label, href] of NAV) {
      expect(within(mobile).getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
    expectAfterOnboardingGuides(mobile)
  })
})

import React from 'react'
import { act, render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe } from '../utils/axe'
import Page501c3 from '@/app/501c3/page'
import PagePre501c3 from '@/app/pre501c3/page'
import HelpForCharities from '@/app/help-for-charities/page'
import Domains from '@/app/domains/page'
import Hosting from '@/app/free-charity-web-hosting/page'
import OnlineImpacts from '@/app/online-impacts-onboarding-guide/page'
import Journey from '@/app/charity-onboarding-journey/page'
import ValidationGuide from '@/app/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes/page'
import Help501c3Route, {
  generateStaticParams as help501c3Params,
} from '@/app/501c3/help/[slug]/page'
import HelpPreRoute, {
  generateStaticParams as helpPreParams,
} from '@/app/pre501c3/help/[slug]/page'
import HelpTopicPage from '@/components/application-guide/HelpTopicPage'
import HelpMeChoose from '@/components/ui/HelpMeChoose'
import { WRONG_TRACK_WARNING } from '@/components/application-guide/WrongTrackWarning'
import { helpSlugOrNotFound } from '@/components/application-guide/help-route'
import { expandHashTarget } from '@/components/application-guide/HashAutoExpand'
import Header from '@/components/header'
import {
  APPLICATION_FIELD_SECTIONS,
  TRACK_KEYS,
  TRACKS,
  sectionsForTrack,
  type Track,
} from '@/data/application-fields'
import { helpPath, helpTopicsForTrack } from '@/data/application-help'
import { COMMITMENTS, POLICY_PAGES_SENTENCE } from '@/data/charity-terms'
import { HOW_IT_WORKS_STEPS } from '@/data/journey'
import { NO_TIMELINE_STATEMENT } from '@/data/faqs'
import HomeFaqs from '@/components/home-page/FrequentlyAskedQuestions'

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
const PAGES: [Track, React.ComponentType][] = [
  ['501c3', Page501c3],
  ['pre501c3', PagePre501c3],
]

// next/link drops the trailing slash under Jest (the export adds it back via
// trailingSlash: true), so compare internal paths without it.
const norm = (href: string) => href.replace(/\/(?=#|$)/, '')
const hrefsIn = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('a')).map((a) => norm(a.getAttribute('href') ?? ''))
const onboardingCartLinks = (container: HTMLElement) =>
  hrefsIn(container).filter((h) => /cart\.php\?a=add&pid=(33|16)\b/.test(h))

afterEach(() => {
  window.history.replaceState(null, '', '/')
})

describe.each(PAGES)('/%s/: the single application page', (track, Page) => {
  it('runs top to bottom in the agreed order', () => {
    const { container } = render(<Page />)
    const order = [
      '[data-testid="track-intro"]',
      '#right-application',
      '#commitments',
      '#how-it-works',
      '#get-ready',
      '#field-guide',
      '#apply',
      '#after-you-apply',
      '#contact',
    ].map((sel) => {
      const el = container.querySelector(sel)
      expect({ sel, found: Boolean(el) }).toEqual({ sel, found: true })
      return el!
    })
    for (let i = 1; i < order.length; i++) {
      expect(
        order[i - 1].compareDocumentPosition(order[i]) & Node.DOCUMENT_POSITION_FOLLOWING
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    }
    expect(container.querySelector('[data-testid="track-intro"]')!.textContent).toBe(
      TRACKS[track].forWhom
    )
  })

  it('opens with the big red box, with the criteria and the Help me choose picker inside', () => {
    const { container } = render(<Page />)
    const warning = container.querySelector(
      '#right-application [data-testid="wrong-application-warning"]'
    )!
    expect(warning).not.toBeNull()
    expect(
      within(warning as HTMLElement).getByRole('heading', {
        name: 'Is this the right application?',
      })
    ).toBeInTheDocument()
    expect(warning.textContent).toContain(WRONG_TRACK_WARNING[track].headline)
    expect(warning.textContent).toContain('STOP: do not click Apply.')
    expect(warning.textContent).toMatch(/under \$1 million\. This is a hard limit/)
    expect(warning.textContent).toMatch(/not primarily funded by federal grants/)
    expect(warning.textContent).toMatch(/fiscally sponsored/)
    expect(warning.textContent).toMatch(/United States/)
    expect(warning.textContent).toContain('520-222-8104')
    expect(warning.querySelector('[data-testid="help-me-choose"]')).not.toBeNull()
    // The other track is a text link to its page, never its Apply button.
    expect(hrefsIn(warning as HTMLElement)).toContain(norm(TRACKS[OTHER[track]].pagePath))
    expect(onboardingCartLinks(warning as HTMLElement)).toEqual([])
  })

  it('has exactly one Apply button, for this form only, after the box and right under the warning', () => {
    const { container } = render(<Page />)
    expect(onboardingCartLinks(container)).toEqual([APPLY_URL[track]])
    const apply = container.querySelector(`a[href="${APPLY_URL[track]}"]`)!
    const box = container.querySelector('#right-application')!
    expect(box.compareDocumentPosition(apply) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    )
    const block = apply.closest('#apply')!
    const repeated = block.querySelector('[data-testid="wrong-application-warning"]')!
    expect(repeated.textContent).toContain(WRONG_TRACK_WARNING[track].headline)
    expect(repeated.compareDocumentPosition(apply) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    )
  })

  it('summarizes the six commitments and links the Terms of Service', () => {
    const { container } = render(<Page />)
    const section = container.querySelector('#commitments')!
    expect(section.querySelectorAll('li')).toHaveLength(6)
    for (const c of COMMITMENTS) expect(section.textContent).toContain(c.body)
    expect(section.textContent).toMatch(/multi-factor authentication/)
    expect(section.textContent).toMatch(/no guaranteed response time/)
    expect(section.textContent).toMatch(/We’re all volunteers/)
    expect(section.textContent).toMatch(/“Free For Charity” credit/)
    expect(section.textContent).toMatch(/About 30 minutes once a year/)
    expect(hrefsIn(section as HTMLElement)).toContain('/terms-of-service')
  })

  it('shows the one canonical step list, in order, with times', () => {
    const { container } = render(<Page />)
    const steps = container.querySelectorAll('#how-it-works li')
    expect(steps).toHaveLength(HOW_IT_WORKS_STEPS.length)
    HOW_IT_WORKS_STEPS.forEach((step, i) => {
      expect(steps[i].textContent).toContain(step.title)
      expect(steps[i].textContent).toContain(`Typical time: ${step.time}`)
    })
    const text = container.querySelector('#how-it-works')!.textContent!
    expect(text).toMatch(/coupon from your acceptance email/)
    expect(text).toMatch(/\$1 verification charge, and the coupon brings it to \$0/)
  })

  it('says save your answers first and why every required field is required', () => {
    const { container } = render(<Page />)
    const ready = container.querySelector('#get-ready')!
    expect(ready.textContent).toMatch(/Save every answer in a Word document or Google Doc first/)
    expect(ready.textContent).toMatch(/Why every required field is required/)
    expect(ready.textContent).toMatch(/demand for them is very high/)
    expect(hrefsIn(ready as HTMLElement)).toContain('#worksheet')
  })

  it('has the field guide inline: only this form’s fields, collapsible, same section ids', () => {
    const { container } = render(<Page />)
    const guide = container.querySelector('#field-guide')!
    expect(guide.querySelector('details#worksheet')).not.toBeNull()
    for (const section of sectionsForTrack(track)) {
      const group = guide.querySelector(`details#${section.id}`) as HTMLDetailsElement
      expect({ id: section.id, group: Boolean(group) }).toEqual({ id: section.id, group: true })
      expect(group.open).toBe(false)
    }
    const key = TRACKS[track].key
    const notAsked = APPLICATION_FIELD_SECTIONS.flatMap((s) => s.fields).filter(
      (f) => f[key] === '-'
    )
    const rowLabels = Array.from(guide.querySelectorAll('tbody th')).map((th) => th.textContent)
    for (const f of notAsked) expect(rowLabels).not.toContain(f.label)
    // The old overlapping lists are gone.
    expect(container.textContent).not.toMatch(/External Validation Preparation/)
    expect(container.textContent).not.toMatch(/Before You Begin Onboarding/)
  })

  it('links field groups to this form’s help pages only', () => {
    const { container } = render(<Page />)
    const hrefs = hrefsIn(container)
    for (const topic of helpTopicsForTrack(track)) {
      expect(hrefs).toContain(norm(helpPath(track, topic.slug)))
    }
    expect(hrefs.some((h) => h.startsWith(`/${OTHER[track]}/help/`))).toBe(false)
  })

  it('auto-expands and scrolls to the group named in the URL hash', () => {
    window.history.replaceState(null, '', '#officer-linkedin')
    const scroll = jest.fn()
    Element.prototype.scrollIntoView = scroll
    const { container } = render(<Page />)
    const group = container.querySelector('details#officer-linkedin') as HTMLDetailsElement
    expect(group.open).toBe(true)
    expect(scroll).toHaveBeenCalled()
    // A later in-page hash change opens that group too.
    act(() => {
      window.history.replaceState(null, '', '#worksheet')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect((container.querySelector('details#worksheet') as HTMLDetailsElement).open).toBe(true)
  })

  it('condenses what happens after you apply, with the site-owner hub and roadmap', () => {
    const { container } = render(<Page />)
    const after = container.querySelector('#after-you-apply')!
    expect(after.textContent).toContain(POLICY_PAGES_SENTENCE)
    expect(after.textContent).toMatch(/“Add your logo” GitHub issue/)
    expect(after.textContent).toMatch(/you never edit DNS/)
    expect(hrefsIn(after as HTMLElement)).toEqual(
      expect.arrayContaining(['https://ffcadmin.org/site-owner', 'https://ffcadmin.org/roadmap'])
    )
    if (track === '501c3') {
      expect(after.textContent).toMatch(/Microsoft 365 Business Basic/)
    } else {
      expect(after.textContent).toMatch(/Charity email comes only after the IRS approves/)
      expect(after.textContent).toMatch(/yourcharityname@gmail\.com/)
    }
  })

  it('has no axe violations', async () => {
    const { container } = render(<Page />)
    expect(await axe(container)).toHaveNoViolations()
  }, 60000)
})

describe('Help me choose', () => {
  const pick = (container: HTMLElement, label: RegExp) =>
    fireEvent.click(within(container).getByRole('radio', { name: label }))

  it('never renders an Apply (cart) link, whatever you choose', () => {
    const { container } = render(<HelpMeChoose />)
    const radios = within(container).getAllByRole('radio')
    for (const radio of radios) {
      fireEvent.click(radio)
      expect(onboardingCartLinks(container)).toEqual([])
    }
  })

  it('on /501c3/: a determination letter is the right place; pre-501(c)(3) is STOP', () => {
    const { container } = render(<HelpMeChoose embedded currentTrack="501c3" />)
    pick(container, /determination letter/)
    expect(container.textContent).toMatch(/You’re in the right place/)
    pick(container, /applied for 501\(c\)\(3\) but aren’t approved/)
    expect(container.textContent).toMatch(/STOP: do not click Apply on this page/)
    expect(hrefsIn(container)).toContain('/pre501c3')
  })

  it('on /pre501c3/: a determination letter is STOP, with a text link to /501c3/', () => {
    const { container } = render(<HelpMeChoose embedded currentTrack="pre501c3" />)
    pick(container, /determination letter/)
    expect(container.textContent).toMatch(/STOP: do not click Apply on this page/)
    expect(hrefsIn(container)).toContain('/501c3')
  })

  it('treats $1M revenue as a hard gate and flags federal funding', () => {
    const { container } = render(<HelpMeChoose />)
    pick(container, /\$1 million or more/)
    expect(container.textContent).toMatch(/hard gate/)
    expect(container.textContent).toMatch(/Please don’t apply/)
    pick(container, /federal grants or contracts/)
    expect(container.textContent).toMatch(/aren’t primarily federally funded/)
  })

  it('routes fiscally sponsored projects through their sponsor', () => {
    const { container } = render(<HelpMeChoose />)
    pick(container, /fiscal sponsor/)
    expect(container.textContent).toMatch(/must apply and approve your project/)
    expect(container.textContent).toMatch(/email grants attach to the\s+sponsor/)
    expect(hrefsIn(container)).toEqual(
      expect.arrayContaining([
        '/501c3',
        '/pre501c3',
        '/pre501c3/help/getting-501c3#fiscal-sponsorship',
      ])
    )
  })
})

describe('Funnel pages route to the application pages (no direct Apply buttons)', () => {
  const FUNNEL: [string, React.ComponentType][] = [
    ['/help-for-charities/', HelpForCharities],
    ['/domains/', Domains],
    ['/free-charity-web-hosting/', Hosting],
    ['/online-impacts-onboarding-guide/', OnlineImpacts],
  ]

  it.each(FUNNEL)(
    '%s has no onboarding cart links and links both application pages',
    (_r, Page) => {
      const { container } = render(<Page />)
      expect(onboardingCartLinks(container)).toEqual([])
      const hrefs = hrefsIn(container)
      expect(hrefs).toContain('/501c3')
      expect(hrefs).toContain('/pre501c3')
    }
  )

  it('/help-for-charities/ has "Which application is yours?" with the cards and the picker', () => {
    const { container } = render(<HelpForCharities />)
    const section = container.querySelector('#which-application')!
    expect(
      within(section as HTMLElement).getByRole('heading', { name: 'Which application is yours?' })
    ).toBeInTheDocument()
    expect(section.textContent).toMatch(/determination letter/)
    expect(section.querySelectorAll('[data-testid="track-card"]')).toHaveLength(2)
    expect(within(section as HTMLElement).getByText('Help me choose')).toBeInTheDocument()
    expect(hrefsIn(container)).not.toContain('#apply')
  })

  it('/domains/ keeps the domain order links (pid 39/41) but no onboarding Apply', () => {
    const { container } = render(<Domains />)
    const hrefs = hrefsIn(container)
    expect(hrefs.some((h) => h.includes('a=add&pid=39'))).toBe(true)
    expect(hrefs.some((h) => h.includes('a=add&pid=41'))).toBe(true)
  })
})

describe('Clarke’s decisions, on every page touched', () => {
  const TOUCHED: [string, React.ComponentType][] = [
    ['/501c3/', Page501c3],
    ['/pre501c3/', PagePre501c3],
    ['/help-for-charities/', HelpForCharities],
    ['/domains/', Domains],
    ['/free-charity-web-hosting/', Hosting],
    ['/online-impacts-onboarding-guide/', OnlineImpacts],
    ['/charity-onboarding-journey/', Journey],
  ]

  it.each(TOUCHED)('%s: no guaranteed response times', (_r, Page) => {
    const text = render(<Page />).container.textContent ?? ''
    expect(text).not.toMatch(/within a (day|couple of)/i)
    expect(text).not.toMatch(/\d+\s*(–|-|to)?\s*\d*\s*business days/i)
    expect(text).not.toMatch(/within 24 hours/i)
  })

  it.each(TOUCHED)('%s: no FFC donation policy on charity sites', (_r, Page) => {
    const { container } = render(<Page />)
    expect(hrefsIn(container)).not.toContain('/free-for-charity-donation-policy')
    expect(container.textContent).not.toMatch(/(FFC|Free For Charity)(’s)? donation policy/i)
  })

  it.each(TOUCHED)('%s: Microsoft 365 is Business Basic, never Premium', (_r, Page) => {
    const text = render(<Page />).container.textContent ?? ''
    expect(text).not.toMatch(/Business Premium/)
    expect(text).not.toMatch(/10 free accounts/)
  })

  it.each([
    ['/domains/', Domains],
    ['/free-charity-web-hosting/', Hosting],
    ['the homepage FAQ', HomeFaqs],
  ] as [string, React.ComponentType][])(
    '%s: no capacity numbers, just the no-timeline statement',
    (_r, Page) => {
      const { container } = render(<Page />)
      // The hosting and homepage FAQs keep their answers collapsed; read the DOM text.
      const text = container.textContent ?? ''
      expect(text).toContain(NO_TIMELINE_STATEMENT)
      expect(text).not.toMatch(/per week|charities a year|1 new charity/i)
    }
  )

  it('/domains/: FFC handles DNS and pre-501(c)(3) email waits for approval', () => {
    const text = render(<Domains />).container.textContent ?? ''
    expect(text).not.toMatch(/Cloudflare Username and Password/i)
    expect(text).toMatch(/You never edit DNS yourself/)
    expect(text).toMatch(/Charity email waits until the IRS approves your 501\(c\)\(3\)/)
    expect(text).toMatch(/coupon arrives\s+in your acceptance email/)
  })

  it('/free-charity-web-hosting/: content comes on the application, not later', () => {
    const text = render(<Hosting />).container.textContent ?? ''
    expect(text).not.toMatch(/Send your logo, photos/i)
    expect(text).toMatch(/There is nothing else to send/)
  })

  it('/online-impacts-onboarding-guide/: short closure notice, contact, two application cards', () => {
    const { container } = render(<OnlineImpacts />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/Online Impacts has closed/)
    expect(text).toMatch(/can continue\s+with Free For Charity/)
    expect(text).toMatch(/Clarke Moyer/)
    const hrefs = hrefsIn(container)
    expect(hrefs).toContain('tel:+15202228104')
    expect(hrefs).toContain('mailto:clarkemoyer@freeforcharity.org')
    expect(container.querySelectorAll('[data-testid="track-card"]')).toHaveLength(2)
    // Everything else is gone: old checklists, accordions, founders' contacts, step list.
    expect(text).not.toMatch(/Before You Begin Onboarding/)
    expect(text).not.toMatch(/External Validation Preparation/)
    expect(text).not.toMatch(/onlineimpacts\.org|Pardhasaradhi/)
    expect(container.querySelector('[data-testid="how-it-works-steps"]')).toBeNull()
    expect(container.querySelector('[data-testid="help-me-choose"]')).toBeNull()
  })

  it('the validation guide is US only (no "Global")', () => {
    const text = render(<ValidationGuide />).container.textContent ?? ''
    expect(text).not.toMatch(/Global/)
  })

  it('/charity-onboarding-journey/ renders the same canonical step list', () => {
    const { container } = render(<Journey />)
    const steps = container.querySelectorAll('[data-testid="how-it-works-steps"] li')
    expect(steps).toHaveLength(HOW_IT_WORKS_STEPS.length)
    HOW_IT_WORKS_STEPS.forEach((step, i) => expect(steps[i].textContent).toContain(step.detail))
  })
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

  it.each(cases)(
    '/%s/help/%s/: warning, its own Apply under it, and a back-link to the track section',
    (track, slug) => {
      const { container } = render(<HelpTopicPage track={track} slug={slug} />)
      const warnings = container.querySelectorAll('[data-testid="wrong-application-warning"]')
      expect(warnings.length).toBeGreaterThanOrEqual(2)
      expect(warnings[0].textContent).toContain(WRONG_TRACK_WARNING[track].headline)
      expect(onboardingCartLinks(container)).toEqual([APPLY_URL[track]])
      // Exact accessible name (no regex built from page text).
      const back = screen.getAllByRole('link', {
        name: `Back to the ${TRACKS[track].pageTitle} page`,
      })[0]
      expect(norm(back.getAttribute('href') ?? '')).toMatch(new RegExp(`^/${track}#[a-z-]+$`))
    }
  )

  it('renders through the route components', async () => {
    const el = await Help501c3Route({ params: Promise.resolve({ slug: 'board-requirements' }) })
    const a = render(el)
    expect(onboardingCartLinks(a.container)).toEqual([APPLY_URL['501c3']])
    a.unmount()
    const elPre = await HelpPreRoute({ params: Promise.resolve({ slug: 'getting-501c3' }) })
    const pre = render(elPre)
    expect(onboardingCartLinks(pre.container)).toEqual([APPLY_URL.pre501c3])
    expect(pre.container.querySelector('#fiscal-sponsorship')).not.toBeNull()
    expect(pre.container.querySelector('#form-1023')).not.toBeNull()
  })

  it('has no axe violations', async () => {
    const { container } = render(<HelpTopicPage track="pre501c3" slug="getting-501c3" />)
    expect(await axe(container)).toHaveNoViolations()
  }, 60000)
})

describe('expandHashTarget', () => {
  it('opens a closed details group by id and ignores unknown ids', () => {
    document.body.innerHTML = '<details id="ein"><summary>EIN</summary>x</details>'
    expect(expandHashTarget('#nope')).toBe(false)
    expect(expandHashTarget('#ein')).toBe(true)
    expect((document.getElementById('ein') as HTMLDetailsElement).open).toBe(true)
  })
})

describe('Navigation', () => {
  function expectDoors(scope: HTMLElement) {
    const labels = within(scope)
      .getAllByRole('link')
      .map((a) => a.textContent)
    const i = labels.indexOf('501(c)(3) Application')
    expect(i).toBeGreaterThan(-1)
    expect(labels[i + 1]).toBe('Pre-501(c)(3) Application')
    expect(
      labels.some((l) => /Application Guide|Onboarding Guide$|Online Impacts/.test(l ?? ''))
    ).toBe(false)
    expect(labels.some((l) => /WordPress/.test(l ?? ''))).toBe(false)
    expect(within(scope).getByRole('link', { name: '501(c)(3) Application' })).toHaveAttribute(
      'href',
      '/501c3'
    )
    expect(within(scope).getByRole('link', { name: 'Pre-501(c)(3) Application' })).toHaveAttribute(
      'href',
      '/pre501c3'
    )
  }

  it('desktop Help for Charities dropdown: the two application pages are the doors', () => {
    const { container } = render(<Header />)
    const desktop = container.querySelector('nav')!
    fireEvent.mouseEnter(within(desktop).getByText('Help for Charities').closest('li')!)
    expectDoors(desktop)
  })

  it('mobile menu shows the same doors', () => {
    const { container } = render(<Header />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    expectDoors(container.querySelector('.lg\\:hidden.absolute') as HTMLElement)
  })
})

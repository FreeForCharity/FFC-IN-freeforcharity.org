import React from 'react'
import { render } from '@testing-library/react'
import { axe } from '../../utils/axe'
import JourneyDiagram from '@/components/journey/JourneyDiagram'

describe('JourneyDiagram', () => {
  it('renders both variants as accessible images with title and description', () => {
    const { getAllByRole } = render(<JourneyDiagram />)
    const diagrams = getAllByRole('img', {
      name: /five-stage Free For Charity onboarding journey/i,
    })
    // Horizontal (>= sm) and vertical (< sm) variants; CSS shows one at a time.
    expect(diagrams).toHaveLength(2)
    for (const diagram of diagrams) {
      const descId = diagram.getAttribute('aria-describedby')
      expect(descId).toBeTruthy()
      const desc = document.getElementById(descId as string)
      expect(desc?.textContent).toMatch(/funding gate/i)
    }
  })

  it('generates unique ids via useId so two instances never collide', () => {
    const { container } = render(
      <>
        <JourneyDiagram />
        <JourneyDiagram />
      </>
    )
    const ids = Array.from(container.querySelectorAll('[id]')).map((el) => el.id)
    expect(ids.length).toBeGreaterThanOrEqual(8) // 2 instances x 2 variants x (title + desc)
    expect(new Set(ids).size).toBe(ids.length)
    // No hardcoded static id left behind.
    expect(ids).not.toContain('journey-diagram-title')
    // Marker references must point at ids that exist (url(#...) wiring).
    for (const line of Array.from(container.querySelectorAll('[marker-end]'))) {
      const ref = (line.getAttribute('marker-end') || '').match(/url\(#(.+)\)/)?.[1]
      expect(ref).toBeTruthy()
      expect(container.querySelector(`marker[id="${ref}"]`)).not.toBeNull()
    }
  })

  it('shows all five stages in the gated order (both variants)', () => {
    const { container } = render(<JourneyDiagram />)
    for (const variant of ['horizontal', 'vertical']) {
      const text = container.querySelector(`[data-journey-variant="${variant}"]`)?.textContent || ''
      const apply = text.indexOf('Apply')
      const website = text.indexOf('Website')
      const domain = text.indexOf('Domain')
      const email = text.indexOf('Email')
      const ongoing = text.indexOf('Ongoing')

      expect(apply).toBeGreaterThan(-1)
      expect(website).toBeGreaterThan(apply)
      expect(domain).toBeGreaterThan(website)
      expect(email).toBeGreaterThan(domain)
      expect(ongoing).toBeGreaterThan(email)
    }
  })

  it('highlights the funding gate between website and domain (both variants)', () => {
    const { container } = render(<JourneyDiagram />)
    for (const variant of ['horizontal', 'vertical']) {
      const text = container.querySelector(`[data-journey-variant="${variant}"]`)?.textContent || ''
      expect(text).toContain('FUNDING GATE')
      expect(text).toMatch(/money is spent only after your site is proven/i)
      // The website stage sits on GitHub Pages before the gate
      expect(text).toContain('GitHub Pages')
    }
  })

  it('is responsive: a horizontal variant for >= sm and a stacked vertical variant below sm', () => {
    const { container } = render(<JourneyDiagram />)
    const horizontal = container.querySelector('[data-journey-variant="horizontal"]')
    const vertical = container.querySelector('[data-journey-variant="vertical"]')
    // Tailwind responsive classes on the wrappers toggle the variants —
    // media queries cannot toggle classes inside the svg itself.
    expect(horizontal?.getAttribute('class')).toContain('hidden')
    expect(horizontal?.getAttribute('class')).toContain('sm:block')
    expect(vertical?.getAttribute('class')).toContain('sm:hidden')
    for (const wrapper of [horizontal, vertical]) {
      const svg = wrapper?.querySelector('svg')
      expect(svg).toHaveAttribute('viewBox')
      expect(svg?.getAttribute('class')).toContain('w-full')
      expect(svg?.getAttribute('class')).toContain('max-w-full')
    }
  })

  it('keeps mobile text legible: every vertical-variant font renders >= 10px on a 320px viewport', () => {
    const { container } = render(<JourneyDiagram />)
    const svg = container.querySelector('[data-journey-variant="vertical"] svg') as SVGSVGElement
    const viewBoxWidth = Number((svg.getAttribute('viewBox') || '').split(/\s+/)[2])
    expect(viewBoxWidth).toBeGreaterThan(0)
    // The old single horizontal diagram scaled a 1002-unit viewBox down to a
    // phone width, rendering 13.5-unit text at ~4.6px. The stacked variant's
    // narrow viewBox must keep every label at a readable rendered size even
    // on the smallest common viewport (320px).
    const scale = 320 / viewBoxWidth
    const fontSizes = Array.from(svg.querySelectorAll('text')).map((t) =>
      Number(t.getAttribute('font-size'))
    )
    expect(fontSizes.length).toBeGreaterThan(0)
    for (const size of fontSizes) {
      expect(size * scale).toBeGreaterThanOrEqual(10)
    }
  })

  it('uses accessible brand colors (WCAG AA contrast)', () => {
    const { container } = render(<JourneyDiagram />)
    const html = container.innerHTML
    // FFC blue: #0567B1 on/under white = 5.86:1.
    expect(html).toContain('#0567B1')
    // Deep accessible orange: #A85400 on/under white = 5.34:1. The original
    // brand orange #F58C23 is only 2.43:1 on white — it must not be used for
    // any text or meaning-bearing element in the diagram.
    expect(html).toContain('#A85400')
    expect(html).not.toContain('#F58C23')
  })

  it('has no axe violations', async () => {
    const { container } = render(<JourneyDiagram />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})

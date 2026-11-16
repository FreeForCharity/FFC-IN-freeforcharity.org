import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Testimonials from '@/components/home/Testimonials'

const COUNT = 4

function mockMatchMedia(reduce: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: reduce && query.includes('prefers-reduced-motion: reduce'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
    }),
  })
}

describe('Testimonials carousel', () => {
  afterEach(() => {
    jest.useRealTimers()
    // @ts-expect-error -- jsdom has no matchMedia; remove the per-test mock.
    delete window.matchMedia
  })

  it('marks each testimonial as a numbered slide', () => {
    render(<Testimonials />)
    const slides = screen
      .getAllByRole('group')
      .filter((el) => el.getAttribute('aria-roledescription') === 'slide')
    expect(slides).toHaveLength(COUNT)
    expect(slides[0]).toHaveAccessibleName(`1 of ${COUNT}`)
  })

  it('Next moves to the second slide and Previous wraps to the last', () => {
    render(<Testimonials />)
    expect(screen.getByRole('button', { name: 'Go to testimonial 1' })).toHaveAttribute(
      'aria-current',
      'true'
    )
    fireEvent.click(screen.getByRole('button', { name: /next testimonial/i }))
    expect(screen.getByRole('button', { name: 'Go to testimonial 2' })).toHaveAttribute(
      'aria-current',
      'true'
    )
    fireEvent.click(screen.getByRole('button', { name: /previous testimonial/i }))
    fireEvent.click(screen.getByRole('button', { name: /previous testimonial/i }))
    expect(screen.getByRole('button', { name: `Go to testimonial ${COUNT}` })).toHaveAttribute(
      'aria-current',
      'true'
    )
  })

  it('offers a pause button that comes first when motion is allowed', () => {
    mockMatchMedia(false)
    render(<Testimonials />)
    const region = screen.getByRole('region', { name: 'Testimonials' })
    expect(region.querySelector('button')).toHaveAccessibleName('Pause testimonials')
  })

  it('does not rotate or offer a pause button under reduced motion', () => {
    mockMatchMedia(true)
    jest.useFakeTimers()
    render(<Testimonials />)
    expect(screen.queryByRole('button', { name: /pause testimonials/i })).toBeNull()
    jest.advanceTimersByTime(20000)
    expect(screen.getByRole('button', { name: 'Go to testimonial 1' })).toHaveAttribute(
      'aria-current',
      'true'
    )
  })
})

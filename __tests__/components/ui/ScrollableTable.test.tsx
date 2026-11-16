import React from 'react'
import { act, render, screen } from '@testing-library/react'

import ScrollableTable from '@/components/ui/ScrollableTable'

let widths = { scroll: 300, client: 300 }
let resize: (() => void) | undefined

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    get: () => widths.scroll,
  })
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get: () => widths.client,
  })
})

afterAll(() => {
  // @ts-expect-error -- removing the test override
  delete HTMLElement.prototype.scrollWidth
  // @ts-expect-error -- removing the test override
  delete HTMLElement.prototype.clientWidth
})

beforeEach(() => {
  resize = undefined
  // Capture the callback so a test can report a resize.
  global.ResizeObserver = class {
    constructor(callback: () => void) {
      resize = callback
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

const table = (
  <table>
    <tbody>
      <tr>
        <td>cell</td>
      </tr>
    </tbody>
  </table>
)

describe('ScrollableTable', () => {
  it('adds no landmark and no tab stop when the table fits', () => {
    widths = { scroll: 300, client: 300 }
    render(<ScrollableTable label="Fits">{table}</ScrollableTable>)
    expect(screen.queryByRole('region')).toBeNull()
    expect(screen.getByRole('table').parentElement).not.toHaveAttribute('tabindex')
  })

  it('is a labelled region in the tab order when the table is too wide', () => {
    widths = { scroll: 600, client: 300 }
    render(<ScrollableTable label="Too wide">{table}</ScrollableTable>)
    expect(screen.getByRole('region', { name: 'Too wide' })).toHaveAttribute('tabindex', '0')
  })

  it('follows a resize after it has rendered', () => {
    widths = { scroll: 300, client: 300 }
    render(<ScrollableTable label="Narrowed">{table}</ScrollableTable>)
    expect(screen.queryByRole('region')).toBeNull()
    widths = { scroll: 600, client: 300 }
    act(() => resize?.())
    expect(screen.getByRole('region', { name: 'Narrowed' })).toHaveAttribute('tabindex', '0')
  })
})

import React from 'react'
import { render, screen } from '@testing-library/react'

import ScrollableTable from '@/components/ui/ScrollableTable'

function setWidths(scrollWidth: number, clientWidth: number) {
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    get: () => scrollWidth,
  })
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get: () => clientWidth,
  })
}

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
  afterEach(() => {
    // Back to jsdom's own (zero) widths.
    // @ts-expect-error -- removing the per-test override
    delete HTMLElement.prototype.scrollWidth
    // @ts-expect-error -- removing the per-test override
    delete HTMLElement.prototype.clientWidth
  })

  it('is a labelled region', () => {
    setWidths(300, 300)
    render(<ScrollableTable label="Analytics cookies">{table}</ScrollableTable>)
    expect(screen.getByRole('region', { name: 'Analytics cookies' })).toBeInTheDocument()
  })

  it('adds no tab stop when the table fits', () => {
    setWidths(300, 300)
    render(<ScrollableTable label="Fits">{table}</ScrollableTable>)
    expect(screen.getByRole('region', { name: 'Fits' })).not.toHaveAttribute('tabindex')
  })

  it('joins the tab order when the table is wider than its box', () => {
    setWidths(600, 300)
    render(<ScrollableTable label="Too wide">{table}</ScrollableTable>)
    expect(screen.getByRole('region', { name: 'Too wide' })).toHaveAttribute('tabindex', '0')
  })
})

import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'

// jsdom does not implement IntersectionObserver or ResizeObserver, which
// several components (scroll-triggered fade animations, responsive widgets)
// instantiate inside useEffect. Without these stubs, rendering such a
// component throws and the whole test suite for that page fails. The stubs
// are inert no-ops — they never fire, so animated elements simply stay in
// their initial state, which is fine for render/accessibility assertions.
class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
global.IntersectionObserver = global.IntersectionObserver || MockObserver
global.ResizeObserver = global.ResizeObserver || MockObserver

// Suppress Next.js Link component act() warnings
const originalError = console.error.bind(console)
console.error = (...args) => {
  const messageStr = args.map((arg) => String(arg)).join(' ')
  if (messageStr.includes('ForwardRef(LinkComponent)') && messageStr.includes('act(')) {
    return
  }
  originalError(...args)
}

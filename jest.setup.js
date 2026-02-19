import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'

// Suppress Next.js Link component act() warnings
const originalError = console.error.bind(console)
console.error = (...args) => {
  const messageStr = args.map((arg) => String(arg)).join(' ')
  if (messageStr.includes('ForwardRef(LinkComponent)') && messageStr.includes('act(')) {
    return
  }
  originalError(...args)
}

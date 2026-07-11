import { toLabel, nameNotes } from '@/lib/domain-name'

describe('toLabel', () => {
  it('lowercases and strips a typed TLD', () => {
    expect(toLabel('HopePantry.org')).toBe('hopepantry')
    expect(toLabel('example.com')).toBe('example')
    expect(toLabel('foo.net')).toBe('foo')
  })

  it('keeps only DNS-label characters (letters, digits, hyphens)', () => {
    expect(toLabel('hope pantry!')).toBe('hopepantry')
    expect(toLabel('café_org')).toBe('caforg')
    expect(toLabel('a-b-c')).toBe('a-b-c')
  })

  it('returns empty for junk', () => {
    expect(toLabel('   ')).toBe('')
    expect(toLabel('...')).toBe('')
  })
})

describe('nameNotes', () => {
  it('flags a hyphen', () => {
    expect(nameNotes('hope-pantry').some((n) => /hyphen/i.test(n))).toBe(true)
  })

  it('flags a digit', () => {
    expect(nameNotes('cats4life').some((n) => /number/i.test(n))).toBe(true)
  })

  it('flags an over-long name (> 20 chars)', () => {
    expect(nameNotes('a'.repeat(21)).some((n) => /long/i.test(n))).toBe(true)
  })

  it('is clean for a short, plain name', () => {
    expect(nameNotes('hopepantry')).toEqual([])
  })
})

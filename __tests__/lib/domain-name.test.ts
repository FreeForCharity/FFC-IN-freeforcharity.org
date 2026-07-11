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

  it('trims whitespace and tolerates a pasted URL / trailing slash', () => {
    expect(toLabel('  HopePantry.org ')).toBe('hopepantry')
    expect(toLabel('https://example.org/')).toBe('example')
    expect(toLabel('http://Hope-Pantry.com/about')).toBe('hope-pantry')
  })

  it('strips www. subdomains and query strings / fragments', () => {
    expect(toLabel('www.example.org')).toBe('example')
    expect(toLabel('https://www.hopepantry.org/?utm=1')).toBe('hopepantry')
    expect(toLabel('example.org?ref=x#top')).toBe('example')
  })

  it('takes the second-level label under a known TLD (drops subdomains)', () => {
    expect(toLabel('subdomain.example.org')).toBe('example')
    expect(toLabel('mail.hopepantry.com')).toBe('hopepantry')
  })

  it('does not mis-parse a non-.org/.com/.net input as its TLD', () => {
    // no recognized TLD → keep the text (dots dropped), never "io"/"uk"
    expect(toLabel('example.io')).toBe('exampleio')
    expect(toLabel('example.co.uk')).toBe('examplecouk')
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

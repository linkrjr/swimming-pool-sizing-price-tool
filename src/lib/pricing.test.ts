import { describe, expect, it } from 'vitest'
import {
  calculatePrice,
  calculateVolume,
  formatCurrency,
  formatVolume,
  parsePositiveNumber,
} from './pricing'

describe('parsePositiveNumber', () => {
  it('parses positive integers and decimals', () => {
    expect(parsePositiveNumber('10')).toBe(10)
    expect(parsePositiveNumber('1.5')).toBe(1.5)
    expect(parsePositiveNumber('  4  ')).toBe(4)
  })

  it.each(['', '   ', 'abc', '0', '-3', 'Infinity', '1,5'])(
    'rejects %j',
    (input) => {
      expect(parsePositiveNumber(input)).toBeNull()
    },
  )
})

describe('calculateVolume', () => {
  it('multiplies the three dimensions', () => {
    expect(calculateVolume(10, 5, 2)).toBe(100)
  })

  it('handles decimal dimensions', () => {
    expect(calculateVolume(2.5, 2, 1.5)).toBeCloseTo(7.5)
  })
})

describe('calculatePrice', () => {
  it('prices volume at the base cost per cubic metre', () => {
    expect(calculatePrice(10, 5, 2, 30)).toBe(3000)
  })

  it('scales with the base cost', () => {
    expect(calculatePrice(4, 3, 2, 12.5)).toBe(300)
  })
})

describe('formatCurrency', () => {
  it('formats as GBP with thousands separators', () => {
    expect(formatCurrency(3000)).toBe('£3,000.00')
  })

  it('rounds to two decimal places', () => {
    expect(formatCurrency(1234.567)).toBe('£1,234.57')
  })
})

describe('formatVolume', () => {
  it('trims to at most two decimal places', () => {
    expect(formatVolume(7.5)).toBe('7.5')
    expect(formatVolume(1000)).toBe('1,000')
  })
})

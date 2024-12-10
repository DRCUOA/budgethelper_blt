import { describe, it, expect } from 'vitest'
import { formatCurrency, formatDate } from '../formatters'

describe('formatCurrency', () => {
  it('formats positive numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('formats negative numbers correctly', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56')
  })

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })
})

describe('formatDate', () => {
  it('formats date string correctly', () => {
    const date = new Date('2024-02-20')
    expect(formatDate(date)).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/)
  })

  it('handles invalid dates', () => {
    expect(formatDate('invalid-date')).toBe('Invalid Date')
  })
})
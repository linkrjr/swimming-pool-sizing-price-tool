export const DEFAULT_BASE_COST = 25

const CURRENCY = 'USD'
const LOCALE = 'en-US'

/** Parses a user-entered dimension or rate. Returns null unless it is a positive finite number. */
export function parsePositiveNumber(value: string): number | null {
  const trimmed = value.trim()
  if (trimmed === '') return null
  const parsed = Number(trimmed)
  if (!Number.isFinite(parsed) || parsed <= 0) return null
  return parsed
}

export function calculateVolume(
  length: number,
  width: number,
  depth: number,
): number {
  return length * width * depth
}

export function calculatePrice(
  length: number,
  width: number,
  depth: number,
  baseCost: number,
): number {
  return calculateVolume(length, width, depth) * baseCost
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
  }).format(amount)
}

export function formatVolume(volume: number): string {
  return new Intl.NumberFormat(LOCALE, {
    maximumFractionDigits: 2,
  }).format(volume)
}

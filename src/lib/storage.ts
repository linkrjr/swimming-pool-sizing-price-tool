import { DEFAULT_BASE_COST } from './pricing'

const KEY = 'pool-base-cost'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function localStorageAvailable(): boolean {
  try {
    const probe = `${KEY}-probe`
    localStorage.setItem(probe, '1')
    localStorage.removeItem(probe)
    return true
  } catch {
    return false
  }
}

function readCookie(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${KEY}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function readRaw(): string | null {
  if (localStorageAvailable()) return localStorage.getItem(KEY)
  return readCookie()
}

export function getBaseCost(): number {
  const raw = readRaw()
  if (raw === null) return DEFAULT_BASE_COST
  const parsed = Number(raw)
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_BASE_COST
  return parsed
}

export function setBaseCost(value: number): void {
  const raw = String(value)
  if (localStorageAvailable()) {
    localStorage.setItem(KEY, raw)
    return
  }
  document.cookie = `${KEY}=${encodeURIComponent(raw)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`
}

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getBaseCost, setBaseCost } from './storage'
import { DEFAULT_BASE_COST } from './pricing'

const KEY = 'pool-base-cost'

function clearCookie() {
  document.cookie = `${KEY}=; max-age=0; path=/`
}

/** Makes every localStorage call throw, as a browser in private mode with storage disabled does. */
function disableLocalStorage() {
  return vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('storage disabled')
  })
}

beforeEach(() => {
  localStorage.clear()
  clearCookie()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('localStorage path', () => {
  it('round-trips the base cost', () => {
    setBaseCost(42.5)
    expect(localStorage.getItem(KEY)).toBe('42.5')
    expect(getBaseCost()).toBe(42.5)
  })

  it('returns the default when nothing is stored', () => {
    expect(getBaseCost()).toBe(DEFAULT_BASE_COST)
  })

  it.each(['not-a-number', '0', '-5', ''])(
    'returns the default when the stored value is %j',
    (stored) => {
      localStorage.setItem(KEY, stored)
      expect(getBaseCost()).toBe(DEFAULT_BASE_COST)
    },
  )
})

describe('cookie fallback', () => {
  it('writes and reads a cookie when localStorage is unavailable', () => {
    disableLocalStorage()

    setBaseCost(18)

    expect(document.cookie).toContain(`${KEY}=18`)
    expect(getBaseCost()).toBe(18)
  })

  it('returns the default when no cookie is set', () => {
    disableLocalStorage()
    expect(getBaseCost()).toBe(DEFAULT_BASE_COST)
  })
})

import { useState } from 'react'
import NumberField from '../components/NumberField'
import {
  calculatePrice,
  calculateVolume,
  formatCurrency,
  formatVolume,
  parsePositiveNumber,
} from '../lib/pricing'
import { getBaseCost } from '../lib/storage'

type Dimension = 'length' | 'width' | 'depth'

const FIELDS: { key: Dimension; label: string }[] = [
  { key: 'length', label: 'Length' },
  { key: 'width', label: 'Width' },
  { key: 'depth', label: 'Depth' },
]

const EMPTY = { length: '', width: '', depth: '' }

type Quote = { price: number; volume: number }

export default function Calculator() {
  const [values, setValues] = useState<Record<Dimension, string>>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<Dimension, string>>>({})
  const [quote, setQuote] = useState<Quote | null>(null)

  function update(key: Dimension, value: string) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const parsed = {} as Record<Dimension, number>
    const nextErrors: Partial<Record<Dimension, string>> = {}

    for (const { key, label } of FIELDS) {
      const value = parsePositiveNumber(values[key])
      if (value === null) {
        nextErrors[key] = `${label} must be a number greater than zero`
      } else {
        parsed[key] = value
      }
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setQuote(null)
      return
    }

    const baseCost = getBaseCost()
    setQuote({
      price: calculatePrice(parsed.length, parsed.width, parsed.depth, baseCost),
      volume: calculateVolume(parsed.length, parsed.width, parsed.depth),
    })
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
      <h1 className="text-3xl font-semibold tracking-tight text-navy">
        Pool resurfacing quote
      </h1>
      <p className="mt-2 text-muted">
        Enter the pool dimensions in metres to size the job.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8">
        <div className="grid gap-5 sm:grid-cols-3">
          {FIELDS.map(({ key, label }) => (
            <NumberField
              key={key}
              label={label}
              suffix="m"
              value={values[key]}
              onChange={(value) => update(key, value)}
              error={errors[key]}
            />
          ))}
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-xl bg-secondary px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-secondary/90 focus-visible:ring-3 focus-visible:ring-secondary/30 focus-visible:outline-none"
        >
          Calculate
        </button>
      </form>

      <div className="mt-8 border-t border-slate-100 pt-8">
        {quote ? (
          <div className="rounded-xl border-l-4 border-accent bg-slate-50 px-6 py-5">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">
              Estimated cost
            </p>
            <p
              aria-live="polite"
              className="mt-1 text-4xl font-semibold tracking-tight text-navy"
            >
              {formatCurrency(quote.price)}
            </p>
            <p className="mt-2 text-sm text-muted">
              Based on a volume of {formatVolume(quote.volume)} m3
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Your estimate will appear here once you calculate.
          </p>
        )}
      </div>
    </section>
  )
}

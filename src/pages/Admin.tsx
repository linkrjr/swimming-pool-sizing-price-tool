import { useState } from 'react'
import NumberField from '../components/NumberField'
import { formatCurrency, parsePositiveNumber } from '../lib/pricing'
import { getBaseCost, setBaseCost } from '../lib/storage'

export default function Admin() {
  const [value, setValue] = useState(() => String(getBaseCost()))
  const [error, setError] = useState<string>()
  const [saved, setSaved] = useState<number | null>(null)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const parsed = parsePositiveNumber(value)
    if (parsed === null) {
      setError('Base cost must be a number greater than zero')
      setSaved(null)
      return
    }

    setBaseCost(parsed)
    setError(undefined)
    setSaved(parsed)
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
      <h1 className="text-3xl font-semibold tracking-tight text-navy">Admin</h1>
      <p className="mt-2 text-muted">
        Set the base cost used to price every quote. Saved in this browser only.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-sm">
        <NumberField
          label="Base cost per cubic metre"
          value={value}
          onChange={(next) => {
            setValue(next)
            setSaved(null)
          }}
          error={error}
        />

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-secondary px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-secondary/90 focus-visible:ring-3 focus-visible:ring-secondary/30 focus-visible:outline-none"
        >
          Save
        </button>
      </form>

      {saved !== null && (
        <p
          role="status"
          className="mt-6 rounded-xl border-l-4 border-accent bg-slate-50 px-6 py-4 text-sm text-navy"
        >
          Base cost saved as {formatCurrency(saved)} per cubic metre.
        </p>
      )}
    </section>
  )
}

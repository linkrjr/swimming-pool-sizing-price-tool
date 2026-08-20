import { useId } from 'react'

type NumberFieldProps = {
  label: string
  suffix?: string
  value: string
  onChange: (value: string) => void
  error?: string
}

export default function NumberField({
  label,
  suffix,
  value,
  onChange,
  error,
}: NumberFieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-widest text-muted uppercase"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-lg text-navy shadow-sm transition outline-none focus:ring-3 ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-200 focus:border-primary focus:ring-primary/20'
          } ${suffix ? 'pr-14' : ''}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-medium text-muted">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

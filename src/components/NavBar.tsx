import { NavLink } from 'react-router'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-4 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-primary/10 text-primary'
      : 'text-muted hover:bg-slate-100 hover:text-navy'
  }`

export default function NavBar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
        <span className="flex items-center gap-3">
          <span className="h-6 w-1.5 rounded-full bg-accent" />
          <span className="text-base font-semibold tracking-tight text-navy">
            Poolside
          </span>
        </span>
        <span className="flex items-center gap-1">
          <NavLink to="/" className={linkClass} end>
            Calculator
          </NavLink>
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
        </span>
      </nav>
    </header>
  )
}

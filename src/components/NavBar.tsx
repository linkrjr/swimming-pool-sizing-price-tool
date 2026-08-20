import { NavLink } from 'react-router'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-4 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-white/15 text-white'
      : 'text-white/70 hover:bg-white/10 hover:text-white'
  }`

export default function NavBar() {
  return (
    <header className="bg-navy">
      <nav className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
        <NavLink to="/" end>
          {/* The wordmark is white in the source PNG, so this header stays navy. */}
          <img
            src="/logo.png"
            alt="Gold Star Pool Renovations"
            width={1255}
            height={285}
            className="h-8 w-auto sm:h-10"
          />
        </NavLink>
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

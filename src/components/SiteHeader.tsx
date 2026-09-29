import { Link } from '@tanstack/react-router'
import { useState } from 'react'

const NAV = [
  { to: '/request', label: 'Request a Device' },
  { to: '/photo-guide', label: 'Photo & Measuring Guide' },
  { to: '/volunteer', label: 'Volunteer' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About Us' },
]

function Mark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="17" cy="17" r="16" stroke="var(--teal)" strokeWidth="1.5" />
      <path
        d="M11 20.5V13a2 2 0 0 1 4 0v3.5M15 16.5V11a2 2 0 0 1 4 0v5.5M19 16.5V12a2 2 0 0 1 4 0v6.5M23 18.5V15a1.8 1.8 0 0 1 3.6 0v6.7c0 3.9-3.1 7.1-7.1 7.1h-2.2c-2.1 0-4.1-.9-5.5-2.6l-3.6-4.3a1.7 1.7 0 0 1 2.5-2.3l2.3 2.1"
        stroke="var(--filament)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-[var(--paper)]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img 
    src="\image-removebg-preview(22).png" // e.g., /logo.svg or imported image
    alt="Staples e-NABLE Logo" 
    className="h-10 w-10 object-contain" // Adjust size as needed
  />
          <span className="leading-tight">
            <span className="block font-semibold tracking-tight text-[var(--ink)]">
              Staples <span className="text-[var(--filament)]">e</span>-NABLE
            </span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              Westport, CT
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-[var(--ink-soft)] transition hover:bg-[var(--paper-dim)] hover:text-[var(--ink)]"
              activeProps={{ className: 'bg-[var(--paper-dim)] text-[var(--ink)]' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/admin/login"
            className="rounded-full border border-[var(--rule)] px-4 py-2 text-sm font-medium text-[var(--ink-soft)] transition hover:border-[var(--teal)] hover:text-[var(--teal)]"
          >
            Team Login
          </Link>
          <Link
            to="/request"
            className="rounded-full bg-[var(--filament)] px-4 py-2 text-sm font-semibold text-white shadow-[0_3px_0_var(--filament-dark)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_0_var(--filament-dark)] active:translate-y-0 active:shadow-[0_1px_0_var(--filament-dark)]"
          >
            Request a Hand
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-6 bg-[var(--ink)]" />
          <span className="block h-0.5 w-6 bg-[var(--ink)]" />
          <span className="block h-0.5 w-4 bg-[var(--ink)]" />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--rule)] bg-[var(--paper)] px-5 py-4">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--ink-soft)] hover:bg-[var(--paper-dim)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--ink-soft)] hover:bg-[var(--paper-dim)]"
            >
              Team Login
            </Link>
            <Link
              to="/request"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[var(--filament)] px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Request a Hand
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

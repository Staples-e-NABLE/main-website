import { Link } from '@tanstack/react-router'

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--paper-dim)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-8">
        <div>
          <p className="display text-xl font-semibold">
            Staples <span className="text-[var(--filament)]">e</span>-NABLE
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--ink-soft)]">
            A student-run chapter of the global e-NABLE network, printing and assembling free
            assistive hands and arms for our community out of the Staples High School makerspace.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Get Help</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/request" className="hover:text-[var(--filament)]">Request a device</Link></li>
            <li><Link to="/photo-guide" className="hover:text-[var(--filament)]">Photo &amp; measuring guide</Link></li>
            <li><Link to="/gallery" className="hover:text-[var(--filament)]">Completed devices</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Get Involved</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/volunteer" className="hover:text-[var(--filament)]">Volunteer with us</Link></li>
            <li><Link to="/about" className="hover:text-[var(--filament)]">About the chapter</Link></li>
            <li><a href="https://enablingthefuture.org" target="_blank" rel="noreferrer" className="hover:text-[var(--filament)]">Global e-NABLE network</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--ink-soft)]">
            <li>Staples High School Makerspace</li>
            <li>70 North Ave, Westport, CT 06880</li>
            <li><a href="mailto:staplesenable1@gmail.com" className="hover:text-[var(--filament)]">staplesenable1@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--rule)] px-5 py-5 text-center text-xs text-[var(--ink-soft)] md:px-8">
        Staples High School e-NABLE is an independent student chapter of Enabling The Future.
      </div>
    </footer>
  )
}

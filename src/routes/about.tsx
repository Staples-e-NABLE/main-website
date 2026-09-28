import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

const TEAM = [
  { name: 'Priya Ramaswamy', role: 'Chapter Lead & Design' },
  { name: 'Marcus Oduya', role: 'Print Farm Manager' },
  { name: 'Ben Falkowitz', role: 'Fitting & Recipient Relations' },
  { name: 'Sofia Delgado-Wu', role: 'Faculty Advisor, Engineering' },
]

function About() {
  return (
    <div>
      <section className="border-b border-[var(--rule)] blueprint-grid">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--filament)]">About us</p>
          <h1 className="display mt-3 text-4xl font-semibold md:text-5xl">
            A robotics club that also happens to build hands.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Staples e-NABLE started in 2019 as a side project inside the Staples High School
            Wreckers Robotics team's makerspace. What began as one 3D printer and a curious
            student has grown into a standing chapter of the global{' '}
            <a href="https://enablingthefuture.org" target="_blank" rel="noreferrer" className="font-semibold text-[var(--teal)] underline underline-offset-2">
              e-NABLE
            </a>{' '}
            volunteer network — designing, printing, and fitting free assistive devices for our
            community.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="display text-2xl font-semibold">Why we built this site</h2>
            <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">
              For years, families found e-NABLE chapters through the network's central request
              site. When that system stopped reliably working, we lost a way to reach the very
              people we exist to help. This site is our chapter's own front door: a place to
              request a device, learn how to prepare photos and measurements, volunteer, and see
              the devices we've already delivered — built and maintained by our own students.
            </p>
          </div>
          <div>
            <h2 className="display text-2xl font-semibold">How we work</h2>
            <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">
              Requests come in through this site, get reviewed by our design team, and are
              matched to an open-source e-NABLE device design (Cyborg Beast, Phoenix Hand, Raptor
              Reloaded, and others) based on the recipient's measurements and residual limb. We
              print in batches during weekly build nights, hand-finish and sand every part, and
              schedule a fitting once a device is ready — always free of charge.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--rule)] bg-[var(--paper-dim)]">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8">
          <h2 className="display text-2xl font-semibold">Chapter leads</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {TEAM.map((person) => (
              <div key={person.name} className="flex items-center gap-4 rounded-2xl border border-[var(--rule)] bg-white/70 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--teal)] text-sm font-semibold text-white">
                  {person.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-sm text-[var(--ink-soft)]">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8">
        <h2 className="display text-2xl font-semibold">Know someone who could use a device?</h2>
        <p className="mx-auto mt-3 max-w-lg leading-relaxed text-[var(--ink-soft)]">
          Or want to help us print, design, or fund the filament? Either way, we'd love to hear
          from you.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Link to="/request" className="rounded-full bg-[var(--filament)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_0_var(--filament-dark)]">
            Request a Device
          </Link>
          <Link to="/volunteer" className="rounded-full border-2 border-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]">
            Volunteer
          </Link>
        </div>
      </section>
    </div>
  )
}

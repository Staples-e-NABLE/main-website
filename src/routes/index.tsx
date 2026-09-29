import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

const DEVICES = [
  {
    id: '1',
    title: '',
    recipientFirstName: 'Shipped to Egypt',
    
    src: '/Focus and Targets (1).webp',
    imgClass: 'object-cover',
  },
  {
    id: '2',
    
    recipientFirstName: 'Shipped within the U.S.',
    
    src: '/Focus and Targets.webp',
    imgClass: 'object-cover',
  },
  {
    id: '3',
    title: '',
    recipientFirstName: 'Prototype Hand',
    
    src: '/IMG_7481.webp',
    // Rotates 90 deg and scales down so the entire photo fits in frame
    imgClass: 'rotate-90 object-contain scale-160', 
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Tell us about the recipient',
    body: 'Fill out a short intake form describing the hand or arm difference, so our design team can pick the right device.',
  },
  {
    n: '02',
    title: 'Send us photos & measurements',
    body: 'Follow our photo guide to capture a few reference shots and measurements — it takes about ten minutes.',
  },
  {
    n: '03',
    title: 'We design, print & fit',
    body: 'Our student team prints, assembles, and test-fits the device, then coordinates delivery at no cost to your family.',
  },
]

const STATS = [
  { value: '63', label: 'Devices delivered since 2019' },
  { value: '$0', label: 'Cost to every recipient' },
  { value: '19', label: 'Active student volunteers' },
]

function Home() {
  return (
    <div>
      <section className="relative overflow-hidden blueprint-grid border-b border-[var(--rule)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-28">
          <div className="rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--teal)]/30 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--teal)]">
              Staples High School
            </span>
            <h1 className="display mt-6 text-5xl font-semibold leading-[1.03] text-[var(--ink)] md:text-6xl">
              Free 3D-printed hands,
              <br />
              built by students <span className="text-[var(--filament)]">a few miles</span> away.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--ink-soft)]">
              We design, print, and deliver assistive hands and arms for kids and adults with
              upper-limb differences — entirely free, entirely local. If e-NABLE Web Central sent
              you looking for a chapter that still answers, you found us.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/request"
                className="rounded-full bg-[var(--filament)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_0_var(--filament-dark)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_var(--filament-dark)]"
              >
                Request a Device
              </Link>
              <Link
                to="/volunteer"
                className="rounded-full border-2 border-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                Volunteer Your Time
              </Link>
            </div>
          </div>

          <div className="relative rise" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -top-6 -right-4 h-24 w-24 rounded-full bg-[var(--gold)]/20 blur-2xl" />
            <div className="rounded-3xl border border-[var(--rule)] bg-white/70 p-7 shadow-xl shadow-black/5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                Live Build Queue
              </p>
              <ul className="mt-5 space-y-4">
                {[
                  { name: 'Raptor Reloaded — v2.9', stage: 'Printing', pct: 72 },
                  { name: 'Cyborg Beast — youth M', stage: 'Assembly & fitting', pct: 45 },
                  { name: 'Phoenix Hand — v3', stage: 'Design review', pct: 20 },
                ].map((row) => (
                  <li key={row.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[var(--ink)]">{row.name}</span>
                      <span className="text-[var(--ink-soft)]">{row.stage}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--paper-dim)]">
                      <div
                        className="h-full rounded-full bg-[var(--teal)]"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--rule)] pt-5">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="display text-2xl font-semibold text-[var(--filament)]">{s.value}</p>
                    <p className="mt-1 text-[11px] leading-tight text-[var(--ink-soft)]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="flex flex-col gap-3 md:max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--filament)]">How it works</p>
          <h2 className="display text-3xl font-semibold md:text-4xl">Three steps from request to fitting.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`rounded-2xl border border-[var(--rule)] bg-white/60 p-7 ${i === 1 ? 'md:translate-y-6' : ''}`}
            >
              <span className="display text-4xl font-semibold text-[var(--rule)]">{step.n}</span>
              <h3 className="display mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--ink-soft)]">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--rule)] bg-[var(--teal)]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 md:grid-cols-[1fr_auto] md:px-8">
          <div>
            <h2 className="display text-3xl font-semibold text-[var(--paper)] md:text-4xl">
              Not sure which one your family needs?
            </h2>
            <p className="mt-3 max-w-xl text-[var(--paper)]/80">
              Read our photo and measuring guide first — it explains exactly what to capture so we
              can match a device on the first try instead of a back-and-forth.
            </p>
          </div>
          <Link
            to="/photo-guide"
            className="justify-self-start rounded-full bg-[var(--paper)] px-7 py-3.5 text-sm font-semibold text-[var(--teal-dark)] transition hover:-translate-y-0.5 md:justify-self-end"
          >
            Read the Photo Guide
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        
      </section>
      {/* Featured Devices Section */}
            <section className="border-t border-[var(--rule)] bg-[var(--paper-dim)] py-16">
              <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--filament)]">Featured Work</p>
                  <h2 className="display mt-1 text-3xl font-semibold">Delivered Devices</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {DEVICES.map((d) => (
                    <figure key={d.id} className="overflow-hidden rounded-2xl border border-[var(--rule)] bg-white/60">
                      <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--paper-dim)] flex items-center justify-center">
                        <img
                          src={d.src}
                          alt={d.title}
                          className={`h-full w-full ${d.imgClass}`}
                          loading="lazy"
                        />
                      </div>
                      <figcaption className="p-5">
                        <p className="font-semibold">{d.title}</p>
                        {d.recipientFirstName && (
                          <p className="text-sm text-[var(--teal)]">For {d.recipientFirstName}</p>
                        )}
                        {d.description && (
                          <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">{d.description}</p>
                        )}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
    </div>
  )
}

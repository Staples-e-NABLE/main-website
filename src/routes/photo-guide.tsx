import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/photo-guide')({
  component: PhotoGuide,
})

const PHOTOS = [
  {
    n: '1',
    title: 'Top-down, hand flat on a table',
    body: 'Rest the hand or residual limb flat, palm down, fingers relaxed and slightly spread. Shoot straight down from directly above.',
  },
  {
    n: '2',
    title: 'Palm-up, same angle',
    body: 'Flip to palm up and repeat the straight-down shot. This shows us finger length and any residual digits we can build around.',
  },
  {
    n: '3',
    title: 'Side profile of the limb',
    body: 'Photograph the wrist and forearm from the side, showing the full residual limb from elbow (or mid-forearm) to the end.',
  },
  {
    n: '4',
    title: 'Wrist bend, front and back',
    body: 'With the wrist bent forward and then backward as far as comfortable, take a photo of each — this tells us how much wrist motion the device can rely on.',
  },
  {
    n: '5',
    title: 'A ruler or tape measure in frame',
    body: 'Every photo should include a ruler or tape measure laid flat next to the limb, in the same plane, so we can scale our 3D models accurately.',
  },
  {
    n: '6',
    title: 'A full-body or forearm context shot',
    body: 'One wider photo showing the whole arm helps us judge proportions relative to the rest of the body, especially for growing kids.',
  },
]

const MEASUREMENTS = [
  { label: 'Wrist circumference', body: 'Wrap the tape snugly (not tight) around the wrist crease.' },
  { label: 'Forearm circumference', body: 'Measure around the widest part of the forearm, a few inches below the elbow.' },
  { label: 'Forearm length', body: 'From the elbow crease to the end of the residual limb or wrist.' },
  { label: 'Palm width', body: 'Straight across the widest part of the palm or hand base, knuckle to knuckle.' },
  { label: 'Palm length', body: 'From the base of the palm to the tip of the longest finger or residual digit.' },
  { label: 'Residual digit lengths', body: 'For each finger present, from its base knuckle to its tip, if applicable.' },
]

function PhotoGuide() {
  return (
    <div>
      <section className="border-b border-[var(--rule)] blueprint-grid">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--filament)]">
            Before you submit a request
          </p>
          <h1 className="display mt-3 text-4xl font-semibold md:text-5xl">Photo &amp; Measuring Guide</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Good reference photos are the single biggest factor in getting a well-fitted device on
            the first try. This guide covers exactly what our design team needs — plan for about
            ten minutes, a phone camera, a tape measure, and a helper to hold the camera.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/request"
              className="rounded-full bg-[var(--filament)] px-6 py-3 text-sm font-semibold text-white shadow-[0_3px_0_var(--filament-dark)] transition hover:-translate-y-0.5"
            >
              Start the Request Form
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8">
        <h2 className="display text-2xl font-semibold">What you'll need</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ['A phone or camera', 'Any modern smartphone camera works well in natural light.'],
            ['A soft tape measure', 'A cloth or vinyl sewing tape works better than a rigid ruler for circumferences.'],
            ['A plain background', 'A table or floor with a solid-colored surface, away from clutter.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-[var(--rule)] bg-white/60 p-5">
              <p className="font-semibold">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--rule)] bg-[var(--paper-dim)]">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8">
          <h2 className="display text-2xl font-semibold">Six photos to take</h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Take these in good, even lighting — outdoor shade or a bright room works best. Avoid
            direct flash, which flattens the shape of the limb.
          </p>
          <div className="mt-8 space-y-5">
            {PHOTOS.map((p) => (
              <div key={p.n} className="flex gap-5 rounded-2xl border border-[var(--rule)] bg-white/70 p-5">
                <span className="display shrink-0 text-3xl font-semibold text-[var(--filament)]">{p.n}</span>
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--ink-soft)]">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8">
        <h2 className="display text-2xl font-semibold">Six measurements to record</h2>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Write these down in inches or centimeters (just be consistent) — you'll enter them as
          text on the request form.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {MEASUREMENTS.map((m) => (
            <div key={m.label} className="rounded-xl border border-[var(--rule)] p-5">
              <p className="font-semibold text-[var(--teal)]">{m.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">{m.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 p-6">
          <p className="font-semibold text-[var(--ink)]">A note for growing kids</p>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
            Kids outgrow devices roughly every 12–18 months. That's expected and completely free —
            just re-measure and submit a new request when a device gets snug, and we'll print the
            next size.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/request"
            className="rounded-full bg-[var(--filament)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_0_var(--filament-dark)] transition hover:-translate-y-0.5"
          >
            I'm ready — start the request
          </Link>
          <Link
            to="/about"
            className="rounded-full border-2 border-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            Questions first? Read About Us
          </Link>
        </div>
      </section>
    </div>
  )
}

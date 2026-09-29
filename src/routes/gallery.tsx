import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gallery')({
  component: Gallery,
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


function Gallery() {
  return (
    <div>
      <section className="border-b border-[var(--rule)] blueprint-grid">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--filament)]">Delivered devices</p>
          <h1 className="display mt-3 text-4xl font-semibold md:text-5xl">Gallery</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
            A look at some of the hands and arms our team has designed, printed, and delivered.
            Recipient names are shared with permission.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        {DEVICES.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--rule)] bg-white/50 px-6 py-20 text-center">
            <p className="display text-2xl font-semibold text-[var(--ink-soft)]">
              Our first devices are still in the print queue.
            </p>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">Check back soon — this gallery grows with every fitting.</p>
          </div>
        ) : (
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
                    <p className="text-lg text-[var(--teal)]"> {d.recipientFirstName}</p>
                  )}
                  {d.description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">{d.description}</p>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
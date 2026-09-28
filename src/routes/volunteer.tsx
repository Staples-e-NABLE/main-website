import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { submitVolunteer } from '@/server/volunteers.functions'

export const Route = createFileRoute('/volunteer')({
  component: VolunteerPage,
})

function VolunteerPage() {
  const submit = useServerFn(submitVolunteer)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    const form = new FormData(e.currentTarget)
    
    try {
      const result = await submit({
        data: {
          name: String(form.get('name') || ''),
          volunteerStatus: String(form.get('volunteerStatus') || ''),
          schoolEmail: String(form.get('schoolEmail') || ''),
          homeEmail: String(form.get('homeEmail') || ''),
          phoneNumber: String(form.get('phoneNumber') || ''),
          grade: String(form.get('grade') || ''),
          experience: String(form.get('experience') || ''),
          intention: String(form.get('intention') || ''),
        },
      })
      if (result.success) setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'done') {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center md:px-8">
        <span className="display text-6xl">✓</span>
        <h1 className="display mt-6 text-3xl font-semibold">You're on the list.</h1>
        <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
          Thanks for stepping up. A team lead will follow up by email about upcoming build nights
          and open roles.
        </p>
      </div>
    )
  }

  return (
    <div>
      <section className="border-b border-[var(--rule)] blueprint-grid">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--filament)]">Get involved</p>
          <h1 className="display mt-3 text-4xl font-semibold md:text-5xl">Volunteer with the chapter.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
            You don't need to own a printer or know CAD. We need designers, printer owners,
            assembly hands, fitting-day helpers, and people willing to knock on doors for
            filament donations. Students, parents, teachers, and community members all welcome.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Full name <span className="text-[var(--filament)]">*</span></span>
              <input
                name="name"
                required
                className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Status <span className="text-[var(--filament)]">*</span></span>
              <select
                name="volunteerStatus"
                required
                className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
              >
                <option value="">Select status</option>
                <option value="Part of Staples High School">Part of Staples High School</option>
                <option value="Outside Volunteer">Outside Volunteer</option>
              </select>
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">School Email <span className="text-[var(--filament)]">*</span></span>
              <input
                type="email"
                name="schoolEmail"
                required
                className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Home Email <span className="text-[var(--filament)]">*</span></span>
              <input
                type="email"
                name="homeEmail"
                required
                className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Phone Number</span>
              <input
                type="tel"
                name="phoneNumber"
                className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Grade</span>
              <input
                type="text"
                name="grade"
                placeholder="e.g. 10, 11, or N/A"
                className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium">Experience with Blender and 3D printing</span>
            <textarea
              name="experience"
              rows={3}
              className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
            />
          </label>
          
          <div>
            <span className="text-sm font-medium">What do you want to do? <span className="text-[var(--filament)]">*</span></span>
            <select
              name="intention"
              required
              className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
            >
              <option value="">Select an area</option>
              <option value="Outreach">Outreach</option>
              <option value="Building Hands">Building Hands</option>
              <option value="Both">Both</option>
            </select>
          </div>

          {status === 'error' && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-full bg-[var(--teal)] px-7 py-4 text-sm font-semibold text-white shadow-[0_4px_0_var(--teal-dark)] transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Sign Up to Volunteer'}
          </button>
        </form>
      </div>
    </div>
  )
}
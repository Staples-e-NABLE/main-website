import { createFileRoute, Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState, useRef } from 'react'
import { submitLimbRequest } from '@/server/requests.functions'

export const Route = createFileRoute('/request')({
  component: RequestPage,
})

const LIMB_TYPES = [
  'Partial hand (some fingers present)',
  'Below-elbow (transradial)',
  'Above-elbow (transhumeral)',
  'Full hand absence at the wrist',
  'Not sure — help us figure it out',
]

function RequestPage() {
  const submit = useServerFn(submitLimbRequest)
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [photoCount, setPhotoCount] = useState(0)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    try {
      const formData = new FormData(e.currentTarget)
      const result = await submit({ data: formData })
      if (result.success) {
        setStatus('done')
        formRef.current?.reset()
        setPhotoCount(0)
      }
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'done') {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center md:px-8">
        <span className="display text-6xl">✓</span>
        <h1 className="display mt-6 text-3xl font-semibold">Request received.</h1>
        <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
          Thank you — our design team reviews new requests every week and will reach out by email
          to confirm details or ask follow-up questions. There's no cost and no obligation.
        </p>
        <Link
          to="/gallery"
          className="mt-8 inline-flex rounded-full bg-[var(--filament)] px-6 py-3 text-sm font-semibold text-white"
        >
          See devices we've delivered
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--filament)]">Request a device</p>
      <h1 className="display mt-3 text-4xl font-semibold">Tell us who needs a hand.</h1>
      <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">
        This form takes about ten minutes. Haven't taken photos or measurements yet?{' '}
        <Link to="/photo-guide" className="font-semibold text-[var(--teal)] underline underline-offset-2">
          Read the photo guide
        </Link>{' '}
        first — you can still submit without photos and send them by email later.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="mt-10 space-y-10">
        <fieldset className="space-y-5">
          <legend className="display text-xl font-semibold">Recipient</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Recipient's full name" name="recipientName" required />
            <Field label="Recipient's age" name="age" required />
          </div>
          <Field
            label="Your relationship to the recipient"
            name="requesterRelationship"
            placeholder="Parent, self, occupational therapist, teacher..."
          />
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="display text-xl font-semibold">Contact information</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
          </div>
          <Field label="Street address" name="address" />
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="City" name="city" />
            <Field label="State" name="state" />
            <Field label="ZIP" name="zip" />
          </div>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="display text-xl font-semibold">About the limb difference</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Which side?</label>
              <select
                name="limbSide"
                className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
              >
                <option value="">Select one</option>
                <option>Left</option>
                <option>Right</option>
                <option>Both</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Type of difference</label>
              <select
                name="limbType"
                className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
              >
                <option value="">Select one</option>
                {LIMB_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <Field
            label="Cause (congenital, accident, illness — whatever you're comfortable sharing)"
            name="causeOfDifference"
          />
          <TextArea
            label="Measurements"
            name="measurements"
            placeholder="Wrist circumference, forearm length, palm width... (see the photo guide for the full list)"
          />
          <TextArea
            label="Anything else we should know?"
            name="story"
            placeholder="Favorite colors, hobbies, activities they want to do with the device — this helps us design something they'll actually love wearing."
          />
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="display text-xl font-semibold">Photos (optional but recommended)</legend>
          <p className="text-sm text-[var(--ink-soft)]">
            Up to 8 images, 10MB each. Follow the{' '}
            <Link to="/photo-guide" className="font-semibold text-[var(--teal)] underline underline-offset-2">
              photo guide
            </Link>{' '}
            for best results.
          </p>
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-[var(--rule)] bg-white/50 px-6 py-10 text-center transition hover:border-[var(--teal)]">
            <span className="text-sm font-semibold text-[var(--teal)]">
              {photoCount > 0 ? `${photoCount} photo${photoCount === 1 ? '' : 's'} selected` : 'Click to choose photos'}
            </span>
            <span className="text-xs text-[var(--ink-soft)]">JPG, PNG, or HEIC</span>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => setPhotoCount(e.target.files?.length ?? 0)}
            />
          </label>
        </fieldset>

        {status === 'error' && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full rounded-full bg-[var(--filament)] px-7 py-4 text-sm font-semibold text-white shadow-[0_4px_0_var(--filament-dark)] transition hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit Request'}
        </button>
      </form>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label} {required && <span className="text-[var(--filament)]">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
      />
    </label>
  )
}

function TextArea({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <textarea
        name={name}
        rows={3}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
      />
    </label>
  )
}

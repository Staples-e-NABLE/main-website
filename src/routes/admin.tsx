import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { getAdminAuthStatus, adminLogout } from '@/server/auth.functions'
import { listRequests, updateRequestStatus, deleteRequest } from '@/server/requests.functions'
import { listVolunteers, updateVolunteerStatus, deleteVolunteer } from '@/server/volunteers.functions'
import {
  listAdminGallery,
  createGalleryDevice,
  toggleGalleryPublished,
  deleteGalleryDevice,
} from '@/server/gallery.functions'
import { REQUEST_STATUSES, VOLUNTEER_STATUSES } from '../../db/schema.js'

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    const { isAdmin } = await getAdminAuthStatus()
    if (!isAdmin) {
      throw redirect({ to: '/admin/login' })
    }
  },
  loader: async () => {
    const [requests, volunteers, gallery] = await Promise.all([
      listRequests(),
      listVolunteers(),
      listAdminGallery(),
    ])
    return { requests, volunteers, gallery }
  },
  component: AdminDashboard,
})

type Tab = 'requests' | 'volunteers' | 'gallery'

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-[var(--gold)]/20 text-[var(--gold)]',
  in_review: 'bg-[var(--teal)]/15 text-[var(--teal)]',
  matched: 'bg-[var(--teal)]/25 text-[var(--teal-dark)]',
  printing: 'bg-[var(--filament)]/15 text-[var(--filament-dark)]',
  completed: 'bg-emerald-100 text-emerald-700',
  declined: 'bg-neutral-200 text-neutral-600',
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-neutral-200 text-neutral-600',
}

function statusLabel(s: string) {
  return s.replace(/_/g, ' ')
}

function AdminDashboard() {
  const data = Route.useLoaderData()
  const router = useRouter()
  const logout = useServerFn(adminLogout)
  const [tab, setTab] = useState<Tab>('requests')

  async function handleLogout() {
    await logout()
    router.navigate({ to: '/' })
  }

  const counts = {
    requests: data.requests.filter((r) => r.status === 'new').length,
    volunteers: data.volunteers.filter((v) => v.status === 'new').length,
    gallery: data.gallery.length,
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--filament)]">Team dashboard</p>
          <h1 className="display mt-1 text-3xl font-semibold">Chapter admin</h1>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full border border-[var(--rule)] px-5 py-2.5 text-sm font-medium text-[var(--ink-soft)] hover:border-[var(--teal)] hover:text-[var(--teal)]"
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 flex gap-2 border-b border-[var(--rule)]">
        {(
          [
            ['requests', `Requests (${counts.requests} new)`],
            ['volunteers', `Volunteers (${counts.volunteers} new)`],
            ['gallery', `Gallery (${counts.gallery})`],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`-mb-px rounded-t-lg border-b-2 px-4 py-3 text-sm font-semibold transition ${
              tab === key
                ? 'border-[var(--filament)] text-[var(--ink)]'
                : 'border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === 'requests' && <RequestsTab initial={data.requests} />}
        {tab === 'volunteers' && <VolunteersTab initial={data.volunteers} />}
        {tab === 'gallery' && <GalleryTab initial={data.gallery} />}
      </div>
    </div>
  )
}

function RequestsTab({ initial }: { initial: Awaited<ReturnType<typeof listRequests>> }) {
  const [rows, setRows] = useState(initial)
  const [expanded, setExpanded] = useState<number | null>(null)
  const updateStatus = useServerFn(updateRequestStatus)
  const remove = useServerFn(deleteRequest)

  async function setStatus(id: number, status: (typeof REQUEST_STATUSES)[number]) {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, status } : row)))
    await updateStatus({ data: { id, status } })
  }

  async function saveNotes(id: number, adminNotes: string) {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, adminNotes } : row)))
    await updateStatus({ data: { id, status: rows.find((r) => r.id === id)!.status as any, adminNotes } })
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this request permanently?')) return
    setRows((r) => r.filter((row) => row.id !== id))
    await remove({ data: { id } })
  }

  if (rows.length === 0) {
    return <EmptyState label="No device requests yet." />
  }

  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={row.id} className="rounded-2xl border border-[var(--rule)] bg-white/60">
          <button
            className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left"
            onClick={() => setExpanded(expanded === row.id ? null : row.id)}
          >
            <div>
              <p className="font-semibold">{row.recipientName}, {row.age}</p>
              <p className="text-sm text-[var(--ink-soft)]">{row.email} &middot; {new Date(row.createdAt).toLocaleDateString()}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_COLORS[row.status] ?? ''}`}>
              {statusLabel(row.status)}
            </span>
          </button>

          {expanded === row.id && (
            <div className="border-t border-[var(--rule)] px-5 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Detail label="Phone" value={row.phone} />
                <Detail label="Relationship" value={row.requesterRelationship} />
                <Detail label="Address" value={[row.address, row.city, row.state, row.zip].filter(Boolean).join(', ')} />
                <Detail label="Limb" value={`${row.limbSide || '—'} · ${row.limbType || '—'}`} />
                <Detail label="Cause" value={row.causeOfDifference} />
                <Detail label="Measurements" value={row.measurements} />
              </div>
              {row.story && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">Notes from family</p>
                  <p className="mt-1 text-sm leading-relaxed">{row.story}</p>
                </div>
              )}

              {row.photos.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">Photos</p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {row.photos.map((p) => (
                      <a key={p.id} href={`/api/photos/${encodeURIComponent(p.blobKey)}`} target="_blank" rel="noreferrer">
                        <img
                          src={`/api/photos/${encodeURIComponent(p.blobKey)}`}
                          alt={p.filename}
                          className="h-24 w-24 rounded-lg border border-[var(--rule)] object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-end gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">Status</p>
                  <select
                    value={row.status}
                    onChange={(e) => setStatus(row.id, e.target.value as any)}
                    className="mt-1.5 rounded-lg border border-[var(--rule)] bg-white px-3 py-2 text-sm capitalize"
                  >
                    {REQUEST_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {statusLabel(s)}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="ml-auto rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>

              <label className="mt-4 block">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">Internal notes</span>
                <textarea
                  defaultValue={row.adminNotes}
                  rows={2}
                  onBlur={(e) => saveNotes(row.id, e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
                  placeholder="Visible only to the team..."
                />
              </label>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function VolunteersTab({ initial }: { initial: Awaited<ReturnType<typeof listVolunteers>> }) {
  const [rows, setRows] = useState(initial)
  const updateStatus = useServerFn(updateVolunteerStatus)
  const remove = useServerFn(deleteVolunteer)

  async function setStatus(id: number, status: (typeof VOLUNTEER_STATUSES)[number]) {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, status } : row)))
    await updateStatus({ data: { id, status } })
  }

  async function handleDelete(id: number) {
    if (!confirm('Remove this volunteer?')) return
    setRows((r) => r.filter((row) => row.id !== id))
    await remove({ data: { id } })
  }

  if (rows.length === 0) {
    return <EmptyState label="No volunteer signups yet." />
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--rule)] bg-white/60">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--rule)] text-left text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Affiliation</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Grade</th>
            <th className="px-4 py-3">Intention</th>
            <th className="px-4 py-3">Experience</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[var(--rule)] last:border-0">
              <td className="px-4 py-3 font-medium">{row.name}</td>
              <td className="px-4 py-3 text-[var(--ink-soft)]">{row.volunteerStatus || '—'}</td>
              <td className="px-4 py-3 text-[var(--ink-soft)]">
                <div className="font-medium text-[var(--ink)]">{row.schoolEmail}</div>
                {row.homeEmail && <div className="text-xs text-[var(--ink-soft)]">{row.homeEmail}</div>}
                {row.phoneNumber && <div className="text-xs text-[var(--ink-soft)]">{row.phoneNumber}</div>}
              </td>
              <td className="px-4 py-3 text-[var(--ink-soft)]">{row.grade || '—'}</td>
              <td className="px-4 py-3 text-[var(--ink-soft)]">{row.intention || '—'}</td>
              <td className="px-4 py-3 text-[var(--ink-soft)]">{row.experience || '—'}</td>
              <td className="px-4 py-3">
                <select
                  value={row.status}
                  onChange={(e) => setStatus(row.id, e.target.value as any)}
                  className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_COLORS[row.status] ?? ''}`}
                >
                  {VOLUNTEER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {statusLabel(s)}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3 text-right">
                <button onClick={() => handleDelete(row.id)} className="text-xs font-semibold text-red-600 hover:underline">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GalleryTab({ initial }: { initial: Awaited<ReturnType<typeof listAdminGallery>> }) {
  const [rows, setRows] = useState(initial)
  const create = useServerFn(createGalleryDevice)
  const toggle = useServerFn(toggleGalleryPublished)
  const remove = useServerFn(deleteGalleryDevice)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setUploading(true)
    setError('')
    try {
      const formData = new FormData(e.currentTarget)
      await create({ data: formData })
      const fresh = await listAdminGallery()
      setRows(fresh)
      e.currentTarget.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  async function handleToggle(id: number, published: boolean) {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, published } : row)))
    await toggle({ data: { id, published } })
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this gallery item?')) return
    setRows((r) => r.filter((row) => row.id !== id))
    await remove({ data: { id } })
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleAdd} className="rounded-2xl border border-[var(--rule)] bg-white/60 p-5">
        <p className="font-semibold">Add a completed device</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium">Title</span>
            <input name="title" required className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Recipient's first name</span>
            <input name="recipientFirstName" className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm" />
          </label>
        </div>
        <label className="mt-4 block">
          <span className="text-sm font-medium">Description</span>
          <textarea name="description" rows={2} className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm" />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-medium">Photo</span>
          <input type="file" name="photo" accept="image/*" required className="mt-1.5 block text-sm" />
        </label>
        {error && <p className="mt-3 text-sm font-medium text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={uploading}
          className="mt-4 rounded-full bg-[var(--filament)] px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {uploading ? 'Uploading…' : 'Add to Gallery'}
        </button>
      </form>

      {rows.length === 0 ? (
        <EmptyState label="No gallery items yet." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <div key={row.id} className="overflow-hidden rounded-2xl border border-[var(--rule)] bg-white/60">
              <img
                src={`/api/photos/${encodeURIComponent(row.blobKey)}`}
                alt={row.title}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-4">
                <p className="font-semibold">{row.title}</p>
                <div className="mt-3 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={row.published}
                      onChange={(e) => handleToggle(row.id, e.target.checked)}
                      className="h-4 w-4 accent-[var(--teal)]"
                    />
                    Published
                  </label>
                  <button onClick={() => handleDelete(row.id)} className="text-xs font-semibold text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">{label}</p>
      <p className="mt-0.5 text-sm">{value}</p>
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--rule)] bg-white/40 px-6 py-16 text-center text-sm text-[var(--ink-soft)]">
      {label}
    </div>
  )
}

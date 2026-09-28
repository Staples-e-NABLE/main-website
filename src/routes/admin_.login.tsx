import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { adminLogin } from '@/server/auth.functions'

export const Route = createFileRoute('/admin_/login')({
  component: AdminLogin,
})

function AdminLogin() {
  const login = useServerFn(adminLogin)
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await login({ data: { password } })
      if (result.success) {
        navigate({ to: '/admin' })
      } else {
        setError(result.error)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--rule)] bg-white/70 p-8 shadow-xl shadow-black/5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--filament)]">Team access</p>
        <h1 className="display mt-2 text-2xl font-semibold">Admin sign in</h1>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Enter the shared team password to manage requests, volunteers, and the gallery.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="mt-1.5 w-full rounded-lg border border-[var(--rule)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]"
            />
          </label>
          {error && <p className="text-sm font-medium text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[var(--teal)] px-6 py-3 text-sm font-semibold text-white shadow-[0_3px_0_var(--teal-dark)] transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? 'Checking…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

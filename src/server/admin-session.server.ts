import { getSession, updateSession, clearSession } from '@tanstack/react-start/server'

const FALLBACK_SESSION_SECRET = 'staples-hs-enable-web-central-session-secret-32chars-min'

const sessionConfig = {
  password: process.env.SESSION_SECRET || FALLBACK_SESSION_SECRET,
  name: 'enable_admin_session',
  cookie: {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.CONTEXT === 'production',
    path: '/',
  },
  maxAge: 60 * 60 * 12,
}

export async function getAdminSessionState() {
  const session = await getSession<{ isAdmin: boolean }>(sessionConfig)
  return Boolean(session.data.isAdmin)
}

export async function signInAdmin() {
  await updateSession(sessionConfig, { isAdmin: true })
}

export async function signOutAdmin() {
  await clearSession(sessionConfig)
}

export async function requireAdmin() {
  const isAdmin = await getAdminSessionState()
  if (!isAdmin) {
    throw new Error('Unauthorized')
  }
}

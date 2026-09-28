import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { getAdminSessionState, signInAdmin, signOutAdmin } from './admin-session.server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'enable-staples-2026'

export const getAdminAuthStatus = createServerFn({ method: 'GET' }).handler(async () => {
  return { isAdmin: await getAdminSessionState() }
})

export const adminLogin = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASSWORD) {
      return { success: false as const, error: 'Incorrect password. Please try again.' }
    }
    await signInAdmin()
    return { success: true as const }
  })

export const adminLogout = createServerFn({ method: 'POST' }).handler(async () => {
  await signOutAdmin()
  return { success: true as const }
})

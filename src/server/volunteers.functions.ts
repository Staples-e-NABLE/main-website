import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { eq, desc } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { volunteers, VOLUNTEER_STATUSES } from '../../db/schema.js'
import { requireAdmin } from './admin-session.server'

export const submitVolunteer = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      name: z.string().min(1, 'Name is required'),
      volunteerStatus: z.string().min(1, 'Status is required'),
      schoolEmail: z.string().email('Valid school email is required'),
      homeEmail: z.string().email('Valid home email is required'),
      phoneNumber: z.string().optional().default(''),
      grade: z.string().optional().default(''),
      experience: z.string().optional().default(''),
      intention: z.enum(['Outreach', 'Building Hands', 'Both']),
    }),
  )
  .handler(async ({ data }) => {
    await db.insert(volunteers).values(data)
    return { success: true as const }
  })

export const listVolunteers = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin()
  return db.select().from(volunteers).orderBy(desc(volunteers.createdAt))
})

export const updateVolunteerStatus = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      id: z.number(),
      status: z.enum(VOLUNTEER_STATUSES),
      adminNotes: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    await db
      .update(volunteers)
      .set({
        status: data.status,
        ...(data.adminNotes !== undefined ? { adminNotes: data.adminNotes } : {}),
      })
      .where(eq(volunteers.id, data.id))
    return { success: true as const }
  })

export const deleteVolunteer = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    await requireAdmin()
    await db.delete(volunteers).where(eq(volunteers.id, data.id))
    return { success: true as const }
  })
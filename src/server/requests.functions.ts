import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { eq, desc } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { requests, requestPhotos, REQUEST_STATUSES } from '../../db/schema.js'
import { getPhotoStore } from './blob-store.server'
import { requireAdmin } from './admin-session.server'

const MAX_PHOTOS = 8
const MAX_PHOTO_BYTES = 10 * 1024 * 1024

export const submitLimbRequest = createServerFn({ method: 'POST' })
  .inputValidator((formData: FormData) => formData)
  .handler(async ({ data: formData }) => {
    const recipientName = String(formData.get('recipientName') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const age = String(formData.get('age') || '').trim()

    if (!recipientName || !email || !age) {
      throw new Error('Recipient name, age, and email are required.')
    }

    const [created] = await db
      .insert(requests)
      .values({
        recipientName,
        age,
        requesterRelationship: String(formData.get('requesterRelationship') || ''),
        email,
        phone: String(formData.get('phone') || ''),
        address: String(formData.get('address') || ''),
        city: String(formData.get('city') || ''),
        state: String(formData.get('state') || ''),
        zip: String(formData.get('zip') || ''),
        limbSide: String(formData.get('limbSide') || ''),
        limbType: String(formData.get('limbType') || ''),
        causeOfDifference: String(formData.get('causeOfDifference') || ''),
        measurements: String(formData.get('measurements') || ''),
        story: String(formData.get('story') || ''),
      })
      .returning()

    const files = formData.getAll('photos').filter((f): f is File => f instanceof File && f.size > 0)
    const store = getPhotoStore()

    for (const file of files.slice(0, MAX_PHOTOS)) {
      if (file.size > MAX_PHOTO_BYTES) continue
      const blobKey = `requests/${created.id}/${crypto.randomUUID()}`
      await store.set(blobKey, file, { metadata: { contentType: file.type || 'application/octet-stream' } })
      await db.insert(requestPhotos).values({
        requestId: created.id,
        blobKey,
        filename: file.name,
        contentType: file.type || 'application/octet-stream',
      })
    }

    return { success: true as const, id: created.id }
  })

export const listRequests = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin()
  const rows = await db.select().from(requests).orderBy(desc(requests.createdAt))
  const photos = await db.select().from(requestPhotos)
  return rows.map((row) => ({
    ...row,
    photos: photos.filter((p) => p.requestId === row.id),
  }))
})

export const updateRequestStatus = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      id: z.number(),
      status: z.enum(REQUEST_STATUSES),
      adminNotes: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    await db
      .update(requests)
      .set({
        status: data.status,
        ...(data.adminNotes !== undefined ? { adminNotes: data.adminNotes } : {}),
        updatedAt: new Date(),
      })
      .where(eq(requests.id, data.id))
    return { success: true as const }
  })

export const deleteRequest = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    await requireAdmin()
    const photos = await db.select().from(requestPhotos).where(eq(requestPhotos.requestId, data.id))
    const store = getPhotoStore()
    for (const photo of photos) {
      await store.delete(photo.blobKey)
    }
    await db.delete(requests).where(eq(requests.id, data.id))
    return { success: true as const }
  })

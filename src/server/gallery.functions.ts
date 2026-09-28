import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { eq, desc } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { galleryDevices } from '../../db/schema.js'
import { getPhotoStore } from './blob-store.server'
import { requireAdmin } from './admin-session.server'

export const listPublicGallery = createServerFn({ method: 'GET' }).handler(async () => {
  return db
    .select()
    .from(galleryDevices)
    .where(eq(galleryDevices.published, true))
    .orderBy(desc(galleryDevices.createdAt))
})

export const listAdminGallery = createServerFn({ method: 'GET' }).handler(async () => {
  await requireAdmin()
  return db.select().from(galleryDevices).orderBy(desc(galleryDevices.createdAt))
})

export const createGalleryDevice = createServerFn({ method: 'POST' })
  .inputValidator((formData: FormData) => formData)
  .handler(async ({ data: formData }) => {
    await requireAdmin()
    const title = String(formData.get('title') || '').trim()
    const photo = formData.get('photo')
    if (!title) throw new Error('Title is required.')
    if (!(photo instanceof File) || photo.size === 0) throw new Error('A photo is required.')

    const blobKey = `gallery/${crypto.randomUUID()}`
    const store = getPhotoStore()
    await store.set(blobKey, photo, { metadata: { contentType: photo.type || 'image/jpeg' } })

    await db.insert(galleryDevices).values({
      title,
      description: String(formData.get('description') || ''),
      recipientFirstName: String(formData.get('recipientFirstName') || ''),
      blobKey,
      contentType: photo.type || 'image/jpeg',
    })

    return { success: true as const }
  })

export const toggleGalleryPublished = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.number(), published: z.boolean() }))
  .handler(async ({ data }) => {
    await requireAdmin()
    await db.update(galleryDevices).set({ published: data.published }).where(eq(galleryDevices.id, data.id))
    return { success: true as const }
  })

export const deleteGalleryDevice = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    await requireAdmin()
    const [row] = await db.select().from(galleryDevices).where(eq(galleryDevices.id, data.id))
    if (row) {
      const store = getPhotoStore()
      await store.delete(row.blobKey)
    }
    await db.delete(galleryDevices).where(eq(galleryDevices.id, data.id))
    return { success: true as const }
  })

import { createFileRoute } from '@tanstack/react-router'
import { getPhotoStore } from '@/server/blob-store.server'

export const Route = createFileRoute('/api/photos/$key')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = getPhotoStore()
        const result = await store.getWithMetadata(decodeURIComponent(params.key), { type: 'arrayBuffer' })
        if (!result) {
          return new Response('Not found', { status: 404 })
        }
        const contentType = (result.metadata?.contentType as string) || 'application/octet-stream'
        return new Response(result.data as ArrayBuffer, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        })
      },
    },
  },
})

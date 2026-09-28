# AGENTS.md

## Project overview

Staples e-NABLE chapter site: public request/volunteer/gallery pages plus a password-gated admin
dashboard, replacing the defunct e-NABLE Web Central for this chapter. Built with TanStack Start
(React 19 + TanStack Router) on Netlify, using Netlify Database (Postgres via Drizzle) and
Netlify Blobs for uploaded photos.

## Directory structure

```
db/
  schema.ts              # Drizzle table definitions (requests, requestPhotos, volunteers, galleryDevices)
  index.ts                # Drizzle client (drizzle-orm/netlify-db)
drizzle.config.ts          # out: netlify/database/migrations (required for auto-apply)
netlify/database/migrations/  # generated SQL migrations — never hand-edit an applied one
src/
  routes/
    __root.tsx             # HTML shell, fonts, header/footer
    index.tsx               # Home
    photo-guide.tsx          # Photo & measuring instructions
    request.tsx              # Public device request form (multipart upload)
    volunteer.tsx             # Public volunteer signup form
    gallery.tsx                # Public gallery (reads published gallery_devices)
    about.tsx                  # About page
    admin.login.tsx             # Shared-password login (/admin/login)
    admin.tsx                    # Protected dashboard (/admin) — beforeLoad checks session
    api.photos.$key.tsx           # Streams a blob by (URL-encoded) key as the response body
  server/
    *.functions.ts               # createServerFn RPCs, callable from routes/components
    *.server.ts                   # server-only helpers (blob store, session config)
  components/                      # SiteHeader, SiteFooter
```

## Conventions

- Server-only logic lives in `src/server/*.server.ts`; the public RPC surface is
  `src/server/*.functions.ts` (mirrors the pattern in the tanstack-start-server-functions skill).
- Admin-only server functions call `requireAdmin()` (from `auth.functions.ts`) as their first line.
- File uploads go through `createServerFn` handlers that accept a raw `FormData` input validator,
  not JSON — see `submitLimbRequest` and `createGalleryDevice`.
- Uploaded images are stored in the `device-photos` Netlify Blobs store, keyed by
  `requests/<requestId>/<uuid>` or `gallery/<uuid>`. They are served back through
  `/api/photos/$key`, where `$key` is the blob key run through `encodeURIComponent` (blob keys
  contain `/`, so they must be encoded into a single path segment and decoded server-side).
- Admin auth is a single shared password (`ADMIN_PASSWORD` env var) rather than per-user accounts,
  gating a sealed session cookie (`SESSION_SECRET` env var) set via `@tanstack/react-start/server`'s
  `useSession`/`updateSession`/`clearSession`. There is no Netlify Identity in this project.
- Any schema change in `db/schema.ts` requires `npx drizzle-kit generate --name <slug>` — the
  platform will not apply schema changes without a migration file.

## Non-obvious decisions

- Netlify Blobs (not Database) holds the binary photo/image data; Postgres only stores blob keys
  and metadata, per the project's data-storage guidelines (relational data → Database, files → Blobs).
- The request and volunteer forms are open to the public; only `list*`, `update*`, and `delete*`
  server functions are gated behind `requireAdmin()`.

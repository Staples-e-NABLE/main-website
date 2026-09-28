# Staples e-NABLE

A request-and-fulfillment site for the Staples High School e-NABLE chapter, built to replace the
defunct e-NABLE Web Central. Families and caregivers can request a free 3D-printed assistive hand
or arm, follow a photo/measurement guide, sign up to volunteer, and browse a gallery of delivered
devices. The chapter's team manages everything from a password-protected admin dashboard.

## Key technologies

- **TanStack Start** (React 19 + TanStack Router) for routing, server functions, and API routes
- **Tailwind CSS 4** for styling
- **Netlify Database** (managed Postgres) via **Drizzle ORM** for requests, volunteers, and gallery data
- **Netlify Blobs** for storing uploaded reference photos and gallery images
- Deployed on **Netlify**

## Features

- **Request a Device** — intake form (recipient details, contact info, limb difference,
  measurements, story) with optional multi-photo upload
- **Photo & Measuring Guide** — step-by-step instructions for the photos and measurements the
  design team needs
- **Volunteer** — signup form for students, parents, and community members
- **Gallery** — public showcase of completed, delivered devices
- **About Us** — chapter background and team
- **Admin dashboard** (`/admin`) — shared-password login for the team; review and update the
  status of requests and volunteer signups, and publish devices to the public gallery

## Admin access

The admin area uses a single shared password rather than individual accounts. Set it via the
`ADMIN_PASSWORD` environment variable in the Netlify site's environment settings (a development
default is used if unset — change it before sharing the site publicly). Also set `SESSION_SECRET`
to a long random string to sign the admin session cookie.

## Running locally

```bash
npm install
netlify dev
```

`netlify dev` (rather than `vite dev` directly) is required so Netlify Database and Netlify Blobs
are emulated locally.

## Database

Schema lives in `db/schema.ts`. After changing it, generate a migration with:

```bash
npx drizzle-kit generate --name <description>
```

Migrations in `netlify/database/migrations/` are applied automatically by Netlify on deploy.

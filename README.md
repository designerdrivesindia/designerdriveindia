# Designer Drives India — Fullstack

Premium, minimal, SEO-optimised lead-generation travel platform.
Bespoke, chauffeur-driven journeys across India & the Himalayas.

**One Next.js app** — frontend + backend (API routes) + database access, no
separate service. Public reads happen in **Server Components only**; client
components never touch the database.

## Tech stack

- **Next.js 16** (App Router, React 19, React Compiler) — UI **and** API
- **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme` design tokens)
- **Drizzle ORM** + **Neon** serverless Postgres
- **jose** (JWT access + rotating refresh) + **bcryptjs** — auth
- **Zustand** (UI/filter state) · **TanStack Query** (mutations)
- **React Hook Form + Zod** — forms & validation
- **lucide-react** — icons
- Fonts: **Cormorant Garamond** (headings) + **Manrope** (body)

## Getting started

```bash
cp .env.example .env.local        # add Neon DATABASE_URL + JWT secrets (optional in dev)
npm install
npm run db:push                   # apply schema to Neon  (or db:migrate)
npm run db:seed                   # load seed content + create admin user
npm run dev                       # http://localhost:3000
npm run build && npm start        # production
npm run lint
```

Without `DATABASE_URL`, the app still runs — repositories fall back to the
curated seed content in `src/data` and auth is disabled. This keeps local dev
and CI builds green until Neon is connected.

## Database & migrations

```bash
npm run db:generate   # generate SQL migration from the schema (./drizzle)
npm run db:migrate    # apply migrations
npm run db:push       # push schema directly (fast dev iteration)
npm run db:studio     # Drizzle Studio
npm run db:seed       # seed content + admin
```

Schema lives in [`src/server/db/schema.ts`](src/server/db/schema.ts) — 10 tables
(users, refresh_tokens, destinations, packages, cars, blog_posts, inquiries,
inquiry_notes, media, settings) with enums, relations and indexes. Content
entities use indexed scalar columns for filters + JSONB for rich nested data
(itinerary, FAQs, galleries); CRM data is fully relational.

## Project structure

```
src/
├── app/                       # routes (App Router)
│   ├── layout.tsx             # root layout, fonts, metadata, providers
│   ├── page.tsx               # landing page
│   ├── packages/              # listing + [slug] detail
│   ├── destinations/          # listing + [slug] detail
│   ├── cars/                  # listing + [slug] detail
│   ├── blog/                  # listing + [slug] detail
│   ├── about, contact/        # static pages
│   ├── {privacy,terms,...}/   # legal pages
│   ├── sitemap.ts, robots.ts  # SEO route handlers
│   └── not-found / error / loading
├── components/
│   ├── ui/                    # design-system primitives (Button, Card, Field, …)
│   ├── layout/                # header, footer, page hero, logo, WhatsApp FAB
│   ├── sections/              # landing-page sections
│   ├── cards/                 # Package / Destination / Car / Blog cards
│   ├── packages|destinations|cars/  # feature explorers (filters)
│   ├── inquiry/               # InquiryForm, modal, Plan-Trip button
│   ├── seo/                   # JSON-LD renderer
│   └── icons/                 # inline brand SVGs
│   └── api/                   # route handlers (backend)
│       ├── inquiries/route.ts # POST (public lead) · GET (admin list)
│       └── auth/{login,refresh,logout,me}/route.ts
├── server/                    # server-only backend layer
│   ├── db/                    # schema.ts, client.ts (Neon), seed.ts
│   ├── repositories/          # data access (Drizzle) — Server Components only
│   ├── services/              # business logic (inquiry, auth)
│   ├── auth/                  # jwt, password, session (cookies + rotation)
│   └── rate-limit.ts
├── lib/                       # utils, site config, constants, seo, validations, env
├── data/                      # seed content (source for db:seed + dev fallback)
├── services/                  # client API client + inquiry service
├── store/                     # Zustand stores (ui, filters)
├── hooks/                     # use-inquiry, …
└── types/                     # shared domain types (mirror DB rows)
```

## Architecture rules

- **Reads → Server Components** via `src/server/repositories/*` (Drizzle).
  Never import repositories or `server-only` modules from a Client Component.
- **Mutations → Route Handlers** (`/api/*`) → services → repositories.
- **Client Components** receive data as props or call `/api/*` (TanStack Query).
- The `import "server-only"` guard enforces this at build time.

## Lead-generation core

The site is **not** a direct-booking platform. Every package, car and
destination page — plus the contact page and a global "Plan My Trip" modal —
funnels into a single reusable `<InquiryForm>` (RHF + Zod, honeypot-protected),
which POSTs to `/api/inquiries` (same-origin) via TanStack Query. The route is
rate-limited per IP, re-validated server-side, and persisted to the `inquiries`
table for the admin CRM. Without a DB the submission is acknowledged but not
stored, so the forms stay demonstrable in dev.

## SEO

- Per-route `generateMetadata` (title template, OG, Twitter, canonical)
- `sitemap.xml` + `robots.txt` generated from content
- JSON-LD: `TravelAgency`, `WebSite`, `TouristTrip`, `TouristDestination`,
  `Article`, `BreadcrumbList`
- `next/image` optimisation, static prerendering of all detail pages

## Authentication

JWT in HTTP-only cookies — a short-lived **access** token (15m) and a rotating
**refresh** token (7d) whose hash is stored in `refresh_tokens` for revocation
and session management. Roles: `super_admin`, `content_manager`, `sales_manager`
(enforced via `requireAuth(roles)` in route handlers). Passwords are bcrypt-hashed.
The seed creates an initial `super_admin` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).

## Deployment

One app → **Vercel** (or any Node host). Set `DATABASE_URL` (Neon pooled),
`JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `NEXT_PUBLIC_SITE_URL`, and the AWS S3
vars. Add your S3/CloudFront media hostname to `next.config.ts`
`images.remotePatterns`. Run migrations (`db:migrate`) on deploy.

## Roadmap (next)

- Admin dashboard UI (CRM inquiry pipeline, content CRUD, analytics, media library)
- S3 upload route + media library
- On-demand ISR revalidation when content changes in the admin

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# arflora — Project Guide

Next.js 16 (App Router, `src/app`) + Prisma 7 (stable) + Supabase PostgreSQL, deployable on Vercel.

## Stack & key files

- `package.json` — `build` runs `prisma generate && next build`; `postinstall` runs `prisma generate`.
- `prisma7.config.ts` — Prisma 7 config. Loads `.env` via `import "dotenv/config"`. `datasource.url` must be the **session pooler** (`DIRECT_URL`) so `prisma migrate` works.
- `prisma/schema.prisma` — datasource declares only `provider = "postgresql"` (no `url`/`directUrl`; those moved to the config). Generator is `prisma-client` with `output = "../src/generated/prisma"`.
- `src/lib/db.ts` — Prisma Client singleton using `@prisma/adapter-pg` with `DATABASE_URL` (transaction pooler). Import the client from `@/generated/prisma/client`.
- `src/generated/prisma/` — generated client, gitignored, regenerated on install/build.

## Supabase connection rules (important)

- `DATABASE_URL` = transaction pooler (`...pooler.supabase.com:6543/postgres?pgbouncer=true`) — **runtime only** (used by `@prisma/adapter-pg`).
- `DIRECT_URL` = session pooler (`...pooler.supabase.com:5432/postgres`) — **migrations only** (`prisma migrate`).
- Never point the runtime at the session pooler and never run migrations through the transaction pooler.
- Supabase requires SSL; the Prisma migration engine negotiates it automatically and the `pg` adapter connects fine against the pooler.
- New tables in `public` are not automatically exposed to the Data API (`anon`/`authenticated` need explicit `GRANT`, and RLS should be enabled). This app talks to Postgres directly via Prisma, not the Data API, so this only matters if you also use supabase-js.

## Day-to-day commands

```bash
npm run dev            # Next dev server
npm run db:generate    # prisma generate (after schema change)
npm run db:migrate     # prisma migrate dev (dev schema sync)
npm run db:deploy      # prisma migrate deploy (apply committed migrations)
npm run db:studio      # prisma studio
npx prisma validate    # validate schema
```

**Schema-change workflow** (no shadow DB on Supabase; use `migrate diff` to author migrations):

```bash
npx prisma migrate diff --from-empty --to-schema=prisma/schema.prisma --script \
  --output prisma/migrations/<timestamp>_<name>/migration.sql   # for the initial baseline
# for subsequent changes, diff from the live DB:
npx prisma migrate diff --from-config-datasource --to-schema=prisma/schema.prisma --script \
  --output prisma/migrations/<timestamp>_<name>/migration.sql
npm run db:deploy
```

Never put `url`/`directUrl` in `schema.prisma` (Prisma 7 rejects it). Never hardcode credentials in `prisma7.config.ts` — keep them in `.env` (gitignored).

## Vercel deployment

1. Add env vars in the Vercel project dashboard: `DATABASE_URL` (transaction pooler) and `DIRECT_URL` (session pooler).
2. Build command: `npx prisma migrate deploy && npm run build` (or keep `npm run build` and run `npx prisma migrate deploy` once after deploy). `prisma generate` already runs in `postinstall`/`build`.
3. Nothing secret lives in the repo — `.env*` and the generated client are gitignored.

## Conventions

- No secrets or credentials in any committed file.
- Keep the AI-agent directories (`.claude/`, `.cursor/`, `.agents/`, `.devin/`, `.aider-desk/`, `.hermes/`) gitignored and out of the repo.

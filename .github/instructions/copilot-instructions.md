# Copilot Instructions for BandPal

## Project Overview

- BandPal is a SvelteKit (Svelte 5) app using TypeScript, with routes and server logic under `src/routes/`.
- Uses Prisma for database access (see `src/lib/server/db/` and `prisma/`).
- Follows SvelteKit conventions for routing, layouts, and data loading. See `src/routes/` for all pages and API endpoints.

## Key Architecture & Patterns

- **Routing:**
  - Files in `src/routes/` map to URLs. Use `+page.svelte`, `+page.server.ts`, `+layout.svelte`, etc.
  - API endpoints are in `src/routes/api/` (e.g., `influences/+server.ts`).
- **Data Loading:**
  - Use `+page.server.ts` for server-side data fetching and actions.
  - Use `+page.ts` for universal (client/server) loads.
  - Data from `load` is accessed in Svelte via `let { data } = $props();`.
- **Forms & Actions:**
  - Use SvelteKit's form actions for mutations (see `use:enhance` and `actions` in `+page.server.ts`).
  - Progressive enhancement is handled with `$app/forms`'s `enhance`.
- **State Management:**
  - Use Svelte 5 runes: `$state`, `$derived`, `$effect`, `$props`.
  - Do not use Svelte 4 stores or `on:click` (use `onclick={...}` instead).
- **Prisma:**
  - Schema in `prisma/schema.prisma`, migrations in `prisma/migrations/`.
  - DB access via `src/lib/server/db/`.

## Developer Workflows

- **Dev server:** `pnpm dev` (see package.json scripts)
- **Build:** `pnpm build`
- **Preview:** `npm run preview`
- **Testing:** Playwright tests in `e2e/`, run with Playwright CLI. Vitest for unit tests (see `*.spec.ts`).
- **Prisma:**
  - Migrate: `pnpm prisma migrate dev --name <desc>`
  - Studio: `pnpm prisma studio`
  - Seed: `pnpm prisma db seed`

## Project Conventions

- Use Svelte 5 syntax and runes everywhere (see `.github/instructions/svelte-docs.instructions.md`).
- All server-only code goes in `src/lib/server/` or `*.server.ts` files.
- Use `@prisma/client` types for DB models.
- Use `onclick={...}` for DOM events, not `on:click`.
- Use `bind:value` for form fields, not `value` attribute.
- Use `let { data, form } = $props();` in page components to access load data and form state.
- Use Tailwind CSS for styling (see `tailwind.config.cs`) and the Skeleton UI component library

## Integration Points

- **Prisma**: DB access and migrations.
- **Playwright**: E2E tests in `e2e/`.
- **SvelteKit**: Routing, layouts, data loading, and actions.

## Examples

- See `src/routes/band/edit/[slug]/+page.svelte` for a form with autocomplete and Svelte 5 runes.
- See `src/routes/api/influences/+server.ts` for an API endpoint.
- See `src/routes/bands/+page.server.ts` for server-side data loading.

## References

- Svelte 5 runes and conventions: `.github/instructions/svelte-docs.instructions.md`
- Prisma docs: `prisma/README.md` (if present)
- SvelteKit docs: https://kit.svelte.dev/docs
- Prisma docs: https://prisma.io/docs/llms-full.txt

---

If you are unsure about a pattern, check for similar usage in `src/routes/` or ask for clarification.

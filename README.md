# BandPal

[![.github/workflows/test.yml](https://github.com/robertjawoods/BandPal/actions/workflows/test.yml/badge.svg)](https://github.com/robertjawoods/BandPal/actions/workflows/test.yml)
![Vercel](https://vercelbadge.vercel.app/api/robertjawoods/bandpal)

**BandPal** is a social network for musicians and people looking to join or build a band. It also includes tools for band administration and commerce.

---

## 🧠 Tech Stack

- **Next.js 15** (App Router)
- **Bun** (Package manager & runtime)
- **Supabase** (Auth, Database, Edge Functions, Realtime)
- **Prisma** (ORM)
- **Infisical** (Secrets manager for environment variables)
- **Tailwind CSS**
- **Playwright** (E2E testing)
- **Algolia** (Search/autocomplete)
- **Vercel** (Hosting & CI/CD)
- **Husky** (Git hooks)

---

## 🚀 Getting Started

### Requirements

- [Bun](https://bun.sh/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Infisical CLI](https://infisical.com/docs/cli/quickstart)  
  _(Install with `bun add -g @infisical/cli` if not already installed)_

### Local Setup

1. Clone the repo  
2. Install dependencies:

   ```bash
   bun install
      ```

3. Start Supabase (runs with Docker):

    ```bash
    bun supabase:start
    ```

4. Reset & seed local DB:

    ```bash
    bun db:reset:dev
    ```

5. Run the dev server:

    ```bash
    bun dev
    ```

6. (One-time) Enable realtime for chat messages:

    i. Visit Supabase Studio

    ii. Navigate to public.Message table

    iii. Enable "Realtime" in the top-right

## 🔗 Links

### [Production Supabase](https://supabase.com/dashboard/project/fpvmuwqjsufybflwwsmi)

### [Local Supabase](http://127.0.0.1:54323/project/default/)

### [Vercel](https://vercel.com/robertjawoods-projects/bandpal/)

### [Bandpal Production](https://bandpal.vercel.app/)

## 🧪 Useful Commands

| Task                  | Command            |
|-----------------------|--------------------|
| Start dev server      | `bun dev`          |
| Start Supabase local  | `bun supabase:start` |
| Stop Supabase         | `bun supabase:stop` |
| Reset DB (dev)        | `bun db:reset:dev` |
| Open Prisma Studio    | `bun studio`       |
| Run E2E tests (UI)    | `bun test:e2e`     |
| Run tests (CI)        | `bun test:e2e:ci`  |
| Lint + fix            | `bun lint`         |
| Clean project         | `bun clean`        |

## 🔐 Environment Variables

We use Infisical to manage secrets for both development and production.

#### ⚠️ You do not need to create or edit a .env file manually. ⚠️

Use `infisical run --env=dev -- <command>` to inject variables locally. This is handled automatically in all bun scripts.

## 🧭 Architecture Notes

- App Router (Next.js 15) using the `app/` directory

- Database managed with Prisma and Supabase

- Search powered by Algolia

- State management handled inline via server actions and local state

- Realtime chat via Supabase Channels

- Auth via Supabase (email/password & social)

## 🛠 Contribution Workflow

- Use feature branches

- PRs are automatically deployed via Vercel Preview Deployments

- Husky runs pre-commit checks (formatting, linting)

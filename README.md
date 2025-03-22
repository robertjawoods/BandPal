# Bandpal

## Local Environment Setup

### Requirements

* Bun
* Docker Desktop

---

1. Install Bun
2. Install Docker Desktop
3. Run `bun install` in the root directory to install dependencies
4. Run `bun supabase:start` and wait for the command to finish and display environment variable values.
5. Replace .env values with the results of the command

```plaintext
DIRECT_DATABASE_URL=DB URL
DATABASE_URL=DB URL
SUPABASE_API_KEY=API KEY
NEXT_PUBLIC_SUPABASE_URL=API URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon key
```

6. Run `bun db:reset`
7. Open the table editor, go to the public.Message table and enable realtime in the top right

Eventually the plan is to automate step 9 within the migration step.

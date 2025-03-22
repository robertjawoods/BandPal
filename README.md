# Bandpal 

## Local Environment Setup

### Requirements
* Bun
* Docker Desktop
---
1. Install Bun
2. Install Docker Desktop
3. Run `bun install` in the root directory to install dependencies
4. Run `bunx supabase start` and wait for the command to finish and display environment variable values.
5. Replace .env values with the results of the command
```plaintext
DIRECT_DATABASE_URL=DB URL
DATABASE_URL=DB URL
SUPABASE_API_KEY=API KEY
NEXT_PUBLIC_SUPABASE_URL=API URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon key
```
6. Run `bun db:migrate:dev`
7. Run `bun db:seed` to populate the database with data 
8. Open the supabase studio page at http://127.0.0.1:54323
9. Click on `SQL Editor` and run a new snippet with the contents 
```sql
CREATE OR REPLACE FUNCTION public.create_new_user()
RETURNS TRIGGER AS $$
    BEGIN
    INSERT INTO public."User" (id, name, email)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.email
    );
    INSERT INTO public."Profile" (id, "userId", joined)
    VALUES (
        gen_random_uuid(), 
        new.id, 
        current_date
    );
    RETURN NEW;
    END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_new_user();
```
10. Open the table editor, go to the public.Message table and enable realtime in the top right

Eventually the plan is to automate step 9 within the migration step.
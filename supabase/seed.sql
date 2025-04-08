-- Create custom user
create user "prisma" with password 'prisma' bypassrls createdb;
-- extend prisma's privileges to postgres (necessary to view changes in Dashboard)
grant "prisma" to "postgres";
-- Grant it necessary permissions over the relevant schemas (public)
grant usage on schema public to prisma;
grant create on schema public to prisma;
grant all on all tables in schema public to prisma;
grant all on all routines in schema public to prisma;
grant all on all sequences in schema public to prisma;
alter default privileges for role postgres in schema public grant all on tables to prisma;
alter default privileges for role postgres in schema public grant all on routines to prisma;
alter default privileges for role postgres in schema public grant all on sequences to prisma;

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
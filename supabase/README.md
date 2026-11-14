# Supabase setup

The app defaults to fictional mock data. Applicant and admin authentication,
form data, admin review, settings, and private document upload can use Supabase
after setup. WhatsApp message delivery is still simulated; no gateway provider
is connected yet.

1. Create a Supabase project in a region close to the Vercel Functions region.
2. Run `migrations/202611110001_initial_schema.sql` in the Supabase SQL Editor.
3. Copy `.env.example` to `.env.local` and fill the project URL and publishable/
   anon key. Never put a service-role key or database password in a `VITE_` variable.
4. Create admin users through Supabase Auth. Promote only trusted accounts in the
   SQL Editor: `update public.profiles set role = 'admin' where id = 'AUTH_USER_UUID';`
5. Set `VITE_USE_MOCK=false` locally and in Vercel's environment variables. Restart
   the Vite dev server after editing `.env.local`. Keep demo and production projects
   separate and use fictional demo records.

The private `ppdb-documents` bucket accepts PDF/JPG/PNG files up to 2 MB. Store
files beneath a path beginning with the user's Auth UUID. WhatsApp messages are
written to the database log, but sending and retrying through a real provider
requires a separate server-side gateway integration.

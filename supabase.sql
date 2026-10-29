-- Run in Supabase SQL Editor once. Never expose the service_role key to the browser.
create table if not exists public.roadmap_content (id integer primary key check (id=1), content jsonb not null, updated_at timestamptz not null default now());
alter table public.roadmap_content enable row level security;
-- No public policies: only server-side service_role may read/write.
-- Seed the initial content using scripts/seed.mjs after setting env vars.

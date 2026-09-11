-- TDG Community secure database
-- Run this in Supabase SQL Editor.
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  instagram text,
  photo_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;

-- Everyone can read the directory.
create policy "public can view members"
on public.members for select
to anon, authenticated
using (true);

-- IMPORTANT: only authenticated users that are already marked as Admin
-- can insert/update/delete. This prevents ordinary visitors from editing.
create policy "admins can insert"
on public.members for insert
to authenticated
with check (
  exists (select 1 from public.members me
          where me.id = auth.uid() and me.is_admin = true)
);

create policy "admins can update"
on public.members for update
to authenticated
using (
  exists (select 1 from public.members me
          where me.id = auth.uid() and me.is_admin = true)
)
with check (
  exists (select 1 from public.members me
          where me.id = auth.uid() and me.is_admin = true)
);

create policy "admins can delete"
on public.members for delete
to authenticated
using (
  exists (select 1 from public.members me
          where me.id = auth.uid() and me.is_admin = true)
);

-- NOTE:
-- For production, keep the first/owner Admin account protected and do not allow
-- an ordinary Admin to promote arbitrary accounts to Admin without an explicit
-- server-side role-management flow.

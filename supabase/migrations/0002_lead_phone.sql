-- Add phone column to leads. Idempotent for existing Supabase installs.
alter table public.leads
  add column if not exists phone text;

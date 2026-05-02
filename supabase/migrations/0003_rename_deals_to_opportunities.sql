-- 0003: Rename deals → opportunities
--
-- Postgres preserves data, indexes, foreign keys, and RLS policies across
-- a table rename (they're attached to the table by OID). Existing policies
-- whose names start with "deals_" keep working; we rename them too so
-- introspection reads cleanly.
--
-- Run this in the Supabase SQL editor. Safe to re-run: every step uses
-- IF EXISTS / DO blocks that no-op when the rename has already happened.

-- 1. Rename the table.
ALTER TABLE IF EXISTS public.deals RENAME TO opportunities;

-- 2. Rename the implicit primary key constraint, if Postgres named it after
--    the old table.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'deals_pkey'
      AND conrelid = 'public.opportunities'::regclass
  ) THEN
    ALTER TABLE public.opportunities RENAME CONSTRAINT deals_pkey TO opportunities_pkey;
  END IF;
END $$;

-- 3. Rename the sequence behind the id column, if it exists with the old name.
ALTER SEQUENCE IF EXISTS public.deals_id_seq RENAME TO opportunities_id_seq;

-- 4. Rename any RLS policies that begin with "deals_". Policies follow the
--    table by OID, so they keep working under the new name; this just keeps
--    the names consistent.
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'opportunities'
      AND policyname LIKE 'deals_%'
  LOOP
    EXECUTE format(
      'ALTER POLICY %I ON public.opportunities RENAME TO %I',
      pol.policyname,
      'opportunities_' || substring(pol.policyname FROM length('deals_') + 1)
    );
  END LOOP;
END $$;

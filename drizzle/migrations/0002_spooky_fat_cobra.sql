-- Note: ALTER TYPE ... ADD VALUE can't run inside the transaction that
-- `drizzle-kit migrate` wraps every batch in when connected through
-- Supabase's transaction pooler. If this file ever needs to be re-applied
-- from scratch, run this statement directly (e.g. via `drizzle-kit studio`'s
-- SQL runner or a one-off script with `prepare: false`) rather than
-- `npm run db:migrate`.
ALTER TYPE "public"."role" ADD VALUE 'viewer';

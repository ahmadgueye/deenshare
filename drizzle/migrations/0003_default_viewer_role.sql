-- Split from 0002 on purpose: keeps the enum-add and the default-change in
-- separate migration files/transactions (see note in 0002).
ALTER TABLE "profiles" ALTER COLUMN "role" SET DEFAULT 'viewer';

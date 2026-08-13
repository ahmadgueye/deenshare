CREATE TYPE "public"."ressource_status" AS ENUM('draft', 'published');--> statement-breakpoint
ALTER TABLE "ressources" ADD COLUMN "status" "ressource_status" DEFAULT 'published' NOT NULL;--> statement-breakpoint

-- Drafts are only visible to contributors/admins, not the public.
DROP POLICY "public read ressources" ON "ressources";--> statement-breakpoint
CREATE POLICY "public read ressources" ON "ressources" FOR SELECT
  USING (status = 'published' OR public.is_contributor());
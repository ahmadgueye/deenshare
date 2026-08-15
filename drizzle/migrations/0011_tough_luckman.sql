CREATE TYPE "public"."cours_status" AS ENUM('published', 'coming_soon');--> statement-breakpoint
ALTER TABLE "cours" ADD COLUMN "status" "cours_status" DEFAULT 'published' NOT NULL;
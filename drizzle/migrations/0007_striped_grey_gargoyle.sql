ALTER TYPE "public"."ressource_type" ADD VALUE 'texte';--> statement-breakpoint
ALTER TABLE "ressources" ALTER COLUMN "url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ressources" ADD COLUMN "content" text;
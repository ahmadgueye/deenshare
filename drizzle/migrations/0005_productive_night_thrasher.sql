CREATE TABLE "hadiths" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"thematique_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"arabic_text" text NOT NULL,
	"translation_fr" text NOT NULL,
	"narrator" text NOT NULL,
	"source" text,
	"added_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "hadiths_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "hadiths" ADD CONSTRAINT "hadiths_thematique_id_thematiques_id_fk" FOREIGN KEY ("thematique_id") REFERENCES "public"."thematiques"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hadiths" ADD CONSTRAINT "hadiths_added_by_profiles_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
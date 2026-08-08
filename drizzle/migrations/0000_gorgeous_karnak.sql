CREATE TYPE "public"."ressource_type" AS ENUM('video', 'pdf', 'lien');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'contributor');--> statement-breakpoint
CREATE TABLE "cours" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cours_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"full_name" text,
	"role" "role" DEFAULT 'contributor' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ressources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"thematique_id" uuid NOT NULL,
	"title" text NOT NULL,
	"type" "ressource_type" NOT NULL,
	"url" text NOT NULL,
	"description" text,
	"added_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seance_ressources" (
	"seance_id" uuid NOT NULL,
	"ressource_id" uuid NOT NULL,
	CONSTRAINT "seance_ressources_seance_id_ressource_id_pk" PRIMARY KEY("seance_id","ressource_id")
);
--> statement-breakpoint
CREATE TABLE "seance_thematiques" (
	"seance_id" uuid NOT NULL,
	"thematique_id" uuid NOT NULL,
	CONSTRAINT "seance_thematiques_seance_id_thematique_id_pk" PRIMARY KEY("seance_id","thematique_id")
);
--> statement-breakpoint
CREATE TABLE "seances" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"session_date" date,
	"summary" text,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "seances_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "thematiques" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cours_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"order_index" integer DEFAULT 0 NOT NULL,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "thematiques_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "cours" ADD CONSTRAINT "cours_created_by_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ressources" ADD CONSTRAINT "ressources_thematique_id_thematiques_id_fk" FOREIGN KEY ("thematique_id") REFERENCES "public"."thematiques"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ressources" ADD CONSTRAINT "ressources_added_by_profiles_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seance_ressources" ADD CONSTRAINT "seance_ressources_seance_id_seances_id_fk" FOREIGN KEY ("seance_id") REFERENCES "public"."seances"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seance_ressources" ADD CONSTRAINT "seance_ressources_ressource_id_ressources_id_fk" FOREIGN KEY ("ressource_id") REFERENCES "public"."ressources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seance_thematiques" ADD CONSTRAINT "seance_thematiques_seance_id_seances_id_fk" FOREIGN KEY ("seance_id") REFERENCES "public"."seances"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seance_thematiques" ADD CONSTRAINT "seance_thematiques_thematique_id_thematiques_id_fk" FOREIGN KEY ("thematique_id") REFERENCES "public"."thematiques"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seances" ADD CONSTRAINT "seances_created_by_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "thematiques" ADD CONSTRAINT "thematiques_cours_id_cours_id_fk" FOREIGN KEY ("cours_id") REFERENCES "public"."cours"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "thematiques" ADD CONSTRAINT "thematiques_created_by_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
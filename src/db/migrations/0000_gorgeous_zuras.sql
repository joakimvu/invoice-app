DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('open', 'paid', 'void', 'uncollectible');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"createTimeStamp" timestamp DEFAULT now() NOT NULL,
	"value" integer NOT NULL,
	"description" text,
	"status" "status" NOT NULL
);

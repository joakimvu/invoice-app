ALTER TABLE "invoices" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN "userId" text NOT NULL;
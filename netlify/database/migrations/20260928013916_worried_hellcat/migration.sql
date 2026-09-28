ALTER TABLE "volunteers" ADD COLUMN "volunteer_status" text NOT NULL;--> statement-breakpoint
ALTER TABLE "volunteers" ADD COLUMN "school_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "volunteers" ADD COLUMN "home_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "volunteers" ADD COLUMN "phone_number" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "volunteers" ADD COLUMN "grade" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "volunteers" ADD COLUMN "experience" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "volunteers" ADD COLUMN "intention" text NOT NULL;--> statement-breakpoint
ALTER TABLE "volunteers" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "volunteers" DROP COLUMN "phone";--> statement-breakpoint
ALTER TABLE "volunteers" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "volunteers" DROP COLUMN "has_printer";--> statement-breakpoint
ALTER TABLE "volunteers" DROP COLUMN "skills";--> statement-breakpoint
ALTER TABLE "volunteers" DROP COLUMN "availability";
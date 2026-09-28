CREATE TABLE "gallery_devices" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"recipient_first_name" text DEFAULT '' NOT NULL,
	"blob_key" text NOT NULL,
	"content_type" text DEFAULT 'image/jpeg' NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "request_photos" (
	"id" serial PRIMARY KEY,
	"request_id" integer NOT NULL,
	"blob_key" text NOT NULL,
	"filename" text DEFAULT '' NOT NULL,
	"content_type" text DEFAULT 'application/octet-stream' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "requests" (
	"id" serial PRIMARY KEY,
	"recipient_name" text NOT NULL,
	"age" text NOT NULL,
	"requester_relationship" text DEFAULT '' NOT NULL,
	"email" text NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"address" text DEFAULT '' NOT NULL,
	"city" text DEFAULT '' NOT NULL,
	"state" text DEFAULT '' NOT NULL,
	"zip" text DEFAULT '' NOT NULL,
	"limb_side" text DEFAULT '' NOT NULL,
	"limb_type" text DEFAULT '' NOT NULL,
	"cause_of_difference" text DEFAULT '' NOT NULL,
	"measurements" text DEFAULT '' NOT NULL,
	"story" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"admin_notes" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);



CREATE TABLE "volunteers" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "volunteer_status" text NOT NULL,
    "school_email" text NOT NULL,
    "home_email" text NOT NULL,
    "phone_number" text DEFAULT '',
    "grade" text DEFAULT '',
    "experience" text DEFAULT '',
    "intention" text NOT NULL,
    "status" text DEFAULT 'new' NOT NULL,
    "admin_notes" text DEFAULT '' NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "request_photos" ADD CONSTRAINT "request_photos_request_id_requests_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE CASCADE;
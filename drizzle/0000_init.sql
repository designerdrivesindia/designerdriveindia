CREATE TYPE "public"."blog_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."car_category" AS ENUM('SUV', 'Sedan', 'Hatchback', 'Luxury', 'Tempo Traveller', 'Bus');--> statement-breakpoint
CREATE TYPE "public"."country" AS ENUM('India', 'Nepal', 'Bhutan', 'Sri Lanka');--> statement-breakpoint
CREATE TYPE "public"."inquiry_source" AS ENUM('package', 'car', 'destination', 'contact', 'general');--> statement-breakpoint
CREATE TYPE "public"."inquiry_status" AS ENUM('new', 'contacted', 'negotiation', 'converted', 'closed');--> statement-breakpoint
CREATE TYPE "public"."transmission" AS ENUM('Manual', 'Automatic');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('super_admin', 'content_manager', 'sales_manager');--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(200) NOT NULL,
	"title" varchar(240) NOT NULL,
	"excerpt" text NOT NULL,
	"cover_image" text NOT NULL,
	"category" varchar(120) NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"author" jsonb NOT NULL,
	"content" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"read_minutes" integer DEFAULT 1 NOT NULL,
	"status" "blog_status" DEFAULT 'published' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"seo" jsonb,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cars" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(160) NOT NULL,
	"name" varchar(160) NOT NULL,
	"category" "car_category" NOT NULL,
	"thumbnail" text NOT NULL,
	"gallery" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"seats" integer NOT NULL,
	"luggage" integer NOT NULL,
	"ac" boolean DEFAULT true NOT NULL,
	"transmission" "transmission" NOT NULL,
	"price_per_day" integer NOT NULL,
	"price_per_km" integer NOT NULL,
	"cities" text[] DEFAULT '{}' NOT NULL,
	"features" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"description" text NOT NULL,
	"driver_info" text NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "destinations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(160) NOT NULL,
	"name" varchar(160) NOT NULL,
	"country" "country" NOT NULL,
	"region" varchar(200) NOT NULL,
	"tagline" text NOT NULL,
	"hero_image" text NOT NULL,
	"thumbnail" text NOT NULL,
	"overview" text NOT NULL,
	"best_time_to_visit" text NOT NULL,
	"seasons" text[] DEFAULT '{}' NOT NULL,
	"trip_types" text[] DEFAULT '{}' NOT NULL,
	"attractions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"travel_tips" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"gallery" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"seo" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(120) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(40) NOT NULL,
	"whatsapp" varchar(40),
	"destination" varchar(160),
	"travel_date" varchar(40),
	"travelers" integer,
	"budget" varchar(80),
	"message" text,
	"source" "inquiry_source" DEFAULT 'general' NOT NULL,
	"reference_id" varchar(80),
	"reference_title" varchar(240),
	"status" "inquiry_status" DEFAULT 'new' NOT NULL,
	"assigned_to_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inquiry_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inquiry_id" uuid NOT NULL,
	"author_id" uuid,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"key" text NOT NULL,
	"folder" varchar(160) DEFAULT 'uploads' NOT NULL,
	"filename" varchar(255) NOT NULL,
	"mime_type" varchar(120) NOT NULL,
	"width" integer,
	"height" integer,
	"size_bytes" integer,
	"alt" varchar(255),
	"uploaded_by_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(180) NOT NULL,
	"title" varchar(200) NOT NULL,
	"country" "country" NOT NULL,
	"state" varchar(160) NOT NULL,
	"destination_slugs" text[] DEFAULT '{}' NOT NULL,
	"duration_days" integer NOT NULL,
	"duration_nights" integer NOT NULL,
	"starting_price" integer NOT NULL,
	"trip_types" text[] DEFAULT '{}' NOT NULL,
	"summary" text NOT NULL,
	"hero_image" text NOT NULL,
	"thumbnail" text NOT NULL,
	"gallery" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"overview" text NOT NULL,
	"highlights" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"itinerary" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"inclusions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"exclusions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"hotels" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"transport" text NOT NULL,
	"faqs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"rating" double precision DEFAULT 0 NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"popularity" integer DEFAULT 0 NOT NULL,
	"seo" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"user_agent" text,
	"expires_at" timestamp with time zone NOT NULL,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"key" varchar(120) PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(120) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role" DEFAULT 'content_manager' NOT NULL,
	"avatar_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inquiry_notes" ADD CONSTRAINT "inquiry_notes_inquiry_id_inquiries_id_fk" FOREIGN KEY ("inquiry_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inquiry_notes" ADD CONSTRAINT "inquiry_notes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_uploaded_by_id_users_id_fk" FOREIGN KEY ("uploaded_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "blog_posts_status_idx" ON "blog_posts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "blog_posts_category_idx" ON "blog_posts" USING btree ("category");--> statement-breakpoint
CREATE INDEX "blog_posts_published_idx" ON "blog_posts" USING btree ("published_at");--> statement-breakpoint
CREATE UNIQUE INDEX "cars_slug_idx" ON "cars" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "cars_category_idx" ON "cars" USING btree ("category");--> statement-breakpoint
CREATE INDEX "cars_featured_idx" ON "cars" USING btree ("featured");--> statement-breakpoint
CREATE UNIQUE INDEX "destinations_slug_idx" ON "destinations" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "destinations_country_idx" ON "destinations" USING btree ("country");--> statement-breakpoint
CREATE INDEX "destinations_featured_idx" ON "destinations" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "inquiries_status_idx" ON "inquiries" USING btree ("status");--> statement-breakpoint
CREATE INDEX "inquiries_source_idx" ON "inquiries" USING btree ("source");--> statement-breakpoint
CREATE INDEX "inquiries_created_idx" ON "inquiries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "inquiries_assigned_idx" ON "inquiries" USING btree ("assigned_to_id");--> statement-breakpoint
CREATE INDEX "inquiry_notes_inquiry_idx" ON "inquiry_notes" USING btree ("inquiry_id");--> statement-breakpoint
CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder");--> statement-breakpoint
CREATE UNIQUE INDEX "packages_slug_idx" ON "packages" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "packages_country_idx" ON "packages" USING btree ("country");--> statement-breakpoint
CREATE INDEX "packages_featured_idx" ON "packages" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "packages_price_idx" ON "packages" USING btree ("starting_price");--> statement-breakpoint
CREATE INDEX "packages_popularity_idx" ON "packages" USING btree ("popularity");--> statement-breakpoint
CREATE INDEX "refresh_tokens_user_idx" ON "refresh_tokens" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "refresh_tokens_hash_idx" ON "refresh_tokens" USING btree ("token_hash");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
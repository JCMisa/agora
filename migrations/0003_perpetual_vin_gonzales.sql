ALTER TABLE "users" ADD COLUMN "clerkId" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "headline" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "location" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "linkedinUrl" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "githubUrl" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "portfolioUrl" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "createdAt" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updatedAt" timestamp with time zone;--> statement-breakpoint
CREATE UNIQUE INDEX "clerkId_idx" ON "users" USING btree ("clerkId");--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "headline_idx" ON "users" USING btree ("headline");--> statement-breakpoint
CREATE INDEX "role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "createdAt_idx" ON "users" USING btree ("createdAt");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_clerkId_unique" UNIQUE("clerkId");
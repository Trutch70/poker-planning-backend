ALTER TABLE "tasks" ALTER COLUMN "estimates" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "estimates" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "answersShown" SET DEFAULT false;
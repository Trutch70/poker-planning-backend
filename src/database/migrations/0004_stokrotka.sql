CREATE TABLE "task" (
	"name" text PRIMARY KEY NOT NULL,
	"roomId" text NOT NULL,
	"estimates" jsonb DEFAULT '[]'::jsonb,
	"finalEstimate" integer,
	"createdAt" timestamp (0) DEFAULT now()
);

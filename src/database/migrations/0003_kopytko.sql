CREATE TYPE "public"."genderEnum" AS ENUM('f', 'm', 'n');--> statement-breakpoint
CREATE TABLE "adjective" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "adjective_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"male" text,
	"female" text,
	"neutral" text
);
--> statement-breakpoint
CREATE TABLE "animal" (
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plants" (
	"name" text PRIMARY KEY NOT NULL,
	"gender" "genderEnum"
);

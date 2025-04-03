ALTER TABLE "adjective" RENAME TO "adjectives";--> statement-breakpoint
ALTER TABLE "animal" RENAME TO "animals";--> statement-breakpoint
ALTER TABLE "room" RENAME TO "rooms";--> statement-breakpoint
ALTER TABLE "task" RENAME TO "tasks";--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "task_roomId_room_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;
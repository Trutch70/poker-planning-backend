import { pgTable, text } from "drizzle-orm/pg-core";
import { room } from "./room";

export const participant = pgTable("participants", {
    username: text(),
    roomId: text().references(() => room.id),
});

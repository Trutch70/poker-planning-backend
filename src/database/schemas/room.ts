import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const room = pgTable("rooms", {
    id: text().primaryKey(),
    createdAt: timestamp({ precision: 0 }).defaultNow(),
});

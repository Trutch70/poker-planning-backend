import { pgTable, text } from "drizzle-orm/pg-core";

export const animal = pgTable("animal", {
    name: text().primaryKey(),
});

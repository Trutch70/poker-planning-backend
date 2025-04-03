import { pgTable, text } from "drizzle-orm/pg-core";

export const animal = pgTable("animals", {
    name: text().primaryKey(),
});

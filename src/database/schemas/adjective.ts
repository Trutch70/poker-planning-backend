import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const adjective = pgTable("adjectives", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    male: text(),
    female: text(),
    neutral: text(),
});

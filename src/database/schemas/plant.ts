import { pgTable, text } from "drizzle-orm/pg-core";
import { gender } from "./gender";

export const plant = pgTable("plants", {
    name: text().primaryKey(),
    gender: gender(),
});

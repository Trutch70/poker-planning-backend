import {
    boolean,
    integer,
    jsonb,
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { room } from "./room";

export type Estimates = Record<string, string>;

export const task = pgTable("tasks", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    roomId: text()
        .notNull()
        .references(() => room.id),
    estimates: jsonb().$type<Estimates>().default({}).notNull(),
    finalEstimate: integer(),
    answersShown: boolean().default(false),
    createdAt: timestamp({ precision: 0 }).defaultNow(),
});

import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { room } from "./room";

export interface Estimate {
    username: string;
    estimate: number | null;
}

export const task = pgTable("tasks", {
    name: text().primaryKey(),
    roomId: text()
        .notNull()
        .references(() => room.id),
    estimates: jsonb().$type<Estimate[]>().default([]),
    finalEstimate: integer(),
    createdAt: timestamp({ precision: 0 }).defaultNow(),
});

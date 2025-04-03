import {
    boolean,
    integer,
    jsonb,
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { room } from "./room";

export interface Estimate {
    username: string;
    estimate: number | null;
}

export const task = pgTable("tasks", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    roomId: text()
        .notNull()
        .references(() => room.id),
    estimates: jsonb().$type<Estimate[]>().default([]),
    finalEstimate: integer(),
    answersShown: boolean(),
    createdAt: timestamp({ precision: 0 }).defaultNow(),
});

import { pgTable, text, unique } from "drizzle-orm/pg-core";
import { room } from "./room";

export const participant = pgTable(
    "participants",
    {
        username: text(),
        roomId: text().references(() => room.id),
    },
    (table) => [
        unique("unique_participant_username_room-id").on(
            table.username,
            table.roomId
        ),
    ]
);

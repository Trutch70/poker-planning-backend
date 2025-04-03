import { eq } from "drizzle-orm";
import express from "express";
import { db } from "./database/connection";
import { room, task } from "./database/schema";
import { participant } from "./database/schemas/participant";
import { drawAnimal } from "./features/drawAnimal";
import { generateName } from "./features/generateName";

const app = express();

app.use(express.json());

const port = 3000;

app.get("/", async (req, res) => {
    res.send("Hello World");
});

app.post("/rooms", async (req, res) => {
    const newRoom = await db
        .insert(room)
        .values({ id: await generateName(), createdAt: new Date() })
        .returning();
    res.status(201).json(newRoom);
});

app.post("/rooms/:roomId/join", async (req, res) => {
    const { roomId } = req.params;
    const drawnUsername = await drawAnimal();
    const selectedRoom = await db
        .select()
        .from(room)
        .where(eq(room.id, roomId));

    if (selectedRoom.length === 0) {
        res.status(404).json({ error: "Room not found" });

        return;
    }

    await db.insert(participant).values({ username: drawnUsername, roomId });

    res.status(201).json(drawnUsername);
});

app.patch("/task/:taskId/name", async (req, res) => {
    const { taskId } = req.params;

    await db
        .update(task)
        .set({ name: req.body.name })
        .where(eq(task.id, Number(taskId)));

    if (taskId.length === 0) {
        res.status(404).json({ error: "Task not found" });

        return;
    }
    res.status(204).send();
});

app.get("/rooms/:roomId", async (req, res) => {
    const { roomId } = req.params;
    const roomDetailsFromDb = await db
        .select()
        .from(room)
        .where(eq(room.id, roomId));

    const selectedParticipants = await db
        .select({ username: participant.username })
        .from(participant)
        .where(eq(participant.roomId, roomId));

    const selectedTasks = await db
        .select()
        .from(task)
        .where(eq(task.roomId, roomId));

    if (roomDetailsFromDb.length === 0) {
        res.status(404).json({ error: "Room not found" });

        return;
    }
    const roomDetails = {
        ...roomDetailsFromDb[0],
        tasks: selectedTasks.map((t) => ({
            name: t.name,
            finalEstimate: t.finalEstimate,
            answersShown: t.answersShown,
        })),
        participants: selectedParticipants.map((p) => p.username),
    };

    res.status(201).json(roomDetails);
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});

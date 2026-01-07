import { asc, count, eq } from "drizzle-orm";
import express from "express";
import { db } from "./database/connection";
import { room, task } from "./database/schema";
import { participant } from "./database/schemas/participant";
import { drawAnimal } from "./features/drawAnimal";
import { generateName } from "./features/generateName";
import {
    createTaskRequestSchema,
    updateTaskEstimateSchema,
    updateTaskRequestSchema,
} from "./validator/task.ts";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

app.get("/", async (req, res) => {
    res.send("Hello World");
});

app.post("/rooms", async (req, res) => {
    const [newRoom] = await db
        .insert(room)
        .values({ id: await generateName(), createdAt: new Date() })
        .returning();

    await db
        .insert(task)
        .values({
            name: "Poker 1",
            roomId: newRoom.id,
            answersShown: false,
        })
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

app.post("/tasks", async (req, res) => {
    const [taskRoom] = await db
        .select({ count: count(room.id) })
        .from(room)
        .where(eq(room.id, req.body.roomId))
        .limit(1);

    if (0 === taskRoom.count) {
        res.status(400).send("Room not found");
    }

    const body = createTaskRequestSchema.parse(req.body);
    const [newTask] = await db
        .insert(task)
        .values({
            name: body.name,
            roomId: body.roomId,
            answersShown: false,
        })
        .returning();

    res.status(201).json({ id: newTask.id });
});

app.patch("/tasks/:taskId", async (req, res) => {
    const { taskId } = req.params;
    const body = updateTaskRequestSchema.parse(req.body);

    const updatedTasks = await db
        .update(task)
        .set({
            name: body.name,
            finalEstimate: body.finalEstimate,
            answersShown: body.answersShown,
        })
        .where(eq(task.id, Number(taskId)))
        .returning({ id: task.id });

    if (!updatedTasks.length) {
        res.status(404).json({ error: "Task not found" });

        return;
    }

    res.status(204).send();
});

app.patch("/tasks/:taskId/estimate", async (req, res) => {
    const { taskId } = req.params;
    const body = updateTaskEstimateSchema.parse(req.body);

    const tasks = await db
        .select({ estimates: task.estimates })
        .from(task)
        .where(eq(task.id, Number(taskId)))
        .limit(1);

    if (!tasks.length) {
        res.status(404).json({ error: "Task not found" });

        return;
    }

    const targetEstimates = tasks[0].estimates;
    targetEstimates[body.username] = body.estimate;

    await db.update(task).set({ estimates: targetEstimates });

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
        .where(eq(task.roomId, roomId))
        .orderBy(asc(task.createdAt));

    if (roomDetailsFromDb.length === 0) {
        res.status(404).json({ error: "Room not found" });

        return;
    }
    const roomDetails = {
        ...roomDetailsFromDb[0],
        tasks: selectedTasks.map((t) => ({
            id: t.id,
            name: t.name,
            finalEstimate: t.finalEstimate,
            estimates: t.estimates,
            answersShown: t.answersShown,
        })),
        participants: selectedParticipants.map((p) => p.username),
    };

    res.status(201).json(roomDetails);
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});

import express from "express";
import { room } from "./database/schema";
import { db } from "./database/connection";
import { generateName } from "./features/generateName";
import { drawAnimal } from "./features/drawAnimal";

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

// app.post("/rooms/:roomId/join", async (req, res) => {
//     const { roomId } = req.params;
//     const drawnUsername = await drawAnimal();

//     return username;
// });

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});

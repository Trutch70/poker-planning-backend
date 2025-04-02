import express from "express";
import { room } from "./database/schema";
import { db } from "./database/connection";

const app = express();

app.use(express.json());

const port = 3000;

app.get("/", async (req, res) => {
    res.send("Hello World");
});

app.post("/rooms", async (req, res) => {
    const { id } = req.body;
    const newRoom = await db.insert(room).values({ id, createdAt: new Date() }).returning();
    res.status(201).json(newRoom);
});

app.get("/rooms", async (req, res) => {
    const rooms = await db.select().from(room);
    res.json(rooms);
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});

import { count, eq } from "drizzle-orm";
import { db } from "../database/connection";
import { adjective, plant } from "../database/schema";

const getRandomAdjective = async () => {
    const [result] = await db.select({ count: count() }).from(adjective);
    const randomIndex = Math.floor(Math.random() * result.count);
    const adj = await db
        .select()
        .from(adjective)
        .where(eq(adjective.id, randomIndex));
    return adj[0];
};
const getRandomPlant = async () => {
    const [result] = await db.select({ count: count() }).from(plant);
    const randomIndex = Math.floor(Math.random() * result.count);
    const randomPlant = await db
        .select()
        .from(plant)
        .offset(randomIndex - 1)
        .limit(1);
    return randomPlant[0];
};

const mapGenders = (gender: "f" | "m" | "n" | null) => {
    switch (gender) {
        case "f":
            return "female";
        case "m":
            return "male";
        default:
        case "n":
            return "neutral";
    }
};

export const generateName = async () => {
    const plant = await getRandomPlant();
    const adj = await getRandomAdjective();
    const genderedAdjective = adj[mapGenders(plant.gender)];

    return `${genderedAdjective}_${plant.name}`;
};

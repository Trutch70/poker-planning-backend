import { count } from "drizzle-orm";
import { db } from "../database/connection";
import { adjective, plant } from "../database/schema";

const getRandomAdjective = async () => {
    const [result] = await db.select({ count: count() }).from(adjective);
    const randomIndex = Math.floor(Math.random() * (result.count - 1));

    console.log(randomIndex);

    const adj = await db.select().from(adjective).offset(randomIndex).limit(1);
    return adj[0];
};

const getRandomPlant = async () => {
    const [result] = await db.select({ count: count() }).from(plant);

    const randomIndex = Math.floor(Math.random() * (result.count - 1));

    const randomPlant = await db
        .select()
        .from(plant)
        .offset(randomIndex)
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

    console.log(plant, adj, mapGenders(plant.gender));
    const genderedAdjective = adj[mapGenders(plant.gender)];

    return `${genderedAdjective}_${plant.name}`;
};

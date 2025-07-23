import { count } from "drizzle-orm";
import { db } from "../database/connection";
import { animal } from "../database/schema";

export const drawAnimal = async () => {
    const [result] = await db.select({ count: count() }).from(animal);
    const randomIndex = Math.max(
        Math.floor(Math.random() * result.count + 1),
        1
    );
    const randomAnimal = await db
        .select()
        .from(animal)
        .offset(randomIndex - 1)
        .limit(1);
    return randomAnimal[0].name;
};

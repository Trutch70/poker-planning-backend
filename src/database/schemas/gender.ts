import { pgEnum } from "drizzle-orm/pg-core";

export const gender = pgEnum("genderEnum", ["f", "m", "n"]);

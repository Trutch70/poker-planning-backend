import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/database/schema.ts",
    out: "./src/database/migrations",
    dbCredentials: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        url: process.env.DATABASE_URL!,
    },
    migrations: {
        schema: "public",
        table: "migrations",
    },
});

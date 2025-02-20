import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle('localhost:5432');


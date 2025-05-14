import { z } from "zod";

export const createTaskRequestSchema = z.object({
    name: z.string(),
    roomId: z.string(),
});

export const updateTaskRequestSchema = z
    .object({
        name: z.string(),
        finalEstimate: z.number(),
        answersShown: z.boolean(),
    })
    .partial();

export const updateTaskEstimateSchema = z.object({
    username: z.string(),
    estimate: z.string(),
});

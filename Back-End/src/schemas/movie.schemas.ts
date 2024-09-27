import { z } from "zod";

export const movieSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    imageUrl: z.string().min(1),
    description: z.string().min(1),
    time: z.number().min(50)
});
import { z } from "zod";

export const reviewSchema = z.object({
    id: z.number().positive(),
    note: z.number().min(1),
    comment: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date()
});
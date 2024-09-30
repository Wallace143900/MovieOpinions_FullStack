import { z } from "zod";
import { categorySchema } from "./category.schemas";

export const movieSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    imageUrl: z.string().min(1),
    description: z.string().min(1),
    time: z.number().min(50),
    categoryId: z.number().positive().nullish()
});

export const movieCreateSchema = movieSchema.omit({ id: true});

export const TMovieReturn = movieSchema.extend({category: categorySchema.nullish() }).omit({categoryId: true});

export type TMovie = z.infer<typeof movieSchema>;
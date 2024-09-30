import { z } from "zod";
import { movieSchema } from "./movie.schemas";

export const reviewSchema = z.object({
    id: z.number().positive(),
    note: z.number().min(1),
    comment: z.string().min(1),
    movieId: z.number().positive().nullish(),
    createdAt: z.date(),
    updatedAt: z.date()
});

export const reviewCreateSchema = reviewSchema.omit({ id: true, createdAt: true, updatedAt: true});

export const reviewUpdateSchema = reviewCreateSchema.partial();

export const TReviewReturn = reviewSchema.extend({category: movieSchema.nullish() }).omit({movieId: true});

export type TReview = z.infer<typeof movieSchema>;


export type TReviewCreate = z.infer<typeof reviewCreateSchema>;

export type TReviewUpdate = z.infer<typeof reviewUpdateSchema>;
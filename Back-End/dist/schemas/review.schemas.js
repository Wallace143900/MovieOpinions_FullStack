"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TReviewReturn = exports.reviewUpdateSchema = exports.reviewCreateSchema = exports.reviewSchema = void 0;
const zod_1 = require("zod");
const movie_schemas_1 = require("./movie.schemas");
exports.reviewSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    note: zod_1.z.number().min(1),
    comment: zod_1.z.string().min(1),
    movieId: zod_1.z.number().positive().nullish(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
exports.reviewCreateSchema = exports.reviewSchema.omit({ id: true, createdAt: true, updatedAt: true });
exports.reviewUpdateSchema = exports.reviewCreateSchema.partial();
exports.TReviewReturn = exports.reviewSchema.extend({ movie: movie_schemas_1.movieSchema.nullish(), }).omit({ movieId: true });

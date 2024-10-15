"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TMovieReturn = exports.movieCreateSchema = exports.movieSchema = void 0;
const zod_1 = require("zod");
const category_schemas_1 = require("./category.schemas");
exports.movieSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    title: zod_1.z.string().min(1),
    imageUrl: zod_1.z.string().url().optional(),
    description: zod_1.z.string().min(1),
    time: zod_1.z.number().min(50),
    categoryId: zod_1.z.number().positive().nullish()
});
exports.movieCreateSchema = exports.movieSchema.omit({ id: true });
exports.TMovieReturn = exports.movieSchema.extend({ category: category_schemas_1.categorySchema.nullish() }).omit({ categoryId: true });

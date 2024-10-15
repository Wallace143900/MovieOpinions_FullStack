"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewServices = void 0;
const review_schemas_1 = require("../schemas/review.schemas");
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
const tsyringe_1 = require("tsyringe");
let ReviewServices = class ReviewServices {
    create(userId, movieId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.movieId) {
                const movieExists = yield prisma_1.prisma.movie.findFirst({
                    where: { id: body.movieId }
                });
                if (!movieExists) {
                    throw new appError_1.AppError('movie not found', 404);
                }
            }
            const data = yield prisma_1.prisma.review.create({
                data: Object.assign(Object.assign({}, body), { movieId,
                    userId })
            });
            return review_schemas_1.reviewSchema.parse(data);
        });
    }
    findMany(movieName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (movieName) {
                const data = yield prisma_1.prisma.review.findMany({
                    include: { movie: true },
                    where: movieName
                        ? { movie: { title: { contains: movieName, mode: "insensitive" } } }
                        : undefined,
                });
                return review_schemas_1.TReviewReturn.array().parse(data);
            }
            const data = yield prisma_1.prisma.review.findMany({
                include: { movie: true }
            });
            return review_schemas_1.TReviewReturn.array().parse(data);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.review.findFirst({
                where: { id },
                include: { movie: true }
            });
            if (!data) {
                throw new appError_1.AppError("Review not found", 404);
            }
            return review_schemas_1.TReviewReturn.parse(data);
        });
    }
    update(userId, reviewId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingReview = yield prisma_1.prisma.review.findFirst({
                where: { id: reviewId, userId }
            });
            if (!existingReview) {
                throw new appError_1.AppError('Avaliação não encontrada ou você não tem permissão para atualizá-la', 404);
            }
            const { movieId } = body, rest = __rest(body, ["movieId"]);
            const data = Object.assign(Object.assign({}, rest), (movieId !== null && movieId !== undefined && { movieId }));
            const updatedReview = yield prisma_1.prisma.review.update({
                where: { id: reviewId },
                data
            });
            return review_schemas_1.reviewSchema.parse(updatedReview);
        });
    }
    delete(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewExists = yield prisma_1.prisma.review.findUnique({
                where: { id: reviewId }
            });
            if (!reviewExists) {
                throw new appError_1.AppError('Review not found', 404);
            }
            yield prisma_1.prisma.review.delete({
                where: { id: reviewId }
            });
        });
    }
};
exports.ReviewServices = ReviewServices;
exports.ReviewServices = ReviewServices = __decorate([
    (0, tsyringe_1.injectable)()
], ReviewServices);

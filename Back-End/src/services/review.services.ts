import { reviewSchema, TReview, TReviewCreate, TReviewReturn, TReviewUpdate } from "../schemas/review.schemas";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { injectable } from "tsyringe";

@injectable()
export class ReviewServices {

    async create(userId: number, movieId: number, body: TReviewCreate): Promise<TReview> {
        if (body.movieId) {
            const movieExists = await prisma.movie.findFirst({
                where: {id: body.movieId}
            });

            if (!movieExists) {
                throw new AppError('movie not found', 404);
            }
        }

        const data = await prisma.review.create({
            data: {
                ...body,
                movieId, 
                userId
            }
        });

        return reviewSchema.parse(data);
    }

    async findMany(movieName?: string): Promise<TReview[]> {
        if (movieName) {
            const data = await prisma.review.findMany({
                include: { movie: true },
                where: movieName
            ? { movie: { title: { contains: movieName, mode: "insensitive" } } }
            : undefined,
            });

            return TReviewReturn.array().parse(data);
        }

        const data = await prisma.review.findMany({
            include: { movie: true }
        });

        return TReviewReturn.array().parse(data);
    }

    async findOne(id: number): Promise<TReview | null> {
        const data = await prisma.review.findFirst({
            where: { id },
            include: { movie: true }
        });

        if (!data) {
            throw new AppError("Review not found", 404);
        }

        return TReviewReturn.parse(data);
    }

    async update(userId: number, reviewId: number, body: TReviewUpdate): Promise<TReview> {

        const existingReview = await prisma.review.findFirst({
            where: { id: reviewId, userId }
        });

        if (!existingReview) {
            throw new AppError('Avaliação não encontrada ou você não tem permissão para atualizá-la', 404);
        }

        const { movieId, ...rest } = body;

        const data = {
            ...rest, 
            ...(movieId !== null && movieId !== undefined && { movieId })
        };

        const updatedReview = await prisma.review.update({
            where: { id: reviewId },
            data
        });

        return reviewSchema.parse(updatedReview);
    }

    async delete(reviewId: number): Promise<void> {
        const reviewExists = await prisma.review.findUnique({
            where: { id: reviewId }
        });

        if (!reviewExists) {
            throw new AppError('Review not found', 404);
        }

        await prisma.review.delete({
            where: { id: reviewId }
        });
    }
}
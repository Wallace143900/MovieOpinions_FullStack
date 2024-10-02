import { inject, injectable } from "tsyringe";
import { ReviewServices } from "../services/review.services";
import { NextFunction, Request, response, Response } from "express";
import { AppError } from "../errors/appError";
import { prisma } from "../database/prisma";

@injectable()
export class ReviewController {
    constructor(@inject("ReviewServices") private reviewServices: ReviewServices) {}

    async create(req: Request, res: Response): Promise<Response> {
        const { movieId } = req.params;
        const { id: userId } = res.locals.decode;

        const review = await this.reviewServices.create(Number(userId),Number(movieId), req.body);
        return res.status(201).json(review);
    }

    async findMany(req: Request, res: Response) {
        const movieParam = req.query.movie;
        const response = await this.reviewServices.findMany(movieParam as string);
        return res.status(200).json(response);
    }

    async findOne(req: Request, res: Response) {
        const response = await this.reviewServices.findOne(Number(req.params.id));
        return res.status(200).json(response);
    }

    async update(req: Request, res: Response) {
        const userId = res.locals.decode.id;
    const reviewId = Number(req.params.id); 
    const response = await this.reviewServices.update(userId, reviewId, req.body);

    return res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {
        const reviewId = Number(req.params.id);
    
        await prisma.review.delete({
            where: { id: reviewId }
        });
    
        return res.status(204).send();
    }
}
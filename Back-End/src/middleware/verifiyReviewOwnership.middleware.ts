import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";


export async function verifyReviewOwnership(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.decode.id; 
    const reviewId = Number(req.params.id); 

    console.log("User ID:", userId);
    console.log("Review ID:", reviewId);

    const review = await prisma.review.findUnique({
        where: { id: reviewId },
        select: { userId: true }
    });

    console.log("Review Found:", review);

    if (!review) {
        throw new AppError("Avaliação não encontrada", 404);
    }

    if (review.userId !== userId) {
        throw new AppError("Você não tem permissão para acessar esta avaliação", 403);
    }

    next();
}

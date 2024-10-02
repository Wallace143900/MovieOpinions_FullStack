import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/appError';

export class IsReviewIdValid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const reviewId = Number(req.params.id);

    if (isNaN(reviewId) || reviewId <= 0) {
      throw new AppError('Invalid task ID', 400);
    }

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new AppError('review not found', 404);
    }
    res.locals.review = review;

    next();
  }
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsReviewIdValid = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
class IsReviewIdValid {
    static execute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewId = Number(req.params.id);
            if (isNaN(reviewId) || reviewId <= 0) {
                throw new appError_1.AppError('Invalid task ID', 400);
            }
            const review = yield prisma_1.prisma.review.findUnique({
                where: { id: reviewId },
            });
            if (!review) {
                throw new appError_1.AppError('review not found', 404);
            }
            res.locals.review = review;
            next();
        });
    }
}
exports.IsReviewIdValid = IsReviewIdValid;

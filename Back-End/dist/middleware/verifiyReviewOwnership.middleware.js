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
exports.verifyReviewOwnership = verifyReviewOwnership;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
function verifyReviewOwnership(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.decode.id;
        const reviewId = Number(req.params.id);
        console.log("User ID:", userId);
        console.log("Review ID:", reviewId);
        const review = yield prisma_1.prisma.review.findUnique({
            where: { id: reviewId },
            select: { userId: true }
        });
        console.log("Review Found:", review);
        if (!review) {
            throw new appError_1.AppError("Avaliação não encontrada", 404);
        }
        if (review.userId !== userId) {
            throw new appError_1.AppError("Você não tem permissão para acessar esta avaliação", 403);
        }
        next();
    });
}

import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { container } from "tsyringe";
import { ReviewServices } from "../services/review.services";
import { ValidateBody } from "../middleware/validateBody.middleware";
import { reviewCreateSchema, reviewUpdateSchema } from "../schemas/review.schemas";
import { AddUserIdToRequest } from "../middleware/addUserId.middleware";
import { VerifyToken } from "../middleware/verifyToken.middleware";
import { IsReviewIdValid } from "../middleware/isReviewValid.middleware";
import { verifyReviewOwnership } from "../middleware/verifiyReviewOwnership.middleware";

export const reviewRouter = Router();

container.registerSingleton('ReviewServices', ReviewServices);

const reviewController = container.resolve(ReviewController);
reviewRouter.use(VerifyToken.execute);

reviewRouter.post('/:movieId', AddUserIdToRequest ,ValidateBody.execute(reviewCreateSchema), (req, res) => {reviewController.create(req, res)} );

reviewRouter.get("", (req, res) => {reviewController.findMany(req, res)});

reviewRouter.get("/:id", IsReviewIdValid.execute, verifyReviewOwnership, (req, res) => {reviewController.findOne(req, res)});

reviewRouter.patch("/:id", ValidateBody.execute(reviewUpdateSchema), IsReviewIdValid.execute, verifyReviewOwnership, (req, res) => {reviewController.update(req, res)});

reviewRouter.delete("/:id", IsReviewIdValid.execute, verifyReviewOwnership, (req, res) => {reviewController.delete(req, res)})
import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

export const categoryRouter = Router();

const categoryController = new CategoryController();

categoryRouter.get('', (req, res) => {
    categoryController.getAllCategories(req, res)
})

categoryRouter.get('/:id', (req, res) => {
    categoryController.getCategoryById(req, res)
})
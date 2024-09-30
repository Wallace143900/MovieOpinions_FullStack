import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

export const categoryRouter = Router();

const categoryController = new CategoryController();

categoryRouter.get('/categories', (req, res) => {
    categoryController.getAllCategories(req, res)
})

categoryRouter.get('/categories/:id', (req, res) => {
    categoryController.getCategoryById(req, res)
})
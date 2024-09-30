import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";

export class CategoryController {
    async getCategoryById(req: Request, res: Response) {

        const categoryService = new CategoryServices();

        const { id } = req.params;

        const movie = await categoryService.getCategoryById(Number(id));

        return res.status(200).json(movie);
    }

    public async getAllCategories(req: Request, res: Response) {
        const movieService = new CategoryServices();
        const categories = await movieService.getAllCategories();
        return res.status(200).json(categories);
    }
}
import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";

export class CategoryController {
    async getCategoryById(req: Request, res: Response) {
        const categoryService = new CategoryServices();
        const { id } = req.params;

        try {
            const categoryWithMovies = await categoryService.getCategoryById(Number(id));
            if (!categoryWithMovies) {
                return res.status(404).json({ message: "Categoria não encontrada." });
            }

            return res.status(200).json(categoryWithMovies);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar a categoria." });
        }
    }

    public async getAllCategories(req: Request, res: Response) {
        const movieService = new CategoryServices();
        const categories = await movieService.getAllCategories();
        return res.status(200).json(categories);
    }
}
import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { CategoryController } from "../controllers/category.controller";

export const movieRouter = Router();

const movieController = new MovieController();

movieRouter.get('/movies', (req, res) => {
    movieController.getAllMovies(req, res)
})

movieRouter.get('/movies/:id', (req, res) => {
    movieController.getMovieById(req, res)
})
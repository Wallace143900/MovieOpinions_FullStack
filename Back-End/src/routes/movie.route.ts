import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";

export const movieRouter = Router();

const movieController = new MovieController();

movieRouter.get('', (req, res) => {
    movieController.getAllMovies(req, res)
})

movieRouter.get('/:id', (req, res) => {
    movieController.getMovieById(req, res)
})
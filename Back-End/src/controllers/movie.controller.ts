import { Request, Response } from "express";
import { MovieService } from "../services/movie.services";

export class MovieController {
    public async getAllMovies(req: Request, res: Response) {

        const movieService = new MovieService();
        
        const movie = await movieService.getAllMoviesWithCategories();
        
        return res.status(200).json(movie);
    }

    async getMovieById(req: Request, res: Response) {

        const movieService = new MovieService();

        const { id } = req.params;

        const movie = await movieService.getMovieById(Number(id));

        return res.status(200).json(movie);
    }

}
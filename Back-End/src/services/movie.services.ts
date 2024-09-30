import { prisma } from "../database/prisma";

export class MovieService {

    async getAllMoviesWithCategories() {
        return await prisma.movie.findMany({
            include: {
                category: true,
            },
        });
    }

    async getMovieById(id: number) {
        return await prisma.movie.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });
    }
}

export const movieService = new MovieService();
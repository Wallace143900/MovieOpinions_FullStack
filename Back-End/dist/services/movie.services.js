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
exports.movieService = exports.MovieService = void 0;
const prisma_1 = require("../database/prisma");
class MovieService {
    getAllMoviesWithCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.movie.findMany({
                include: {
                    category: true,
                },
            });
        });
    }
    getMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.movie.findUnique({
                where: { id },
                include: {
                    category: true,
                },
            });
        });
    }
}
exports.MovieService = MovieService;
exports.movieService = new MovieService();

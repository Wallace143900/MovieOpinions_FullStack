"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRouter = void 0;
const express_1 = require("express");
const movie_controller_1 = require("../controllers/movie.controller");
exports.movieRouter = (0, express_1.Router)();
const movieController = new movie_controller_1.MovieController();
exports.movieRouter.get('', (req, res) => {
    movieController.getAllMovies(req, res);
});
exports.movieRouter.get('/:id', (req, res) => {
    movieController.getMovieById(req, res);
});

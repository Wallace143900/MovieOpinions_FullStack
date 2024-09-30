import express, { json } from 'express';
import { movieRouter } from './routes/categoriesAndMovies.route';

export const app = express();

app.use(json());
app.use('', movieRouter);
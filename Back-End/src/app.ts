import 'reflect-metadata';
import 'express-async-errors';
import express, { json } from 'express';
import { categoryRouter } from './routes/category.route';
import { movieRouter } from './routes/movie.route';
import { userRouter } from './routes/user.route';
import { reviewRouter } from './routes/review.route';
import helmet from 'helmet';
import cors from "cors";

export const app = express();

app.use(json());
app.use(helmet());
app.use(cors())
app.use('/movies', movieRouter);
app.use('/categories', categoryRouter);
app.use('/user', userRouter)
app.use("/reviews", reviewRouter);
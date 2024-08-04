import express from 'express';
import { publicRouter } from '../routers/public-api';
import { errorMiddleware } from '../middlewares/error-middleware';

export const app = express();
app.use(express.json());
app.use(publicRouter);
app.use(errorMiddleware);

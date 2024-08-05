import express from 'express'
import { authMiddleware } from '../middlewares/auth-middleware'
import { UserController } from '../controllers/user-controller';
import { LocationController } from '../controllers/location-controller';

export const apiRouter = express.Router()
apiRouter.use(authMiddleware);

// user api
apiRouter.get('/api/users/current', UserController.get);
apiRouter.patch('/api/users/current', UserController.update);
apiRouter.delete('/api/users/current', UserController.logout);

// location api
apiRouter.post('/api/locations', LocationController.create);
apiRouter.get('/api/locations/:locationId(\\d+)', LocationController.get);

import express from 'express'
import { authMiddleware } from '../middlewares/auth-middleware'
import { UserController } from '../controllers/user-controller';
import { LocationController } from '../controllers/location-controller';
import { ItemController } from '../controllers/item-controller';

export const apiRouter = express.Router()
apiRouter.use(authMiddleware);

// user api
apiRouter.get('/api/users/current', UserController.get);
apiRouter.patch('/api/users/current', UserController.update);
apiRouter.delete('/api/users/current', UserController.logout);

// location api
apiRouter.post('/api/locations', LocationController.create);
apiRouter.get('/api/locations/:locationId(\\d+)', LocationController.get);
apiRouter.put('/api/locations/:locationId(\\d+)', LocationController.update);
apiRouter.delete('/api/locations/:locationId(\\d+)', LocationController.remove);
apiRouter.get('/api/locations', LocationController.getAll);

// item api
apiRouter.post('/api/items', ItemController.create);
apiRouter.get('/api/items/:itemId(\\d+)', ItemController.get);
apiRouter.put('/api/items/:itemId(\\d+)', ItemController.update);

import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import CashierOperationController from './app/controllers/CashierOperationController';
import TableController from './app/controllers/TableController';
import OrderController from './app/controllers/OrderController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.remove);

routes.get('/cashier', CashierOperationController.index);
routes.post('/cashier', CashierOperationController.store);

routes.get('/order', OrderController.index);

routes.get('/table', TableController.index);

export default routes;

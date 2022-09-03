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
routes.post('/order', OrderController.store);
routes.put('/order/:id', OrderController.update);
routes.post('/order/pending/:id', OrderController.pending);
routes.post('/order/:id/add-product/:product_id', OrderController.addProduct);
routes.post('/order/:id/remove-product/:order_product_id', OrderController.removeProduct);


routes.get('/table', TableController.index);
routes.post('/table', TableController.store);
routes.put('/table/:id', TableController.update);
routes.delete('/table/:id', TableController.remove);

export default routes;

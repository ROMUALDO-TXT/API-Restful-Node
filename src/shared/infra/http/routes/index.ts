import productsRouter from '@modules/products/infra/http/routes/Products.routes';
import sessionsRouter from '@modules/users/infra/http/routes/Sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/Users.routes';
import passwordRouter from '@modules/users/infra/http/routes/Passwords.routes';
import { Router } from 'express';
import profileRouter from '@modules/users/infra/http/routes/Profile.routes';
import customersRouter from '@modules/customers/infra/http/routes/Customers.routes';
import ordersRouter from '@modules/orders/infra/http/routes/Orders.routes';

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/passwords', passwordRouter);

routes.use('/profile', profileRouter);

routes.use('/customers',customersRouter)

routes.use('/orders', ordersRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'hello world' });
});

export default routes;

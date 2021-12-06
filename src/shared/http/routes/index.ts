import productsRouter from '@modules/products/routes/Products.routes';
import sessionsRouter from '@modules/users/routes/Sessions.routes';
import usersRouter from '@modules/users/routes/Users.routes';
import passwordRouter from '@modules/users/routes/Passwords.routes';
import { Router } from 'express';
import profileRouter from '@modules/users/routes/Profile.routes';
import customersRouter from '@modules/costumers/routes/Customers.routes';

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/passwords', passwordRouter);

routes.use('/profile', profileRouter);

routes.use('/customers',customersRouter)

routes.get('/', (request, response) => {
  return response.json({ message: 'hello world' });
});

export default routes;

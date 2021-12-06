import {Router} from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersControler from '../controllers/OrdersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get('/:id',
    celebrate({
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required(),
        },
    }),
    ordersController.show
);

ordersRouter.post('/', 
    celebrate({
        [Segments.BODY]:{
            customer_id: Joi.string().uuid().required(),
            products: Joi.required(),
        },
    }),
    ordersController.create
);

export default ordersRouter;

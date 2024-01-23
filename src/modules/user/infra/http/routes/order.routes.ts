import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import OrderController from '../controllers/OrderController';
import authUser from '../middlewares/auth';

const orderRouter = Router();

orderRouter.post(
  '/create',
  authUser,
  celebrate({
    [Segments.BODY]: {
      store_id: Joi.string().uuid().required(),
      items: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            unit_price: Joi.string().required(),
            quantity: Joi.number().required(),
          }),
        )
        .required(),
    },
  }),
  OrderController.createOrder,
);

orderRouter.get('/list', authUser, OrderController.listOrders);

export default orderRouter;

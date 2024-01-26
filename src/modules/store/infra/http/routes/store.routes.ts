import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import StoreController from '../controllers/StoreController';

const storeRouter = Router();

storeRouter.post(
  '/register',
  celebrate({
    [Segments.BODY]: {
      display_name: Joi.string().required(),
      address: Joi.string().required(),
      profile_pic: Joi.string().required(),
      logo: Joi.string().required(),
      segments: Joi.array().items(Joi.string().required()).required(),
    },
  }),
  StoreController.createStore,
);

storeRouter.get('/list', StoreController.listStores);

storeRouter.get(
  '/show/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  StoreController.showStore,
);

storeRouter.post(
  '/menu_item/register',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      store_id: Joi.string().uuid().required(),
      description: Joi.string().required(),
      price: Joi.string().required(),
      image: Joi.string().required(),
    },
  }),
  StoreController.createMenuItem,
);

export default storeRouter;

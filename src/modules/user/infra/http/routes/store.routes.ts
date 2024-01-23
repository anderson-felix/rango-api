import { Router } from 'express';

import StoreController from '../controllers/StoreController';
import authUser from '../middlewares/auth';
import { Joi, Segments, celebrate } from 'celebrate';

const storeRouter = Router();

storeRouter.post(
  '/rating',
  authUser,
  celebrate({
    [Segments.BODY]: {
      store_id: Joi.string().uuid().required(),
      rating: Joi.number().required(),
    },
  }),
  StoreController.addRating,
);

export default storeRouter;

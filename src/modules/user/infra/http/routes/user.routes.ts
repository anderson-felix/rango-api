import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '../controllers/UserController';
import authUser from '../middlewares/auth';

const userRouter = Router();

// UNAUTHENTICATED ROUTES

userRouter.post(
  '/session',
  celebrate({
    [Segments.BODY]: {
      identifier: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  UserController.session,
);

userRouter.post(
  '/session/google',
  celebrate({
    [Segments.BODY]: {
      identifier: Joi.string().required(),
    },
  }),
  UserController.googleSession,
);

userRouter.post(
  '/register',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      birthdate: Joi.date().required(),
      phone: Joi.string().required(),
    },
  }),
  UserController.register,
);

userRouter.get(
  '/check_email/:email',
  celebrate({
    [Segments.PARAMS]: {
      email: Joi.string().email().required(),
    },
  }),
  UserController.checkEmail,
);

// AUTHENTICATED ROUTES

userRouter.get('/me', authUser, UserController.getProfile);

userRouter.get('/validate', authUser, UserController.validate);

userRouter.patch(
  '/password',
  authUser,
  celebrate({
    [Segments.BODY]: {
      old_password: Joi.string().required(),
      new_password: Joi.string().required(),
    },
  }),
  UserController.updatePassword,
);

userRouter.patch(
  '/me',
  authUser,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string(),
      birthdate: Joi.date(),
      phone: Joi.string(),
      address: Joi.object({
        address: Joi.string().default(''),
        number: Joi.string().default(''),
        complement: Joi.string().default(''),
        neighborhood: Joi.string().default(''),
        city: Joi.string().default(''),
        state: Joi.string().default(''),
        country: Joi.string().default(''),
        zip_code: Joi.string().default(''),
      }).optional(),
    },
  }),
  UserController.updateMe,
);

userRouter.get(
  '/check_password/:password',
  authUser,
  celebrate({
    [Segments.PARAMS]: { password: Joi.string().min(6).required() },
  }),
  UserController.checkPassword,
);

export default userRouter;

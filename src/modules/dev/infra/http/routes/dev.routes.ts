import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DevController from '@modules/dev/infra/http/controllers/DevController';
import UploadController from '@shared/infra/http/controllers/UploadController';
import authSecretKey from '../middlewares/authSecretKey';
import { bucketFolders } from '@shared/container/providers/StorageProvider/interfaces';

const devRouter = Router();

devRouter.put(
  '/upload/:secret',
  authSecretKey,
  celebrate({
    [Segments.QUERY]: {
      filename: Joi.string().required(),
    },
  }),
  DevController.upload,
);

devRouter.get(
  '/presigned',
  celebrate({
    [Segments.QUERY]: {
      mimetype: Joi.string().required(),
      folder: Joi.string()
        .valid(...bucketFolders)
        .required(),
    },
  }),
  UploadController.presigned,
);

export default devRouter;

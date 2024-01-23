import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import '@shared/container';
import '@shared/infra/typeorm';
import uploadConfig from '@config/upload';
import { httpLogger, logger } from '@shared/utils';
import routes from './routes';
import { getClientLanguage } from './middlewares/getClientLanguage';
import { appErrorHandler } from './middlewares/appErrorHandler';

const app = express();

const port = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: 'image/*', limit: '50mb' }));
app.use(httpLogger);
app.use(cors());
app.use(getClientLanguage);
app.use(routes);
app.use(errors());
app.use('/files', express.static(uploadConfig.directory));
app.use(appErrorHandler);

app.listen(port, () => logger.info(`Server is listening on http://localhost:${port}`));

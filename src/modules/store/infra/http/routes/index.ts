import { Router } from 'express';

import storeRouter from './store.routes';

const storeRoutes = Router();

storeRoutes.use(storeRouter);

export default storeRoutes;

import { Router } from 'express';

import userRouter from './user.routes';
import storeRouter from './store.routes';
import orderRouter from './order.routes';

const routes = Router();

routes.use('/store', storeRouter);
routes.use('/order', orderRouter);
routes.use(userRouter);

export default routes;

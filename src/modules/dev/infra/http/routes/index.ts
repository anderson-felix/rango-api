import { Router } from 'express';

import devRoutes from './dev.routes';

const routes = Router();

routes.use(devRoutes);

export default routes;

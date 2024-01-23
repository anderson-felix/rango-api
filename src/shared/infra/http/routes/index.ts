import { Router } from 'express';

import devRoutes from '@modules/dev/infra/http/routes';
import userRoutes from '@modules/user/infra/http/routes';
import storeRoutes from '@modules/store/infra/http/routes';

const router = Router();

router.use('/dev', devRoutes);
router.use('/store', storeRoutes);
router.use('/user', userRoutes);

router.get(`/health`, (_, res) => {
  const healthData = { status: 'online' };

  return res.json(healthData).status(200);
});

export default router;

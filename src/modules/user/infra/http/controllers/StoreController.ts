import { Request, Response } from 'express';
import { Container } from 'typedi';

import { AddStoreRatingService } from '@modules/user/services/store';

export default class StoreController {
  public static async addRating(req: Request, res: Response): Promise<Response> {
    const service = Container.get(AddStoreRatingService);

    const response = await service.execute({ user: req.user, ...req.body });

    return res.json(response);
  }
}

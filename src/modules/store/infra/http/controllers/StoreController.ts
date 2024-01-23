import { Request, Response } from 'express';
import { Container } from 'typedi';

import { CreateStoreService, ListStoresService } from '@modules/store/services/store';
import { CreateStoreMenuItemService } from '@modules/store/services/storeMenuItem';

export default class StoreController {
  public static async createStore(req: Request, res: Response): Promise<Response> {
    const service = Container.get(CreateStoreService);

    const response = await service.execute(req.body);

    return res.json(response);
  }

  public static async listStores(req: Request, res: Response): Promise<Response> {
    const service = Container.get(ListStoresService);

    const response = await service.execute();

    return res.json(response);
  }

  public static async createMenuItem(req: Request, res: Response): Promise<Response> {
    const service = Container.get(CreateStoreMenuItemService);

    const response = await service.execute(req.body);

    return res.json(response);
  }
}

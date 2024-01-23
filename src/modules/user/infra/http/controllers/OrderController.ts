import { Request, Response } from 'express';
import { Container } from 'typedi';

import { ListOrdersService } from '@modules/user/services/order/ListOrdersService';
import { CreateOrderService } from '@modules/user/services/order';

export default class OrderController {
  public static async createOrder(req: Request, res: Response): Promise<Response> {
    const service = Container.get(CreateOrderService);

    const response = await service.execute({ user: req.user, ...req.body });

    return res.json(response);
  }
  public static async listOrders(req: Request, res: Response): Promise<Response> {
    const service = Container.get(ListOrdersService);

    const response = await service.execute(req.user);

    return res.json(response);
  }
}

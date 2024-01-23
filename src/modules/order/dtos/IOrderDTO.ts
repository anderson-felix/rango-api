import { IOrderMetatada } from '../interfaces/IOrderMetatada';

export interface ICreateOrderDTO {
  user_id: string;
  store_id: string;
  items: IOrderMetatada[];
}

export interface IUpdateOrderDTO extends Partial<Omit<ICreateOrderDTO, `store_id` | `user_id`>> {
  id: string;
}

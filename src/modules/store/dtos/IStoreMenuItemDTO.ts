export interface ICreateStoreMenuItemDTO {
  name: string;
  store_id: string;
  description: string;
  price: string;
  image: string;
}

export interface IUpdateStoreMenuItemDTO extends Partial<Omit<ICreateStoreMenuItemDTO, `store_id`>> {
  id: string;
}

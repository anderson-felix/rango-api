import { IAddress } from '@shared/interfaces';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  birthdate: Date;
  phone: string;
}

export interface IUpdateUserDTO extends Partial<Omit<ICreateUserDTO, `password`>> {
  id: string;
  address?: IAddress;
}

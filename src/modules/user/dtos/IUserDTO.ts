import { IAddress } from '@shared/interfaces';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  birthdate: Date | null;
  phone: string;
}

export interface IUpdateUserDTO extends Partial<Omit<ICreateUserDTO, `password`>> {
  id: string;
  address?: IAddress;
}

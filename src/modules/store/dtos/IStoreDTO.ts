export interface ICreateStoreDTO {
  display_name: string;
  address: string;
  profile_pic: string;
  logo: string;
  segments: string[];
}

export interface IUpdateStoreDTO extends Partial<ICreateStoreDTO> {
  id: string;
}

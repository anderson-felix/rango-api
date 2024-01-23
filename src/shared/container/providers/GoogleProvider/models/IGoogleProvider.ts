import { IGoogleUserResponse } from '../interfaces/IGoogleUserResponse';

export default interface IGoogleProvider {
  getUser(access_token: string): Promise<IGoogleUserResponse>;
}

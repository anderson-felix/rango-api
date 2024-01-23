import { Service } from 'typedi';

import IGoogleProvider from '../models/IGoogleProvider';
import axios, { AxiosInstance } from 'axios';
import { IGoogleUserResponse } from '../interfaces/IGoogleUserResponse';
import { LocaleError } from '@shared/errors/LocaleError';
import { logger } from '@shared/utils';

@Service()
export default class GoogleProvider implements IGoogleProvider {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({ baseURL: process.env.GOOGLE_SSO_BASE_URL });
  }

  public async getUser(access_token: string) {
    try {
      const { data } = await this.client.get<IGoogleUserResponse>('/userinfo', { headers: { Authorization: `Bearer ${access_token}` } });

      return data;
    } catch (error) {
      logger.error(`googleAuthFailure: ${JSON.stringify({ error }, null, 4)}`);
      throw new LocaleError('googleAuthFailure');
    }
  }
}

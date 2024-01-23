import { Inject, Service } from 'typedi';

import StorageProvider from '@shared/container/providers/StorageProvider/implementations/StorageProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { GetFileLinkParams } from '@shared/container/providers/StorageProvider/interfaces';
import { LocaleError } from '@shared/errors/LocaleError';

@Service()
export default class GetFileLinkService {
  constructor(
    @Inject(() => StorageProvider)
    private storageProvider: IStorageProvider,
  ) {}

  public execute(data: GetFileLinkParams): string {
    if (!data.key) throw new LocaleError('operationNotPermitted');

    return this.storageProvider.getFileLink(data);
  }
}

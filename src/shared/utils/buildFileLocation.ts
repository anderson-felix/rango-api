import { Container } from 'typedi';

import { BucketFolders } from '@shared/container/providers/StorageProvider/interfaces';
import GetFileLinkService from '@shared/services/Storage/GetFileLinkService';
import { logger } from './logger';

type FuncType = (uri: string) => string;

export const buildFileLocation: FuncType = uri => {
  try {
    const localStorageLocation = `http://localhost:${process.env.PORT}`;

    if (!uri || typeof uri !== 'string') return localStorageLocation;

    const getFileLink = Container.get(GetFileLinkService);
    const [folder, ...key] = uri.split('/');

    return getFileLink.execute({
      folder: folder as BucketFolders,
      key: key.join(''),
    });
  } catch (error) {
    logger.error(JSON.stringify({ source: 'buildFileLocation error', error }, null, 4));
    return '';
  }
};

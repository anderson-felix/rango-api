import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import { Service } from 'typedi';

import uploadConfig from '@config/upload';
import { generateSecretKey } from '@modules/dev/utils/generateSecretKey';
import IStorageProvider from '../models/IStorageProvider';
import { FileDeleteOrDuplicateParams, FileUploadParams, GetFileLinkParams, GetUploadLinkParams } from '../interfaces';
import { filenameGenerator } from '@shared/utils';

@Service()
class DiskStorageProvider implements IStorageProvider {
  public async saveFile({ filename, filepath }: FileUploadParams): Promise<string> {
    await fs.promises.copyFile(filepath, `${uploadConfig.directory}/${filename}`);

    return `${process.env.APP_WEB_URL}/files/${filename}`;
  }

  public async deleteFile({ filename: fileName }: FileDeleteOrDuplicateParams) {
    const filePath = path.resolve(uploadConfig.directory, fileName);
    await fs.promises.unlink(filePath);
  }

  public async getUploadLink({ mimetype }: GetUploadLinkParams) {
    const timestamp = Date.now();

    const key = `${filenameGenerator()}.${mime.extension(mimetype)}`;

    const secret = generateSecretKey(timestamp);

    return {
      link: `${process.env.APP_API_URL}/dev/upload/${secret}?filename=${key}`,
      path: `files/${key}`,
    };
  }

  public getFileLink({ key }: GetFileLinkParams) {
    return `${process.env.APP_API_URL}/files/${key}`;
  }

  public async duplicateFile({ filename: fileName }: FileDeleteOrDuplicateParams) {
    const [mimetype] = fileName.split('.').reverse();
    const key = `${filenameGenerator()}.${mime.extension(mimetype)}`;

    const sourceFile = await fs.promises.open(`./tmp/${fileName}`, 'r');

    const duplicateFile = await fs.promises.open(`./tmp/${key}`, 'w');

    await duplicateFile.write(await sourceFile.readFile());

    return `files/${key}`;
  }
}

export default DiskStorageProvider;

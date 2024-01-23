import fs from 'fs';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime-types';
import { Service } from 'typedi';

import IStorageProvider from '../models/IStorageProvider';
import { FileDeleteOrDuplicateParams, FileUploadParams, GetFileLinkParams, GetUploadLinkParams } from '../interfaces';
import { filenameGenerator } from '@shared/utils';

@Service()
export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_REGION,
      signatureVersion: 'v4',
      apiVersion: '2006-03-01',
    });
    aws.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  public async getUploadLink({ mimetype, folder, ACL }: GetUploadLinkParams) {
    try {
      const bucket = folder ? `${process.env.AWS_S3_BUCKET}/${folder}` : `${process.env.AWS_S3_BUCKET}`;
      const key = `${filenameGenerator()}.${mime.extension(mimetype)}`;

      const params = {
        Bucket: bucket,
        Key: `${key}`,
        ACL: ACL || 'private',
        ContentType: mimetype,
      };

      const link = this.client.getSignedUrl('putObject', params);

      return { link, path: `${folder}/${key}` };
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public getFileLink({ folder, key }: GetFileLinkParams) {
    try {
      const params = {
        Bucket: `${process.env.AWS_S3_BUCKET}/${folder}`,
        Key: key,
      };

      return this.client.getSignedUrl('getObject', params);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async saveFile({ filename: fileName, filepath: filePath, folder, mimetype: mimeType, ACL }: FileUploadParams) {
    try {
      const bucket = folder ? `${process.env.AWS_S3_BUCKET}/${folder}` : `${process.env.AWS_S3_BUCKET}`;

      const fileContent = fs.readFileSync(filePath);

      const params = {
        Bucket: bucket,
        Key: fileName,
        Body: fileContent,
        ACL: ACL || 'public-read',
        ContentType: mimeType,
      };

      const data = await this.client.upload(params).promise();

      return data.Location;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      await fs.promises.unlink(filePath);
    }
  }

  public async deleteFile({ filename: fileName, folder }: FileDeleteOrDuplicateParams) {
    try {
      const bucket = folder ? `${process.env.AWS_S3_BUCKET}/${folder}` : `${process.env.AWS_S3_BUCKET}`;

      await this.client
        .deleteObject({
          Bucket: bucket,
          Key: fileName,
        })
        .promise();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async duplicateFile({ filename: fileName, folder, ACL }: FileDeleteOrDuplicateParams) {
    const [mimetype] = fileName.split('.').reverse();
    const key = `${filenameGenerator()}.${mime.extension(mimetype)}`;

    const bucket = process.env.AWS_S3_BUCKET || '';
    const params = {
      Bucket: bucket,
      CopySource: `/${bucket}/${folder}/${fileName}`,
      Key: `${folder}/${key}`,
      ACL: ACL || 'public-read',
    };

    await this.client.copyObject(params).promise();

    return `${folder}/${key}`;
  }
}

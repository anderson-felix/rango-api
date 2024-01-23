import { Request, Response } from 'express';
import Container from 'typedi';

import GetUploadLinkService from '@shared/services/Storage/GetUploadLinkService';
import { BucketFolders } from '@shared/container/providers/StorageProvider/interfaces';

export default class UploadController {
  public static async presigned(req: Request, res: Response): Promise<Response> {
    const service = Container.get(GetUploadLinkService);

    const { folder, mimetype } = req.query;

    const response = await service.execute({
      folder: folder as BucketFolders,
      mimetype: String(mimetype),
    });

    return res.json(response);
  }
}

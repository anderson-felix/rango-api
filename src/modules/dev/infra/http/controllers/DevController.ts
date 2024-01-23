import { Request, Response } from 'express';

import UploadService from '@modules/dev/services/upload/UploadService';

export default class DevController {
  public static async upload(req: Request, res: Response): Promise<any> {
    const uploadHandler = new UploadService();

    await uploadHandler.upload(req);

    return res.status(200).send();
  }
}

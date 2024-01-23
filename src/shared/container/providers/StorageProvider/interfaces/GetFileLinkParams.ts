import { BucketFolders } from '.';

export interface GetFileLinkParams {
  key: string;
  folder: BucketFolders;
  expires?: number;
}

import { AccessControlList, BucketFolders } from '.';

export interface GetUploadLinkParams {
  mimetype: string;
  folder: BucketFolders;
  ACL?: AccessControlList;
}

import { AccessControlList, BucketFolders } from '.';

export interface FileDeleteOrDuplicateParams {
  filename: string;
  folder: BucketFolders;
  ACL?: AccessControlList;
}

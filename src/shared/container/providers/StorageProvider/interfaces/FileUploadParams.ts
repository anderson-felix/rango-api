import { AccessControlList, FileDeleteOrDuplicateParams } from '.';

export interface FileUploadParams extends FileDeleteOrDuplicateParams {
  filepath: string;
  mimetype: string;
  ACL?: AccessControlList;
}

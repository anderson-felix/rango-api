import {
  FileDeleteOrDuplicateParams,
  FileUploadParams,
  GetFileLinkParams,
  GetUploadLinkParams,
  UploadLinkResponse,
} from '../interfaces';

export default interface IStorageProvider {
  getUploadLink(data: GetUploadLinkParams): Promise<UploadLinkResponse>;
  getFileLink(data: GetFileLinkParams): string;
  saveFile(data: FileUploadParams): Promise<string>;
  deleteFile(data: FileDeleteOrDuplicateParams): Promise<void>;
  duplicateFile(data: FileDeleteOrDuplicateParams): Promise<string>;
}

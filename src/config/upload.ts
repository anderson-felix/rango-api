import path from 'path';

export interface IUploadConfig {
  driver: string;
  directory: string;
}

const uploadConfig: IUploadConfig = {
  driver: process.env.NODE_ENV?.toLowerCase() === 'production' ? 's3' : 'disk',
  directory: path.resolve(__dirname, '..', '..', 'tmp'),
};

export default uploadConfig;

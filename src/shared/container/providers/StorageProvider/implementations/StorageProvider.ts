import DiskStorageProvider from './DiskStorageProvider';
import S3StorageProvider from './S3StorageProvider';

const StorageProvider = process.env.NODE_ENV?.toLowerCase() === 'production' ? S3StorageProvider : DiskStorageProvider;

export default StorageProvider;

type FuncType = (timestamp: number) => string;

export const generateSecretKey: FuncType = timestamp => {
  const secret =
    (process.env.LOCAL_UPLOAD_SECRET || '').replace(/[-]/g, '') || 'secret';

  return `${secret}-${timestamp}`;
};

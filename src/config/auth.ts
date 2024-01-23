export interface IAuthConfig {
  jwt: { secret: string; expiresIn: string };
}

const authConfig: IAuthConfig = {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '1d',
  },
};

export default authConfig;

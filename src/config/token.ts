export interface ITokenConfig {
  validityTime: number;
}

const tokenConfig: ITokenConfig = {
  validityTime: 1000 * 60 * 10, // ten minutes
};

export default tokenConfig;

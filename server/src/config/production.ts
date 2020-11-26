export interface Config {
  MONGO_URI: string;
  JWT_KEY: string;
}

export const ProdConfig: Config = {
  MONGO_URI: process.env.MONGO_URI!,
  JWT_KEY: process.env.JWT_KEY!,
};

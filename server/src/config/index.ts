import { Config as Conf } from './development';
import { ProdConfig } from './production';

interface Config {
  MONGO_URI: string;
  JWT_KEY: string;
}
let Settings: Config = Conf;

console.log('process', process);

if (process.env.NODE_ENV === 'production') {
  Settings = ProdConfig;
}

export { Settings };

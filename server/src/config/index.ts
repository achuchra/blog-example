import { Config } from './development';
import { ProdConfig } from './production';
let Settings: Config = Config;

if (process.env.NODE_ENV === 'production') {
  Settings = ProdConfig;
}

export { Settings };

import { ConfigModule as Config } from '@nestjs/config';
import config from '~/config/config';
import databaseConfig from '~/config/database.config';

export function ConfigModule() {
  return Config.forRoot({
    envFilePath: process.env.NODE_ENV === 'prod' ? '.env.production' : '.env.development',
    load: [config, databaseConfig],
  });
}

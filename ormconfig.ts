import databaseConfig from './src/config/database.config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: process.env.NODE_ENV === 'prod' ? '.env.production' : '.env.development',
  load: [databaseConfig],
});
module.exports = {
  ...databaseConfig(),
};

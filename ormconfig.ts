import databaseConfig from './src/config/database.config';
import { ConfigModule } from '@nestjs/config';
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
ConfigModule.forRoot({
  envFilePath: IS_PROD ? '.env.production' : '.env.development',
  load: [databaseConfig],
});
module.exports = {
  ...databaseConfig(),
};

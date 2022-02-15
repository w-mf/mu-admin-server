import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import config from './config/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.production' : '.env.development',
      load: [config, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    SystemModule,
    AuthModule,
  ],
  providers: [Logger],
})
export class AppModule {}

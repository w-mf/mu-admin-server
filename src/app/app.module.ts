import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SwaggerModule } from '~/extends/swagger/swagger.module';
import { LoggerModule } from '~/extends/logger/logger.module';

import { OtherModule } from '~/modules/other/other.module';
import { LogModule } from '~/modules/log/log.module';
import { SystemModule } from '~/modules/system/system.module';
import { AuthModule } from '~/modules/auth/auth.module';

import databaseConfig from '../config/database.config';
import config from '../config/config';
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
    LoggerModule,
    SwaggerModule,
    /** 业务模块 */
    SystemModule,
    AuthModule,
    OtherModule,
    LogModule,
  ],
  providers: [],
})
export class AppModule {}

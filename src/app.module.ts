import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), SystemModule, AuthModule],
  providers: [Logger],
})
export class AppModule {}

import { Global, Module } from '@nestjs/common';

import { WinstonService as LoggerService } from './logger.service';
import { ConfigModule } from '@nestjs/config';
@Global()
@Module({
  imports: [ConfigModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}

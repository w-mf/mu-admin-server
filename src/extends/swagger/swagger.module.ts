import { Module } from '@nestjs/common';

import { SwaggerService } from './swagger.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [SwaggerService],
})
export class SwaggerModule {}

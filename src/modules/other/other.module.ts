import { Module } from '@nestjs/common';
import { OtherController } from './other.controller';
import { OtherService } from './other.service';

@Module({
  controllers: [OtherController],
  providers: [OtherService],
})
export class OtherModule {}

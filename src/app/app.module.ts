import { Module } from '@nestjs/common';

import { TypeOrmModule } from '~/extends/typeOrm/typeorm.module';
import { ConfigModule } from '~/extends/config/config.module';
import { CacheModule } from '~/extends/cache/cache.module';
import { SwaggerModule } from '~/extends/swagger/swagger.module';
import { LoggerModule } from '~/extends/logger/logger.module';
import { ScheduleModule } from '~/extends/schedule/schedule.module';

import { OtherModule } from '~/modules/other/other.module';
import { LogModule } from '~/modules/log/log.module';
import { SystemModule } from '~/modules/system/system.module';
import { AuthModule } from '~/modules/auth/auth.module';

import { PuppeteerDemoService } from '~/common/schedules/puppeteerDemo.schedule';

@Module({
  imports: [
    ConfigModule(),
    TypeOrmModule(),
    CacheModule(),
    LoggerModule,
    SwaggerModule,
    ScheduleModule(),
    /** 业务模块 */
    SystemModule,
    AuthModule,
    OtherModule,
    LogModule,
  ],
  providers: [PuppeteerDemoService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { RoleModule } from '~/system/role/role.module';
import { MenuModule } from '~/system/menu/menu.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]), RoleModule, MenuModule, ConfigModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}

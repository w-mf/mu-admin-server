import { Module, forwardRef } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { RoleModule } from '~/system/role/role.module';
import { AuthModule } from '~/auth/auth.module';
import { MenuModule } from '~/system/menu/menu.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]), RoleModule, forwardRef(() => AuthModule), MenuModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}

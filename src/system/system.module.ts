import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { AccountModule } from './account/account.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [MenuModule, AccountModule, RoleModule],
})
export class SystemModule {}

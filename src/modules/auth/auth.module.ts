import { Module, forwardRef, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from '~/modules/system/account/account.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import Config from '~/config/config';
import { JwtStrategy } from './jwt.strategy';
import { LoginLogModule } from '~/modules/log/login-log/login-log.module';
import { CacheModule } from '~/extends/cache/cache.module';
import { ConfigModule } from '~/extends/config/config.module';

@Global()
@Module({
  imports: [
    forwardRef(() => AccountModule),
    PassportModule,
    JwtModule.register({
      secret: Config().jwtConstants.secret,
      signOptions: { expiresIn: Config().jwtConstants.expiresIn },
    }),
    ConfigModule(),
    CacheModule(),
    LoginLogModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

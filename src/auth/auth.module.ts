import { Module, forwardRef, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from '~/system/account/account.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import Config from '~/config/config';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { LoginLogModule } from '~/log/login-log/login-log.module';

@Global()
@Module({
  imports: [
    forwardRef(() => AccountModule),
    PassportModule,
    JwtModule.register({
      secret: Config().jwtConstants.secret,
      signOptions: { expiresIn: Config().jwtConstants.expiresIn },
    }),
    ConfigModule,
    LoginLogModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

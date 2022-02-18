import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from '~/system/account/account.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import Config from '~/config/config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => AccountModule),
    PassportModule,
    JwtModule.register({
      secret: Config().jwtConstants.secret,
      signOptions: { expiresIn: Config().jwtConstants.expiresIn },
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

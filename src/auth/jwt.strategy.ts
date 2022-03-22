import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import Config from '../config/config';
export interface IJwtPayload {
  userName: string;
  sub: number;
  isAdmin: boolean;
  permissions: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Config().jwtConstants.secret,
    });
  }

  async validate(payload: IJwtPayload) {
    const { userName, sub, permissions, isAdmin } = payload;
    return { userId: sub, userName: userName, permissions, isAdmin };
  }
}

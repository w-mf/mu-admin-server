import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(userName: string, password: string): Promise<any> {
    //查询数据库，验证账号密码，并最终返回用户
    return await this.authService.validateUser({ userName, password });
  }
}

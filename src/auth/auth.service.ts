import { Injectable, BadRequestException } from '@nestjs/common';
import { AccountService } from '../system/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService, private readonly jwtService: JwtService) {}

  async login(user: LoginDto) {
    const accout = await this.accountService.findAccount(user.userName);
    if (!accout) {
      throw new BadRequestException('账号或密码错误');
    }
    const { password, ...res } = accout;
    if (password !== user.password) {
      throw new BadRequestException('账号或密码错误');
    }
    const payload = { username: res.userName, sub: res.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

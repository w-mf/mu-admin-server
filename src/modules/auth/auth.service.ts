import { Injectable, BadRequestException, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { AccountService } from '~/modules/system/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionDto } from './dto/encryption.dto';
import { aesEncryption, aesDecryption } from '~/common/utils/crypto';
import { ConfigService } from '@nestjs/config';
import { LoginLogService } from '~/modules/log/login-log/login-log.service';
import type { IJwtPayload } from './jwt.strategy';
import { LoginDto } from '~/modules/auth/dto/login.dto';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class AuthService {
  aesIv;
  aesKey;

  constructor(
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly loginLogService: LoginLogService,
  ) {
    this.aesKey = Buffer.from(this.configService.get('AES_KEY'));
    this.aesIv = Buffer.from(this.configService.get('AES_IV'));
  }
  async login(loginDto: LoginDto, req: any) {
    const account = await this.validateUser(loginDto, req);

    const permissions = await this.accountService.getPermissions(account.id);
    const payload: IJwtPayload = {
      userName: account.userName,
      sub: account.id,
      isAdmin: account.roles.findIndex((item) => item.id === 1) > -1,
      permissions,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  async refreshToken(token: string) {
    if (!token) throw new UnauthorizedException('未获取到认证信息，请重新登录');
    // 解析现有的token，重新生成 token
    const obj: IJwtPayload & { iat: number; exp: number } = this.jwtService.decode(token) as any;
    delete obj.iat;
    delete obj.exp;
    return {
      accessToken: this.jwtService.sign(obj),
    };
  }
  // 验证登录用户
  async validateUser(loginDto: LoginDto, req: any) {
    const { userName, password } = loginDto;
    const account = await this.accountService.findAccount({ userName }, true);

    const ua = UAParser(req.headers['user-agent']);
    const osStr = ua.os?.name ? `${ua.os.name}(${ua.os.version})` : '';
    const browserStr = ua.browser?.name ? `${ua.browser.name}(${ua.browser.version})` : '';
    this.loginLogService
      .create({
        userName: userName,
        status: !account || password !== account.password ? 0 : 1,
        ip: req.ip,
        equipment: `${osStr} ${browserStr}`,
        info: !account ? '账号错误' : (password !== account.password && '密码错误') || '登录成功',
        userAgent: ua.ua,
      })
      .then();
    if (!account) {
      throw new BadRequestException('账号或密码错误');
    }
    if (password !== account.password) {
      throw new BadRequestException('账号或密码错误');
    }
    delete account.password;
    return account;
  }
  async encryption(data: EncryptionDto) {
    return aesEncryption(data.str, this.aesKey, this.aesIv);
  }
  async decryption(data: EncryptionDto) {
    return aesDecryption(data.str, this.aesKey, this.aesIv);
  }
}

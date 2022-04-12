import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Inject,
  forwardRef,
  CACHE_MANAGER,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UAParser } from 'ua-parser-js';
import * as svgCaptcha from 'svg-captcha';
import { v4 as uuidv4 } from 'uuid';
import { Cache } from 'cache-manager';

import { AccountService } from '~/modules/system/account/account.service';
import { LoginLogService } from '~/modules/log/login-log/login-log.service';
import { aesEncryption, aesDecryption, mobileEncryption } from '~/common/utils/crypto';
import type { IJwtPayload } from './jwt.strategy';
import { EncryptionDto } from './dto/encryption.dto';
import { LoginDto } from './dto/login.dto';

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
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    this.aesKey = Buffer.from(this.configService.get('aesKey'));
    this.aesIv = Buffer.from(this.configService.get('aesIv'));
  }
  // 获取图形验证码
  async getImgVerifyCode() {
    const captcha = svgCaptcha.createMathExpr({ noise: 2, color: true });
    const uuid = uuidv4();
    await this.cacheManager.set(uuid, captcha.text, { ttl: this.configService.get('imgVerifyCodeTtl') });
    return {
      uuid,
      img: captcha.data,
    };
  }
  // 登录
  async login(loginDto: LoginDto, req: any) {
    const cacheVerifyCode = await this.cacheManager.get(loginDto.verifyCodeUuid);
    if (!cacheVerifyCode) throw new BadRequestException('验证码失效，请刷新重试');
    else if (cacheVerifyCode !== loginDto.verifyCode) throw new BadRequestException('验证码错误');

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
      accountInfo: {
        ...account,
        mobile: mobileEncryption(account.mobile),
        roles: undefined,
        roleList: account.roles.map((i) => ({ id: i.id, name: i.name })),
      },
    };
  }
  // 刷新token
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
    // 创建登录日志
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
  // 加密字符串
  async encryption(data: EncryptionDto) {
    return aesEncryption(data.str, this.aesKey, this.aesIv);
  }
  // 解密字符串
  async decryption(data: EncryptionDto) {
    return aesDecryption(data.str, this.aesKey, this.aesIv);
  }
}

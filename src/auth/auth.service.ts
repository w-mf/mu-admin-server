import { Injectable, BadRequestException, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { AccountService } from '~/system/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionDto } from './dto/encryption.dto';
import { aesEncryption, aesDecryption } from '~/common/utils/crypto';
import { ConfigService } from '@nestjs/config';
import { AccountEntity } from '~/system/account/entities/account.entity';
import type { IJwtPayload } from './jwt.strategy';
@Injectable()
export class AuthService {
  aesIv;
  aesKey;

  constructor(
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.aesKey = Buffer.from(this.configService.get('AES_KEY'));
    this.aesIv = Buffer.from(this.configService.get('AES_IV'));
  }
  async login(account: AccountEntity) {
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
  async validateUser({ userName, password: pass }: { userName: string; password: string }) {
    const account = await this.accountService.findAccount({ userName }, true);
    if (!account) {
      throw new BadRequestException('账号或密码错误');
    }
    const { password, ...res } = account;
    if (password !== pass) {
      throw new BadRequestException('账号或密码错误');
    }
    return res;
  }
  async encryption(data: EncryptionDto) {
    return aesEncryption(data.str, this.aesKey, this.aesIv);
  }
  async decryption(data: EncryptionDto) {
    return aesDecryption(data.str, this.aesKey, this.aesIv);
  }
}

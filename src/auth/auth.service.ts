import { Injectable, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { AccountService } from '~/system/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionDto } from './dto/encryption.dto';
import { aesEncryption, aesDecryption } from '~/common/utils/crypto';
import { ConfigService } from '@nestjs/config';
import { AccountEntity } from '~/system/account/entities/account.entity';

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
    const payload = { userName: account.userName, sub: account.id };
    return {
      accessToken: this.jwtService.sign(payload),
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

import { Injectable, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { AccountService } from '~/system/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { EncryptionDto } from './dto/encryption.dto';
import { aesEncryption, aesDecryption } from '~/common/utils/crypto';
import { ConfigService } from '@nestjs/config';

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

  async login(user: LoginDto) {
    // const account = await this.accountService.findAccount(user.userName);
    // if (!account) {
    //   throw new BadRequestException('账号或密码错误');
    // }
    // const { password, ...res } = account;
    // if (password !== user.password) {
    //   throw new BadRequestException('账号或密码错误');
    // }
    const payload = { username: 'res.userName', sub: 'res.id' };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  async encryption(data: EncryptionDto) {
    return aesEncryption(data.str, this.aesKey, this.aesIv);
  }
  async decryption(data: EncryptionDto) {
    return aesDecryption(data.str, this.aesKey, this.aesIv);
  }
}

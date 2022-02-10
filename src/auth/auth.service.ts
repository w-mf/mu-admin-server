import { Injectable, BadRequestException } from '@nestjs/common';
import { AccountService } from '~/system/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { EncryptionDto } from './dto/encryption.dto';
import { aesEncryption, aesDecryption } from '~/common/utils/crypto';

@Injectable()
export class AuthService {
  aesIv = Buffer.alloc(16, '0');
  aesKey = Buffer.from('ijmX4NlQ2Zbfr2qIw8qb0Zrbq4G4UStn');

  constructor(private readonly accountService: AccountService, private readonly jwtService: JwtService) {}

  async login(user: LoginDto) {
    const account = await this.accountService.findAccount(user.userName);
    if (!account) {
      throw new BadRequestException('账号或密码错误');
    }
    const { password, ...res } = account;
    if (password !== user.password) {
      throw new BadRequestException('账号或密码错误');
    }
    const payload = { username: res.userName, sub: res.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async encryption(data: EncryptionDto) {
    return aesEncryption(data.str, this.aesKey, this.aesIv);
  }
  async decryption(data: EncryptionDto) {
    return aesDecryption(data.str, this.aesKey, this.aesIv);
  }
}

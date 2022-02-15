import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { EncryptionDto } from './dto/encryption.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginOv } from './auth.ov';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiOkResponse({ description: '登录成功,返回token', type: LoginOv })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('encryption')
  @ApiOperation({ summary: '加密字符串' })
  @ApiOkResponse({ description: '返回加密后的字符串', type: String })
  async encryption(@Body() encryptionDto: EncryptionDto) {
    return this.authService.encryption(encryptionDto);
  }
}

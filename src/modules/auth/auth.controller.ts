import { Controller, Body, Post, Req, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { EncryptionDto } from './dto/encryption.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginVo } from './vo/login.vo';
import { ImgVerifyCodeVo } from './vo/img-verify-code.vo';
import { JwtAuthGuard } from '~/common/guard/auth.guard';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('get-img-verify-code')
  @HttpCode(200)
  @ApiOperation({ summary: '获取验证码' })
  @ApiOkResponse({ type: ImgVerifyCodeVo })
  async getImgVerifyCode() {
    return this.authService.getImgVerifyCode();
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: '登录' })
  @ApiOkResponse({ description: '登录成功,返回token', type: LoginVo })
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    //通过req可以获取到validate方法返回的user
    return this.authService.login(loginDto, req);
  }

  @Post('encryption')
  @HttpCode(200)
  @ApiOperation({ summary: '加密字符串' })
  @ApiOkResponse({ description: '返回加密后的字符串', type: String })
  async encryption(@Body() encryptionDto: EncryptionDto): Promise<string> {
    return this.authService.encryption(encryptionDto);
  }

  @Post('refresh-token')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: '刷新token' })
  @ApiOkResponse({ description: '刷新成功，返回token', type: LoginVo })
  async refreshToken(@Req() req) {
    const authorization = req.headers.authorization || '';
    const token = authorization.split(' ').length > 1 ? authorization.split(' ')[1] : null;
    return this.authService.refreshToken(token);
  }
}

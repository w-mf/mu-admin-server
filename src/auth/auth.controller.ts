import { Controller, Body, Post, Req, HttpCode, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { EncryptionDto } from './dto/encryption.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginOv } from './auth.ov';
import { JwtAuthGuard } from '~/common/guard/auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @ApiOperation({ summary: '登录' })
  @ApiOkResponse({ description: '登录成功,返回token', type: LoginOv })
  async login(@Body() loginDto: LoginDto, @Req() req) {
    //通过req可以获取到validate方法返回的user
    return this.authService.login(req.user);
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
  @ApiOkResponse({ description: '刷新成功，返回token', type: LoginOv })
  async refreshToken(@Req() req) {
    const authorization = req.headers.authorization || '';
    const token = authorization.split(' ').length > 1 ? authorization.split(' ')[1] : null;
    return this.authService.refreshToken(token);
  }
}

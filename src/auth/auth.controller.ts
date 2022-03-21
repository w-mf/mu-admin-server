import { Controller, Body, Post, Req, HttpCode, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { EncryptionDto } from './dto/encryption.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginOv } from './auth.ov';
import { Permissions } from '~/common/decorators/permissions.decorator';

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

  @Get('permissions')
  @ApiOperation({ summary: '获取用户权限' })
  @ApiOkResponse({ description: '权限列表', type: Array })
  @Permissions(['sys:account:getPermissions'])
  getPermissions(@Req() req: any): Promise<string[]> {
    const { userId } = req.user;
    return this.authService.getPermissions(+userId);
  }
}

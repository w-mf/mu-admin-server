import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { EncryptionDto } from './dto/encryption.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('encryption')
  async encryption(@Body() encryptionDto: EncryptionDto) {
    return this.authService.encryption(encryptionDto);
  }
}

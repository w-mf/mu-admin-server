import { LoginLogEntity } from '../entities/login-log.entity';
import { OmitType } from '@nestjs/swagger';

export class LoginLogVo extends OmitType(LoginLogEntity, ['userAgent'] as const) {}

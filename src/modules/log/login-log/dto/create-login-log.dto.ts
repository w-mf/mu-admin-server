import { IsString, IsIn, IsNotEmpty, IsIP, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLoginLogDto {
  /** 登录账号 */
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  /** ip */
  @IsNotEmpty()
  @IsIP()
  readonly ip: string;

  /** 登录设备 */
  @IsOptional()
  @IsString()
  readonly equipment?: string;

  /** 状态。1:成功，0: 失败 */
  @ApiProperty({ enum: [1, 0], default: 1 })
  @IsOptional()
  @IsIn([1, 0])
  readonly status: 1 | 0;

  /** 登录信息 */
  @IsOptional()
  @IsString()
  readonly info?: string;

  readonly userAgent?: string;
}

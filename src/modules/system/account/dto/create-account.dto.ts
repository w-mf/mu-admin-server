import { IsString, MaxLength, IsIn, IsNotEmpty, IsMobilePhone, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  /** 角色ids */
  @IsNotEmpty()
  readonly roleIds: number[];

  /** 用户名 */
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  readonly userName: string;

  /** 姓名 */
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly name?: string;

  /** 昵称 */
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly nickname?: string;

  /** 邮箱 */
  @IsOptional()
  @IsEmail()
  @MaxLength(64)
  readonly email?: string;

  /** 手机号 */
  @IsOptional()
  @IsMobilePhone('zh-CN')
  @MaxLength(48)
  readonly mobile?: string;

  /** 备注 */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly remark?: string;

  /** 状态。1:正常，0: 停用'*/
  @ApiProperty({ enum: [1, 0], default: 1 })
  @IsOptional()
  @IsIn([1, 0])
  readonly status: 1 | 0;
}

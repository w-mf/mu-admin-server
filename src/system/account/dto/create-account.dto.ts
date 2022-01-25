import { IsString, MaxLength, IsIn, IsNotEmpty, IsMobilePhone, IsEmail, IsJSON, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsJSON()
  readonly roleIds: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  readonly userName: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly nickname?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(64)
  readonly email?: string;

  @IsOptional()
  @IsMobilePhone('zh-CN')
  @MaxLength(48)
  readonly mobile?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly remark?: string;

  @IsOptional()
  @IsIn([1, 0])
  readonly status: 1 | 0;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  readonly password?: string;
}

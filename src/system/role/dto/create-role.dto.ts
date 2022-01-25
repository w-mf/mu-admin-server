import { IsString, MaxLength, IsIn, IsNotEmpty, IsOptional, IsJSON } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  readonly name: string;

  @IsJSON()
  readonly menuIds: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly remark?: string;

  @IsOptional()
  @IsIn([1, 0])
  readonly status: 1 | 0;
}

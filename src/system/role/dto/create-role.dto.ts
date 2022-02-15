import { IsString, MaxLength, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  /** 角色名称 */
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  readonly name: string;

  /** 备注 */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly remark?: string;

  /** 状态。1:正常，0: 停用 */
  @IsOptional()
  @IsIn([1, 0])
  readonly status: 1 | 0;

  /** 菜单权限id。多个用,分隔 */
  @IsOptional()
  @IsString()
  readonly menuIds?: string;
}

import { IsString, MaxLength, IsIn, IsNotEmpty, IsInt, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  /** 类型。1:目录,2:菜单,3:按钮 */
  @ApiProperty({ default: 1, enum: [1, 2, 3] })
  @IsNotEmpty()
  @IsIn([1, 2, 3])
  readonly type: 1 | 2 | 3;

  /** 名称 */
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  readonly name: string;

  /** 父级id */
  @IsOptional()
  @IsInt()
  readonly parentId?: number;

  /** 前端路由 */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly router?: string;

  /** 图标 */
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly icon?: string;

  /** 是否显示。1:显示,0:不显示，默认1 */
  @ApiProperty({ default: 1, enum: [1, 0] })
  @IsOptional()
  @IsInt()
  @IsIn([1, 0])
  readonly show?: 1 | 0;

  /** 排序。最大值 9999 */
  @IsOptional()
  @IsInt()
  @Max(9999)
  readonly sort?: number;

  /** 权限码 */
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly accessCode: string;
}

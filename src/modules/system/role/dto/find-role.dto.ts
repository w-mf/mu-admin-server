import { PagingQueryDto } from '~/common/dto/paging-query.dto';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class FindRoleDto extends PagingQueryDto {
  /** 角色名称 */
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly name?: string;

  /** 状态。1:正常，0: 停用 */
  @ApiProperty({ enum: [1, 0], default: 1 })
  @IsOptional()
  @IsIn([1, 0])
  @Type(() => Number)
  readonly status?: 1 | 0;
}

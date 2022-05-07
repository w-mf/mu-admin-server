import { PagingQueryDto } from '~/common/dto/paging-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAccountDto extends PagingQueryDto {
  /** 用户名 */
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MaxLength(32)
  readonly userName?: string;

  /** 姓名 */
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly name?: string;

  /** 手机号 */
  @IsOptional()
  @IsString()
  @MaxLength(48)
  readonly mobile?: string;

  /** 状态。1:正常，0: 停用'*/
  @ApiProperty({ enum: [1, 0], default: 1 })
  @IsOptional()
  @IsIn([1, 0])
  @Type(() => Number)
  readonly status?: 1 | 0;
}

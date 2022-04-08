import { PagingQueryDto } from '~/common/dto/paging-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FindLoginLogDto extends PagingQueryDto {
  /** 登录账号 */
  @IsOptional()
  @IsString()
  readonly userName?: string;

  /** 状态。1:成功，0: 失败 */
  @ApiProperty({ enum: ['1', '0'] })
  @IsOptional()
  readonly status?: '1' | '0';

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: '开始时间。格式 Date' })
  @Type(() => Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: '结束时间。格式 Date' })
  @Type(() => Date)
  endDate?: Date;
}

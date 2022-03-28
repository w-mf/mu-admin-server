import { PagingQueryDto } from '~/common/dto/paging-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindLoginLogDto extends PagingQueryDto {
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

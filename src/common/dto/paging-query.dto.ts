import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class PagingQueryDto {
  @ApiProperty({ description: '页码' })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  readonly pageNo: number;

  @ApiProperty({ description: '每页大小' })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  readonly pageSize: number;
}

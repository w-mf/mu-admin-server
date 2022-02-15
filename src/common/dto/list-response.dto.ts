import { ApiProperty } from '@nestjs/swagger';

export class ListResponseDto {
  @ApiProperty({ description: '数据总条数' })
  readonly total: number;

  @ApiProperty({ description: '每页大小' })
  readonly pageSize: number;

  @ApiProperty({ description: '页码' })
  readonly pageNo: number;

  @ApiProperty({ description: '列表数据' })
  readonly list: any;
}

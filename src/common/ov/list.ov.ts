import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class PagingListBaseOv<TData> {
  @ApiProperty({ description: '列表总条数' })
  readonly total: number;

  @ApiProperty({ description: '分页大小' })
  readonly pageSize: number;

  @ApiProperty({ description: '页码' })
  readonly pageNo: number;

  readonly list: TData[];
}
// controller api schema 生成
export const schemaHandle = (ov1, ov2) => ({
  allOf: [
    { $ref: getSchemaPath(ov1) },
    {
      properties: {
        list: {
          type: 'array',
          items: { $ref: getSchemaPath(ov2) },
        },
      },
      required: ['list'],
    },
  ],
});

import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
export class PagingQueryDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  readonly pageNo: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  readonly pageSize: number;
}

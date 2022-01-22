import { IsString, MaxLength, IsIn, IsNotEmpty, IsInt, Max, IsOptional } from 'class-validator';

import { MENU_TYPE } from '../constant';
export class CreateMenuDto {
  @IsNotEmpty()
  @IsIn([1, 2, 3])
  readonly type: MENU_TYPE;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  readonly name: string;

  @IsOptional()
  @IsInt()
  readonly parentId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly router?: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly icon?: string;

  @IsOptional()
  @IsInt()
  @IsIn([1, 0])
  readonly show?: 1 | 0;

  @IsOptional()
  @IsInt()
  @Max(9999)
  readonly sort?: number;
}

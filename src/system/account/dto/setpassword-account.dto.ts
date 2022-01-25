import { PickType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class SetPasswordAccountDto extends PickType(CreateAccountDto, ['password'] as const) {
  @IsNotEmpty()
  @IsInt()
  readonly id: number;
}

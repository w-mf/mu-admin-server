import { IsString, IsNotEmpty } from 'class-validator';
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

import { IsString, IsNotEmpty } from 'class-validator';
export class EncryptionDto {
  @IsString()
  @IsNotEmpty()
  readonly str: string;
}

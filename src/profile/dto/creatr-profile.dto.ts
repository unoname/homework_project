import { IsNumber, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsNumber()
  readonly userId?: number;

  @IsString()
  readonly fullname: string | null;

  @IsString()
  readonly phone: string | null;
}

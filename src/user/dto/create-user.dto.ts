import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsEmail()
  readonly id?: number;

  @IsNotEmpty()
  @IsEmail()
  readonly fullName?: string;

  @IsNotEmpty()
  @IsEmail()
  readonly phone?: string;
}

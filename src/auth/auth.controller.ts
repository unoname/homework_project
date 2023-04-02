import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserWithProfileDto } from 'src/user/dto/create-user-with-profile.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async create(@Body() userDto: CreateUserWithProfileDto) {
    const user = await this.authService.registerUser(userDto);
    if (!user) {
      // if (err.code === '23505') {
      throw new ConflictException(
        'User with this email or login already exists',
      );
      // }
    }
    return await this.authService.login(user);
  }

  @Post('/login')
  async login(@Body() userDto: Partial<CreateUserDto>) {
    const user = await this.authService.validateUser(userDto);
    if (!user) {
      throw new BadRequestException('Invalid login or email credentials');
    }
    return await this.authService.login(user);
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'passport-jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from '../user/user.service';
import { User } from 'src/user/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateUserWithProfileDto } from 'src/user/dto/create-user-with-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDto: Partial<CreateUserDto>): Promise<any> {
    const { login, email, password } = userDto;
    const emailOrLogin = email || login;
    const user = await this.userService.findByEmailOrLogin(emailOrLogin);

    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: Partial<User>) {
    const payload = {
      login: user.login,
      email: user.email,
      roles: user.roles,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserByJwtPayload(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findOne(payload.userId);
    const { roles } = payload;
    if (roles && roles.length > 0) {
      const hasRequiredRole = user.roles.some((role) => roles.includes(role));
      if (!hasRequiredRole) {
        throw new ForbiddenException(
          'You do not have permission to access this resource',
        );
      }
    }
    return user;
  }

  async registerUser(userDto: CreateUserWithProfileDto): Promise<any> {
    return await this.userService.create(userDto);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
  JwtPayload,
  VerifiedCallback,
} from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const user = await this.authService.validateUserByJwtPayload(payload);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    const roles = payload.roles;
    if (roles) {
      const hasRequiredRole = user.roles.some((role) => roles.includes(role));
      if (!hasRequiredRole) {
        return done(
          new UnauthorizedException('User does not have the required role(s)'),
          false,
        );
      }
    }

    done(null, user);
  }
}

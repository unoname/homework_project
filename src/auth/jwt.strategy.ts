import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, JwtPayload} from 'passport-jwt';
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
secretOrKey: process.env.JWT_SECRET,
});
}

async validate(payload: JwtPayload) {
const user = await this.authService.validateUserByJwtPayload(payload);
if (!user) {
throw new UnauthorizedException();
}
return user;
}
}
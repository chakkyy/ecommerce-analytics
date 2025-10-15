import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          try {
            const token = req.cookies['auth-token'] || req.headers['auth-token'];
            if (token) {
              const verified = this.jwtService.verify(token);
              if (verified) return token;
              else return null;
            }
            return null;
          } catch (err) {
            return null;
          }
        },
      ]),

      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOneById(payload.id);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return payload;
  }
}

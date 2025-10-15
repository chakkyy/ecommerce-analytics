import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersInvitesModule } from '../usersInvites/usersInvites.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleLoginStrategy } from './strategies/googleLogin.strategy';
import { GoogleSignupStrategy } from './strategies/googleSignup.strategy';
import { UsersInvitesService } from '@modules/usersInvites/usersInvites.service';
import { UsersRelationshipsService } from '@modules/usersRelationships/usersRelationships.service';
import * as dotenv from 'dotenv';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserInvite } from '../../models/ecommerce-analytics /usersInvite.entity';
import { UsersRelationship } from '../../models/ecommerce-analytics /usersRelationship.entity';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    UsersInvitesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
    SequelizeModule.forFeature([UserInvite, UsersRelationship]),
  ],
  providers: [
    AuthService,
    UsersInvitesService,
    UsersRelationshipsService,
    LocalStrategy,
    JwtStrategy,
    GoogleLoginStrategy,
    GoogleSignupStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

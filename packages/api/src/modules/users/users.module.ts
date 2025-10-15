import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { AuthService } from '@modules/auth/auth.service';
import { UsersInvitesService } from '@modules/usersInvites/usersInvites.service';
import { UsersRelationshipsService } from '@modules/usersRelationships/usersRelationships.service';
import { MailModule } from '@modules/mail/mail.module';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../models/ecommerce-analytics /user.entity';
import { UserInvite } from '../../models/ecommerce-analytics /usersInvite.entity';
import { UsersRelationship } from '../../models/ecommerce-analytics /usersRelationship.entity';

@Module({
  imports: [MailModule, SequelizeModule.forFeature([User, UserInvite, UsersRelationship])],
  providers: [UsersService, UsersInvitesService, UsersRelationshipsService, AuthService, JwtService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

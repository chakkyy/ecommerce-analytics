import { Module } from '@nestjs/common';

import { UsersInvitesController } from './usersInvites.controller';
import { UsersInvitesService } from './usersInvites.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserInvite } from '../../models/ecommerce-analytics /usersInvite.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserInvite])],
  providers: [UsersInvitesService],
  controllers: [UsersInvitesController],
  exports: [UsersInvitesService],
})
export class UsersInvitesModule {}

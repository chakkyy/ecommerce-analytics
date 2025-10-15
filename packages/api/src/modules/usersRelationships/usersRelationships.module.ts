import { Module } from '@nestjs/common';

import { UsersRelationshipsController } from './usersRelationships.controller';
import { UsersRelationshipsService } from './usersRelationships.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersRelationship } from '../../models/ecommerce-analytics /usersRelationship.entity';

@Module({
  imports: [SequelizeModule.forFeature([UsersRelationship])],
  providers: [UsersRelationshipsService],
  controllers: [UsersRelationshipsController],
  exports: [UsersRelationshipsService],
})
export class UsersRelationshipsModule {}

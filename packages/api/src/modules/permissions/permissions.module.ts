import { Module } from '@nestjs/common';

import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from '../../models/ecommerce-analytics /permission.entity';

@Module({
  imports: [SequelizeModule.forFeature([Permission])],
  providers: [PermissionsService],
  controllers: [PermissionsController],
})
export class PermissionsModule {}

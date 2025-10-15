import { Module } from '@nestjs/common';

import { PermissionsRolesController } from './permissionsRoles.controller';
import { PermissionsRolesService } from './permissionsRoles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionsRole } from '../../models/ecommerce-analytics /permissionsRole.entity';

@Module({
  imports: [SequelizeModule.forFeature([PermissionsRole])],
  providers: [PermissionsRolesService],
  controllers: [PermissionsRolesController],
})
export class PermissionsRolesModule {}

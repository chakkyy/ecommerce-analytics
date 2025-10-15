import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../../models/ecommerce-analytics /role.entity';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}

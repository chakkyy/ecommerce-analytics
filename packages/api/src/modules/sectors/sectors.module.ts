import { Module } from '@nestjs/common';

import { SectorsController } from './sectors.controller';
import { SectorsService } from './sectors.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sector } from '../../models/ecommerce-analytics /sector.entity';

@Module({
  imports: [SequelizeModule.forFeature([Sector])],
  providers: [SectorsService],
  controllers: [SectorsController],
})
export class SectorsModule {}

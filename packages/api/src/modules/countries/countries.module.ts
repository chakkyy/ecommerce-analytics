import { Module } from '@nestjs/common';

import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from '../../models/ecommerce-analytics /country.entity';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
  providers: [CountriesService],
  controllers: [CountriesController],
})
export class CountriesModule {}

import { Injectable } from '@nestjs/common';
import { Country } from '../../models/ecommerce-analytics /country.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country)
    private readonly countryRepository: typeof Country
  ) {}

  async findAll(): Promise<Country[]> {
    return await this.countryRepository.findAll<Country>();
  }
}

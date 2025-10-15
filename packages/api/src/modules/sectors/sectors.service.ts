import { Injectable } from '@nestjs/common';
import { Sector } from '../../models/ecommerce-analytics /sector.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SectorsService {
  constructor(
    @InjectModel(Sector)
    private readonly sectorRepository: typeof Sector
  ) {}

  async findAll(): Promise<Sector[]> {
    return this.sectorRepository.findAll<Sector>();
  }
}

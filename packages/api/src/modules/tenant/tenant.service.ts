import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { Company } from '../../models/ecommerce-analytics /company.entity';
import { MigrationService } from '../migration/migration.service';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12);

@Injectable()
export class TenantService {
  prefix = 'ecommerce-analytics _';

  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    private readonly migrationService: MigrationService
  ) {}

  async createTenant() {
    const name = `${this.prefix}${nanoid()}`;
    await this.sequelize.query(`CREATE DATABASE ${name};`);
    await this.migrationService.runMigrations('company', name);
    return name;
  }

  deleteTenant(newCompany: Company) {
    return this.sequelize.query(`DROP DATABASE ${newCompany.database};`);
  }
}

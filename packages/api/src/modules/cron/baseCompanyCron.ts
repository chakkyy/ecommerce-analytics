import { InjectModel } from '@nestjs/sequelize';
import { Company } from '../../models/ecommerce-analytics /company.entity';
import { getCompanyDatabase, TenantInstance } from '../tenant/tenant.module';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

export class BaseCompanyCron {
  constructor(
    @InjectModel(Company)
    protected readonly companyRepository: typeof Company,
    @InjectQueue('updateOrders') protected updateOrdersQueue: Queue
  ) {}

  async forEachCompany(cb: (tenantInstace: TenantInstance, company: Company) => void | Promise<void>) {
    const companies = await this.companyRepository.findAll();
    return Promise.all(
      companies.map(async company => {
        const connection = (await getCompanyDatabase(company.database)).connection;
        await cb({ connection } as TenantInstance, company);

        await connection.close();
      })
    );
  }
}

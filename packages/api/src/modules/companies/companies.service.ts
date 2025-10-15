import { Injectable, Inject } from '@nestjs/common';
import { Company } from '../../models/ecommerce-analytics /company.entity';
import { S3Service } from '../../utils/s3';
import { Dashboard } from '@models/company/dashboard.entity';
import { Metric } from '@models/company/metric.entity';
import { RecipeConfig } from '@models/company/recipeConfig';
import { ChartType } from '@models/company/chartType.entity';
import { FilterType } from '@models/company/filterType.entity';
import { Recipe } from '@models/company/recipe.entity';
import { EcommerceConnect } from '@models/company/ecommerceConnect.entity';
import EcommerceSales from '@services/ecommerce/sales/sales';
import { argsMapper, methodMapper, serviceMapper } from '@services/ecommerce/constants';
import EcommerceMarketing from '@services/ecommerce/marketing/marketing';
import EcommerceFinance from '@services/ecommerce/finances/finances';
import { Op, Sequelize } from 'sequelize';
import { validateDates } from '@utils/date';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { TenantInstance, TENANT_CONNECTION } from '../tenant/tenant.module';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { TenantService } from '../tenant/tenant.service';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    @InjectModel(Company)
    private readonly companyRepository: typeof Company,
    private readonly s3Service: S3Service,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly salesService: EcommerceSales,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly marketingService: EcommerceMarketing,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private readonly financeService: EcommerceFinance,
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance,
    private readonly tenantService: TenantService
  ) {}

  async create(company: CompanyDto): Promise<Company> {
    return this.sequelize.transaction(async transaction => {
      const newCompany = await this.companyRepository.create<Company>(company, {
        transaction,
      });
      const database = await this.tenantService.createTenant();

      try {
        await this.companyRepository.update(
          { database },
          {
            transaction,
            where: {
              id: newCompany.id,
            },
          }
        );
        // We set the database name to the company to avoid having to query the database
        newCompany.database = database;

        return newCompany;
      } catch (error) {
        await this.tenantService.deleteTenant(newCompany);
        throw error;
      }
    });
  }

  async saveLogo(file: Express.Multer.File, companyId: number) {
    const company = await this.companyRepository.findByPk(companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    const { url } = await this.s3Service.uploadFile(file, 'companies/logos/');
    const updatedCompany = await company.update({
      logo: url,
    });
    return updatedCompany;
  }

  async getDashboardData(metricId: number, storeList?: string, startDate?: string, endDate?: string) {
    const metricRepository = this.tenantInstance.connection.getRepository(Metric);
    const recipeConfigRepository = this.tenantInstance.connection.getRepository(RecipeConfig);
    const chartTypeRepository = this.tenantInstance.connection.getRepository(ChartType);
    const filterTypeRepository = this.tenantInstance.connection.getRepository(FilterType);
    const recipeRepository = this.tenantInstance.connection.getRepository(Recipe);
    const dashboardRepository = this.tenantInstance.connection.getRepository(Dashboard);

    const metric = await metricRepository.findByPk(metricId, {
      include: [
        {
          model: recipeConfigRepository,
          as: 'recipeConfig',
          include: [
            {
              model: chartTypeRepository,
              as: 'chartType',
              attributes: ['id', 'name'],
            },
            {
              model: filterTypeRepository,
              as: 'filterType',
              attributes: ['id', 'name'],
            },
            {
              model: recipeRepository,
              as: 'recipe',
              attributes: ['id', 'name', 'description', 'category'],
            },
          ],
        },
        {
          model: dashboardRepository,
          attributes: ['ecommerceConnectId'],
        },
      ],
    });
    const ecommerceConnectId = metric.dashboard.ecommerceConnectId;

    const additionalArgs = {};
    if (storeList && storeList !== '*') {
      additionalArgs['ecommerceStoreId'] = { [Op.in]: storeList.split(',') };
    }

    const { recipeConfig } = metric;
    const { recipe } = recipeConfig;
    const { name, category } = recipe;

    const service = serviceMapper[category];
    const method = methodMapper[name];

    let parsedStartDate = startOfDay(parseISO(startDate));
    let parsedEndDate = endOfDay(parseISO(endDate));
    const error = await validateDates(parsedStartDate, parsedEndDate);
    if (error) {
      parsedStartDate = new Date();
      parsedEndDate = new Date();
      parsedStartDate.setDate(parsedStartDate.getDate() - 60);
    }

    const args = argsMapper(method, {
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      ecommerceConnectId,
      additionalArgs,
    });

    const metricValue: EcommerceSales | EcommerceFinance | EcommerceMarketing = await this[service][method](args);
    return {
      ...metric.toJSON(),
      value: metricValue,
    };
  }

  async getDashboardConfig(id: number) {
    const dashboardRepository = this.tenantInstance.connection.getRepository(Dashboard);
    const ecommerceConnectRepository = this.tenantInstance.connection.getRepository(EcommerceConnect);
    const metricRepository = this.tenantInstance.connection.getRepository(Metric);
    const recipeConfigRepository = this.tenantInstance.connection.getRepository(RecipeConfig);
    const chartTypeRepository = this.tenantInstance.connection.getRepository(ChartType);
    const filterTypeRepository = this.tenantInstance.connection.getRepository(FilterType);
    const recipeRepository = this.tenantInstance.connection.getRepository(Recipe);

    const dashboard = await dashboardRepository.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ecommerceConnectRepository,
          attributes: ['id', 'strategy'],
        },
        {
          model: metricRepository,
          as: 'metrics',
          include: [
            {
              model: recipeConfigRepository,
              as: 'recipeConfig',
              include: [
                {
                  model: chartTypeRepository,
                  as: 'chartType',
                  attributes: ['id', 'name'],
                },
                {
                  model: filterTypeRepository,
                  as: 'filterType',
                  attributes: ['id', 'name'],
                },
                {
                  model: recipeRepository,
                  as: 'recipe',
                  attributes: ['id', 'name', 'description', 'category'],
                },
              ],
            },
          ],
        },
      ],
    });

    return dashboard;
  }

  async getDashboards() {
    const dashboardRepository = this.tenantInstance.connection.getRepository(Dashboard);
    const metricRepository = this.tenantInstance.connection.getRepository(Metric);

    const dashboards = await dashboardRepository.findAll({
      include: [
        {
          model: metricRepository,
          as: 'metrics',
        },
      ],
    });

    return dashboards;
  }
}

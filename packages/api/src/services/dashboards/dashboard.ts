import { Dashboard } from '@models/company/dashboard.entity';
import { Metric } from '@models/company/metric.entity';
import { RecipeConfig } from '@models/company/recipeConfig';
import { Inject, Injectable } from '@nestjs/common';
import {
  createInitialMetrics,
  createInitialRecipeConfigs,
  DashboardMetric,
  DashboardRecipeConfig,
} from '@utils/createInitialMetrics';
import { Transaction } from 'sequelize';
import { TenantInstance, TENANT_CONNECTION } from '../../modules/tenant/tenant.module';

@Injectable()
class DashboardService {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance
  ) {}

  async createEmptyDashboard({
    name,
    ecommerceConnectId,
    creatorId,
    transaction,
    initialMetrics = undefined,
    initialRecipeConfigs = undefined,
  }: {
    name: string;
    ecommerceConnectId: number;
    creatorId: number;
    transaction: Transaction;
    initialMetrics?: Array<DashboardMetric>;
    initialRecipeConfigs?: Array<DashboardRecipeConfig>;
  }) {
    const dashboardRepository = this.tenantInstance.connection.getRepository(Dashboard);
    const metricRepository = this.tenantInstance.connection.getRepository(Metric);
    const recipeConfigRepository = this.tenantInstance.connection.getRepository(RecipeConfig);

    const dashboard = await dashboardRepository.create<Dashboard>(
      {
        name,
        ecommerceConnectId,
        creatorId,
      },
      {
        transaction,
      }
    );

    const initialMetricsData = createInitialMetrics(dashboard.id, initialMetrics);
    const createdMetrics = await metricRepository.bulkCreate<Metric>(initialMetricsData, {
      transaction,
    });

    const metricIds = createdMetrics.map(metric => metric.id);
    const initialRecipeConfigsData = createInitialRecipeConfigs(metricIds, initialRecipeConfigs);
    const createdRecipeConfigs = await recipeConfigRepository.bulkCreate<RecipeConfig>(initialRecipeConfigsData, {
      transaction,
    });

    createdMetrics.forEach((metric, index) => {
      metric.recipeConfig = createdRecipeConfigs[index];
    });

    dashboard.metrics = createdMetrics;
    await dashboard.save();

    return dashboard;
  }
}

export default DashboardService;

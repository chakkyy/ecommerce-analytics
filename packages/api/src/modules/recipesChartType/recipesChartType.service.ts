import { Inject, Injectable } from '@nestjs/common';
import { RecipesChartType } from '@models/company/recipesChartType.entity';
import { TenantInstance, TENANT_CONNECTION } from '../tenant/tenant.module';

@Injectable()
export class RecipesChartTypeService {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance
  ) {}

  async create(): Promise<RecipesChartType> {
    const recipesChartTypeRepository = this.tenantInstance.connection.getRepository(RecipesChartType);

    return recipesChartTypeRepository.create<RecipesChartType>();
  }
}

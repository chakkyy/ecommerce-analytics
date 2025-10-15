import { Inject, Injectable } from '@nestjs/common';
import { RecipesFilterType } from '@models/company/recipesFilterType.entity';
import { TenantInstance, TENANT_CONNECTION } from '../tenant/tenant.module';

@Injectable()
export class RecipesFilterTypeService {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance
  ) {}

  async create(): Promise<RecipesFilterType> {
    const recipesChartTypeRepository = this.tenantInstance.connection.getRepository(RecipesFilterType);

    return recipesChartTypeRepository.create<RecipesFilterType>();
  }
}

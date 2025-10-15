import { Inject, Injectable } from '@nestjs/common';
import { Recipe } from '@models/company/recipe.entity';
import { ChartType } from '@models/company/chartType.entity';
import { FilterType } from '@models/company/filterType.entity';
import { TenantInstance, TENANT_CONNECTION } from '../tenant/tenant.module';

@Injectable()
export class RecipesService {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance
  ) {}

  async findAll(): Promise<Recipe[]> {
    const recipeRepository = this.tenantInstance.connection.getRepository(Recipe);
    const filterTypeRepository = this.tenantInstance.connection.getRepository(FilterType);
    const chartTypeRepository = this.tenantInstance.connection.getRepository(ChartType);

    return recipeRepository.findAll<Recipe>({
      include: [filterTypeRepository, chartTypeRepository],
    });
  }
}

import { Module } from '@nestjs/common';
import { RecipesChartTypeService } from './recipesChartType.service';
import { TenantModule } from '../tenant/tenant.module';

@Module({
  imports: [TenantModule],
  providers: [RecipesChartTypeService],
  exports: [RecipesChartTypeService],
})
export class RecipesChartTypeModule {}

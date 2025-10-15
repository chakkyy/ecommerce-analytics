import { Module } from '@nestjs/common';
import { RecipesFilterTypeService } from './recipesFilterType.service';
import { TenantModule } from '../tenant/tenant.module';

@Module({
  imports: [TenantModule],
  providers: [RecipesFilterTypeService],
  exports: [RecipesFilterTypeService],
})
export class RecipesFilterTypeModule {}

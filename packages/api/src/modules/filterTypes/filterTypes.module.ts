import { Module } from '@nestjs/common';
import { FilterTypesService } from './filterTypes.service';
import { TenantModule } from '../tenant/tenant.module';

@Module({
  imports: [TenantModule],
  providers: [FilterTypesService],
  exports: [FilterTypesService],
})
export class FilterTypesModule {}

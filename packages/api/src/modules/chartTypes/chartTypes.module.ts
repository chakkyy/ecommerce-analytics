import { Module } from '@nestjs/common';
import { ChartTypesService } from './chartTypes.service';
import { TenantModule } from '../tenant/tenant.module';

@Module({
  imports: [TenantModule],
  providers: [ChartTypesService],
  exports: [ChartTypesService],
})
export class ChartTypesModule {}

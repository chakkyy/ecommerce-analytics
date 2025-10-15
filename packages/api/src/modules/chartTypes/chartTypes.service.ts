import { Inject, Injectable } from '@nestjs/common';
import { ChartType } from '@models/company/chartType.entity';
import { ChartTypeDto } from './dto/chartType.dto';
import { TenantInstance, TENANT_CONNECTION } from '../tenant/tenant.module';

@Injectable()
export class ChartTypesService {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance
  ) {}

  async create(recipe: ChartTypeDto): Promise<ChartType> {
    const chartTypeRepository = this.tenantInstance.connection.getRepository(ChartType);
    return chartTypeRepository.create<ChartType>(recipe);
  }
}

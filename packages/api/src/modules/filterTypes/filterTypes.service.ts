import { Inject, Injectable } from '@nestjs/common';
import { FilterType } from '@models/company/filterType.entity';
import { FilterTypeDto } from './dto/filterType.dto';
import { TenantInstance, TENANT_CONNECTION } from '../tenant/tenant.module';

@Injectable()
export class FilterTypesService {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance
  ) {}

  async create(recipe: FilterTypeDto): Promise<FilterType> {
    const filterTypeRepository = this.tenantInstance.connection.getRepository(FilterType);

    return filterTypeRepository.create<FilterType>(recipe);
  }
}

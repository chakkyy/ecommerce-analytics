import { Inject, Injectable } from '@nestjs/common';

import { EcommerceCredential } from '@models/company/ecommerceCredential.entity';
import { EcommerceCredentialDto } from './dto/ecommerceCredential.dto';
import { TenantInstance, TENANT_CONNECTION } from '../tenant/tenant.module';

@Injectable()
export class EcommerceCredentialsService {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance
  ) {}

  async create(credentials: EcommerceCredentialDto[]): Promise<EcommerceCredential[]> {
    const ecommerceCredentialRepository = this.tenantInstance.connection.getRepository(EcommerceCredential);

    return await ecommerceCredentialRepository.bulkCreate(credentials);
  }
}

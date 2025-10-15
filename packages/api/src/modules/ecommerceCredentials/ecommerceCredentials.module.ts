import { Module } from '@nestjs/common';
import { EcommerceCredentialsService } from './ecommerceCredentials.service';
import { TenantModule } from '../tenant/tenant.module';

@Module({
  imports: [TenantModule],
  providers: [EcommerceCredentialsService],
})
export class EcommerceCredentialsModule {}

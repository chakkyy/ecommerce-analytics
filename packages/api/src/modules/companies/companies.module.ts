import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { S3Service } from '../../utils/s3';
import { PassportModule } from '@nestjs/passport';
import { UsersInvitesModule } from '../usersInvites/usersInvites.module';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '@modules/users/users.module';
import * as dotenv from 'dotenv';
import EcommerceSales from '../../services/ecommerce/sales/sales';
import { AuthModule } from '@modules/auth/auth.module';
import EcommerceMarketing from '@services/ecommerce/marketing/marketing';
import EcommerceFinance from '@services/ecommerce/finances/finances';
import DashboardService from '@services/dashboards/dashboard';
import EcommerceSegments from '@services/ecommerce/segments/segments';
import { FileUploadService } from '@modules/upload/upload.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TenantModule } from '../tenant/tenant.module';
import { Company } from '../../models/ecommerce-analytics /company.entity';
import { UsersRelationshipsModule } from '../usersRelationships/usersRelationships.module';
import { CompaniesController } from './companies.controller';

dotenv.config();
@Module({
  imports: [
    UsersModule,
    UsersInvitesModule,
    UsersRelationshipsModule,
    PassportModule,
    AuthModule,
    TenantModule,
    SequelizeModule.forFeature([Company]),
  ],
  providers: [
    CompaniesService,
    DashboardService,
    JwtService,
    S3Service,
    EcommerceSales,
    EcommerceMarketing,
    EcommerceFinance,
    EcommerceSegments,
    FileUploadService,
  ],
  controllers: [CompaniesController],
  exports: [CompaniesService],
})
export class CompaniesModule {}

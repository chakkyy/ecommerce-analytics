import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { EcommerceCredential } from '@models/company/ecommerceCredential.entity';
import { EcommerceConnect } from '../../models/company/ecommerceConnect.entity';

import EcommerceSegments, { DEFAULT_SEGMENTATION_DAYS } from '../../services/ecommerce/segments/segments';
import { TenantInstance } from '../tenant/tenant.module';
import { BaseCompanyCron } from './baseCompanyCron';

@Injectable()
export class SegmentationVtexCronService extends BaseCompanyCron {
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handle() {
    try {
      await this.forEachCompany(async (tenantInstance, company) => {
        const ecommerceConnectRepository = tenantInstance.connection.getRepository(EcommerceConnect);
        const ecommerceCredentialRepository = tenantInstance.connection.getRepository(EcommerceCredential);

        // this below is default segmentation range
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - DEFAULT_SEGMENTATION_DAYS);
        startDate.setUTCHours(0, 0, 0, 0); // Establece la hora en UTC
        const utcStartDate = new Date(
          Date.UTC(
            startDate.getUTCFullYear(),
            startDate.getUTCMonth(),
            startDate.getUTCDate(),
            startDate.getUTCHours(),
            startDate.getUTCMinutes(),
            startDate.getUTCSeconds(),
            startDate.getUTCMilliseconds()
          )
        );
        const endDate = new Date();

        const vtexEcommerces = await ecommerceConnectRepository.findAll({
          where: {
            strategy: 'vtex',
          },
          include: [
            {
              model: ecommerceCredentialRepository,
            },
          ],
        });

        await Promise.all(
          vtexEcommerces.map(async (ecommerceConnect: EcommerceConnect) => {
            console.log('VTEX: Starting segmentation for company', company.id, 'ecommerceConnect', ecommerceConnect.id);
            const ecommerceSegments = new EcommerceSegments({
              connection: tenantInstance.connection,
            } as TenantInstance);

            const result = await ecommerceSegments.generateAndSaveSegments({
              ecommerceConnectId: ecommerceConnect.id,
              startDate: utcStartDate,
              endDate,
            });
            console.log(
              'Finished segmentation for company',
              company.id,
              'ecommerceConnect',
              ecommerceConnect.id,
              result
            );
          })
        );
      });
    } catch (error) {
      console.error('Error running segmentation:', error);
    }
  }
}

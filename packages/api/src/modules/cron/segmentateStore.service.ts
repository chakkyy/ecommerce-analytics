import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';
import { EcommerceConnect } from '../../models/company/ecommerceConnect.entity';

import EcommerceSegments, { DEFAULT_SEGMENTATION_DAYS } from '../../services/ecommerce/segments/segments';
import { TenantInstance } from '../tenant/tenant.module';
import { BaseCompanyCron } from './baseCompanyCron';
import { sub } from 'date-fns';

@Injectable()
export class SegmentationStoreService extends BaseCompanyCron {
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handle() {
    try {
      await this.forEachCompany(async (tenantInstance, company) => {
        const ecommerceConnectRepository = tenantInstance.connection.getRepository(EcommerceConnect);
        const ecommerceOrderRepository = tenantInstance.connection.getRepository(EcommerceOrder);

        const storesEcommerces = await ecommerceConnectRepository.findAll({
          attributes: ['id'],
          where: {
            strategy: 'store',
          },
        });

        await Promise.all(
          storesEcommerces.map(async (ecommerceConnect: EcommerceConnect) => {
            console.log(
              'STORE: Starting segmentation for company',
              company.id,
              'ecommerceConnect',
              ecommerceConnect.id
            );
            const ecommerceSegments = new EcommerceSegments({
              connection: tenantInstance.connection,
            } as TenantInstance);

            // bring last order
            const lastOrder = await ecommerceOrderRepository.findOne({
              attributes: ['createdAt'],
              where: {
                ecommerceConnectId: ecommerceConnect.id,
              },
              order: [['createdAt', 'DESC']],
            });
            if (!lastOrder) {
              console.log('No orders found for company:', company.id, 'ecommerceConnect', ecommerceConnect.id);
              return;
            }
            const endDate = new Date(lastOrder.createdAt);
            const startDate = sub(endDate, { days: DEFAULT_SEGMENTATION_DAYS });
            console.log('Start date:', startDate);
            console.log('Last order date:', endDate);
            console.log('DEFAULT_SEGMENTATION_DAYS', DEFAULT_SEGMENTATION_DAYS);

            const result = await ecommerceSegments.generateAndSaveSegments({
              ecommerceConnectId: ecommerceConnect.id,
              startDate,
              endDate,
            });
            console.log(
              'Finished segmentation for company:',
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

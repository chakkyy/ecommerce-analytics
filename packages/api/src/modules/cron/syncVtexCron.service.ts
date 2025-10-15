import { EcommerceCredential } from '@models/company/ecommerceCredential.entity';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EcommerceConnect } from '../../models/company/ecommerceConnect.entity';
import * as dotenv from 'dotenv';
import { BaseCompanyCron } from './baseCompanyCron';
import { getStartAndEndDates } from '../../utils/vtex';
import { syncVtex } from '@lib/vtex';

dotenv.config();

// TODO: This cron can be configure to be run by nest/bull
@Injectable()
export class SyncVtexCronService extends BaseCompanyCron {
  // ajuste para cada minuto
  //@Cron(CronExpression.EVERY_MINUTE)
  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async handle() {
    if (process.env.FEATURE_FLAG_CRONJOBS === 'true') {
      await this.forEachCompany(async (tenantInstance, company) => {
        const ecommerceConnectRepository = tenantInstance.connection.getRepository(EcommerceConnect);
        const ecommerceCredentialRepository = tenantInstance.connection.getRepository(EcommerceCredential);

        const ecommerceConnectList = await ecommerceConnectRepository.findAll({
          include: [
            {
              model: ecommerceCredentialRepository,
            },
          ],
          where: {
            strategy: 'vtex',
          },
        });

        const { endDate, startDate } = getStartAndEndDates(+process.env.VTEX_DAYS_TO_SYNC_AT_CRONJOB || 180);

        await Promise.all(
          ecommerceConnectList.map(async (ecommerceConnect: EcommerceConnect) => {
            console.log(
              'Syncing orders for company',
              company.id,
              'ecommerceConnect',
              ecommerceConnect.id,
              'database',
              company.database
            );

            await syncVtex({
              ecommerceConnectId: ecommerceConnect.id,
              startDate: new Date(startDate),
              endDate: new Date(endDate),
              tenant: { ...tenantInstance, database: company.database },
              queue: this.updateOrdersQueue,
            });
          })
        );
      });
    }
  }
}

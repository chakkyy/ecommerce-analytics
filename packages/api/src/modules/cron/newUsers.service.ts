import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { Dashboard } from '@models/company/dashboard.entity';
import { EcommerceNewUser } from '@models/company/ecommerceNewUser.entity';
import { newUsersQueryByEcommerceConnectId } from '@services/utils/newUserQuery';

import { QueryTypes } from 'sequelize';
import { BaseCompanyCron } from './baseCompanyCron';

import { sub, format } from 'date-fns';

@Injectable()
export class NewUsersCronService extends BaseCompanyCron {
  @Cron(CronExpression.EVERY_WEEK)
  async handle() {
    let errorOnDatabase = '';
    try {
      await this.forEachCompany(async tenantInstance => {
        errorOnDatabase = tenantInstance.connection.config.database;
        const startDateMain = new Date();
        // TODO: Eventually replace 365 with default segmentation period
        const endDateMain = sub(startDateMain, { days: 365 });
        const startDateJoin = sub(endDateMain, { minutes: 1 });
        const endDateJoin = sub(startDateJoin, { days: 365 });

        const ecommerceNewUserRepository = tenantInstance.connection.getRepository(EcommerceNewUser);
        const ecommerceDashboardRepository = tenantInstance.connection.getRepository(Dashboard);
        const dashboards = await ecommerceDashboardRepository.findAll({
          attributes: ['ecommerceConnectId'],
          raw: true,
        });
        await ecommerceNewUserRepository.destroy({ where: {} });

        await Promise.all(
          dashboards.map(async dashboard => {
            const newUsers = (await tenantInstance.connection.query(newUsersQueryByEcommerceConnectId, {
              raw: true,
              type: QueryTypes.SELECT,
              replacements: {
                ecommerceConnectId: dashboard.ecommerceConnectId,
                startDateMain: format(startDateMain, 'yyyy-MM-dd'),
                endDateMain: format(endDateMain, 'yyyy-MM-dd'),
                startDateJoin: format(startDateJoin, 'yyyy-MM-dd'),
                endDateJoin: format(endDateJoin, 'yyyy-MM-dd'),
              },
            })) as unknown as Array<{ userId: number; ecommerceConnectId: number }>;

            if (newUsers.length) {
              await ecommerceNewUserRepository.bulkCreate(newUsers);
              console.log(
                `Finishing creating new users for ecommerceId: ${dashboard.ecommerceConnectId}, database: ${tenantInstance.connection.config.database}`
              );
            }
          })
        );
      });
    } catch (error) {
      console.error(`Error running new users cron service: ${error}, database: ${errorOnDatabase}`);
    }
  }
}

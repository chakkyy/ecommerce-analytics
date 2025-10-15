import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as dotenv from 'dotenv';
import { BaseCompanyCron } from './baseCompanyCron';
import { getCredentials, vtex } from '@utils/vtex';
import { GET_USER_EMAIL } from '@lib/vtex';
import axios from 'axios';
import { SequelizeInstance, getConnection } from '@modules/tenant/tenant.module';

dotenv.config();
const LIMIT_OF_USERS = 1000;

// TODO: This cron can be configure to be run by nest/bull
@Injectable()
export class UpdateVtexUserCronService extends BaseCompanyCron {
  @Cron(CronExpression.EVERY_3_HOURS)
  async handle() {
    await this.forEachCompany(async (tenantInstance, company) => {
      let sequelize: SequelizeInstance | null = null;
      try {
        sequelize = await getConnection({ database: company.database });

        const ecommerceConnectList = await sequelize.models.EcommerceConnect.findAll({
          include: [
            {
              model: sequelize.models.EcommerceCredential,
            },
          ],
          where: {
            strategy: 'vtex',
          },
        });

        for (const ecommerceConnect of ecommerceConnectList) {
          try {
            const users = await sequelize.models.EcommerceUser.findAll({
              attributes: ['id', 'visitorId'],
              where: {
                email: null,
                ecommerceConnectId: ecommerceConnect.id,
              },
              order: [['createdAt', 'DESC']],
              limit: LIMIT_OF_USERS,
            });

            const { url: baseUrl, public_key: appKey, private_key: appToken } = getCredentials(ecommerceConnect);

            const vtexConnection = axios.create({
              baseURL: baseUrl,
              headers: {
                'X-VTEX-API-AppKey': appKey,
                'X-VTEX-API-AppToken': appToken,
              },
              'axios-retry': {
                retries: 0,
              },
            });

            for (const user of users) {
              try {
                const [vtexUser] = await vtex(`${GET_USER_EMAIL},id&_where=userId=${user.visitorId}`, vtexConnection);
                if (vtexUser?.email) {
                  user.email = vtexUser.email;
                  await user.save();
                } else {
                  // console.log('user not found', '[', company.database, ']', user.visitorId);
                }
              } catch (error) {
                console.error('error updating user', '[', company.database, ']', user.visitorId, error);
                if (error?.response?.status === 403) {
                  throw new Error(JSON.stringify({ message: 'Error on authentication', error }));
                }
              }
            }
          } catch (error) {
            console.error('error updating users', '[', company.database, ']', error);
          }
        }
        console.log('finished saving users for', company.database);
      } catch (error) {
        // close connection
        console.error('error connecting to database', '[', company.database, ']', error);
      } finally {
        if (sequelize) {
          await sequelize.close();
        }
      }
    });
  }
}

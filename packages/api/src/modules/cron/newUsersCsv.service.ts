import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BaseCompanyCron } from './baseCompanyCron';
import { FileUploadService } from '@modules/upload/upload.service';
import { EcommerceUser } from '@models/company/ecommerceUser.entity';

@Injectable()
export class NewUsersCsvService extends BaseCompanyCron {
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async handle() {
    try {
      await this.forEachCompany(async tenantInstance => {
        const fileUploadService = new FileUploadService();
        try {
          const [users] = await tenantInstance.connection.query(
            `
              SELECT 
                "userId",
                "fullName",
                "email",
                "phone",
                TO_CHAR("createdAt", 'YYYY-MM-DD') AS last_purchase
              FROM (
                SELECT 
                  "eu"."id" AS "userId",
                  "eu"."fullName",
                  "eu"."email",
                  "eu"."phone",
                  "eo"."createdAt",
                  ROW_NUMBER() OVER (PARTITION BY "eu"."id" ORDER BY "eo"."createdAt" DESC) AS recentOrder
                FROM 
                  "EcommerceUsers" AS eu 
                INNER JOIN 
                  "EcommerceNewUsers" AS enu 
                  ON "enu"."userId" = "eu".id
                INNER JOIN
                  "EcommerceOrders" AS eo
                  ON "enu"."userId" = "eo"."userId"
                WHERE
                  "eu"."email" IS NOT NULL OR "eu"."phone" IS NOT NULL
                  AND "status" IN ('approved', 'invoiced', 'shipped', 'delivered', 'waiting-for-seller', 'ready-for-handling', 'window-to-cancel', 'handling', 'payment-approved')
              ) AS subquery
              WHERE recentOrder = 1
              ORDER BY last_purchase DESC;
            `,
            {
              raw: true,
            }
          );

          let csvContent = 'Customer name,Email,Phone,Last order\n';

          users?.forEach((item: EcommerceUser & { last_purchase: string }) => {
            const row = `${item.fullName},${item.email},${item.phone},${item.last_purchase || ''}\n`;
            csvContent += row;
          });

          const filename = `segments/${tenantInstance.connection.config.database}-new_users.csv`;
          await fileUploadService.uploadFile(Buffer.from(csvContent), filename);
        } catch (error) {
          console.error('Error generating new users csv:', error);
        }
      });
    } catch (error) {
      console.error('Error generating segments csv:', error);
    }
  }
}

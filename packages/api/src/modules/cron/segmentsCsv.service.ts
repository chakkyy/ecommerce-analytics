import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { EcommerceSegment } from '../../models/company/ecommerceSegment.entity';

import { BaseCompanyCron } from './baseCompanyCron';
import { EcommerceUser } from '@models/company/ecommerceUser.entity';
import { FileUploadService } from '@modules/upload/upload.service';

@Injectable()
export class SegmentsCsvService extends BaseCompanyCron {
  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handle() {
    try {
      await this.forEachCompany(async tenantInstance => {
        const fileUploadService = new FileUploadService();
        const ecommerceSegmentsRepository = tenantInstance.connection.getRepository(EcommerceSegment);
        const database = tenantInstance.connection.options.database;
        const segmentsList = await ecommerceSegmentsRepository.findAll({
          attributes: ['id'],
          raw: true,
        });
        for (const segment of segmentsList) {
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
                    "EcommerceUserSegments" AS "segment" 
                    ON "eu"."id" = "segment"."userId"
                  INNER JOIN
                    "EcommerceOrders" AS eo
                    ON "segment"."userId" = "eo"."userId"
                  WHERE          
                    "segment"."segmentId" = :segmentId AND
                    ("eu"."email" IS NOT NULL OR "eu"."phone" IS NOT NULL)
                    AND "status" IN ('approved', 'invoiced', 'shipped', 'delivered', 'waiting-for-seller', 'ready-for-handling', 'window-to-cancel', 'handling', 'payment-approved')
                ) AS subquery
                WHERE recentOrder = 1
                ORDER BY last_purchase DESC;
              `,
              {
                raw: true,
                replacements: {
                  segmentId: segment.id,
                },
              }
            );

            let csvContent = 'Customer name,Email,Phone,Last order\n';

            users?.forEach((item: EcommerceUser & { last_purchase: string }) => {
              const row = `${item.fullName},${item.email},${item.phone},${item.last_purchase || ''}\n`;
              csvContent += row;
            });
            const filename = `segments/${database}-${segment.id}.csv`;
            await fileUploadService.uploadFile(Buffer.from(csvContent), filename);
          } catch (error) {
            console.error('Error generating segments csv:', error);
          }
        }
      });
    } catch (error) {
      console.error('Error generating segments csv:', error);
    }
  }
}

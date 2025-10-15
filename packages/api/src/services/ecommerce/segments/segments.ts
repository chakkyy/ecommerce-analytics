import { Inject, Injectable } from '@nestjs/common';
import { TenantInstance, TENANT_CONNECTION } from '../../../modules/tenant/tenant.module';
import { QueryTypes } from 'sequelize';
import { EcommerceClientGlobalSegment } from '../../../models/company/ecommerceClientGlobalSegment.entity';
import { validateDates } from '../../../utils/date';
import { COMMON_SEGMENTS_QUERY, customRulesSegmentation } from '@services/utils/userSegment';
import { format } from 'date-fns';
import { EcommerceSegment } from '@models/company/ecommerceSegment.entity';
import { EcommerceUserSegment } from '@models/company/ecommerceUserSegment.entity';

export const DEFAULT_SEGMENTATION_DAYS = 365;
interface Segment {
  generateSegments: ({
    ecommerceConnectId,
    startDate,
    endDate,
  }: {
    ecommerceConnectId: number;
    startDate: Date;
    endDate: Date;
  }) => Promise<{ status: number; message: string }>;
}

@Injectable()
class EcommerceSegments implements Segment {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance
  ) {}

  /**
   * @deprecated replaced by generateAndSaveSegments
   */
  async generateSegments({
    ecommerceConnectId,
    startDate,
    endDate,
  }: {
    ecommerceConnectId: number;
    startDate: Date;
    endDate: Date;
  }) {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }
    try {
      const ecommerceClientGlobalSegmentRepository =
        this.tenantInstance.connection.getRepository(EcommerceClientGlobalSegment);
      const consoleTimeLabel = `default-segments for ecommerce ${ecommerceConnectId} from ${format(
        startDate,
        'yyyy-MM-dd'
      )} to ${format(endDate, 'yyyy-MM-dd')}`;
      console.time(consoleTimeLabel);
      const segmentedUsers = (await this.tenantInstance.connection.query(COMMON_SEGMENTS_QUERY, {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          ecommerceConnectId,
          startDate,
          endDate,
        },
      })) as unknown as Array<{ userId: number; ecommerceConnectId: number; globalSegmentId: number }>;
      if (segmentedUsers.length === 0) {
        return {
          status: 200,
          message: `The segments cannot be created for ecommerce with id ${ecommerceConnectId}`,
        };
      }
      await ecommerceClientGlobalSegmentRepository.destroy({
        where: {
          ecommerceConnectId,
        },
      });
      await ecommerceClientGlobalSegmentRepository.bulkCreate(segmentedUsers);
      console.timeEnd(consoleTimeLabel);

      return {
        status: 200,
        message: 'Segments created successfully',
      };
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        message: 'Bad Request',
      };
    }
  }

  async generateAndSaveSegments({
    ecommerceConnectId,
    startDate,
    endDate,
  }: {
    ecommerceConnectId: number;
    startDate: Date;
    endDate: Date;
  }) {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }
    try {
      const ecommerceUserSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceUserSegment);
      const ecommerceSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceSegment);
      const consoleTimeLabel = `Default-segments for ecommerce ${ecommerceConnectId} from ${format(
        startDate,
        'yyyy-MM-dd'
      )} to ${format(endDate, 'yyyy-MM-dd')}`;
      console.time(consoleTimeLabel);

      const segmentsRules = await ecommerceSegmentRepository.findAll({
        attributes: ['id', 'rfm'],
        raw: true,
      });
      if (segmentsRules.length === 0) {
        throw new Error(`No custom segments found for ecommerce ${ecommerceConnectId}`);
      }
      const segmentedUsers = (await this.tenantInstance.connection.query(customRulesSegmentation(segmentsRules), {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          ecommerceConnectId,
          startDate,
          endDate,
        },
      })) as unknown as Array<{ userId: number; ecommerceConnectId: number; segmentId: number }>;
      if (segmentedUsers.length === 0) {
        return {
          status: 200,
          message: `The segments cannot be created for ecommerce with id ${ecommerceConnectId}`,
        };
      }
      await ecommerceUserSegmentRepository.destroy({
        where: {
          ecommerceConnectId,
        },
      });
      await ecommerceUserSegmentRepository.bulkCreate(segmentedUsers);
      console.timeEnd(consoleTimeLabel);

      return {
        status: 200,
        message: 'Segments created successfully',
      };
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        message: 'Bad Request',
      };
    }
  }
}

export default EcommerceSegments;

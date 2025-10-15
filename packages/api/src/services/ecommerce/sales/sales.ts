import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';
import { Inject, Injectable } from '@nestjs/common';
import { validateDates } from '@utils/date';
import { Op, Sequelize } from 'sequelize';
import { VTEX_STATUSES } from '@services/utils/userOrder';
import { TenantInstance, TENANT_CONNECTION } from '../../../modules/tenant/tenant.module';
import { EcommerceStore } from '../../../models/company/ecommerceStore.entity';
import { EcommerceProduct } from '../../../models/company/ecommerceProduct.entity';
import { EcommerceUserSegment } from '@models/company/ecommerceUserSegment.entity';
import { EcommerceSegment } from '@models/company/ecommerceSegment.entity';

interface Sales {
  orders: ({
    startDate,
    endDate,
    ecommerceConnectId,
    page,
    pageSize,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    page: number;
    pageSize: number;
  }) => Promise<EcommerceOrder[]>;
  totalRevenue: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeTotalSalesBySegment: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<{ [key: string]: Array<any> }>;

  storeTotalSales: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeSquareMeterSales: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeAvailableInventory: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeAverageTicket: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  segmentRevenue: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<Array<{ segment: string; revenue: number }>>;

  usersBySegment: ({
    ecommerceConnectId,
  }: {
    ecommerceConnectId: number;
  }) => Promise<Array<{ segment: string; revenue: number }>>;
}

@Injectable()
class EcommerceSales implements Sales {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance
  ) {}

  async totalRevenue({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);

    const sales: any = await ecommerceOrderRepository.findOne({
      attributes: [[Sequelize.literal('SUM(total)'), 'totalRevenue']],
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        status: {
          [Op.in]: VTEX_STATUSES,
        },
      },
      raw: true,
    });
    return sales?.totalRevenue || 0;
  }

  async averageTicket({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);

    const ticket: any = await ecommerceOrderRepository.findOne({
      attributes: [[Sequelize.fn('AVG', Sequelize.col('total')), 'averageTicket']],
      where: {
        ecommerceConnectId,
        status: {
          [Op.in]: VTEX_STATUSES,
        },
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      raw: true,
    });
    if (!ticket?.averageTicket) return 0;
    return ticket.averageTicket;
  }

  async orders({
    startDate,
    endDate,
    ecommerceConnectId,
    page,
    pageSize,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    page: number;
    pageSize: number;
  }) {
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);
    const offset = (page - 1) * pageSize;
    const orders: EcommerceOrder[] = await ecommerceOrderRepository.findAll<EcommerceOrder>({
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        status: {
          [Op.not]: null,
        },
      },
      limit: pageSize,
      offset: offset,
      order: [['createdAt', 'DESC']],
    });

    return orders;
  }

  async incomeByTransaction({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);

    const sales: any = await ecommerceOrderRepository.findOne({
      attributes: [[Sequelize.literal('SUM(total - cost) / COUNT(*)'), 'incomeByTransaction']],
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        status: {
          [Op.in]: VTEX_STATUSES,
        },
      },
      raw: true,
    });
    return sales?.incomeByTransaction || 0;
  }

  async storeTotalSalesBySegment({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }) {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }
    const ecommerceUserSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceUserSegment);
    const ecommerceSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceSegment);
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);

    const segments = await ecommerceSegmentRepository.findAll({ attributes: ['id', 'name'], raw: true });
    const segmentByOrders = await ecommerceUserSegmentRepository.findAll({
      attributes: [
        'segmentId',
        'segment.name',
        [Sequelize.fn('to_char', Sequelize.col('orders.createdAt'), 'YYYY-MM-DD'), 'orders.createdAt'],
        [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('orders.total')), 0), 'totalSum'],
      ],
      where: {
        ecommerceConnectId,
      },
      include: [
        {
          model: ecommerceOrderRepository,
          attributes: [],
          where: {
            ecommerceConnectId,
            ...additionalArgs,
            createdAt: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
          },
        },
        {
          model: ecommerceSegmentRepository,
          attributes: [],
          required: true,
        },
      ],
      raw: true,
      group: ['segmentId', 'segment.name', 'orders.createdAt'],
      order: ['segmentId', 'orders.createdAt'],
    });

    const salesBySegment = segments.reduce((acc, segment) => {
      acc[segment.name] = [];
      return acc;
    }, {});

    // @TODO fill up empty dates
    segmentByOrders.forEach(segmentByOrder => {
      salesBySegment[segmentByOrder['name']].push({
        total: segmentByOrder['totalSum'],
        createdAt: segmentByOrder['orders.createdAt'],
      });
    });

    return salesBySegment;
  }

  async storeSquareMeterSales({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }) {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);
    const ecommerceStoreRepository = this.tenantInstance.connection.getRepository(EcommerceStore);

    const totalSales: number = await ecommerceOrderRepository.sum('total', {
      where: {
        ecommerceConnectId,
        ...additionalArgs,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });
    let storeOptions = {};
    if (Object.keys(additionalArgs).length > 0) {
      if (additionalArgs.ecommerceStoreId) {
        storeOptions = {
          id: additionalArgs.ecommerceStoreId,
        };
      }
    }
    const squareMetersTotal = await ecommerceStoreRepository.sum('area', {
      where: {
        ecommerceConnectId,
        ...storeOptions,
      },
    });

    if (totalSales > 0 && squareMetersTotal > 0) {
      return totalSales / squareMetersTotal;
    } else {
      return 0;
    }
  }
  async storeAvailableInventory({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }) {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }

    const ecommerceProductRepository = this.tenantInstance.connection.getRepository(EcommerceProduct);

    const totalStock: number = await ecommerceProductRepository.sum('stock', {
      where: {
        ecommerceConnectId,
        ...additionalArgs,
        stock: {
          [Op.ne]: null,
        },
      },
      raw: true,
    });
    return totalStock;
  }
  async storeAverageTicket({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }) {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }

    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);

    const ticket: any = await ecommerceOrderRepository.findOne({
      attributes: [[Sequelize.fn('AVG', Sequelize.col('total')), 'averageTicket']],
      where: {
        ecommerceConnectId,
        ...additionalArgs,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      raw: true,
    });
    if (!ticket?.averageTicket) return 0;
    return ticket.averageTicket;
  }

  async storeTotalSales({ startDate, endDate, ecommerceConnectId, additionalArgs }) {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }

    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);

    const sales: number = await ecommerceOrderRepository.sum('total', {
      where: {
        ecommerceConnectId,
        ...additionalArgs,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });
    return sales;
  }

  async segmentRevenue({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }): Promise<any> {
    // @TODO improve performance
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }
    const ecommerceSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceSegment);
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);
    const ecommerceUserSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceUserSegment);

    const segments = await ecommerceSegmentRepository.findAll({ attributes: ['id', 'name'], raw: true });
    const calculatedSegments: any = await ecommerceUserSegmentRepository.findAll({
      attributes: [
        'segmentId',
        [Sequelize.literal('SUM("orders"."total" - "orders"."cost")'), 'total'],
        [Sequelize.fn('to_char', Sequelize.col('"orders"."createdAt"'), 'YYYY-MM-DD'), 'created_at'],
      ],
      where: {
        ecommerceConnectId,
        segmentId: {
          [Op.not]: null,
        },
      },
      include: [
        {
          model: ecommerceOrderRepository,
          attributes: [],
          required: true,
          order: [['createdAt', 'ASC']],
          where: {
            ecommerceConnectId,
            status: {
              [Op.in]: VTEX_STATUSES,
              [Op.not]: null,
            },
            createdAt: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
          },
        },
      ],
      raw: true,
      group: ['segmentId', 'created_at'],
    });

    const mappedNames = segments.reduce((acc, segment) => {
      acc[segment.id] = segment.name;
      return acc;
    }, {});
    const valueBySegment = segments.reduce((acc, segment) => {
      acc[segment.name] = [];
      return acc;
    }, {});
    calculatedSegments.forEach(segmentByOrder => {
      valueBySegment[mappedNames[segmentByOrder.segmentId]].push({
        total: segmentByOrder.total,
        createdAt: segmentByOrder.created_at,
      });
    });

    return valueBySegment;
  }

  async usersBySegment({ ecommerceConnectId }: { ecommerceConnectId: number }): Promise<any> {
    const ecommerceSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceSegment);
    const ecommerceUserSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceUserSegment);

    const segments = await ecommerceSegmentRepository.findAll({ attributes: ['id', 'name'], raw: true });
    const usersBySegment: any = await ecommerceUserSegmentRepository.findAll({
      attributes: ['segmentId', [Sequelize.literal('COUNT("segmentId")'), 'count']],
      where: {
        ecommerceConnectId,
        segmentId: {
          [Op.not]: null,
        },
      },
      group: ['"segmentId"'],
      raw: true,
    });
    const mappedNames = segments.reduce((acc, segment) => {
      acc[segment.id] = segment.name;
      return acc;
    }, {});
    const usersBySegmentObj = segments.reduce((acc, segment) => {
      acc[segment.name] = 0;
      return acc;
    }, {});
    usersBySegment.forEach((segment: { count: number; segmentId: number }) => {
      usersBySegmentObj[mappedNames[segment.segmentId]] += Number(segment.count);
    });
    return usersBySegmentObj;
  }
}

export default EcommerceSales;

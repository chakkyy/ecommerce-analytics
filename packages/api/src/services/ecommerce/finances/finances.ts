import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';
import { EcommerceOrderItem } from '@models/company/ecommerceOrderItem.entity';
import { EcommerceProduct } from '@models/company/ecommerceProduct.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import { VTEX_STATUSES } from '@services/utils/userOrder';
import { validateDates } from '@utils/date';
import { TenantInstance, TENANT_CONNECTION } from '../../../modules/tenant/tenant.module';
import utils from '../common';
import { EcommerceSegment } from '@models/company/ecommerceSegment.entity';
import { EcommerceUserSegment } from '@models/company/ecommerceUserSegment.entity';

interface Finance {
  accumulatedRevenue: ({
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
  }) => Promise<number>;

  segmentValue: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<Array<{ segment: string; revenue: number }>>;

  storeDistributionCost: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeTotalCost: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<{ [key: string]: number }>;

  storeOrdersTotal: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeGrossMargin: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeNetProfitability: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeROI: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<{ [key: string]: Array<any> }>;

  storeInventoryRotation: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeDiscountRate: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeProductReturnRate: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;
}

@Injectable()
class EcommerceFinance implements Finance {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance
  ) {}

  async accumulatedRevenue({
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

    const sales = await ecommerceOrderRepository.sum('total', {
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
    });

    return sales;
  }

  async segmentValue({
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
    const sales: any = await ecommerceOrderRepository.findAll({
      attributes: [[Sequelize.literal('SUM("total" - "cost")'), 'total']],
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
      include: [
        {
          model: ecommerceUserSegmentRepository,
          attributes: ['segmentId'],
          required: true,
          where: {
            ecommerceConnectId,
            segmentId: {
              [Op.not]: null,
            },
          },
        },
      ],
      group: ['"userSegment"."segmentId"'],
      raw: true,
    });
    const mappedNames = segments.reduce((acc, segment) => {
      acc[segment.id] = segment.name;
      return acc;
    }, {});
    const valueBySegment = segments.reduce((acc, segment) => {
      acc[segment.name] = 0;
      return acc;
    }, {});
    sales.forEach(sale => {
      valueBySegment[mappedNames[sale['userSegment.segmentId']]] += sale.total;
    });
    return valueBySegment;
  }

  async storeDistributionCost({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }): Promise<number> {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }

    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);

    const distributionCost: number = await ecommerceOrderRepository.sum('shippingCost', {
      where: {
        ...additionalArgs,
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });

    return distributionCost;
  }

  async storeGrossMargin({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }): Promise<number> {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);

    const options = {
      ecommerceConnectId,
      ...additionalArgs,
      createdAt: {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      },
    };
    const totalSum = await ecommerceOrderRepository.sum('total', {
      where: options,
    });
    if (!totalSum) return 0;

    const totalItemsCost = await utils.calculateStoreCosts({
      tenantInstance: this.tenantInstance,
      startDate,
      endDate,
      ecommerceConnectId,
      additionalArgs,
    });
    return totalSum - totalItemsCost;
  }

  async storeNetProfitability({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }): Promise<number> {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);

    const totalSales: any = await ecommerceOrderRepository.sum('total', {
      where: {
        ...additionalArgs,
        total: {
          [Op.ne]: null,
          [Op.gt]: 0,
        },
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      raw: true,
    });
    const totalItemsCost = await utils.calculateStoreCosts({
      tenantInstance: this.tenantInstance,
      startDate,
      endDate,
      ecommerceConnectId,
      additionalArgs,
    });

    if (totalSales === 0) return 0;
    if (totalItemsCost === 0) return 0;
    return ((totalSales - totalItemsCost) / totalSales) * 100;
  }

  async storeROI({
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
    const ecommerceSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceSegment);
    const segments = await ecommerceSegmentRepository.findAll({ attributes: ['id', 'name'], raw: true });

    let selectQuery = `
    WITH cost_query AS (
      SELECT to_char("orders"."createdAt", 'YYYY-MM-DD') AS "cost_createdAt", "EcommerceUserSegment"."segmentId",
      SUM("orders->orderItems"."quantity" * "orders->orderItems->product"."cost") AS "orders.totalCost"
      FROM "EcommerceUserSegments" AS "EcommerceUserSegment"
      INNER JOIN "EcommerceOrders" AS "orders" ON "EcommerceUserSegment"."userId" = "orders"."userId"
      AND ("orders"."deletedAt" IS NULL AND ("orders"."ecommerceConnectId" = :ecommerceConnectId AND ("orders"."createdAt" >= :startDate AND "orders"."createdAt" <= :endDate)))
      INNER JOIN "EcommerceOrderItems" AS "orders->orderItems" ON "orders"."id" = "orders->orderItems"."orderId"
      AND ("orders->orderItems"."deletedAt" IS NULL
      AND ("orders->orderItems"."ecommerceConnectId" = :ecommerceConnectId AND "orders->orderItems"."quantity" > 0))
      INNER JOIN "EcommerceProducts" AS "orders->orderItems->product" ON "orders->orderItems"."productId" = "orders->orderItems->product"."id"
      AND ("orders->orderItems->product"."deletedAt" IS NULL AND ("orders->orderItems->product"."ecommerceConnectId" = :ecommerceConnectId AND "orders->orderItems->product"."cost" > '0'))
      WHERE "EcommerceUserSegment"."ecommerceConnectId" = :ecommerceConnectId storeOptions
      GROUP BY "cost_createdAt", "EcommerceUserSegment"."segmentId"
    )
    SELECT cost_query."cost_createdAt", cost_query."segmentId", (( total_query."total" - SUM(cost_query."orders.totalCost")) /  SUM(cost_query."orders.totalCost")) * 100 as roi
    FROM cost_query
    INNER JOIN (
      SELECT to_char("orders"."createdAt", 'YYYY-MM-DD') AS "total_createdAt", "EcommerceUserSegment"."segmentId", SUM("orders"."total") AS "total"
      FROM "EcommerceUserSegments" AS "EcommerceUserSegment"
      INNER JOIN "EcommerceOrders" AS "orders" ON "EcommerceUserSegment"."userId" = "orders"."userId"
      AND ("orders"."deletedAt" IS NULL AND ("orders"."ecommerceConnectId" = :ecommerceConnectId AND ("orders"."createdAt" >= :startDate AND "orders"."createdAt" <= :endDate)))
      WHERE "EcommerceUserSegment"."ecommerceConnectId" = :ecommerceConnectId storeOptions
      GROUP BY "total_createdAt", "EcommerceUserSegment"."segmentId"
    ) AS total_query ON cost_query."cost_createdAt" = total_query."total_createdAt" AND cost_query."segmentId" = total_query."segmentId"
    GROUP BY cost_query."cost_createdAt", cost_query."segmentId", total_query."total"
    ORDER BY cost_query."cost_createdAt" ASC;
    `;

    const storeOptionsRegExp = new RegExp('storeOptions', 'g');

    if (Object.keys(additionalArgs).length > 0) {
      if (additionalArgs.ecommerceStoreId) {
        selectQuery = selectQuery.replace(
          storeOptionsRegExp,
          `and "orders"."ecommerceStoreId" IN (${additionalArgs.ecommerceStoreId[Op.in].map(Number)})`
        );
      }
    }
    selectQuery = selectQuery.replace(storeOptionsRegExp, '');

    const results = await this.tenantInstance.connection.query(selectQuery, {
      type: QueryTypes.SELECT,
      replacements: {
        ecommerceConnectId,
        startDate: startDate.toUTCString(),
        endDate: endDate.toUTCString(),
      },
    });
    const mappedNames = segments.reduce((acc, segment) => {
      acc[segment.id] = segment.name;
      return acc;
    }, {});
    const roiBySegment = segments.reduce((acc, segment) => {
      acc[segment.name] = [];
      return acc;
    }, {});
    results.forEach((segmentByOrder: { roi: number; segmentId: number; cost_createdAt: string }) => {
      roiBySegment[mappedNames[segmentByOrder.segmentId]].push({
        total: segmentByOrder.roi,
        createdAt: segmentByOrder.cost_createdAt,
      });
    });

    return roiBySegment;
  }

  async storeInventoryRotation({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }): Promise<number> {
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
          [Op.gt]: 0,
        },
      },
      raw: true,
    });

    const totalItemsCost = await utils.calculateStoreCosts({
      tenantInstance: this.tenantInstance,
      startDate,
      endDate,
      ecommerceConnectId,
      additionalArgs,
    });
    if (totalItemsCost > 0 && totalStock > 0) {
      return totalItemsCost / totalStock;
    } else {
      return 0;
    }
  }

  async storeDiscountRate({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }): Promise<number> {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);
    const ecommerceOrderItemRepository = this.tenantInstance.connection.getRepository(EcommerceOrderItem);
    const ecommerceProductRepository = this.tenantInstance.connection.getRepository(EcommerceProduct);

    let storeOptions = {};
    if (Object.keys(additionalArgs).length > 0) {
      if (additionalArgs.ecommerceStoreId) {
        storeOptions = {
          ecommerceStoreId: additionalArgs.ecommerceStoreId[Op.in].map(Number),
        };
      }
    }

    const products: any = await ecommerceOrderRepository.findOne({
      attributes: [],
      where: {
        ...storeOptions,
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      include: [
        {
          model: ecommerceOrderItemRepository,
          attributes: [[Sequelize.literal('AVG("orderItems->product"."discount")'), 'discountRate']],
          where: {
            ecommerceConnectId,
          },
          include: [
            {
              model: ecommerceProductRepository,
              attributes: [],
              where: {
                ecommerceConnectId,
              },
            },
          ],
        },
      ],
      raw: true,
      subQuery: false,
    });
    return products['orderItems.discountRate'] || 0;
  }

  async storeProductReturnRate({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }): Promise<number> {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);
    const ecommerceOrderItemRepository = this.tenantInstance.connection.getRepository(EcommerceOrderItem);

    let storeOptions = {};
    if (Object.keys(additionalArgs).length > 0) {
      if (additionalArgs.ecommerceStoreId) {
        storeOptions = {
          ecommerceStoreId: additionalArgs.ecommerceStoreId[Op.in].map(Number),
        };
      }
    }
    const quantities: any = await ecommerceOrderRepository.findOne({
      attributes: [],
      where: {
        ...storeOptions,
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      include: [
        {
          model: ecommerceOrderItemRepository,
          attributes: [
            [
              Sequelize.literal('SUM(CASE WHEN "orderItems"."quantity" > 0 THEN "orderItems"."quantity" ELSE 0 END)'),
              'quantityPositive',
            ],
            [
              Sequelize.literal('SUM(CASE WHEN "orderItems"."quantity" < 0 THEN "orderItems"."quantity" ELSE 0 END)'),
              'quantityNegative',
            ],
          ],
          where: {
            ecommerceConnectId,
          },
        },
      ],
      subQuery: false,
      raw: true,
    });
    const returnedProducts = Math.abs(quantities['orderItems.quantityNegative']) || 0;
    const soldProducts = Math.abs(quantities['orderItems.quantityPositive']) || 0;
    if (returnedProducts === 0 || soldProducts === 0) return 0;
    return (returnedProducts / soldProducts) * 100;
  }

  async storeTotalCost({
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
    const ecommerceSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceSegment);
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);
    const ecommerceUserSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceUserSegment);
    const ecommerceOrderItemRepository = this.tenantInstance.connection.getRepository(EcommerceOrderItem);
    const ecommerceProductRepository = this.tenantInstance.connection.getRepository(EcommerceProduct);

    const segments = await ecommerceSegmentRepository.findAll({ attributes: ['id', 'name'], raw: true });
    const totalCost = await ecommerceOrderRepository.findAll({
      attributes: [],
      where: {
        ecommerceConnectId,
        ...additionalArgs,
        total: {
          [Op.gt]: 0,
        },
        orderId: {
          [Op.ne]: null,
        },
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      include: [
        {
          model: ecommerceUserSegmentRepository,
          attributes: ['segmentId'],
          where: {
            ecommerceConnectId,
          },
          include: [
            {
              model: ecommerceSegmentRepository,
              attributes: ['name'],
            },
          ],
        },
        {
          model: ecommerceOrderItemRepository,
          attributes: [[Sequelize.literal('SUM("orderItems"."quantity" * "orderItems->product"."cost")'), 'totalCost']],
          where: {
            ecommerceConnectId,
            quantity: {
              [Op.gt]: 0,
            },
          },
          include: [
            {
              model: ecommerceProductRepository,
              attributes: [],
              where: {
                ecommerceConnectId,
                cost: {
                  [Op.gt]: 0,
                },
              },
            },
          ],
        },
      ],
      group: ['"userSegment"."segmentId"', '"userSegment"->segment.id'],
      raw: true,
      subQuery: false,
    });
    const salesBySegment = segments.reduce((acc, segment) => {
      acc[segment.name] = 0;
      return acc;
    }, {});

    totalCost.forEach(orders => {
      salesBySegment[orders['userSegment.segment.name']] += orders['orderItems.totalCost'];
    });
    return salesBySegment;
  }

  async storeOrdersTotal({
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

    const ordersTotal: number = await ecommerceOrderRepository.sum('total', {
      ...additionalArgs,
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });

    return ordersTotal;
  }
}

export default EcommerceFinance;

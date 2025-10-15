import { EcommerceCart } from '@models/company/ecommerceCart.entity';
import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';
import { EcommerceOrderItem } from '@models/company/ecommerceOrderItem.entity';
import { EcommercePageViews } from '@models/company/ecommercePageViews.entity';
import { EcommerceProduct } from '@models/company/ecommerceProduct.entity';
import { EcommerceUser } from '@models/company/ecommerceUser.entity';
import { EcommercePageReview } from '@models/company/ecommercePageReview.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Op, QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { validateDates } from '@utils/date';
import { getGAMetric } from '@lib/gAnalytics';
import { TenantInstance, TENANT_CONNECTION } from '../../../modules/tenant/tenant.module';
import { EcommerceCredential } from '../../../models/company/ecommerceCredential.entity';
import { EcommerceUserSegment } from '@models/company/ecommerceUserSegment.entity';
import { EcommerceSegment } from '@models/company/ecommerceSegment.entity';

interface Marketing {
  abandonedCart: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;
  conversionRate: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;
  bounceRate: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;
  referredTrafficPercentage: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;
  storeConversionRate: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;
  storeSupplyChainEfficiency: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<{ [key: string]: Array<any> }>;
  storeStockDepletionRate: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeOrdersByClient: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeClientsCount: ({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }) => Promise<number>;

  storeOrdersCount: ({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }) => Promise<number>;

  storeNewClientsTotal: ({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }) => Promise<number>;

  storeRecurringClientsTotal({
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }): Promise<number>;

  gaUsers({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }): Promise<number>;

  gaSessions({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  });

  gaSessionsPerReferral({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  });

  gaSalesPerUsers({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  });
}

@Injectable()
class EcommerceMarketing implements Marketing {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantInstance: TenantInstance
  ) {}

  async abandonedCart({
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
    const ecommerceCartRepository = this.tenantInstance.connection.getRepository(EcommerceCart);
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);

    const carts: EcommerceCart[] = await ecommerceCartRepository.findAll<EcommerceCart>({
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      include: [
        {
          model: ecommerceOrderRepository,
        },
      ],
    });

    const cartWithoutOrder = carts.filter(cart => cart.order === null);

    if (cartWithoutOrder.length > 0 && carts.length > 0) {
      const abandonedPercentage = (cartWithoutOrder.length / carts.length) * 100;
      return abandonedPercentage;
    } else {
      return 0;
    }
  }

  async conversionRate({
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
    const ecommercePageViewsRepository = this.tenantInstance.connection.getRepository(EcommercePageViews);

    const orderCount = await ecommerceOrderRepository.count({
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });

    const sessions = await ecommercePageViewsRepository.findAndCountAll<EcommercePageViews>({
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('visitorId')), 'visitorId']],
      group: ['visitorId'],
    });

    if (sessions.count.length === 0) {
      return 0;
    }

    const conversionRate = (orderCount / sessions.count.length) * 100;
    return conversionRate;
  }

  async visitorToCustomerConversionRate({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }): Promise<number> {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }

    const ecommercePageViewsRepository = this.tenantInstance.connection.getRepository(EcommercePageViews);
    const ecommerceUserRepository = this.tenantInstance.connection.getRepository(EcommerceUser);

    const sessions = await ecommercePageViewsRepository.findAll<EcommercePageViews>({
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('visitorId')), 'visitorId']],
      group: ['visitorId'],
    });

    const uniqueVisitorsCount = sessions.length;

    const registeredCustomersCount = await ecommerceUserRepository.count({
      where: {
        ecommerceConnectId,
        visitorId: {
          [Op.in]: sessions.map(session => session.getDataValue('visitorId')),
        },
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      distinct: true,
      col: 'visitorId',
    });

    if (uniqueVisitorsCount === 0) {
      return 0;
    }

    const conversionRate = (registeredCustomersCount / uniqueVisitorsCount) * 100;
    return conversionRate;
  }

  async uniqueVisitors({
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

    const ecommercePageViewsRepository = this.tenantInstance.connection.getRepository(EcommercePageViews);

    const uniqueVisitorsData = await ecommercePageViewsRepository.findAndCountAll<EcommercePageViews>({
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('visitorId')), 'visitorId']],
      group: ['visitorId'],
    });

    return uniqueVisitorsData.count.length;
  }

  async satisfactoryRate({
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
    const ecommercePageReviewRepository = this.tenantInstance.connection.getRepository(EcommercePageReview);

    const allPageReviews = await ecommercePageReviewRepository.count<EcommercePageReview>({
      where: {
        ecommerceConnectId,
      },
    });

    const positiveRatedPage = await ecommercePageReviewRepository.count<EcommercePageReview>({
      where: {
        ecommerceConnectId,
        rate: {
          [Op.gte]: 4,
        },
      },
    });

    if (positiveRatedPage > 0 && allPageReviews > 0) {
      return (positiveRatedPage / allPageReviews) * 100;
    } else {
      return 0;
    }
  }

  async totalVisitors({
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

    const ecommercePageViewsRepository = this.tenantInstance.connection.getRepository(EcommercePageViews);

    const totalVisitorsCount = await ecommercePageViewsRepository.count<EcommercePageViews>({
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });
    return totalVisitorsCount;
  }

  async bounceRate({
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

    const ecommercePageViewsRepository = this.tenantInstance.connection.getRepository(EcommercePageViews);

    const sessions = await ecommercePageViewsRepository.findAll({
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      attributes: ['visitorId', 'page'],
    });

    const visitorSessions = new Map<string, number>();
    sessions.forEach(session => {
      visitorSessions.set(session.visitorId, (visitorSessions.get(session.visitorId) || 0) + 1);
    });

    const singlePageVisits = Array.from(visitorSessions.values()).filter(visitCount => visitCount === 1).length;
    const uniqueVisitors = visitorSessions.size;

    return uniqueVisitors === 0 ? 0 : (singlePageVisits / uniqueVisitors) * 100;
  }

  async referredTrafficPercentage({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }): Promise<number> {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }

    const ecommercePageViewsRepository = this.tenantInstance.connection.getRepository(EcommercePageViews);

    const totalPageViewsCount = await ecommercePageViewsRepository.count<EcommercePageViews>({
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });

    const referredPageViewsCount = await ecommercePageViewsRepository.count<EcommercePageViews>({
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        referer: {
          [Op.ne]: null,
          [Op.ne]: '',
        },
      },
    });

    if (totalPageViewsCount === 0) {
      return 0;
    }

    const referredTrafficPercentage = (referredPageViewsCount / totalPageViewsCount) * 100;
    return referredTrafficPercentage;
  }
  async storeConversionRate({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }): Promise<number> {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }

    return 0 * ecommerceConnectId;
  }
  async storeSupplyChainEfficiency({
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

    let storeOptions = {};
    if (Object.keys(additionalArgs).length > 0) {
      if (additionalArgs.ecommerceStoreId) {
        storeOptions = {
          ecommerceStoreId: additionalArgs.ecommerceStoreId[Op.in].map(Number),
        };
      }
    }
    const ecommerceSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceSegment);
    const ecommerceUserSegmentRepository = this.tenantInstance.connection.getRepository(EcommerceUserSegment);
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);
    const ecommerceOrderItemRepository = this.tenantInstance.connection.getRepository(EcommerceOrderItem);
    const ecommerceProductRepository = this.tenantInstance.connection.getRepository(EcommerceProduct);

    const segments = await ecommerceSegmentRepository.findAll({ attributes: ['id', 'name'], raw: true });
    const segmentByOrders: any = await ecommerceUserSegmentRepository.findAll({
      attributes: [
        'segmentId',
        [Sequelize.fn('to_char', Sequelize.col('"orders"."createdAt"'), 'YYYY-MM-DD'), 'order_created_at'],
        [
          Sequelize.literal('AVG(("orders->orderItems->product"."createdAt"::date - "orders"."createdAt"::date))'),
          'avg_order_processing_time',
        ],
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
            createdAt: {
              [Op.gte]: startDate,
              [Op.lte]: endDate,
            },
            ...storeOptions,
          },
          include: [
            {
              model: ecommerceOrderItemRepository,
              attributes: [],
              required: true,
              where: {
                ecommerceConnectId,
              },
              include: [
                {
                  model: ecommerceProductRepository,
                  attributes: [],
                  required: true,
                  where: {
                    ecommerceConnectId,
                  },
                },
              ],
            },
          ],
        },
      ],
      group: ['segmentId', 'order_created_at'],
      order: [[Sequelize.col('order_created_at'), 'ASC']],
      raw: true,
    });
    const mappedNames = segments.reduce((acc, segment) => {
      acc[segment.id] = segment.name;
      return acc;
    }, {});
    const salesBySegment = segments.reduce((acc, segment) => {
      acc[segment.name] = [];
      return acc;
    }, {});
    segmentByOrders.forEach(segmentByOrder => {
      salesBySegment[mappedNames[segmentByOrder.segmentId]].push({
        total: segmentByOrder.avg_order_processing_time,
        createdAt: segmentByOrder.order_created_at,
      });
    });
    return salesBySegment;
  }

  async storeStockDepletionRate({
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

    let storeOptions = {};
    if (Object.keys(additionalArgs).length > 0) {
      if (additionalArgs.ecommerceStoreId) {
        storeOptions = {
          ecommerceStoreId: additionalArgs.ecommerceStoreId[Op.in].map(Number),
        };
      }
    }

    const stocks: any = await this.tenantInstance.connection.models.EcommerceProduct.findOne({
      attributes: [
        [
          Sequelize.literal('SUM(CASE WHEN "EcommerceProduct"."stock" > 0 THEN "EcommerceProduct"."stock" ELSE 0 END)'),
          'productsWithStock',
        ],
        [Sequelize.literal('SUM(CASE WHEN "EcommerceProduct"."stock" <= 0 THEN 1 ELSE 0 END)'), 'productsWithoutStock'],
      ],
      where: {
        ecommerceConnectId,
        ...storeOptions,
      },
      raw: true,
    });

    const productsWithStock = stocks?.productsWithStock || 0;
    const productsWithoutStock = stocks?.productsWithoutStock || 0;

    if (productsWithStock !== 0 && productsWithoutStock !== 0) {
      return (productsWithoutStock / productsWithStock) * 100;
    }
    return 0;
  }

  async storeOrdersByClient({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }): Promise<number> {
    const error = await validateDates(startDate, endDate);
    if (error) {
      throw error;
    }

    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);

    const ordersCount = await ecommerceOrderRepository.count<EcommerceOrder>({
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      distinct: true,
      col: 'userId',
    });

    return ordersCount;
  }

  async storeOrdersCount({
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

    const ordersCount = await ecommerceOrderRepository.count({
      where: {
        ecommerceConnectId,
        ...additionalArgs,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      col: 'id',
    });
    return ordersCount;
  }

  async storeClientsCount({
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
    const recurringClients = await this.storeRecurringClientsTotal({
      startDate,
      endDate,
      ecommerceConnectId,
      additionalArgs,
    });
    const newClients = await this.storeNewClientsTotal({ startDate, endDate, ecommerceConnectId, additionalArgs });

    return recurringClients + newClients;
  }

  async storeNewClientsTotal({
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
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);
    let selectQuery = `
      select
        DISTINCT("e"."userId") as users
      from
        "EcommerceOrders" as "e"
      where
        "e"."ecommerceConnectId" = :ecommerceConnectId AND
        "createdAt" >= :startDate AND
        "createdAt" <= :endDate AND
        "e"."deletedAt" IS NULL AND
        "e"."userId" not in (
          select
            "e"."userId"
          from
            "EcommerceOrders" as "e"
          where
            "e"."ecommerceConnectId" = :ecommerceConnectId AND
            "createdAt" < :startDate AND
            "e"."deletedAt" IS NULL
            storeOptions
          group by "e"."userId"
        )
        storeOptions
    `;
    const storeOptionsRegExp = new RegExp('storeOptions', 'g');

    if (Object.keys(additionalArgs).length > 0) {
      if (additionalArgs.ecommerceStoreId) {
        selectQuery = selectQuery.replace(
          storeOptionsRegExp,
          `and "e"."ecommerceStoreId" IN (${additionalArgs.ecommerceStoreId[Op.in].map(Number)})`
        );
      }
    }
    selectQuery = selectQuery.replace(storeOptionsRegExp, '');

    const newClients = await ecommerceOrderRepository.sequelize.query(selectQuery, {
      type: QueryTypes.SELECT,
      replacements: {
        ecommerceConnectId,
        startDate: startDate.toUTCString(),
        endDate: endDate.toUTCString(),
      },
    });
    return newClients.length;
  }

  async storeRecurringClientsTotal({
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
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);
    let selectQuery = `
      select
        DISTINCT("e"."userId") as users
      from
        "EcommerceOrders" as "e"
      where
        "e"."ecommerceConnectId" = :ecommerceConnectId AND
        "createdAt" >= :startDate AND
        "createdAt" <= :endDate AND
        "e"."deletedAt" IS NULL AND
        "e"."userId" in (
          select
            "e"."userId"
          from
            "EcommerceOrders" as "e"
          where
            "e"."ecommerceConnectId" = :ecommerceConnectId AND
            "createdAt" < :startDate AND
            "e"."deletedAt" IS NULL
            storeOptions
          group by "e"."userId"
        )
        storeOptions
    `;

    const storeOptionsRegExp = new RegExp('storeOptions', 'g');

    if (Object.keys(additionalArgs).length > 0) {
      if (additionalArgs.ecommerceStoreId) {
        selectQuery = selectQuery.replace(
          storeOptionsRegExp,
          `and "e"."ecommerceStoreId" IN (${additionalArgs.ecommerceStoreId[Op.in].map(Number)})`
        );
      }
    }
    selectQuery = selectQuery.replace(storeOptionsRegExp, '');

    const recurringClients = await ecommerceOrderRepository.sequelize.query(selectQuery, {
      type: QueryTypes.SELECT,
      replacements: {
        ecommerceConnectId,
        startDate: startDate.toUTCString(),
        endDate: endDate.toUTCString(),
      },
    });
    return recurringClients.length;
  }

  async gaUsers({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }): Promise<number> {
    // activeUsers: The number of distinct users who visited your site or app.
    const parameters = {
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    };

    const ecommerceCredentialRepository = this.tenantInstance.connection.getRepository(EcommerceCredential);

    return getGAMetric(ecommerceConnectId, startDate, endDate, parameters, ecommerceCredentialRepository);
  }

  async gaSessions({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }): Promise<number> {
    // sessions: The number of sessions that began on your site or app (event triggered: session_start).
    const parameters = {
      metrics: [
        {
          name: 'sessions',
        },
      ],
    };

    const ecommerceCredentialRepository = this.tenantInstance.connection.getRepository(EcommerceCredential);

    return getGAMetric(ecommerceConnectId, startDate, endDate, parameters, ecommerceCredentialRepository);
  }

  async gaSessionsPerReferral({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }): Promise<number> {
    // sessionDefaultChannelGroup: Select 'sessions' by 'Referral' channel
    const parameters = {
      metrics: [
        {
          name: 'sessions',
        },
      ],
      dimensions: [
        {
          name: 'sessionDefaultChannelGroup',
        },
      ],
    };

    const ecommerceCredentialRepository = this.tenantInstance.connection.getRepository(EcommerceCredential);

    return getGAMetric(ecommerceConnectId, startDate, endDate, parameters, ecommerceCredentialRepository);
  }

  async gaSalesPerUsers({
    startDate,
    endDate,
    ecommerceConnectId,
  }: {
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
  }): Promise<number> {
    const ecommerceOrderRepository = this.tenantInstance.connection.getRepository(EcommerceOrder);
    const ecommerceUserRepository = this.tenantInstance.connection.getRepository(EcommerceUser);

    const recurringClients = await ecommerceOrderRepository.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('visitorId')), 'visitorId']],
      where: {
        ecommerceConnectId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      include: [
        {
          required: true,
          attributes: [],
          model: ecommerceUserRepository,
        },
      ],
      having: Sequelize.where(Sequelize.fn('COUNT', 'EcommerceOrder.id'), {
        [Op.gt]: 0,
      }),
      group: 'visitorId',
      raw: true,
    });
    const buyers = recurringClients.length;

    // activeUsers: The number of distinct users who have logged at least one event,
    // regardless of whether the site or app was in use when that event was logged.
    const parameters = {
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
    };

    const ecommerceCredentialRepository = this.tenantInstance.connection.getRepository(EcommerceCredential);

    const GAUsers = await getGAMetric(
      ecommerceConnectId,
      startDate,
      endDate,
      parameters,
      ecommerceCredentialRepository
    );

    if (GAUsers !== 0 && buyers !== 0) {
      return Math.round(GAUsers / buyers);
    }
    return 0;
  }
}

export default EcommerceMarketing;

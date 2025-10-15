import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';
import { EcommerceOrderItem } from '@models/company/ecommerceOrderItem.entity';
import { EcommerceProduct } from '@models/company/ecommerceProduct.entity';
import { TenantInstance } from '@modules/tenant/tenant.module';
import { Op, Sequelize } from 'sequelize';

const Utils = {
  calculateStoreCosts: async ({
    tenantInstance,
    startDate,
    endDate,
    ecommerceConnectId,
    additionalArgs,
  }: {
    tenantInstance: TenantInstance;
    startDate: Date;
    endDate: Date;
    ecommerceConnectId: number;
    additionalArgs: any;
  }) => {
    const ecommerceOrderRepository = tenantInstance.connection.getRepository(EcommerceOrder);
    const ecommerceOrderItemRepository = tenantInstance.connection.getRepository(EcommerceOrderItem);
    const eccommerceProductRepository = tenantInstance.connection.getRepository(EcommerceProduct);

    const orderItems: any = await ecommerceOrderRepository.findOne({
      attributes: [],
      where: {
        ecommerceConnectId,
        ...additionalArgs,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      include: [
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
              model: eccommerceProductRepository,
              required: true,
              attributes: [],
              where: {
                cost: {
                  [Op.gt]: 0,
                },
                ecommerceConnectId,
              },
            },
          ],
        },
      ],
      raw: true,
      subQuery: false,
    });

    let totalItemsCost = 0;
    if (orderItems['orderItems.totalCost']) {
      totalItemsCost = orderItems['orderItems.totalCost'];
    }

    return totalItemsCost;
  },
};

export default Utils;

import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { getConnection, SequelizeInstance } from '../modules/tenant/tenant.module';
import { buildOrderItem, buildProduct, buildVtexConnection, saveOrder, saveUser, vtex } from '@utils/vtex';
import {
  GET_ORDER,
  GET_PRODUCT,
  GET_USER_EMAIL,
  OrderDetailRoot,
  OrdersRoot,
  fetchCategoryTree,
  fetchBrands,
  updateProductsAll,
} from '@lib/vtex';
import { Op } from 'sequelize';
import { EcommerceUser } from '@models/company/ecommerceUser.entity';

@Processor('updateOrders')
export class UpdateOrdersConsumer {
  @Process({
    concurrency: 10,
  })
  async updateOrders(
    job: Job<{
      baseUrl: string;
      url: string;
      appKey: string;
      appToken: string;
      ecommerceConnectId: number;
      database: string;
    }>
  ) {
    let sequelize: SequelizeInstance | null = null;
    const { appKey, appToken, baseUrl, url, ecommerceConnectId, database } = job.data;
    try {
      // We want a clean connection, not one from the cache because nestjs can close it after a request has been processed
      sequelize = await getConnection({ database });
      const vtexConnection = buildVtexConnection({
        baseUrl,
        appKey,
        appToken,
      });
      const orders: OrdersRoot = await vtex(url, vtexConnection);
      console.log('datablase', database);
      // departments
      await fetchCategoryTree(sequelize, vtexConnection, ecommerceConnectId);
      // brands
      await fetchBrands(sequelize, vtexConnection, ecommerceConnectId);
      // update products
      await updateProductsAll(sequelize, vtexConnection, ecommerceConnectId);

      // for list of orders
      for (const item of orders.list) {
        try {
          const orderDetail: OrderDetailRoot = await vtex(`${GET_ORDER}/${item.orderId}`, vtexConnection);
          // find products in database
          const productsInDatabase = await sequelize.models.EcommerceProduct.findAll({
            where: {
              productId: {
                [Op.in]: orderDetail.items.map(product => product.productId),
              },
              ecommerceConnectId,
            },
          });
          const productsToSave = [];
          orderDetail.items.forEach(async product => {
            const productData = buildProduct(product, ecommerceConnectId);
            const productInDatabase = productsInDatabase.find(p => p.productId === productData.productId);
            const productInLocal = productsToSave.find(p => p.productId === productData.productId);
            if (!productInDatabase && !productInLocal) {
              productsToSave.push(productData);
            }
          });

          const productPromises = productsToSave.map(async product => {
            const reqProduct = await vtex(`${GET_PRODUCT}/${product.productId}`, vtexConnection);

            const searchCategory = await sequelize.models.EcommerceCategoryTree.findOne({
              where: {
                id: reqProduct.CategoryId,
              },
            });

            const searchBrand = await sequelize.models.EcommerceBrand.findOne({
              where: {
                id: reqProduct.BrandId,
              },
            });

            product.sku = product.sku;
            product.price = product.price;
            product.cost = product.cost;
            product.ecommerceBrandId = searchBrand ? searchBrand.id : null;
            product.ecommerceCategoryTreesId = searchCategory ? searchCategory.id : null;

            return product;
          });

          const saveProduct = await Promise.all(productPromises);
          const productsUpdates = await sequelize.models.EcommerceProduct.bulkCreate(saveProduct, {
            updateOnDuplicate: ['name', 'ecommerceBrandId', 'ecommerceCategoryTreesId'],
          });

          // get user from vtex
          const userId = orderDetail?.clientProfileData?.userProfileId;

          const [vtexUser] = await vtex(`${GET_USER_EMAIL}&_where=userId=${userId}`, vtexConnection);
          // save user
          const user: EcommerceUser = await saveUser(orderDetail, vtexUser, sequelize, database, ecommerceConnectId);
          // save order
          const order = await saveOrder(orderDetail, sequelize, database, ecommerceConnectId, user.id);
          // save orderItems only once
          const orderItemsCount = await sequelize.models.EcommerceOrderItem.count({
            where: {
              orderId: order.id,
              ecommerceConnectId,
            },
          });
          if (orderItemsCount == 0) {
            const orderItems = orderDetail.items.map(product => {
              const productData = buildProduct(product, ecommerceConnectId);
              const productInDatabase = [...productsInDatabase, ...productsUpdates].find(
                p => p.productId === productData.productId
              );
              return buildOrderItem(product, ecommerceConnectId, order.id, productInDatabase.id);
            });
            await sequelize.models.EcommerceOrderItem.bulkCreate(orderItems);
          }
        } catch (error) {
          console.error('there was an error processing order', item.orderId, error);
        }
      }

      console.log('finished processing orders for', url);
      await sequelize.close();
    } catch (error) {
      console.log('there was an error processing orders for', {
        url,
        database,
        ecommerceConnectId,
        error,
      });
      if (sequelize) {
        await sequelize.close();
      }
      throw error;
    }
  }
}

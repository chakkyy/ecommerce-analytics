import { Op, Sequelize } from 'sequelize';
import BaseTemplate from './baseTemplate';
import { EcommerceProduct } from '@models/company/ecommerceProduct.entity';
import { EcommerceUser } from '@models/company/ecommerceUser.entity';
import { EcommerceOrderItem } from '@models/company/ecommerceOrderItem.entity';
import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';

const DEFAULT_STATE_FOR_STORE_ORDERS = 'invoiced';
interface CsvData {
  ID_Venta: string;
  ID_Producto: string;
  Q_Producto: string;
  ID_Tienda: string;
  Precio_Ticket: string;
  Fecha_Venta: string;
  ID_Cliente: string;
  Costo_Envio: string;
}
const composeKey = (id: string, userId: number, storeId = 0) => `${id}-${userId}-${storeId}`;

class SalesTemplate extends BaseTemplate<CsvData> {
  constructor(sequelize: Sequelize, ecommerceConnectId: number, csv: any) {
    super(sequelize, ecommerceConnectId, csv);
    this.setHeaders([
      'ID_Venta',
      'ID_Producto',
      'Q_Producto',
      'ID_Tienda',
      'Precio_Ticket',
      'Fecha_Venta',
      'ID_Cliente',
      'Costo_Envio',
    ]);
  }

  orders: Record<string, Partial<EcommerceOrder>> = {};
  products: Partial<EcommerceProduct>[] = [];

  protected findProductId(productId: string): number | null {
    return this.products.find(product => product.productId === productId)?.id || null;
  }

  protected toEntity(data: CsvData): Partial<EcommerceOrder> | null {
    const ecommerceStoreId = this.findStoreId(data.ID_Tienda);
    const productId = this.findProductId(data.ID_Producto);
    const userId = this.findUserId(data.ID_Cliente);
    const createdAt = this.parseDate(data.Fecha_Venta);
    const orderId = this.parseString(data.ID_Venta, {});
    const identifier = composeKey(orderId, userId, ecommerceStoreId);

    if (!userId) {
      console.log(`Skipping ID_Venta ${data.ID_Venta}, no user found for id ${data.ID_Cliente}`);
      return null;
    }

    if (!productId) {
      console.log(`Skipping ID_Venta ${data.ID_Venta}, no product found for id ${data.ID_Producto}`);
      return null;
    }

    if (!ecommerceStoreId) {
      console.log(`Skipping ID_Venta ${data.ID_Venta}, no store found for id ${data.ID_Tienda}`);
      return null;
    }

    if (!createdAt) {
      console.log(`Skipping ID_Venta ${data.ID_Venta}, no valid Fecha_Venta ${data.Fecha_Venta}`);
      return null;
    }

    let total = this.parseNumber(data.Precio_Ticket, 'float', 0);
    let shippingCost = this.parseNumber(data.Costo_Envio, 'float', 0);
    const orderItems: Pick<EcommerceOrderItem, 'quantity' | 'price' | 'ecommerceConnectId' | 'productId'>[] =
      this.orders[identifier]?.orderItems || [];

    orderItems.push({
      quantity: this.parseNumber(data.Q_Producto, 'int', 0),
      price: total,
      ecommerceConnectId: this.ecommerceConnectId,
      productId,
    });

    const order = this.orders[identifier];

    if (order) {
      total = order.total + total;
      shippingCost = order.shippingCost + shippingCost;
    }

    return {
      orderId: this.parseString(data.ID_Venta),
      createdAt,
      userId,
      total,
      shippingCost,
      ecommerceConnectId: this.ecommerceConnectId,
      ecommerceStoreId: order?.ecommerceStoreId || ecommerceStoreId, // TODO: ecommerceStoreId change even if the order is the same
      status: DEFAULT_STATE_FOR_STORE_ORDERS,
      orderItems: orderItems as EcommerceOrderItem[],
    };
  }

  async parse(): Promise<this> {
    await this.setStores();
    return super.parse();
  }

  // If this gets a common patter we can move it to the base class
  setOrder(order?: Partial<EcommerceOrder>) {
    const identifier = composeKey(order?.orderId, order?.userId, order?.ecommerceStoreId);
    if (!order) {
      return;
    }
    this.orders[identifier] = order;
  }

  protected async setProducts() {
    const productsIds = [...new Set(this.parsedResults.data.map(order => order.ID_Producto))];

    this.products = (await this.sequelize.models.EcommerceProduct.findAll({
      attributes: ['id', 'productId'],
      where: {
        ecommerceConnectId: this.ecommerceConnectId,
        productId: {
          [Op.in]: productsIds,
        },
      },
      raw: true,
    })) as EcommerceProduct[];
  }

  protected async setUsers() {
    const usersIds = [...new Set(this.parsedResults.data.map(order => order.ID_Cliente))];
    const usersFound = (await this.sequelize.models.EcommerceUser.findAll({
      attributes: ['id', 'visitorId'],
      where: {
        ecommerceConnectId: this.ecommerceConnectId,
        visitorId: {
          [Op.in]: usersIds,
        },
      },
      raw: true,
    })) as EcommerceUser[];
    const notFoundUsers = usersIds.filter(userId => !usersFound.find(user => user.visitorId === userId));
    const newUsers = (await this.sequelize.models.EcommerceUser.bulkCreate(
      notFoundUsers.map(userId => ({
        visitorId: userId,
        ecommerceConnectId: this.ecommerceConnectId,
      })),
      {
        updateOnDuplicate: ['visitorId'],
        conflictAttributes: ['id'],
      }
    )) as EcommerceUser[];

    this.users = [...usersFound, ...newUsers];
  }

  cleanOrders() {
    this.orders = {};
  }

  cleanProducts() {
    this.products = [];
  }

  protected async insert() {
    await this.setProducts();
    await this.setUsers();
    this.parsedResults.data.forEach(item => {
      const newItem = this.toEntity(item);
      this.setOrder(newItem);
    });
    const existingOrders = (await this.sequelize.models.EcommerceOrder.findAll({
      where: {
        ecommerceConnectId: this.ecommerceConnectId,
        orderId: {
          [Op.in]: Object.values(this.orders).map(order => order.orderId),
        },
      },
    })) as EcommerceOrder[];

    const { newOrders, newOrderItems, updatedOrders } = Object.entries(this.orders).reduce<{
      newOrders: Partial<EcommerceOrder>[];
      newOrderItems: Partial<EcommerceOrderItem>[];
      updatedOrders: Partial<EcommerceOrder>[];
    }>(
      (acc, [key, value]) => {
        const [orderId, userId, storeId] = key.split('-');
        const order = existingOrders.find(
          order =>
            order.orderId === orderId && order.userId === Number(userId) && order.ecommerceStoreId === Number(storeId)
        );
        // NOTE: If order already exists we don't need to add it again
        if (order) {
          let orderIndex = acc.updatedOrders.findIndex(order => order.id === order.id);
          value.orderItems.forEach(orderItem => {
            // find order in updatedOrders and update it
            if (orderIndex >= 0) {
              acc.updatedOrders[orderIndex].total = order.total + orderItem.price;
            } else {
              const newIndex = acc.updatedOrders.push({
                id: order.id,
                orderId: order.orderId,
                total: order.total + orderItem.price,
              });
              orderIndex = newIndex - 1;
            }
            acc.newOrderItems.push({ ...orderItem, orderId: order.id });
          });
        }

        if (!order?.id) {
          acc.newOrders.push(value);
        }
        return acc;
      },
      {
        newOrders: [],
        newOrderItems: [],
        updatedOrders: [],
      }
    );
    try {
      await this.sequelize.transaction(async transaction => {
        // NOTE: This code first creates new orders along with their order items,
        // then updates the total and cost of existing orders,
        // and finally creates new order items to avoid losing the previous order items.
        await Promise.all([
          this.sequelize.models.EcommerceOrder.bulkCreate(newOrders, {
            transaction,
            include: [
              {
                model: this.sequelize.models.EcommerceOrderItem,
                as: 'orderItems',
              },
            ],
          }),
          this.sequelize.models.EcommerceOrder.bulkCreate(updatedOrders, {
            transaction,
            updateOnDuplicate: ['total'],
            conflictAttributes: ['id'],
          }),
          this.sequelize.models.EcommerceOrderItem.bulkCreate(newOrderItems, {
            transaction,
          }),
        ]);
      });

      this.cleanOrders();
      this.cleanProducts();
      this.cleanUsers();
    } catch (error) {
      console.error(error);
    }
  }
}

export default SalesTemplate;

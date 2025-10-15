import axios from 'axios';
import axiosRetry from 'axios-retry';
import { EcommerceConnect } from '@models/company/ecommerceConnect.entity';
import { EcommerceCredential } from '@models/company/ecommerceCredential.entity';
import { format, subDays } from 'date-fns';
import { Sequelize } from 'sequelize';
import { Item, OrderDetailRoot } from '@lib/vtex';
import { EcommerceProduct } from '@models/company/ecommerceProduct.entity';
import { EcommerceOrderItem } from '@models/company/ecommerceOrderItem.entity';
import { EcommerceUser } from '@models/company/ecommerceUser.entity';
import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';

export const getCredentials = (ecommerceConnect: EcommerceConnect) => {
  let url = '';
  let public_key = '';
  let private_key = '';
  const strategy = ecommerceConnect.strategy;
  const ecommerceCredentials = ecommerceConnect.ecommerceCredentials;
  if (strategy === 'vtex') {
    ecommerceCredentials.forEach((ecommerceCredential: EcommerceCredential) => {
      if (ecommerceCredential.keyType === 'url') {
        url = ecommerceCredential.keyValue;
      } else if (ecommerceCredential.keyType === 'public_key') {
        public_key = ecommerceCredential.keyValue;
      } else if (ecommerceCredential.keyType === 'secret_key') {
        private_key = ecommerceCredential.keyValue;
      }
    });
  }

  return {
    url,
    public_key,
    private_key,
    ecommerceConnectId: ecommerceConnect.id,
  };
};

export const getStartAndEndDates = (daysFromToday: number) => {
  const currentDate = new Date();
  const startDate = format(subDays(currentDate, daysFromToday), 'yyyy-MM-dd');
  const endDate = format(new Date(), 'yyyy-MM-dd');
  return { startDate, endDate };
};

export const UPDATE_USER_QUERY = `WITH update_user AS (
  UPDATE public."EcommerceUsers"
  SET "fullName" = :fullName,
  email = :email,
  phone = :phone, city = :city
  WHERE "ecommerceConnectId" = :ecommerceConnectId
  AND "visitorId" = :userProfileId
  RETURNING *
),
insert_user AS (
  INSERT INTO public."EcommerceUsers" ("visitorId", "fullName", "email", "phone", "city", "ecommerceConnectId", "createdAt", "updatedAt")
  SELECT :userProfileId, :fullName, :email, :phone, :city, :ecommerceConnectId, NOW(), NOW()
  WHERE NOT EXISTS (
    SELECT *
    FROM update_user
  )
  RETURNING *
)
SELECT *
FROM update_user
UNION ALL
SELECT *
    FROM insert_user;`;

export const UPDATE_ORDER_QUERY = `WITH update_order AS (
      UPDATE public."EcommerceOrders"
      SET total = :orderValue,
      cost = :orderCost,
      status = :status,
      "userId" = :userId,
      "createdAt" = :creationDate,
      "updatedAt" = :lastChange
      WHERE "ecommerceConnectId" = :ecommerceConnectId
      AND "orderId" = :orderId
      RETURNING *
    ),
    insert_order AS (
      INSERT INTO public."EcommerceOrders" ("orderId", "total", "cost", "status", "createdAt", "updatedAt", "ecommerceConnectId", "userId")
      SELECT :orderId, :orderValue, :orderCost, :status, :creationDate, :lastChange, :ecommerceConnectId, :userId
      WHERE NOT EXISTS (
        SELECT *
        FROM update_order
      )
      RETURNING *
    )
    SELECT *
    FROM update_order
    UNION ALL
    SELECT *
    FROM insert_order;`;

export interface VTEXOrderProps {
  order: {
    orderDetail?: any;
    orderId?: any;
    totalValue?: any;
    status?: any;
    creationDate?: any;
    lastChange?: any;
  };
  sequelize: Sequelize;
  database: string;
  ecommerceConnectId: number;
  availableUsers: any;
}

// @TODO: add types
export const saveOrder = async (
  order: OrderDetailRoot,
  sequelize: Sequelize,
  database: string,
  ecommerceConnectId: number,
  userId: number
): Promise<EcommerceOrder> => {
  const costs = order?.totals?.reduce((acc, itemCost) => {
    const value = itemCost.id !== 'Items' ? Math.abs(itemCost.value) : 0;
    return acc + value;
  }, 0);
  const { orderId, value, status, creationDate, lastChange } = order;
  const orderValue = value / 100;
  const orderCost = costs / 100;

  try {
    const [[order]] = await sequelize.query(UPDATE_ORDER_QUERY, {
      replacements: {
        orderValue,
        orderCost,
        status,
        userId,
        creationDate,
        lastChange,
        ecommerceConnectId,
        orderId,
      },
    });
    return order as EcommerceOrder;
  } catch (error) {
    console.log('there was an error inserting/updating order', {
      database,
      ecommerceConnectId,
      order,
      error,
    });
    throw error;
  }
};

export const saveUser = async (
  order: OrderDetailRoot,
  userEmail: { email?: string },
  sequelize: Sequelize,
  database: string,
  ecommerceConnectId: number
): Promise<EcommerceUser> => {
  const clientProfileData = order?.clientProfileData;
  const { userProfileId, firstName, lastName, phone } = clientProfileData;

  const address = order?.shippingData?.address;
  const city = `${address?.city || ''}, ${address?.state || ''}, ${address?.country} || ''`;
  if (userProfileId) {
    try {
      const [[user]] = await sequelize.query(UPDATE_USER_QUERY, {
        replacements: {
          fullName: `${firstName} ${lastName}`,
          city,
          email: userEmail?.email || null,
          phone,
          userProfileId,
          ecommerceConnectId,
        },
      });
      return user as EcommerceUser;
    } catch (error) {
      console.log('there was an error inserting/updating user', {
        database,
        ecommerceConnectId,
        order,
        error,
      });
      throw error;
    }
  }
  return null;
};

export const buildProduct = (product: Item, ecommerceConnectId: number): Partial<EcommerceProduct> => ({
  name: product.name,
  sku: product.sellerSku,
  price: product.price / 100,
  cost: product.costPrice / 100,
  productId: product.productId,
  ecommerceBrandId: product.ecommerceBrandId,
  //ecommerceSubCategoriesId: product.ecommerceSubCategoriesId,
  ecommerceCategoryTreesId: product.CategoryId,
  ecommerceConnectId,
});

//build brand
export const buildBrand = (brand: any, ecommerceConnectId: number) => ({
  id: brand.id,
  name: brand.name,
  isActive: brand.isActive,
  title: brand.title,
  metaTagDescription: brand.metaTagDescription,
  imageUrl: brand.imageUrl,
  idVtex: brand.id,
  ecommerceConnectId,
});

//build CategoryTree
export const buildCategoryTree = (category: any, ecommerceConnectId: number) => ({
  id: category.id,
  name: category.name,
  parentCategoryId: category.parentCategoryId,
  categoryLevelId: category.categoryLevelId,
  hasChildren: category.hasChildren,
  title: category.Title,
  metaTagDescription: category.MetaTagDescription,
  url: category.url,
  idVtex: category.id,
  ecommerceConnectId,
});

export const buildOrderItem = (
  product: Item,
  ecommerceConnectId: number,
  orderId: number,
  productId: number
): Partial<EcommerceOrderItem> => ({
  quantity: product.quantity,
  price: product.price / 100,
  productId,
  ecommerceConnectId,
  orderId,
});

export const buildVtexConnection = ({
  baseUrl,
  appKey,
  appToken,
}: {
  baseUrl: string;
  appKey: string;
  appToken: string;
}) => {
  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      'X-VTEX-API-AppKey': appKey,
      'X-VTEX-API-AppToken': appToken,
    },
  });

  axiosRetry(api, {
    retryCondition: error => {
      return (error?.response?.status >= 500 && error?.response?.status <= 599) || error?.response?.status === 429;
    },
    retries: 24,
    retryDelay: retryCount => {
      const baseDelay = 5000; // 5 seconds
      return baseDelay * retryCount; // 5s, 10s, 15s, 20s... 2 minutes
    },
  });

  return api;
};

export const vtex = async (query, connection) => {
  const { data } = await connection.get(query);
  return data;
};

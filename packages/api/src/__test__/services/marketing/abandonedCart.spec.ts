import { EcommerceCart } from '@models/company/ecommerceCart.entity';
import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';
import EcommerceMarketing from '@services/ecommerce/marketing/marketing';
import {
  checkInvalidStartDateFormat,
  checkInvalidEndDateFormat,
  checkStartDateGreaterThanEndDate,
} from '../../common/dateTests';

const ecommerceCartRepositoryMock = {
  findAll: jest.fn(),
};

const ecommerceMarketing = new EcommerceMarketing(
  ecommerceCartRepositoryMock as any,
  {} as any,
  {} as any,
  {} as any,
  {} as any
);

describe('EcommerceMarketing', () => {
  describe('abandonedCart', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    checkInvalidStartDateFormat({
      testFunction: ecommerceMarketing.abandonedCart,
    });

    checkInvalidEndDateFormat({
      testFunction: ecommerceMarketing.abandonedCart,
    });

    checkStartDateGreaterThanEndDate({
      testFunction: ecommerceMarketing.abandonedCart,
    });

    it('should return the abandoned cart percentage for a valid range of dates', async () => {
      const startDate = new Date(2022, 0, 1);
      const endDate = new Date(2022, 1, 1);

      const order1: Partial<EcommerceOrder> = {
        id: 1,
        total: 10,
        cost: 0,
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };
      const order2: Partial<EcommerceOrder> = {
        id: 2,
        total: 10,
        cost: 0,
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 2),
      };

      const cart1: Partial<EcommerceCart> = {
        ecommerceConnectId: 1,
        orderId: order1.id,
        order: order1 as EcommerceOrder,
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };
      const cart2: Partial<EcommerceCart> = {
        ecommerceConnectId: 1,
        orderId: order2.id,
        order: order2 as EcommerceOrder,
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 2),
      };
      const cart3: Partial<EcommerceCart> = {
        ecommerceConnectId: 1,
        orderId: null,
        order: null,
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 2),
      };
      const cart4: Partial<EcommerceCart> = {
        ecommerceConnectId: 1,
        orderId: null,
        order: null,
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 3),
      };

      ecommerceCartRepositoryMock.findAll.mockResolvedValue([cart1, cart2, cart3, cart4]);

      const abandonedCartPercentage = await ecommerceMarketing.abandonedCart({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      expect(abandonedCartPercentage).toEqual(50);
    });
  });
});

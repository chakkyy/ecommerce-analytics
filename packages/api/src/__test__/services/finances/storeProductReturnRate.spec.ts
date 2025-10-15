import EcommerceFinance from '@services/ecommerce/finances/finances';
import {
  checkInvalidStartDateFormat,
  checkInvalidEndDateFormat,
  checkStartDateGreaterThanEndDate,
} from '../../common/dateTests';
import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';

const ecommerceOrderRepositoryMock = {
  findAll: jest.fn(),
};

const ecommerceFinance = new EcommerceFinance(
  ecommerceOrderRepositoryMock as any,
  {} as any,
  {} as any,
  {} as any,
  {} as any
);

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

describe('EcommerceFinance', () => {
  describe('storeProductReturnRate', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    checkInvalidStartDateFormat({
      testFunction: ecommerceFinance.storeProductReturnRate,
    });

    checkInvalidEndDateFormat({
      testFunction: ecommerceFinance.storeProductReturnRate,
    });

    checkStartDateGreaterThanEndDate({
      testFunction: ecommerceFinance.storeProductReturnRate,
    });

    it('should return the correct store product return rate for a valid range of dates', async () => {
      const startDate = new Date(2023, 3, 1);
      const endDate = new Date(2023, 4, 1);

      // const order1: DeepPartial<EcommerceOrder> = {
      //   id: 1,
      //   ecommerceConnectId: 1,
      //   total: 100,
      //   orderItems: [
      //     {
      //       quantity: 1,
      //       product: {
      //         createdAt: new Date(2022, 3, 1),
      //       },
      //     },
      //     {
      //       quantity: 2,
      //       product: {
      //         createdAt: new Date(2022, 8, 1),
      //       },
      //     },
      //     {
      //       quantity: 1,
      //       product: {
      //         createdAt: new Date(2022, 10, 1),
      //       },
      //     },
      //   ],
      //   createdAt: new Date(2023, 3, 1),
      // };

      // order1 total > 100 = order1 ignored

      const order2: DeepPartial<EcommerceOrder> = {
        id: 2,
        ecommerceConnectId: 1,
        total: -50,
        orderItems: [
          {
            quantity: 1,
            product: {
              createdAt: new Date(2022, 4, 1),
            },
          },
          {
            quantity: 10,
            product: {
              createdAt: new Date(2022, 4, 10),
            },
          },
        ],
        createdAt: new Date(2023, 3, 4),
      };

      // order2 product quantity total: 1+10 = 11

      // const order3: DeepPartial<EcommerceOrder> = {
      //   id: 3,
      //   ecommerceConnectId: 1,
      //   total: 20,
      //   orderItems: [
      //     {
      //       quantity: 1,
      //       product: {
      //         createdAt: new Date(2022, 5, 1),
      //       },
      //     },
      //   ],
      //   createdAt: new Date(2023, 2, 10),
      // };

      // order3 - out of date range

      // const order4: DeepPartial<EcommerceOrder> = {
      //   id: 4,
      //   ecommerceConnectId: 2,
      //   total: -20,
      //   orderItems: [
      //     {
      //       quantity: 2,
      //       product: {
      //         createdAt: new Date(2022, 6, 1),
      //       },
      //     },
      //     {
      //       quantity: 5,
      //       product: {
      //         createdAt: new Date(2023, 0, 1),
      //       },
      //     },
      //   ],
      //   createdAt: new Date(2023, 3, 15),
      // };

      // order4 - wrong ecommerceConnectId

      const order5: DeepPartial<EcommerceOrder> = {
        id: 5,
        ecommerceConnectId: 1,
        total: -10,
        orderItems: [
          {
            quantity: 1,
            product: {
              createdAt: new Date(2022, 6, 1),
            },
          },
          {
            quantity: 5,
            product: {
              createdAt: new Date(2023, 0, 1),
            },
          },
        ],
        createdAt: new Date(2023, 3, 20),
      };

      // order5 product quantity total: 1+5 = 6

      ecommerceOrderRepositoryMock.findAll.mockResolvedValue([order2, order5]);

      // orders product quantity total: 11+6 = 17

      const storeSupplyChainEfficiencyRate = await ecommerceFinance.storeProductReturnRate({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      // Math.round((2/17) * 100) = Math.round(0,1176470588*100) = Math.round(11,76470588) = 12

      expect(storeSupplyChainEfficiencyRate).toEqual(12);
    });
  });
});

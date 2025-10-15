import EcommerceMarketing from '@services/ecommerce/marketing/marketing';
import {
  checkInvalidStartDateFormat,
  checkInvalidEndDateFormat,
  checkStartDateGreaterThanEndDate,
} from '../../common/dateTests';
import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';

const ecommerceOrderRepositoryMock = {
  findAll: jest.fn(),
};

const ecommerceMarketing = new EcommerceMarketing(
  {} as any,
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

describe('EcommerceMarketing', () => {
  describe('storeSupplyChainEfficiency', () => {
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

    it('should return the correct supply chain efficiency average for a valid range of dates', async () => {
      const startDate = new Date(2023, 3, 1);
      const endDate = new Date(2023, 4, 1);

      const order1: DeepPartial<EcommerceOrder> = {
        id: 1,
        ecommerceConnectId: 1,
        orderItems: [
          {
            product: {
              createdAt: new Date(2022, 3, 1), // 2023/04/01 - 2022/04/01 = 365 days
            },
          },
          {
            product: {
              createdAt: new Date(2022, 8, 1), // 2023/04/01 - 2022/09/01 = 212 days
            },
          },
          {
            product: {
              createdAt: new Date(2022, 10, 1), // 2023/04/01 - 2022/11/01 = 151 days
            },
          },
        ],
        createdAt: new Date(2023, 3, 1),
      };

      // average for order1 = (365+212+151)/3 = 243,6666666667 => 243

      const order2: DeepPartial<EcommerceOrder> = {
        id: 2,
        ecommerceConnectId: 1,
        orderItems: [
          {
            product: {
              createdAt: new Date(2022, 4, 1), // 2023/04/04 - 2022/05/01 = 338 days
            },
          },
          {
            product: {
              createdAt: new Date(2022, 4, 10), // 2023/04/04 - 2022/05/10 = 329 days
            },
          },
        ],
        createdAt: new Date(2023, 3, 4),
      };

      // average for order2 = (338+329)/2 = 333,5 => 333

      // const order3: DeepPartial<EcommerceOrder> = {
      //   id: 3,
      //   ecommerceConnectId: 1,
      //   orderItems: [
      //     {
      //       product: {
      //         createdAt: new Date(2022, 5, 1),
      //       },
      //     },
      //   ],
      //   createdAt: new Date(2023, 2, 10),
      // };

      // // order3 - out of date range

      // const order4: DeepPartial<EcommerceOrder> = {
      //   id: 4,
      //   ecommerceConnectId: 2,
      //   orderItems: [
      //     {
      //       product: {
      //         createdAt: new Date(2022, 6, 1),
      //       },
      //     },
      //     {
      //       product: {
      //         createdAt: new Date(2023, 0, 1),
      //       },
      //     },
      //   ],
      //   createdAt: new Date(2023, 3, 15),
      // };

      // order4 - wrong ecommerceConnectId

      ecommerceOrderRepositoryMock.findAll.mockResolvedValue([order1, order2]);

      const storeSupplyChainEfficiencyRate = await ecommerceMarketing.storeSupplyChainEfficiency({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      // average for order1 and order2 = (243+333)/2 = 288

      expect(storeSupplyChainEfficiencyRate).toEqual(288);
    });
  });
});

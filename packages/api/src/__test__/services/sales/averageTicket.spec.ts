import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';
import { Op } from 'sequelize';
import EcommerceSales from '@services/ecommerce/Sales/Sales';
import {
  checkInvalidStartDateFormat,
  checkInvalidEndDateFormat,
  checkStartDateGreaterThanEndDate,
} from '../../common/dateTests';

const ecommerceCartRepositoryMock = {
  findAll: jest.fn(),
};

const ecommercerSales = new EcommerceSales(ecommerceCartRepositoryMock as any);

describe('EcommerceSales', () => {
  describe('averageTicket', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    checkInvalidStartDateFormat({
      testFunction: ecommercerSales.averageTicket,
    });

    checkInvalidEndDateFormat({
      testFunction: ecommercerSales.averageTicket,
    });

    checkStartDateGreaterThanEndDate({
      testFunction: ecommercerSales.averageTicket,
    });

    it('should return the average ticket (total revenue / orders placed) for a valid range of dates', async () => {
      const startDate = new Date(2022, 0, 1);
      const endDate = new Date(2022, 1, 1);

      const order1: Partial<EcommerceOrder> = {
        id: 1,
        total: 20,
        cost: 10,
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };
      const order2: Partial<EcommerceOrder> = {
        id: 2,
        total: 30,
        cost: 20,
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 2),
        updatedAt: new Date(2022, 0, 2),
      };
      const order3: Partial<EcommerceOrder> = {
        id: 3,
        total: 50,
        cost: 10,
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 8),
        updatedAt: new Date(2022, 0, 8),
      };
      const order4: Partial<EcommerceOrder> = {
        id: 4,
        total: 60,
        cost: 5,
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 21),
        updatedAt: new Date(2022, 0, 21),
      };

      ecommerceCartRepositoryMock.findAll.mockResolvedValue([order1, order2, order3, order4]);

      const resultAverageTicket = await ecommercerSales.averageTicket({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      await expect(resultAverageTicket).toEqual(40);
      expect(ecommerceCartRepositoryMock.findAll).toHaveBeenCalledWith({
        where: {
          ecommerceConnectId: 1,
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
        },
        raw: true,
        nest: true,
      });
    });
  });
});

import EcommerceSales from '@services/ecommerce/sales/sales';
import { Op } from 'sequelize';
import {
  checkInvalidStartDateFormat,
  checkInvalidEndDateFormat,
  checkStartDateGreaterThanEndDate,
} from '../../common/dateTests';

const ecommerceOrderRepositoryMock = {
  findAll: jest.fn(),
};

const ecommerceSales = new EcommerceSales(ecommerceOrderRepositoryMock as any);

describe('EcommerceSales', () => {
  describe('totalRevenue', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    checkInvalidStartDateFormat({
      testFunction: ecommerceSales.totalRevenue,
    });

    checkInvalidEndDateFormat({
      testFunction: ecommerceSales.totalRevenue,
    });

    checkStartDateGreaterThanEndDate({
      testFunction: ecommerceSales.totalRevenue,
    });

    it('should return the total accumulated revenue for a valid range of dates', async () => {
      const startDate = new Date(2022, 0, 1);
      const endDate = new Date(2022, 1, 1);

      const order1 = {
        total: 10,
        cost: 0,
        createdAt: new Date(2022, 0, 2),
      };

      const order2 = {
        total: 20,
        cost: 0,
        createdAt: new Date(2022, 0, 3),
      };

      ecommerceOrderRepositoryMock.findAll.mockReturnValueOnce([order1, order2]);

      const result = await ecommerceSales.totalRevenue({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      expect(result).toBe(30);
      expect(ecommerceOrderRepositoryMock.findAll).toHaveBeenCalledWith({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          ecommerceConnectId: 1,
        },
      });
    });
  });

  describe('orders', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return the orders for a valid range of dates', async () => {
      const startDate = new Date(2022, 0, 1);
      const endDate = new Date(2022, 1, 1);

      const order1 = {
        total: 10,
        cost: 0,
        createdAt: new Date(2022, 0, 2),
      };

      const order2 = {
        total: 20,
        cost: 0,
        createdAt: new Date(2022, 0, 3),
      };

      ecommerceOrderRepositoryMock.findAll.mockReturnValueOnce([order1, order2]);

      const result = await ecommerceSales.orders({
        startDate,
        endDate,
        ecommerceConnectId: 1,
        page: 1,
        pageSize: 10,
      });

      expect(result).toEqual([order1, order2]);
      expect(ecommerceOrderRepositoryMock.findAll).toHaveBeenCalledWith({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          ecommerceConnectId: 1,
        },
        limit: 10,
        offset: 0,
        order: [['createdAt', 'DESC']],
      });
    });
  });
});

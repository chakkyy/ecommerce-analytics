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
  describe('incomeByTransaction', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    checkInvalidStartDateFormat({
      testFunction: ecommerceSales.incomeByTransaction,
    });

    checkInvalidEndDateFormat({
      testFunction: ecommerceSales.incomeByTransaction,
    });

    checkStartDateGreaterThanEndDate({
      testFunction: ecommerceSales.incomeByTransaction,
    });

    it('should return the income by transaction for a valid range of dates', async () => {
      const startDate = new Date(2022, 0, 1);
      const endDate = new Date(2022, 1, 1);

      const order1 = {
        id: 1,
        total: 10,
        cost: 0,
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 2),
        updatedAt: new Date(2022, 0, 2),
      };

      const order2 = {
        id: 2,
        total: 20,
        cost: 10,
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 3),
        updatedAt: new Date(2022, 0, 3),
      };

      ecommerceOrderRepositoryMock.findAll.mockReturnValueOnce([order1, order2]);

      const result = await ecommerceSales.incomeByTransaction({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      expect(result).toBe(10);
      expect(ecommerceOrderRepositoryMock.findAll).toHaveBeenCalledWith({
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          ecommerceConnectId: 1,
        },
        raw: true,
        nest: true,
      });
    });
  });
});

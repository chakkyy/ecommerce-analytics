import EcommerceFinance from '@services/ecommerce/finances/finances';
import { Op } from 'sequelize';
import {
  checkInvalidStartDateFormat,
  checkInvalidEndDateFormat,
  checkStartDateGreaterThanEndDate,
} from '../../common/dateTests';

const ecommerceOrderRepositoryMock = {
  findAll: jest.fn(),
};

const ecommerceFinances = new EcommerceFinance(ecommerceOrderRepositoryMock as any);

describe('EcommerceFinance', () => {
  describe('accumulatedRevenue', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    checkInvalidStartDateFormat({
      testFunction: ecommerceFinances.accumulatedRevenue,
    });

    checkInvalidEndDateFormat({
      testFunction: ecommerceFinances.accumulatedRevenue,
    });

    checkStartDateGreaterThanEndDate({
      testFunction: ecommerceFinances.accumulatedRevenue,
    });

    it('should return the total accumulated revenue for a valid range of dates', async () => {
      const startDate = new Date(2022, 0, 1);
      const endDate = new Date(2022, 1, 1);

      const order1 = {
        total: 10,
        createdAt: new Date(2022, 0, 2),
      };

      const order2 = {
        total: 20,
        createdAt: new Date(2022, 0, 3),
      };

      ecommerceOrderRepositoryMock.findAll.mockReturnValueOnce([order1, order2]);

      const result = await ecommerceFinances.accumulatedRevenue({
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
});

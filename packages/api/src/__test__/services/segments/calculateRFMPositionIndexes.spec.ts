import { EcommerceOrder } from '@models/company/ecommerceOrder.entity';
import EcommerceSegments from '@services/ecommerce/segments/segments';
import {
  checkInvalidStartDateFormat,
  checkInvalidEndDateFormat,
  checkStartDateGreaterThanEndDate,
} from '../../common/dateTests';
import { Op } from 'sequelize';

const ecommerceOrderRepositoryMock = {
  findAll: jest.fn(),
};

const ecommerceClientGlobalSegmentsRepositoryMock = {
  findAll: jest.fn(),
};

const ecommerceSegments = new EcommerceSegments(
  ecommerceOrderRepositoryMock as any,
  ecommerceClientGlobalSegmentsRepositoryMock as any
);

describe('EcommerceSegment', () => {
  describe('calculateRFMPositionIndexes', () => {
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 2, 1);

    const order1: Partial<EcommerceOrder> = {
      id: 1,
      total: 10,
      cost: 0,
      userId: 'ab1',
      ecommerceConnectId: 1,
      createdAt: new Date(2023, 0, 1),
      updatedAt: new Date(2023, 0, 1),
    };
    const order2: Partial<EcommerceOrder> = {
      id: 2,
      total: 10,
      cost: 0,
      userId: 'ab1',
      ecommerceConnectId: 1,
      createdAt: new Date(2023, 0, 2),
      updatedAt: new Date(2023, 0, 2),
    };
    const order3: Partial<EcommerceOrder> = {
      id: 3,
      total: 20,
      cost: 0,
      userId: 'ab2',
      ecommerceConnectId: 1,
      createdAt: new Date(2023, 0, 2),
      updatedAt: new Date(2023, 0, 2),
    };
    const order4: Partial<EcommerceOrder> = {
      id: 4,
      total: 50,
      cost: 0,
      userId: 'ab3',
      ecommerceConnectId: 1,
      createdAt: new Date(2023, 0, 5),
      updatedAt: new Date(2023, 0, 5),
    };
    const order5: Partial<EcommerceOrder> = {
      id: 5,
      total: 80,
      cost: 0,
      userId: 'ab4',
      ecommerceConnectId: 1,
      createdAt: new Date(2023, 0, 12),
      updatedAt: new Date(2023, 0, 12),
    };
    const order6: Partial<EcommerceOrder> = {
      id: 6,
      total: 100,
      cost: 0,
      userId: 'ab1',
      ecommerceConnectId: 1,
      createdAt: new Date(2023, 1, 5),
      updatedAt: new Date(2023, 1, 5),
    };

    const mockedValues = [order1, order2, order3, order4, order5, order6];

    const payload: any = {
      numsOfFifth: 5,
      ecommerceConnectId: 1,
      startDate,
      endDate,
    };

    const toHaveBeenCalledWithPayload: any = {
      attributes: ['id', 'total', 'createdAt', 'userId'],
      where: {
        ecommerceConnectId: 1,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      order: [['createdAt', 'DESC']],
      raw: true,
      nest: true,
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    checkInvalidStartDateFormat({
      testFunction: ecommerceSegments.calculateRFMPositionIndexes,
    });

    checkInvalidEndDateFormat({
      testFunction: ecommerceSegments.calculateRFMPositionIndexes,
    });

    checkStartDateGreaterThanEndDate({
      testFunction: ecommerceSegments.calculateRFMPositionIndexes,
    });

    it('should return the RFM positions indexes of all users in a range of dates', async () => {
      ecommerceOrderRepositoryMock.findAll.mockReturnValue(mockedValues);

      const result = await ecommerceSegments.calculateRFMPositionIndexes(payload);

      expect(result).toStrictEqual([
        {
          userId: 'ab1',
          recency: 1,
          frequency: 5,
          monetary: 5,
        },
        {
          userId: 'ab2',
          recency: 1,
          frequency: 1,
          monetary: 1,
        },
        {
          userId: 'ab3',
          recency: 5,
          frequency: 1,
          monetary: 2,
        },
        {
          userId: 'ab4',
          recency: 4,
          frequency: 1,
          monetary: 3,
        },
      ]);
      expect(ecommerceOrderRepositoryMock.findAll).toHaveBeenCalledWith(toHaveBeenCalledWithPayload);
    });
  });
});

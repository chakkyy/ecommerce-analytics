import { BadRequestException } from '@nestjs/common';
import EcommerceMarketing from '@services/ecommerce/marketing/marketing';
import { parse } from 'date-fns';

const ecommerceOrderRepositoryMock = {
  count: jest.fn(),
};

const ecommercePageViewsRepositoryMock = {
  findAndCountAll: jest.fn(),
};

const ecommerceMarketing = new EcommerceMarketing(
  {} as any,
  ecommerceOrderRepositoryMock as any,
  ecommercePageViewsRepositoryMock as any,
  {} as any,
  {} as any
);

describe('EcommerceMarketing', () => {
  describe('uniqueVisitors', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should throw an error if endDate has an invalid format', async () => {
      const endDate = new Date('');
      const startDate = parse('2022-01-01', 'yyyy-MM-dd', new Date());
      const ecommerceConnectId = 1;

      await expect(
        ecommerceMarketing.uniqueVisitors({
          startDate,
          endDate,
          ecommerceConnectId,
        })
      ).rejects.toThrow(BadRequestException);
      await expect(
        ecommerceMarketing.uniqueVisitors({
          startDate,
          endDate,
          ecommerceConnectId,
        })
      ).rejects.toThrow('Invalid endDate format');
    });

    it('should throw an error if startDate is greater than endDate', async () => {
      const startDate = new Date(2022, 1, 1);
      const endDate = new Date(2022, 0, 1);

      await expect(
        ecommerceMarketing.uniqueVisitors({
          startDate,
          endDate,
          ecommerceConnectId: 1,
        })
      ).rejects.toThrow(BadRequestException);
      await expect(
        ecommerceMarketing.uniqueVisitors({
          startDate,
          endDate,
          ecommerceConnectId: 1,
        })
      ).rejects.toThrow("startDate can't be greater than end date");
    });

    it('should return the correct number of unique visitors for a valid range of dates', async () => {
      const startDate = parse('2022-01-01', 'yyyy-MM-dd', new Date());
      const endDate = parse('2022-01-31', 'yyyy-MM-dd', new Date());
      const uniqueVisitorsData = {
        count: [{ visitorId: 1 }, { visitorId: 2 }, { visitorId: 3 }],
      };

      ecommercePageViewsRepositoryMock.findAndCountAll.mockResolvedValue(uniqueVisitorsData);

      const uniqueVisitors = await ecommerceMarketing.uniqueVisitors({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      expect(uniqueVisitors).toEqual(3);
    });
  });
});

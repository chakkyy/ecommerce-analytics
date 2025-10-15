import { BadRequestException } from '@nestjs/common';
import EcommerceMarketing from '@services/ecommerce/marketing/marketing';
import { parse } from 'date-fns';

const ecommerceCustomerRepositoryMock = {
  count: jest.fn(),
};

const ecommercePageViewsRepositoryMock = {
  findAll: jest.fn(),
};

const ecommerceMarketing = new EcommerceMarketing(
  {} as any,
  {} as any,
  ecommercePageViewsRepositoryMock as any,
  ecommerceCustomerRepositoryMock as any,
  {} as any
);

describe('EcommerceMarketing', () => {
  describe('visitorToCustomerConversionRate', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should throw an error if endDate has an invalid format', async () => {
      const endDate = new Date('');
      const startDate = parse('2022-01-01', 'yyyy-MM-dd', new Date());
      const ecommerceConnectId = 1;

      await expect(
        ecommerceMarketing.visitorToCustomerConversionRate({ startDate, endDate, ecommerceConnectId })
      ).rejects.toThrow(BadRequestException);
      await expect(
        ecommerceMarketing.visitorToCustomerConversionRate({ startDate, endDate, ecommerceConnectId })
      ).rejects.toThrow('Invalid endDate format');
    });

    it('should throw an error if startDate is greater than endDate', async () => {
      const startDate = new Date(2022, 1, 1);
      const endDate = new Date(2022, 0, 1);

      await expect(
        ecommerceMarketing.visitorToCustomerConversionRate({ startDate, endDate, ecommerceConnectId: 1 })
      ).rejects.toThrow(BadRequestException);
      await expect(
        ecommerceMarketing.visitorToCustomerConversionRate({ startDate, endDate, ecommerceConnectId: 1 })
      ).rejects.toThrow("startDate can't be greater than end date");
    });

    it('should return the correct visitor-to-customer conversion rate for a valid range of dates', async () => {
      const startDate = parse('2022-01-01', 'yyyy-MM-dd', new Date());
      const endDate = parse('2022-01-31', 'yyyy-MM-dd', new Date());
      const uniqueVisitorsData = [
        { visitorId: 1, getDataValue: () => 1 },
        { visitorId: 2, getDataValue: () => 2 },
        { visitorId: 3, getDataValue: () => 3 },
        { visitorId: 4, getDataValue: () => 4 },
      ];
      const registeredCustomersCount = 2;

      ecommercePageViewsRepositoryMock.findAll.mockResolvedValue(uniqueVisitorsData);
      ecommerceCustomerRepositoryMock.count.mockResolvedValue(registeredCustomersCount);

      const conversionRate = await ecommerceMarketing.visitorToCustomerConversionRate({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      expect(conversionRate).toEqual(50);
    });
  });
});

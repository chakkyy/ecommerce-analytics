import EcommerceMarketing from '@services/ecommerce/marketing/marketing';
import {
  checkInvalidStartDateFormat,
  checkInvalidEndDateFormat,
  checkStartDateGreaterThanEndDate,
} from '../../common/dateTests';

const ecommercePageViewsRepositoryMock = {
  count: jest.fn(),
};

const ecommerceMarketing = new EcommerceMarketing(
  {} as any,
  {} as any,
  ecommercePageViewsRepositoryMock as any,
  {} as any,
  {} as any
);

describe('EcommerceMarketing', () => {
  describe('percentageOfReferredTraffic', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    checkInvalidStartDateFormat({
      testFunction: ecommerceMarketing.referredTrafficPercentage,
    });

    checkInvalidEndDateFormat({
      testFunction: ecommerceMarketing.referredTrafficPercentage,
    });

    checkStartDateGreaterThanEndDate({
      testFunction: ecommerceMarketing.referredTrafficPercentage,
    });

    it('should return the percentage of referred traffic for a valid range of dates', async () => {
      const startDate = new Date(2022, 0, 1);
      const endDate = new Date(2022, 1, 1);

      const totalPageViews = 10;
      const referredPageViews = 6;

      ecommercePageViewsRepositoryMock.count
        .mockResolvedValueOnce(totalPageViews)
        .mockResolvedValueOnce(referredPageViews);

      const percentage = await ecommerceMarketing.referredTrafficPercentage({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      expect(percentage).toEqual((referredPageViews / totalPageViews) * 100);
    });
  });
});

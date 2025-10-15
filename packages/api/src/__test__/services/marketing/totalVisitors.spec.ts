import EcommerceMarketing from '@services/ecommerce/marketing/marketing';
import { parse } from 'date-fns';
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
  describe('totalVisitors', () => {
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

    it('should return the correct number of total visitors for a valid range of dates', async () => {
      const startDate = parse('2022-01-01', 'yyyy-MM-dd', new Date());
      const endDate = parse('2022-01-31', 'yyyy-MM-dd', new Date());
      const totalVisitorsData = [{ visitorId: 1 }, { visitorId: 2 }, { visitorId: 3 }];

      ecommercePageViewsRepositoryMock.count.mockResolvedValue(totalVisitorsData.length);

      const totalVisitors = await ecommerceMarketing.totalVisitors({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      expect(totalVisitors).toEqual(3);
    });
  });
});

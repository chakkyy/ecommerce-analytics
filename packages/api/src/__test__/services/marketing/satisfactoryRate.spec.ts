import EcommerceMarketing from '@services/ecommerce/marketing/marketing';
import { parse } from 'date-fns';
import {
  checkInvalidStartDateFormat,
  checkInvalidEndDateFormat,
  checkStartDateGreaterThanEndDate,
} from '../../common/dateTests';

const ecommercePageReviewRepositoryMock = {
  count: jest.fn(),
};

const ecommerceMarketing = new EcommerceMarketing(
  {} as any,
  {} as any,
  {} as any,
  {} as any,
  ecommercePageReviewRepositoryMock as any
);

describe('EcommerceMarketing', () => {
  describe('satisfactoryRate', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    checkInvalidStartDateFormat({
      testFunction: ecommerceMarketing.satisfactoryRate,
    });

    checkInvalidEndDateFormat({
      testFunction: ecommerceMarketing.satisfactoryRate,
    });

    checkStartDateGreaterThanEndDate({
      testFunction: ecommerceMarketing.satisfactoryRate,
    });

    it('should return the customer satisfaction rate', async () => {
      const startDate = parse('2022-01-01', 'yyyy-MM-dd', new Date());
      const endDate = parse('2022-01-31', 'yyyy-MM-dd', new Date());
      const allCustomerRatesData = [{ rate: 1 }, { rate: 3 }, { rate: 5 }, { rate: 4 }];
      const positiveCustomerRatesData = [{ rate: 5 }, { rate: 4 }];

      ecommercePageReviewRepositoryMock.count.mockImplementationOnce(() =>
        Promise.resolve(allCustomerRatesData.length)
      );
      ecommercePageReviewRepositoryMock.count.mockImplementationOnce(() =>
        Promise.resolve(positiveCustomerRatesData.length)
      );

      const satisfactionRateResult = await ecommerceMarketing.satisfactoryRate({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      expect(satisfactionRateResult).toEqual(50);
    });
  });
});

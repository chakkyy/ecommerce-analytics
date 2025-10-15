import EcommerceMarketing from '@services/ecommerce/marketing/marketing';
import { parse } from 'date-fns';
import {
  checkInvalidStartDateFormat,
  checkInvalidEndDateFormat,
  checkStartDateGreaterThanEndDate,
} from '../../common/dateTests';
import testOrdersArray from './testOrdersArray.json';

const ecommerceOrderRepositoryMock = {
  findAll: jest.fn(),
};

const ecommerceMarketing = new EcommerceMarketing(
  {} as any,
  ecommerceOrderRepositoryMock as any,
  {} as any,
  {} as any,
  {} as any,
  {} as any,
  {} as any
);

describe('EcommerceMarketing', () => {
  describe('storeRecurringClientsTotal', () => {
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

    it('should return the correct number of recurring clients for a valid range of dates', async () => {
      const startDate = parse('2023-01-01', 'yyyy-MM-dd', new Date());
      const endDate = parse('2023-06-14', 'yyyy-MM-dd', new Date());

      ecommerceOrderRepositoryMock.findAll.mockResolvedValue(testOrdersArray);

      const recurringClientsTotal = await ecommerceMarketing.storeRecurringClientsTotal({
        startDate,
        endDate,
        numsOfFifth: 5,
        ecommerceConnectId: 78,
      });

      expect(recurringClientsTotal).toEqual(2);
    });
  });
});

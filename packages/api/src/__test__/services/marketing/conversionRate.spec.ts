import { EcommercePageViews } from '@models/company/ecommercePageViews.entity';
import EcommerceMarketing from '@services/ecommerce/marketing/marketing';
import { parse } from 'date-fns';
import {
  checkInvalidStartDateFormat,
  checkInvalidEndDateFormat,
  checkStartDateGreaterThanEndDate,
} from '../../common/dateTests';

const ecommerceOrderRepositoryMock = {
  count: jest.fn(),
};

const ecommercePageViewsRepositoryMock = {
  count: jest.fn(),
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
  describe('conversionRate', () => {
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

    it('should return a conversion rate of 0 if there are no orders', async () => {
      const startDate = parse('2022-01-01', 'yyyy-MM-dd', new Date());
      const endDate = parse('2022-01-31', 'yyyy-MM-dd', new Date());

      const session1: Partial<EcommercePageViews> = {
        id: 1,
        page: 'page1',
        referer: 'referer1',
        origin: 'origin1',
        isMobile: false,
        duration: 10,
        visitorId: 'visitor1',
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };
      const session2: Partial<EcommercePageViews> = {
        id: 2,
        page: 'page2',
        referer: 'referer2',
        origin: 'origin2',
        isMobile: false,
        duration: 20,
        visitorId: 'visitor2',
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 2),
        updatedAt: new Date(2022, 0, 2),
      };
      const session3: Partial<EcommercePageViews> = {
        id: 3,
        page: 'page3',
        referer: 'referer3',
        origin: 'origin3',
        isMobile: false,
        duration: 30,
        visitorId: 'visitor3',
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 8),
        updatedAt: new Date(2022, 0, 8),
      };
      const session4: Partial<EcommercePageViews> = {
        id: 4,
        page: 'page4',
        referer: 'referer4',
        origin: 'origin4',
        isMobile: false,
        duration: 40,
        visitorId: 'visitor4',
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 21),
        updatedAt: new Date(2022, 0, 21),
      };
      ecommercePageViewsRepositoryMock.findAndCountAll.mockResolvedValue({
        count: [{}, {}, {}, {}],
        rows: [session1, session2, session3, session4],
      });

      ecommerceOrderRepositoryMock.count.mockResolvedValue(0);

      const conversionRate = await ecommerceMarketing.conversionRate({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      expect(conversionRate).toEqual(0);
    });

    it('should return the correct conversion rate for a valid range of dates', async () => {
      const startDate = parse('2022-01-01', 'yyyy-MM-dd', new Date());
      const endDate = parse('2022-01-31', 'yyyy-MM-dd', new Date());

      const session1: Partial<EcommercePageViews> = {
        id: 1,
        page: 'page1',
        referer: 'referer1',
        origin: 'origin1',
        isMobile: false,
        duration: 10,
        visitorId: 'visitor1',
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };
      const session2: Partial<EcommercePageViews> = {
        id: 2,
        page: 'page2',
        referer: 'referer2',
        origin: 'origin2',
        isMobile: false,
        duration: 20,
        visitorId: 'visitor2',
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 2),
        updatedAt: new Date(2022, 0, 2),
      };
      const session3: Partial<EcommercePageViews> = {
        id: 3,
        page: 'page3',
        referer: 'referer3',
        origin: 'origin3',
        isMobile: false,
        duration: 30,
        visitorId: 'visitor3',
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 8),
        updatedAt: new Date(2022, 0, 8),
      };
      const session4: Partial<EcommercePageViews> = {
        id: 4,
        page: 'page4',
        referer: 'referer4',
        origin: 'origin4',
        isMobile: false,
        duration: 40,
        visitorId: 'visitor4',
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 9),
        updatedAt: new Date(2022, 0, 9),
      };
      const session5: Partial<EcommercePageViews> = {
        id: 5,
        page: 'page5',
        referer: 'referer5',
        origin: 'origin5',
        isMobile: false,
        duration: 50,
        visitorId: 'visitor5',
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 10),
        updatedAt: new Date(2022, 0, 10),
      };
      const session6: Partial<EcommercePageViews> = {
        id: 6,
        page: 'page6',
        referer: 'referer6',
        origin: 'origin6',
        isMobile: false,
        duration: 60,
        visitorId: 'visitor6',
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 11),
        updatedAt: new Date(2022, 0, 11),
      };
      ecommercePageViewsRepositoryMock.findAndCountAll.mockResolvedValue({
        count: [{}, {}, {}, {}, {}, {}],
        rows: [session1, session2, session3, session4, session5, session6],
      });

      ecommerceOrderRepositoryMock.count.mockResolvedValue(6);

      const conversionRate = await ecommerceMarketing.conversionRate({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      expect(conversionRate).toEqual(100);
    });
  });
});

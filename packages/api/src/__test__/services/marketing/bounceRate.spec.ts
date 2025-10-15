import { EcommercePageViews } from '@models/company/ecommercePageViews.entity';
import EcommerceMarketing from '@services/ecommerce/marketing/marketing';
import { parse } from 'date-fns';
import {
  checkInvalidStartDateFormat,
  checkInvalidEndDateFormat,
  checkStartDateGreaterThanEndDate,
} from '../../common/dateTests';

const ecommercePageViewsRepositoryMock = {
  count: jest.fn(),
  findAll: jest.fn(),
};

const ecommerceMarketing = new EcommerceMarketing(
  {} as any,
  {} as any,
  ecommercePageViewsRepositoryMock as any,
  {} as any,
  {} as any
);

describe('EcommerceMarketing', () => {
  describe('bounceRate', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    checkInvalidStartDateFormat({
      testFunction: ecommerceMarketing.bounceRate,
    });

    checkInvalidEndDateFormat({
      testFunction: ecommerceMarketing.bounceRate,
    });

    checkStartDateGreaterThanEndDate({
      testFunction: ecommerceMarketing.bounceRate,
    });

    it('should return a bounce rate of 100 if all visitors viewed only one page', async () => {
      const startDate = parse('2022-01-01', 'yyyy-MM-dd', new Date());
      const endDate = parse('2022-01-31', 'yyyy-MM-dd', new Date());

      const session1: Partial<EcommercePageViews> = {
        id: 1,
        page: 'page1',
        referer: 'referer1',
        origin: 'origin1',
        isMobile: false,
        duration: 20,
        visitorId: 'visitor1', // This visitor viewed only one page
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };
      const session2: Partial<EcommercePageViews> = {
        id: 2,
        page: 'page1',
        referer: 'referer2',
        origin: 'origin2',
        isMobile: false,
        duration: 25,
        visitorId: 'visitor2', // This visitor viewed only one page
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 2),
        updatedAt: new Date(2022, 0, 2),
      };

      ecommercePageViewsRepositoryMock.findAll.mockResolvedValue([session1, session2]);

      const bounceRate = await ecommerceMarketing.bounceRate({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      expect(bounceRate).toEqual(100);
    });

    it('should return the correct bounce rate for a valid range of dates', async () => {
      const startDate = parse('2022-01-01', 'yyyy-MM-dd', new Date());
      const endDate = parse('2022-01-31', 'yyyy-MM-dd', new Date());

      const session1: Partial<EcommercePageViews> = {
        id: 1,
        page: 'page1',
        referer: 'referer1',
        origin: 'origin1',
        isMobile: false,
        duration: 20,
        visitorId: 'visitor1', // This visitor viewed two pages
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
        duration: 25,
        visitorId: 'visitor1', // This visitor viewed two pages
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
        visitorId: 'visitor2', // This visitor viewed only one page
        ecommerceConnectId: 1,
        createdAt: new Date(2022, 0, 3),
        updatedAt: new Date(2022, 0, 3),
      };

      ecommercePageViewsRepositoryMock.findAll.mockResolvedValue([session1, session2, session3]);

      const bounceRate = await ecommerceMarketing.bounceRate({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      });

      expect(bounceRate).toEqual(50); // Assuming one out of two visitors viewed only one page
    });
  });
});

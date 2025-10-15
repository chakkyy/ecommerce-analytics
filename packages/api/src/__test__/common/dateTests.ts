import { BadRequestException } from '@nestjs/common';
import { parse } from 'date-fns';

export const checkInvalidStartDateFormat = async ({ testFunction }: { testFunction: Function }) => {
  it('should throw an error if startDate has an invalid format', async () => {
    const startDate = new Date('');
    const endDate = parse('2022-01-01', 'yyyy-MM-dd', new Date());
    const ecommerceConnectId = 1;
    await expect(
      testFunction({
        startDate,
        endDate,
        ecommerceConnectId,
      })
    ).rejects.toThrow(BadRequestException);
    await expect(
      testFunction({
        startDate,
        endDate,
        ecommerceConnectId,
      })
    ).rejects.toThrow('Invalid startDate format');
  });
};

export const checkInvalidEndDateFormat = async ({ testFunction }: { testFunction: Function }) => {
  it('should throw an error if endDate has an invalid format', async () => {
    const endDate = new Date('');
    const startDate = parse('2022-01-01', 'yyyy-MM-dd', new Date());
    const ecommerceConnectId = 1;
    await expect(
      testFunction({
        startDate,
        endDate,
        ecommerceConnectId,
      })
    ).rejects.toThrow(BadRequestException);
    await expect(
      testFunction({
        startDate,
        endDate,
        ecommerceConnectId,
      })
    ).rejects.toThrow('Invalid endDate format');
  });
};

export const checkStartDateGreaterThanEndDate = async ({ testFunction }: { testFunction: Function }) => {
  it('should throw an error if startDate is greater than endDate', async () => {
    const startDate = new Date(2022, 1, 1);
    const endDate = new Date(2022, 0, 1);

    await expect(
      testFunction({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      })
    ).rejects.toThrow(BadRequestException);
    await expect(
      testFunction({
        startDate,
        endDate,
        ecommerceConnectId: 1,
      })
    ).rejects.toThrow("startDate can't be greater than end date");
  });
};

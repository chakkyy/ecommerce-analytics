import { startOfDay, subDays, isAfter, isValid } from 'date-fns';
import { BadRequestException } from '@nestjs/common';

export const getLastNDays = (quantityOfDaysBefore: number) => {
  const today = new Date();
  const last30Days = Array.from({ length: quantityOfDaysBefore }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  });
  return last30Days;
};

export const formattedNDaysAgo = (daysAgo: number) => {
  return startOfDay(subDays(new Date(), daysAgo)).toISOString();
};

export const formattedCurrentDate = () => {
  return new Date().toISOString();
};

export const validateDates = async (start: Date, end: Date) => {
  if (!isValid(start)) {
    return new BadRequestException('Invalid startDate format');
  }
  if (!isValid(end)) {
    return new BadRequestException('Invalid endDate format');
  }
  if (isAfter(start, end)) {
    return new BadRequestException("startDate can't be greater than end date");
  }
  return null;
};

export const resetUTCDate = (date: Date): Date => {
  date.setUTCHours(0, 0, 0, 0); // Establece la hora en UTC
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds()
    )
  );
};

export const HOURS_GAPS = [
  {
    start: '00:00:00.000Z',
    end: '01:00:00.000Z',
  },
  {
    start: '01:00:00.000Z',
    end: '02:00:00.000Z',
  },
  {
    start: '02:00:00.000Z',
    end: '03:00:00.000Z',
  },
  {
    start: '03:00:00.000Z',
    end: '04:00:00.000Z',
  },
  {
    start: '04:00:00.000Z',
    end: '05:00:00.000Z',
  },
  {
    start: '05:00:00.000Z',
    end: '06:00:00.000Z',
  },
  {
    start: '06:00:00.000Z',
    end: '07:00:00.000Z',
  },
  {
    start: '07:00:00.000Z',
    end: '08:00:00.000Z',
  },
  {
    start: '08:00:00.000Z',
    end: '09:00:00.000Z',
  },
  {
    start: '09:00:00.000Z',
    end: '10:00:00.000Z',
  },
  {
    start: '10:00:00.000Z',
    end: '11:00:00.000Z',
  },
  {
    start: '11:00:00.000Z',
    end: '12:00:00.000Z',
  },
  {
    start: '12:00:00.000Z',
    end: '13:00:00.000Z',
  },
  {
    start: '13:00:00.000Z',
    end: '14:00:00.000Z',
  },
  {
    start: '14:00:00.000Z',
    end: '15:00:00.000Z',
  },
  {
    start: '15:00:00.000Z',
    end: '16:00:00.000Z',
  },
  {
    start: '16:00:00.000Z',
    end: '17:00:00.000Z',
  },
  {
    start: '17:00:00.000Z',
    end: '18:00:00.000Z',
  },
  {
    start: '18:00:00.000Z',
    end: '19:00:00.000Z',
  },
  {
    start: '19:00:00.000Z',
    end: '20:00:00.000Z',
  },
  {
    start: '20:00:00.000Z',
    end: '21:00:00.000Z',
  },
  {
    start: '21:00:00.000Z',
    end: '22:00:00.000Z',
  },
  {
    start: '22:00:00.000Z',
    end: '23:00:00.000Z',
  },
  {
    start: '23:00:00.000Z',
    end: '23:59:59.999Z',
  },
];

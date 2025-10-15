import {
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfYear,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';
import { TFunction } from 'i18next';

export const calculatePeriod = (startDate: Date | null | undefined, endDate: Date | null | undefined, t: TFunction) => {
  // Calculates the period according to the start and end dates
  if (!startDate || !endDate) return undefined;

  const startDateString = startDate.toString();
  const endDateString = endDate.toString();

  if (
    startDateString === startOfDay(subWeeks(new Date(), 1)).toString() &&
    endDateString === endOfDay(new Date()).toString()
  ) {
    return t('DATEPICKER.OPTION_LASTWEEK');
  }
  if (
    startDateString === startOfDay(subWeeks(new Date(), 2)).toString() &&
    endDateString === endOfDay(new Date()).toString()
  ) {
    return t('DATEPICKER.OPTION_LASTTWOWEEKS');
  }

  if (
    startDateString === startOfMonth(subMonths(new Date(), 1)).toString() &&
    endDateString === endOfMonth(subMonths(new Date(), 1)).toString()
  ) {
    return t('DATEPICKER.OPTION_LASTMONTH');
  }

  if (
    startDateString === startOfMonth(subMonths(new Date(), 6)).toString() &&
    endDateString === endOfMonth(subMonths(new Date(), 1)).toString()
  ) {
    return t('DATEPICKER.OPTION_LASTSIXMONTHS');
  }

  if (
    startDateString === startOfYear(subYears(new Date(), 1)).toString() &&
    endDateString === endOfYear(subYears(new Date(), 1)).toString()
  ) {
    return t('DATEPICKER.OPTION_LASTYEAR');
  }
  return t('DATEPICKER.OPTION_CHOOSE');
};

export default calculatePeriod;

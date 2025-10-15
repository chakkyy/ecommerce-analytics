import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import {
  addMonths,
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfYear,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DayPicker, DateRange, SelectRangeEventHandler, useNavigation, CaptionProps } from 'react-day-picker';
import { es, enUS, pt } from 'date-fns/locale';
import WrapperShadow from '@ui/wrapper-shadow';
import Button from '@ui/button';

import LeftChevron from '@icons/left-chevron';
import RightChevron from '@icons/right-chevron';

import { calculatePeriod } from '../../../utils/date';
import { Theme } from '../../../theme/theme';

interface Props {
  isEcommerceLayout: boolean;
  setValue: UseFormSetValue<any>;
  setDatePickerIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  control: Control<any, any>;
  locale?: string;
}

const StyledContainer = styled.div<{ isEcommerceLayout?: boolean }>`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  min-width: 737px;
  max-width: 747px;
  height: auto;
  margin: 16px 0 0;
  width: 100%;
  position: absolute;
  z-index: 3000;
  box-shadow: 0px 6px 22px rgba(0, 0, 0, 0.08);
  padding-top: 24px;
  box-sizing: border-box;
  border-radius: 8px;
  @media (max-width: 1485px) {
    left: ${props => (props.isEcommerceLayout ? '0' : '-233')}px;
    min-width: 473px;
    max-width: 473px;
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    width: 100%;
    padding-top: 0;
    min-width: auto;
    max-width: auto;
    left: 0;
  }
`;

const StyledMainContent = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 1485px) {
    padding-bottom: 16px;
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    padding: 24px 16px;
  }
`;

const StyledFooter = styled.div`
  width: 100%;
  height: 66px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 16px 24px;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    height: auto;
    padding: 24px 16px;
    gap: 24px;
    align-items: flex-end;
  }
`;

const StyledButton = styled(Button)`
  min-height: 34px !important;
  box-shadow: 0 !important;

  &:hover {
    box-shadow: 0 !important;
  }
`;

const StyledOptionsContainer = styled.div`
  width: 100%;
  min-width: 200px;
  height: 304px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 6px 24px 38px 16px;
  box-sizing: border-box;

  @media (max-width: 1485px) {
    height: auto;
    gap: 8px;
    padding: 0px 24px 0px 24px;
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const StyledOptionsContainerMobile = styled(StyledOptionsContainer)`
  display: none;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    display: flex;
    height: auto;
    flex-direction: row;
    padding: 0px 16px;
  }
`;

const StyledShadowMobile = styled(WrapperShadow)`
  display: none;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const StyledDatesContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;

  @media (max-width: 1485px) {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    align-items: flex-end;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

const StyledDateContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  p {
    color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 130%;
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    align-items: flex-start;
    flex-direction: column;

    p {
      font-size: 12px;
    }
  }
`;

const StyledDate = styled.span`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
`;
const StyledPeriodButton = styled.button<{ isSelected: boolean }>`
  width: 100%;
  height: 34px;
  font-style: normal;
  font-size: 14px;
  text-align: left;
  padding-left: 8px;
  border-radius: 8px;
  background-color: ${({ isSelected, theme }: { isSelected: boolean; theme: Theme }) =>
    isSelected ? theme.colors.cloudBlue : 'transparent'};
  font-weight: ${({ isSelected }: { isSelected: boolean }) => (isSelected ? '700' : '400')};
  cursor: pointer;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    white-space: nowrap; // For Safari and Firefox
    text-wrap: nowrap;
    background-color: transparent;
    padding-left: 0px;
    padding-right: 24px;
    height: 18px;
  }
`;

const ButtonsContainer = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    width: 100%;
    gap: 16px;
    button {
      width: 100%;
    }
  }
`;

const StyledFilterBtn = styled.button`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }): string => theme.colors.blue};
  background-color: transparent;
  border: none;
  cursor: pointer;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    text-wrap: nowrap;
    white-space: nowrap; // For Safari and Firefox
  }
`;

const StyledFilterDisabled = styled(StyledFilterBtn)`
  color: ${({ theme }: { theme: Theme }): string => theme.colors.grey};
  cursor: auto;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledCalendarContainer = styled.div`
  @media (max-width: 1485px) {
    display: none;
  }
  padding-bottom: 1rem;
  width: 100%;

  table,
  tr,
  th,
  td {
    border: none;
    border-collapse: collapse;
    border-spacing: 0;
    outline: 0;
    margin: 0;
    padding: 0;
    vertical-align: top;
  }

  .rdp-month.rdp-caption_start {
    border-left: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.lightGrey};
    border-right: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.lightGrey};
  }

  .rdp-month {
    width: 100%;
  }

  .rdp-months {
    display: flex;
    justify-content: flex-end;
  }

  .rdp-caption_label {
    margin: auto;
    font-weight: 300;
    font-size: 14px;
  }

  button[name='previous-month'],
  button[name='next-month'] {
    background: transparent;
    width: 12px;
    height: 7px;
    cursor: pointer;
    svg {
      width: 100%;
    }
  }

  .rdp-caption_start .rdp-caption {
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    float: left;
    justify-content: space-between;
    padding: 0 8px 19px;
    width: 100%;
  }

  .rdp-caption_end .rdp-caption {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: auto;
    padding: 0 8px 19px;
    box-sizing: border-box;
    width: 100%;
  }

  .rdp-caption {
    font-weight: 400;
    font-size: 14px;
  }

  .rdp-head_cell {
    color: ${({ theme }: { theme: Theme }) => theme.colors.black};
    height: 26px;
    font-size: 12px;
    font-weight: 300;
  }

  .rdp-cell {
    button {
      color: ${({ theme }: { theme: Theme }) => theme.colors.black};
      background-color: transparent;
      font-size: 14px;
      font-weight: 300;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      height: 32px;
      justify-content: center;
      width: 32px;
      transition: 0.2s ease all;

      &:hover {
        background-color: transparent;
      }
    }
  }

  .rdp-day_selected {
    background-color: ${({ theme }: { theme: Theme }) => theme.colors.blue} !important;
    color: ${({ theme }: { theme: Theme }) => theme.colors.white} !important;
  }

  .rdp-day_range_middle {
    background-color: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue} !important;
    color: ${({ theme }: { theme: Theme }) => theme.colors.black} !important;
  }

  .rdp-day_range_start,
  .rdp-day_range_end {
    background-color: ${({ theme }: { theme: Theme }) => theme.colors.blue} !important;
    color: ${({ theme }: { theme: Theme }) => theme.colors.white} !important;
  }

  .rdp-day_range_middle {
    background-color: ${({ theme }: { theme: Theme }) => theme.colors.secondaryHover};
    border-radius: 0 !important;

    &:hover {
      background-color: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue} !important;
    }
  }

  .rdp-month {
    max-width: 274px !important;
    box-sizing: border-box;
    padding: 0 29px;
  }

  .rdp-tbody {
    height: 200px;
  }

  .rdp-table {
    width: 100%;
  }
`;

const StyledCalendarContainerMobile = styled(StyledCalendarContainer)`
  display: none;

  @media (max-width: 1485px) {
    display: flex;
    padding: 0px 24px 0px 0px;
    justify-content: center;

    .rdp-month.rdp-caption_start {
      border-left: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.lightGrey};
      border-right: none;
    }
    .rdp-tbody {
      height: 192px;
    }
    .rdp-month {
      padding: 0px 0px 0px 24px;
    }
    .rdp-caption_label {
      font-weight: 400;
      line-height: 130%;
    }
    .rdp-caption_start .rdp-caption {
      padding: 0px 0px 11px;
    }

    tr,
    th,
    td {
      vertical-align: middle;
    }
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    padding: 0px;
    .rdp-month {
      padding: 24px 0px 0px;
    }

    .rdp-month.rdp-caption_start {
      border: none;
    }
  }
`;

const StyledCaptionMobile = styled.div`
  display: none;
  @media (max-width: 1485px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
    h1 {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 130%;
      font-family: Roboto;
    }
    button {
      height: 24px;
      width: 24px;
      background: transparent;
      cursor: pointer;
      svg {
        height: 24px;
        width: 24px;
      }
    }
  }
`;

function CustomCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <StyledCaptionMobile>
      <button type='button' disabled={!previousMonth} onClick={() => previousMonth && goToMonth(previousMonth)}>
        <LeftChevron />
      </button>
      {/*  eslint-disable-next-line react/destructuring-assignment */}
      <h1>{format(props.displayMonth, 'MMMM yyy')}</h1>
      <button type='button' disabled={!nextMonth} onClick={() => nextMonth && goToMonth(nextMonth)}>
        <RightChevron />
      </button>
    </StyledCaptionMobile>
  );
}

const DatePicker = ({ isEcommerceLayout, setValue, setDatePickerIsOpen, control, locale }: Props) => {
  const { t } = useTranslation('dashboards');
  const [range, setRange] = useState<DateRange | undefined>();
  const [selectedPeriod, setSelectedPeriod] = useState<string>();
  const [month, setMonth] = useState<Date>(range?.to || new Date());

  const watchStartDate = useWatch({ control, name: 'startDate' });
  const watchEndDate = useWatch({ control, name: 'endDate' });

  const PERIOD_OPTIONS = useMemo(
    () => [
      t('DATEPICKER.OPTION_LASTWEEK'),
      t('DATEPICKER.OPTION_LASTTWOWEEKS'),
      t('DATEPICKER.OPTION_LASTMONTH'),
      t('DATEPICKER.OPTION_LASTSIXMONTHS'),
      t('DATEPICKER.OPTION_LASTYEAR'),
      t('DATEPICKER.OPTION_CHOOSE'),
    ],
    [t]
  );

  useEffect(() => {
    if (watchStartDate && watchEndDate) {
      setRange({ from: watchStartDate, to: watchEndDate });
      setMonth(watchEndDate);
    }
    const period = calculatePeriod(watchStartDate, watchEndDate, t);

    // Focus on selected period when mobile
    if (window.innerWidth <= 960) {
      const periodButtonIndex = period && PERIOD_OPTIONS.indexOf(period);
      document.getElementById(`period-${periodButtonIndex}-mobile`)?.focus();
    }

    setSelectedPeriod(period);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchStartDate, watchEndDate]);

  const handleApply = () => {
    if (range?.from && range?.to) {
      setValue('startDate', startOfDay(new Date(range.from)));
      setValue('endDate', endOfDay(new Date(range.to)));
    }
    setDatePickerIsOpen(false);
  };

  const handleCancel = () => {
    setRange(undefined);
    if (!watchStartDate && !watchEndDate) {
      setValue('startDate', null);
      setValue('endDate', null);
    }
    setDatePickerIsOpen(false);
  };

  const handleChoosePeriod = (period: string) => {
    let startDate;
    let endDate;

    const periodMappings: { [key: string]: () => Date | undefined } | undefined = {};
    periodMappings[t('DATEPICKER.OPTION_LASTWEEK')] = () => {
      endDate = endOfDay(new Date());
      startDate = startOfDay(subWeeks(new Date(), 1));
      return new Date();
    };

    periodMappings[t('DATEPICKER.OPTION_LASTTWOWEEKS')] = () => {
      endDate = endOfDay(new Date());
      startDate = startOfDay(subWeeks(new Date(), 2));
      return new Date();
    };

    periodMappings[t('DATEPICKER.OPTION_LASTMONTH')] = () => {
      endDate = endOfMonth(subMonths(new Date(), 1)); // End of the previous month
      startDate = startOfMonth(subMonths(new Date(), 1));
      startDate.setDate(1);
      return addMonths(new Date(), -1);
    };

    periodMappings[t('DATEPICKER.OPTION_LASTSIXMONTHS')] = () => {
      const today = new Date();
      endDate = endOfMonth(subMonths(today, 1)); // End of the previous month
      startDate = startOfMonth(subMonths(today, 6));
      startDate.setDate(1);
      const previousMonth = addMonths(new Date(), -1);
      return previousMonth;
    };

    periodMappings[t('DATEPICKER.OPTION_LASTYEAR')] = () => {
      const currentDate = new Date();
      startDate = startOfYear(subYears(currentDate, 1));
      endDate = endOfYear(subYears(currentDate, 1));
      return addMonths(endDate, -1);
    };

    const selectedPeriodHandler: () => Date | undefined = periodMappings[period];
    if (selectedPeriodHandler) {
      const newMonth = selectedPeriodHandler();
      setMonth(newMonth || new Date());
    } else {
      setRange(undefined);
    }

    if (startDate && endDate) {
      setRange({ from: startDate, to: endDate });
    }
    setSelectedPeriod(period);
  };

  const handleSelectDay = (selectedRange: DateRange): any => {
    const newRange: DateRange = selectedRange;
    if (newRange?.from?.toString() === newRange?.to?.toString()) {
      setRange(undefined);
      setSelectedPeriod(String(t('DATEPICKER.OPTION_CHOOSE')));
      return;
    }

    if (newRange?.to) {
      newRange.to = endOfDay(new Date(newRange.to));
    }

    setRange(newRange);
    setSelectedPeriod(String(t('DATEPICKER.OPTION_CHOOSE')));

    if (!newRange.to && format(newRange?.from || 0, 'MM/dd/yy') === format(new Date(), 'MM/dd/yy')) {
      setSelectedPeriod('Hoy');
    }
  };

  const dayPickerLocale: Locale = useMemo(() => {
    switch (locale) {
      case 'en':
        return enUS;
      case 'es':
        return es;
      case 'pt':
        return pt;
      default:
        return enUS;
    }
  }, [locale]);

  const datepickerOptions = useMemo(
    () => ({
      mode: 'range' as const,
      numberOfMonths: {
        default: 2,
        mobile: 1,
      },
      onSelect: handleSelectDay as SelectRangeEventHandler,
      month,
      onMonthChange: setMonth,
      selected: range,
      locale: dayPickerLocale,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [range, month, dayPickerLocale]
  );

  return (
    <StyledContainer isEcommerceLayout={isEcommerceLayout}>
      <StyledMainContent>
        <StyledOptionsContainer>
          {PERIOD_OPTIONS.map(period => (
            <StyledPeriodButton
              type='button'
              onClick={() => handleChoosePeriod(period)}
              key={period}
              isSelected={selectedPeriod === period}>
              {period}
            </StyledPeriodButton>
          ))}
        </StyledOptionsContainer>
        <StyledShadowMobile defaultActive horizontalScroll>
          <StyledOptionsContainerMobile>
            {PERIOD_OPTIONS.map((period, index) => (
              <StyledPeriodButton
                type='button'
                onClick={() => handleChoosePeriod(period)}
                id={`period-${index}-mobile`}
                key={period}
                isSelected={selectedPeriod === period}>
                {period}
              </StyledPeriodButton>
            ))}
          </StyledOptionsContainerMobile>
        </StyledShadowMobile>
        <StyledCalendarContainer>
          <DayPicker {...datepickerOptions} numberOfMonths={datepickerOptions.numberOfMonths.default} />
        </StyledCalendarContainer>
        <StyledCalendarContainerMobile>
          <DayPicker
            {...datepickerOptions}
            numberOfMonths={datepickerOptions.numberOfMonths.mobile}
            components={{
              Caption: CustomCaption,
            }}
          />
        </StyledCalendarContainerMobile>
      </StyledMainContent>
      <StyledFooter>
        <StyledDatesContainer>
          {range?.from !== undefined ? (
            <>
              <StyledDateContent>
                <p>{t('DATEPICKER.DATES')}</p>
                <StyledDate>
                  {range?.from && format(range?.from, 'MM/dd/yyyy')} - {range?.to && format(range?.to, 'MM/dd/yyyy')}
                </StyledDate>
              </StyledDateContent>

              <StyledFilterBtn onClick={() => setRange(undefined)}>{t('DATEPICKER.RESTORE_FILTERS')}</StyledFilterBtn>
            </>
          ) : (
            <StyledFilterDisabled>{t('DATEPICKER.RESTORE_FILTERS')}</StyledFilterDisabled>
          )}
        </StyledDatesContainer>

        <ButtonsContainer>
          <StyledButton small variant='secondary' type='button' onClick={handleCancel}>
            {t('DATEPICKER.CANCEL')}
          </StyledButton>
          <StyledButton
            small
            type='button'
            onClick={handleApply}
            disabled={
              (!range?.from || format(range?.from || 0, 'MM/dd/yy') !== format(new Date(), 'MM/dd/yy')) && !range?.to
            }>
            {t('DATEPICKER.APPLY')}
          </StyledButton>
        </ButtonsContainer>
      </StyledFooter>
    </StyledContainer>
  );
};

export default DatePicker;

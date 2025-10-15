import DatePicker from '@ui/datepicker/datepicker';
import { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styled, { css } from 'styled-components';
import DownArrow from '@icons/down-arrow';
import { format } from 'date-fns';
import { useClickOutside } from '@hooks/useClickOutside';

import { Theme } from '../../../theme/theme';

// date picker elements
export const getPeriodStyles = ({ isSelected, hasError }: { isSelected: boolean; hasError: boolean }) => {
  if (hasError) {
    return css`
      border-color: ${({ theme }: { theme: Theme }) => theme.colors.error};
    `;
  }

  return css`
    border-color: ${({ theme }: { theme: Theme }) => (isSelected ? theme.colors.black : theme.colors.grey)};

    &:hover {
      border-color: ${({ theme }: { theme: Theme }) => theme.colors.black};
    }
  `;
};

const StyledPeriodWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledPeriodButton = styled.div`
  display: inline-block;
  font-size: 12px;
  font-weight: 300;
  margin: auto 13px auto auto;
`;

const StylePeriodLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  cursor: pointer;
`;

const StyledPeriodContainer = styled.div<any & { hasError: boolean; isSelected: boolean }>`
  width: 239px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${({ isSelected }) => (isSelected ? ({ theme }: { theme: Theme }) => theme.colors.blue : '#CCDBF2')} !important;
  border-radius: 8px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  height: 44px;
  line-height: 22px;
  outline: 0;
  padding-right: 10px;
  padding: 8px 12px;
  transition: all 0.5s ease;

  ${({ hasError, isSelected }: { hasError: boolean; isSelected: boolean }) =>
    getPeriodStyles({ hasError, isSelected })};

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const StyledIcon = styled.div<{ $isOpen: boolean }>`
  transition: all 0.3s ease-out;
  height: 24px;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const renderDatesText = (startDate?: Date, endDate?: Date) => {
  if (!startDate && !endDate) return '';
  if (format(startDate || 0, 'MM/dd/yy') === format(endDate || 0, 'MM/dd/yy'))
    return format(startDate || 0, 'MM/dd/yy');

  return `${format(startDate || 0, 'MM/dd/yy')} - ${format(endDate || 0, 'MM/dd/yy')}`;
};

const DatePickerContainer = ({ isEcommerceLayout, control, setValue, getValues, locale }: any) => {
  const { t } = useTranslation('dashboards');
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const { startDate, endDate } = getValues();
  const selectRef = useRef<HTMLDivElement | null>(null);

  useClickOutside({
    ref: selectRef,
    callback: () => {
      setDatePickerIsOpen(false);
    },
  });

  return (
    <StyledPeriodWrapper ref={selectRef}>
      <StyledPeriodContainer isSelected={datePickerIsOpen} onClick={() => setDatePickerIsOpen(prev => !prev)}>
        <StylePeriodLabel>{t('DATEPICKER.PERIOD')}</StylePeriodLabel>
        <StyledPeriodButton>{renderDatesText(startDate, endDate)}</StyledPeriodButton>
        <StyledIcon $isOpen={datePickerIsOpen}>
          <DownArrow />
        </StyledIcon>
      </StyledPeriodContainer>
      {datePickerIsOpen && (
        <DatePicker
          isEcommerceLayout={isEcommerceLayout}
          locale={locale}
          control={control}
          setValue={setValue}
          setDatePickerIsOpen={setDatePickerIsOpen}
        />
      )}
    </StyledPeriodWrapper>
  );
};

export default DatePickerContainer;

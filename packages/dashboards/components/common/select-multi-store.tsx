/* eslint-disable react/require-default-props */
import styled, { css, useTheme } from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useRef, useState } from 'react';
import SearchIcon from '@icons/search-icon';
import Select, { components, GroupBase, MenuProps, OptionProps, Theme as ReactSelectTheme } from 'react-select';
import DownArrow from '@icons/down-arrow';
import TextBody from '@ui/text-body';
import CloseIcon from '@icons/close-icon';
import { useClickOutside } from '@hooks/useClickOutside';
import { Theme } from '../../theme/theme';
import Checkbox from './checkbox';
import { ALL_OPTION_SELECTED } from './dropdowns/store-dropdown';
import Button from './button';

const StyledWrapper = styled.div`
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const StyledWrapperContent = styled.div<{ isOpen: boolean }>`
  width: 390px;
  height: 44px;
  border-radius: 6px;
  border: 2px solid ${p => (p.isOpen ? ({ theme }: { theme: Theme }) => theme.colors.blue : '#CCDBF2')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.5s ease;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    width: auto;
  }
`;

const StyledIcon = styled.div<{ isOpen: boolean }>`
  height: 24px;
  transition: all 0.3s ease-out;
  transform: ${(props: { isOpen: boolean }) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const StyledContainer = styled.div`
  margin-top: 16px;
  width: 390px;
  position: absolute;
  z-index: 99;
  display: flex;
  flex-direction: column;
  .span {
    display: flex;
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    width: -webkit-fill-available;
    width: -moz-available;
    max-width: 65%;
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    max-width: -webkit-fill-available;
    max-width: -moz-available;
    left: 0;
    margin-right: 24px;
    margin-left: 24px;
  }
`;

const StyledList = styled.div<{ isOpen: boolean }>`
  display: ${p => (p.isOpen ? 'flex' : 'none')};
`;

const StyledError = styled(TextBody)<{ isValid?: boolean; isError?: boolean }>`
  color: ${({ isValid, isError }) => {
    if (isValid) return 'green';
    if (isError) return 'red';
    return 'transparent';
  }};
  user-select: none;
`;

const ChevronWrapper = styled.div<{ isOpen: boolean; variant: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  // set placeholder color
  * > .Select__placeholder {
    font-size: 14px;
  }
`;

const StyledSelect = styled(Select)<{
  touched?: boolean;
  invalid?: boolean;
  customTheme: Theme;
}>`
  border-radius: 8px;
  background: ${({ customTheme }) => customTheme.colors.white};
  box-shadow: 0px 16px 40px rgba(17, 24, 39, 0.1);
  padding: 16px;
  .Select__control {
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
    display: flex;
    align-content: center;
    height: 46px;
    border: 1px solid ${({ customTheme }) => customTheme.colors.grey};
    border-radius: 8px;
    padding: 8px 10px;
    &:hover {
      border: 1px solid ${({ customTheme }) => customTheme.colors.grey};
      box-shadow: none;
    }
    ${props =>
      props.invalid && props.touched
        ? css`
            :not(:focus) {
              border: 1px solid ${({ customTheme }: { customTheme: Theme }) => customTheme.colors.redError};
            }
          `
        : ''}
  }

  .Select__control--is-disabled {
    background-color: transparent !important;
    color: ${({ customTheme }) => customTheme.colors.lightGrey};
  }
  .Select__multi-value {
    background: ${({ customTheme }) => customTheme.colors.lightBlue};
    padding: 6px 12px 6px 12px;
    border-radius: 8px;
    margin: 0px;
  }

  .Select__multi-value__label {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
  }

  .Select__multi-value__remove {
    &:hover {
      background: ${({ customTheme }) => customTheme.colors.lightBlue};
    }

    svg {
      fill: ${({ customTheme }) => customTheme.colors.black};

      &:hover {
        fill: ${({ customTheme }) => customTheme.colors.black};
      }
    }
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__menu {
    position: inherit;
    background: none;
    box-shadow: none;
    margin-top: 24px;
    margin-bottom: 0;
  }

  .Select__option {
    color: ${({ customTheme }) => customTheme.colors.black};
    padding: 10px 16px;
    font-size: 16px;
    font-family: 'Roboto';
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer !important;
  }
  .Select__option.Select__option--is-focused.css-1i38fvp-option {
    background: transparent;
  }

  .Select__placeholder {
    font-size: 16px;
    font-family: 'Roboto';
    font-style: italic;
    color: ${({ customTheme }) => customTheme.colors.grey};
    font-weight: ${p => p.isDisabled && '400'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .Select__value-container {
    width: max-content;
  }
  .Select__single-value {
    font-size: 16px;
    font-family: 'Roboto';
  }

  .Select__input-container {
    font-size: 16px;
    color: ${({ customTheme }) => customTheme.colors.black};
  }

  .Select__menu-list {
    padding: 0;
    padding-right: 8px;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ customTheme }) => customTheme.colors.grey};
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #5c5c5c;
    }
  }
`;
const StyledOption = styled.div<{ $isSelected: boolean }>`
  display: flex;
  gap: 8px;
  height: 40px;
  align-items: center;
  background: ${({ $isSelected }) => ($isSelected ? '#ccdbf2' : 'transparent')};
  border-radius: 8px;
  padding: 0 18.5px;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  label {
    font-weight: ${({ $isSelected }) => ($isSelected ? 'bold' : 'normal')};
    line-height: 150%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledChipWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledChip = styled.span<{ chipLenght: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
  border-radius: 6px;
  max-width: 120px;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const StyledChipMobile = styled(StyledChip)`
  display: none;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    display: flex;
    max-width: 100px;
  }
`;

const StyledChipLabel = styled.p`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 12px;
  font-weight: 300;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const StyledSelectedNumber = styled.span`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 12px;
  font-weight: 300;
  width: 37px;
  height: 28px;
  border-radius: 30px;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
}

@media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
  display: none;
}
`;

const StyledSelectedNumberMobile = styled(StyledSelectedNumber)`
  display: none;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  background: none;
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
`;

const StyledCloseWrapper = styled.div`
  flex-shrink: 0;
`;

const StyledTitle = styled(TextBody)`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`;

const StyledOptionText = styled(TextBody)`
  font-weight: 400;
  font-size: 14px;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 16px;
  }
`;

const StyledButtonsContent = styled.div`
  gap: 16px;
  display: flex;
  align-items: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    width: 100%;
    button {
      width: 100%;
    }
  }
`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownIndicator = ({ selectProps: { menuIsOpen, variant } }: any) => {
  return (
    <ChevronWrapper isOpen={menuIsOpen} variant={variant}>
      <SearchIcon />
    </ChevronWrapper>
  );
};

const Option = ({
  innerProps,
  isSelected,
  label,
}: JSX.IntrinsicAttributes & OptionProps<unknown, boolean, GroupBase<unknown>>) => {
  const { ref, ...rest } = innerProps;
  return (
    <StyledOption
      $isSelected={isSelected}
      ref={ref as React.MutableRefObject<HTMLDivElement>}
      onMouseDown={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
      {...rest}>
      <Checkbox checked={isSelected} readOnly />
      <label htmlFor='label' style={{ cursor: 'pointer' }}>
        <StyledOptionText>{label}</StyledOptionText>
      </label>
    </StyledOption>
  );
};

const Menu = ({
  selectProps,
  isLoading,
  ...props
}: JSX.IntrinsicAttributes & MenuProps<unknown, boolean, GroupBase<unknown>>) => {
  const { t } = useTranslation(['dashboards', 'dashboard-store', 'store']);

  return (
    <components.Menu {...props} selectProps={selectProps} isLoading>
      <div>
        {props.children}
        {!isLoading && (
          <StyledButtonsWrapper>
            <StyledButton
              onMouseDown={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
              onClick={
                (
                  selectProps as {
                    onUndoSelect?: () => void;
                  }
                )?.onUndoSelect
              }>
              {t('store:STORE_DROPDOWN.UNDO_SELECT')}
            </StyledButton>
            <StyledButtonsContent>
              <Button
                variant='secondary'
                small
                onClick={(selectProps as { cancelOptions?: () => void })?.cancelOptions}
                onMouseDown={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}>
                {t('dashboards:CANCEL')}
              </Button>
              <Button
                small
                onClick={
                  (
                    selectProps as {
                      applyItems?: () => void;
                    }
                  )?.applyItems
                }
                onMouseDown={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}>
                {t('dashboards:APPLY')}
              </Button>
            </StyledButtonsContent>
          </StyledButtonsWrapper>
        )}
      </div>
    </components.Menu>
  );
};

type TSelectProps = {
  options?: any;
  name?: string;
  onChange: (e: any, actionMeta: any) => void;
  isValid?: boolean;
  isDisabled?: boolean;
  error?: string;
  value?: any;
  touched?: boolean;
  hideSelectedOptions?: boolean;
  closeMenuOnSelect?: boolean;
  onBlur?: (e: React.FocusEvent) => void;
  isLoading?: boolean;
  selected: any;
  onUndoSelect?: () => void;
  applyItems: (items: { label: string; value: string }[]) => void;
  cancelOptions?: () => void;
  onRemoveStore?: (id: string) => void;
  onClearFilters?: () => void;
};

const CustomMultiSelect = ({
  options,
  name,
  onChange,
  isValid,
  isDisabled,
  error,
  value,
  touched,
  onBlur,
  hideSelectedOptions = true,
  closeMenuOnSelect = true,
  isLoading = false,
  selected,
  onUndoSelect,
  applyItems,
  onRemoveStore,
  cancelOptions,
  onClearFilters,
}: TSelectProps) => {
  const { t } = useTranslation(['dashboards', 'dashboard-store', 'store']);
  const theme = useTheme() as Theme;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectedLength = selected.length >= 2;
  const selectRef = useRef<HTMLDivElement | null>(null);

  useClickOutside({
    ref: selectRef,
    callback: () => {
      cancelOptions?.();
      setIsOpen(false);
    },
  });

  const handleWrapperClick = () => {
    if (isOpen) cancelOptions?.();
    setIsOpen(!isOpen);
  };

  return (
    <StyledWrapper ref={selectRef}>
      <StyledWrapperContent onClick={handleWrapperClick} aria-hidden='true' isOpen={isOpen}>
        <StyledTitle>{t('store:STORE_DROPDOWN.STORES')}</StyledTitle>
        <StyledChipWrapper>
          {selected.map((data: { label: string; value: string }, index: number) => {
            return (
              index < 2 && (
                <StyledChip chipLenght={selectedLength} key={data.value}>
                  <StyledChipLabel title={data.label}>{data.label}</StyledChipLabel>
                </StyledChip>
              )
            );
          })}

          {selected.map((data: { label: string; value: string }, index: number) => {
            return (
              index < 1 && (
                <StyledChipMobile chipLenght={selectedLength} key={data.value}>
                  <StyledChipLabel title={data.label}>{data.label}</StyledChipLabel>
                </StyledChipMobile>
              )
            );
          })}

          {selected.length > 2 && <StyledSelectedNumber>+ {selected.length - 2}</StyledSelectedNumber>}
          {selected.length > 1 && <StyledSelectedNumberMobile>+ {selected.length - 1}</StyledSelectedNumberMobile>}

          <StyledIcon isOpen={isOpen}>
            <DownArrow />
          </StyledIcon>
        </StyledChipWrapper>
      </StyledWrapperContent>
      <StyledList isOpen={isOpen}>
        <StyledContainer>
          <StyledSelect
            menuIsOpen
            name={name}
            onChange={onChange}
            options={options}
            value={value}
            components={{
              DropdownIndicator,
              Option,
              Menu,
            }}
            tabSelectsValue={false}
            isLoading={isLoading}
            instanceId={name}
            placeholder={<StyledOptionText>{t('store:STORE_DROPDOWN.SEARCH')}</StyledOptionText>}
            classNamePrefix='Select'
            invalid={!isValid}
            touched={touched}
            onBlur={onBlur}
            customTheme={theme}
            controlShouldRenderValue={false}
            isSearchable
            isMulti
            isDisabled={isDisabled}
            hideSelectedOptions={hideSelectedOptions}
            closeMenuOnSelect={closeMenuOnSelect}
            isClearable={false}
            theme={(selectTheme: ReactSelectTheme) => ({
              ...selectTheme,
              colors: {
                ...selectTheme.colors,
                primary25: theme.colors.cloudBlue,
                primary: theme.colors.skyBlue,
                neutral30: theme.colors.blue,
              },
            })}
            // @ts-ignore
            onClearFilters={onClearFilters}
            onUndoSelect={onUndoSelect}
            applyItems={() => {
              applyItems?.(selected);
              setIsOpen(!isOpen);
            }}
            cancelOptions={() => {
              cancelOptions?.();
              setIsOpen(!isOpen);
            }}
          />
          <StyledError variant='smallLight' isValid={isValid} isError={!isValid}>
            {touched && error}
          </StyledError>
        </StyledContainer>
      </StyledList>
    </StyledWrapper>
  );
};

export default CustomMultiSelect;

/* eslint-disable react/button-has-type */
import styled, { css, useTheme } from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useModal } from '@ebay/nice-modal-react';
import Select, { components, GroupBase, MenuProps, OptionProps, Theme as ReactSelectTheme } from 'react-select';
import DownArrow from '@icons/down-arrow';
import TextBody from '@ui/text-body';
import AddOnlyIcon from '@icons/add-only-icon';
import { Theme } from '../../theme/theme';
import Checkbox from './checkbox';
import SegmentsNewDashboardModal from './modals/segments-new-dashboard-modal';

const StyledContainer = styled.div<{ marginTop?: number; isTemplateDropdown?: boolean }>`
  width: 100%;
  margin-top: ${props => props.marginTop}px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${p => !p.isTemplateDropdown && '8px'};
`;

const StyledLabel = styled(TextBody)<{ isDisabled?: boolean; isTemplateDropdown?: boolean }>`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-size: ${p => p.isTemplateDropdown && '14px'};
  font-weight: ${p => p.isTemplateDropdown && '400'};
  margin-right: ${p => p.isTemplateDropdown && '4px'};
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
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    transition: all 0.2s ease-out;
    transform: ${(props: { isOpen: boolean }) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

const StyledSelect = styled(Select)<{
  touched?: boolean;
  invalid?: boolean;
  customTheme: Theme;
  isTemplateDropdown?: boolean;
}>`
  .Select__control {
    font-size: 16px;
    border: ${props =>
      props.touched && !props.invalid
        ? `1px solid ${props.customTheme.colors.greenSuccess}`
        : `1px solid ${props.customTheme.colors.black}`};

    border: ${p => p.isTemplateDropdown && 'none'};
    border-radius: 8px;
    padding: ${p => (p.isTemplateDropdown ? '0px' : '8px 12px')};
    cursor: pointer;

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
    padding: 8px;
    z-index: 3;
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

  .Select__placeholder {
    font-size: 16px;
    font-family: 'Roboto';
    font-style: ${p => (p.isDisabled ? 'normal' : 'italic')};
    color: ${p => (!p.isDisabled ? ({ customTheme }) => customTheme.colors.grey : '#111827')};
    font-weight: ${p => p.isDisabled && '400'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .Select__value-container {
    width: max-content;
    padding: ${p => p.isTemplateDropdown && '0px'};
  }
  .Select__single-value {
    font-size: 16px;
    font-family: 'Roboto';
    font-weight: ${p => p.isTemplateDropdown && '700'};
  }

  .Select__input-container {
    font-size: 16px;
    color: ${({ customTheme }) => customTheme.colors.black};
  }

  .Select__menu-list {
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
const StyledOption = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledButon = styled.button`
  cursor: pointer;
  background: none;
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  margin: 24px 0px 16px 16px;
  svg {
    margin-left: 4px;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownIndicator = ({ selectProps: { menuIsOpen, variant } }: any) => {
  return (
    <ChevronWrapper isOpen={menuIsOpen} variant={variant}>
      <DownArrow />
    </ChevronWrapper>
  );
};

const Option = (props: JSX.IntrinsicAttributes & OptionProps<unknown, boolean, GroupBase<unknown>>) => {
  return (
    <components.Option {...props}>
      <StyledOption>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <Checkbox checked={props.isSelected} readOnly /> <label htmlFor='label'>{props.label}</label>
      </StyledOption>
    </components.Option>
  );
};

const Menu = (props: JSX.IntrinsicAttributes & MenuProps<unknown, boolean, GroupBase<unknown>>) => {
  const { remove } = useModal();
  const { t } = useTranslation('dashboards');
  const { show: showSegmentsNewDashboardModal } = useModal(SegmentsNewDashboardModal);

  const handleNewDashboard = () => {
    showSegmentsNewDashboardModal();
    remove();
  };

  return (
    <components.Menu {...props}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
      <StyledButon onClick={handleNewDashboard}>
        {t('CREATE_NEW_DASHBOARD')}
        <AddOnlyIcon />
      </StyledButon>
    </components.Menu>
  );
};

type TSelectProps = {
  options?: any;
  name?: string;
  placeholder: string;
  onChange: (e: any) => void;
  isValid?: boolean;
  isDisabled?: boolean;
  label?: string;
  error?: string;
  marginTop?: number;
  value?: any;
  touched?: boolean;
  isSearchable?: boolean;
  isMulti?: boolean;
  withCheckbox?: boolean;
  hideSelectedOptions?: boolean;
  closeMenuOnSelect?: boolean;
  withButton?: boolean;
  onBlur?: (e: React.FocusEvent) => void;
  isTemplateDropdown?: boolean;
};

const CustomSelect = ({
  options,
  name,
  placeholder,
  onChange,
  isValid,
  isDisabled,
  label,
  error,
  marginTop = 24,
  value,
  touched,
  onBlur,
  isSearchable,
  isMulti,
  withCheckbox = false,
  hideSelectedOptions = true,
  closeMenuOnSelect = true,
  withButton = false,
  isTemplateDropdown = false,
}: TSelectProps) => {
  const theme = useTheme() as Theme;

  const useCheckbox = withCheckbox ? { Option, DropdownIndicator } : { DropdownIndicator };

  const useButton = withButton ? { Menu, DropdownIndicator } : { DropdownIndicator };

  return (
    <StyledContainer marginTop={marginTop} isTemplateDropdown={isTemplateDropdown}>
      <StyledLabel isDisabled={isDisabled} isTemplateDropdown={isTemplateDropdown}>
        {label}
      </StyledLabel>
      <StyledSelect
        isTemplateDropdown={isTemplateDropdown}
        name={name}
        onChange={onChange}
        options={options}
        value={value}
        components={withButton ? useButton : useCheckbox}
        instanceId={name}
        placeholder={placeholder}
        classNamePrefix='Select'
        invalid={!isValid}
        touched={touched}
        onBlur={onBlur}
        customTheme={theme}
        isSearchable={isSearchable}
        isMulti={isMulti}
        isDisabled={isDisabled}
        hideSelectedOptions={hideSelectedOptions}
        closeMenuOnSelect={closeMenuOnSelect}
        theme={(selectTheme: ReactSelectTheme) => ({
          ...selectTheme,
          colors: {
            ...selectTheme.colors,
            primary25: theme.colors.cloudBlue,
            primary: isTemplateDropdown ? 'none' : theme.colors.skyBlue,

            neutral30: theme.colors.blue,
          },
        })}
      />
      <StyledError variant='smallLight' isValid={isValid} isError={!isValid}>
        {touched && error}
      </StyledError>
    </StyledContainer>
  );
};

export default CustomSelect;

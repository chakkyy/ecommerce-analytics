import { useTranslation } from 'next-i18next';
import styled, { css } from 'styled-components';
import React, { forwardRef } from 'react';
import TextBody from '@ui/text-body';

import { DefaultTFuncReturn } from 'i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Controller, Control } from 'react-hook-form';
import { PersonalDataForm } from '@interfaces/index';
import { phoneRegex } from '@utils/regex';
import { Theme } from '../../theme/theme';

const StyledContainer = styled.div<{
  marginTop?: number;
}>`
  width: 100%;
  margin-top: ${props => props.marginTop}px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledLabel = styled(TextBody)<{ isDisabled?: boolean }>`
  color: ${props =>
    props.isDisabled
      ? ({ theme }: { theme: Theme }) => theme.colors.grey
      : ({ theme }: { theme: Theme }) => theme.colors.black};
`;

const StyledError = styled(TextBody)<{ isValid?: boolean; isError?: boolean }>`
  color: ${({ isValid, isError }) => {
    if (isValid) return 'green';
    if (isError) return 'red';
    return 'transparent';
  }};
  user-select: none;
`;

const StyledInput = styled(PhoneInput)<{
  isValid: boolean;
  touched: boolean;
  disabled?: boolean;
}>`
  .form-control {
    transition: all 0.2s ease-in-out;
    background: transparent;
    width: 100%;
    height: 50px;
    border: 1px solid black;
    padding: 13.5px 60px;
    box-sizing: border-box;
    border-radius: 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${props =>
      props.touched &&
      props.isValid &&
      css`
        border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.greenSuccess};
      `}

    ${props =>
      !props.disabled && props.touched && !props.isValid
        ? css`
            :not(:focus) {
              border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.redError};
            }
          `
        : ''}
  
      ${props =>
      props.disabled &&
      css`
        cursor: not-allowed;
        color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
        border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.lightGrey} !important;
      `}

    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active {
      box-shadow: 0 0 0 30px white inset !important;
      -webkit-box-shadow: 0 0 0 30px white inset !important;
    }

    ::placeholder {
      color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
      font-style: italic;
      font-weight: 300;
    }

    :focus-visible {
      outline: none;
      border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.blue};
      ::placeholder {
        color: ${({ theme }: { theme: Theme }) => theme.colors.black};
      }
    }

    :hover {
      border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.blue};
    }
  }

  .flag-dropdown {
    height: 30px;
    top: 10px;
    margin-left: 10px;
    border: none;
    background: transparent;
  }
  .selected-flag {
    background-color: transparent;
    :focus-visible {
      outline: none;
      border-radius: 10px;
      border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.blue};
    }
  }
  .form-control.invalid-number {
    background-color: transparent;
  }
  .form-control.invalid-number:focus {
    background-color: transparent;
  }

  .country-list {
    padding: 16px;
    width: 239px px;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }: { theme: Theme }) => theme.colors.grey};
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track-piece {
      background: ${({ theme }: { theme: Theme }) => theme.colors.white};
    }
  }
  .country.highlight {
    background-color: ${({ theme }: { theme: Theme }) => theme.colors.cloudBlue} !important;
    border-radius: 8px;
    font-weight: 700;

    .country-name {
      font-weight: 700 !important;
    }
  }

  .country-list .country {
    padding: 8px 16px;
    margin-bottom: 8px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${({ theme }: { theme: Theme }) => theme.colors.cloudBlue} !important;
      border-radius: 8px;
      font-weight: 700 !important;
      .country-name {
        font-weight: 700 !important;
      }
    }
    .country-name {
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      transition: all 0.2s ease-in-out;
      color: ${({ theme }: { theme: Theme }) => theme.colors.black};
    }

    .dial-code {
      font-family: 'Roboto', sans-serif;
      color: ${({ theme }: { theme: Theme }) => theme.colors.black};
    }
  }
`;

const StyledBottomMessage = styled(TextBody)<{ href?: string }>`
  color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
  cursor: ${props => (props.href ? 'pointer' : 'default')};
  text-align: right;
  user-select: none;
`;

const StyledWrapperBottomMessages = styled.div`
  display: grid;
  grid-auto-flow: column;
`;

type Props = {
  isDisabled?: boolean;
  label: string;
  bottomMessage?: DefaultTFuncReturn;
  bottomHref?: string;
  forwardedAs?: React.ElementType;
  marginTop?: number;
  isValid?: boolean;
  passwordsMatch?: boolean;
  touched?: boolean;
  control: Control<PersonalDataForm & { googleId: string }>;
  tabIndex?: number;
};

const PhoneInputComponent = forwardRef<HTMLInputElement, Props>(
  ({ marginTop = 24, label, bottomMessage, bottomHref, forwardedAs, isDisabled, control, tabIndex }, ref) => {
    const { t } = useTranslation('signup');

    return (
      <StyledContainer marginTop={marginTop}>
        <StyledLabel isDisabled={isDisabled}>{label}</StyledLabel>

        <Controller
          name='phoneNumber'
          control={control}
          rules={{
            required: true,
            minLength: { value: 8, message: String(t('PATTERN.PHONE_MIN')) },
            maxLength: { value: 15, message: String(t('PATTERN.PHONE_MAX')) },
            pattern: {
              value: phoneRegex,
              message: String(t('PATTERN.PHONE')),
            },
          }}
          render={({ field, fieldState: { invalid, isTouched, error } }) => (
            <>
              <StyledInput
                inputProps={{
                  name: 'phone',
                  required: true,
                  ref: { ref },
                  tabIndex,
                }}
                isValid={!invalid}
                touched={isTouched}
                country='ar'
                regions={['america', 'europe', 'asia', 'oceania', 'africa']}
                disabled={isDisabled}
                {...field}
              />

              <StyledWrapperBottomMessages>
                <StyledError variant='smallLight' isValid={!invalid} isError={invalid}>
                  {error?.message}
                </StyledError>
                {forwardedAs && (
                  <StyledBottomMessage variant='smallLight' forwardedAs={forwardedAs} href={bottomHref}>
                    {bottomMessage}
                  </StyledBottomMessage>
                )}
                {!forwardedAs && <StyledBottomMessage variant='smallLight'>{bottomMessage}</StyledBottomMessage>}
              </StyledWrapperBottomMessages>
            </>
          )}
        />
      </StyledContainer>
    );
  }
);
PhoneInputComponent.displayName = 'PhoneInputComponent';

export default PhoneInputComponent;

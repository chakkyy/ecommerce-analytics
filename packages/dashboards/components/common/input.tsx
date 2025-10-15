import styled, { css } from 'styled-components';
import React, { forwardRef, useState } from 'react';
import TextBody from '@ui/text-body';
import EyeOpen from '@icons/eye-open';
import EyeClosed from '@icons/eye-closed';

import { DefaultTFuncReturn } from 'i18next';
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

const StyledShowPasswordButton = styled.button`
  position: absolute;
  background: transparent;
  right: 20px;
  top: 45px;
  cursor: pointer;
`;

const StyledError = styled(TextBody)<{ isValid?: boolean; isError?: boolean }>`
  color: ${({ isValid, isError }) => {
    if (isValid) return 'green';
    if (isError) return 'red';
    return 'transparent';
  }};
  user-select: none;
  margin-bottom: 17px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-bottom: 8px;
  }
`;

const StyledInput = styled.input<{
  isValid?: boolean;
  touched: boolean;
  disabled?: boolean;
}>`
  transition: all 0.2s ease-in-out;
  background: transparent;
  width: 100%;
  max-height: 50px;
  border: 1px solid black;
  padding: 13.5px 20px;
  box-sizing: border-box;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  // disable background color when user fill the input with browser autocomplete
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

  ${props =>
    !props.disabled && props.touched && !props.isValid
      ? css`
          :not(:focus) {
            border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.redError};
          }
        `
      : ''}

  ${props =>
    props.touched &&
    props.isValid &&
    css`
      border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.greenSuccess};
    `}

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
      border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.lightGrey} !important;
    `}
`;

const StyledBottomMessage = styled(TextBody)<{ href?: string; bottomMessageAlingLeft?: boolean }>`
  color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
  cursor: ${props => (props.href ? 'pointer' : 'default')};
  text-align: right;
  user-select: none;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    text-align: ${p => (!p.bottomMessageAlingLeft ? 'right' : 'left')};
  }
`;

const StyledWrapperBottomMessages = styled.div`
  display: grid;
  grid-auto-flow: column;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

type Props = {
  placeholder: string;
  label: string;
  bottomMessageAlingLeft?: boolean;
  type?: React.HTMLInputTypeAttribute;
  isDisabled?: boolean;
  bottomMessage?: DefaultTFuncReturn;
  bottomHref?: string;
  forwardedAs?: React.ElementType;
  marginTop?: number;
  isValid?: boolean;
  passwordsMatch?: boolean;
  emailMatch?: boolean;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  touched?: boolean;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      marginTop = 24,
      bottomMessageAlingLeft = false,
      type,
      isValid,
      passwordsMatch,
      emailMatch,
      onPaste,
      label,
      bottomMessage,
      bottomHref,
      forwardedAs,
      isDisabled,
      touched,
      error,
      ...inputProps
    },
    ref
  ) => {
    const isPassword = type === 'password';
    const patternMatchValidation = passwordsMatch || (emailMatch && !error);

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        handleShowPassword();
      }
    };

    return (
      <StyledContainer marginTop={marginTop}>
        <StyledLabel isDisabled={isDisabled}>{label}</StyledLabel>
        <StyledInput
          {...inputProps}
          ref={ref}
          isValid={isValid}
          touched={!!touched}
          disabled={isDisabled}
          onPaste={onPaste}
          type={isPassword && !showPassword ? 'password' : 'text'}
        />
        {isPassword && (
          <StyledShowPasswordButton tabIndex={0} onClick={handleShowPassword} onKeyDown={handleKeyDown} type='button'>
            {showPassword ? <EyeOpen /> : <EyeClosed />}
          </StyledShowPasswordButton>
        )}

        <StyledWrapperBottomMessages>
          {error && (
            <StyledError variant='smallLight' isValid={patternMatchValidation} isError={!isValid}>
              {touched && error}
            </StyledError>
          )}
          {forwardedAs && (
            <StyledBottomMessage variant='smallLight' forwardedAs={forwardedAs} href={bottomHref}>
              {bottomMessage}
            </StyledBottomMessage>
          )}
          {!forwardedAs && (
            <StyledBottomMessage variant='smallLight' bottomMessageAlingLeft={bottomMessageAlingLeft}>
              {bottomMessage}
            </StyledBottomMessage>
          )}
        </StyledWrapperBottomMessages>
      </StyledContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input;

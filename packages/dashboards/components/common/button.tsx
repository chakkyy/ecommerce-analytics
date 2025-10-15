import React, { MouseEventHandler, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import TextBody from '@ui/text-body';
import { Theme } from '../../theme/theme';

interface Props {
  dark?: boolean;
  small?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  width?: string;
  variant?: 'secondary' | 'danger';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  active?: boolean;
}

const StyledBorder = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 8px;
`;

const commonButtonStyles = css`
  min-height: 56px;
  max-height: 56px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  background: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  font-size: 16px;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  gap: 8px;
  border-radius: 8px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  position: relative;
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;

  svg {
    color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  }

  &:hover {
    box-shadow: 0px 8px 24px rgba(0, 40, 97, 0.2);
    cursor: pointer;
  }

  &:focus-visible {
    outline: none;
    ${StyledBorder} {
      border: 4px solid ${({ theme }: { theme: Theme }) => theme.colors.skyBlue};
    }
  }

  &:active {
    background: ${({ theme }: { theme: Theme }) => theme.colors.darkBlue};
  }

  &:disabled {
    background: ${({ theme }: { theme: Theme }) => theme.colors.lightGrey};
    color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
    cursor: not-allowed;
    svg {
      color: grey;
    }

    &:hover {
      box-shadow: none;
    }
  }
`;

const smallButtonStyles = css`
  ${commonButtonStyles}
  max-height: 34px;
  min-height: 34px;
  padding: 8px 16px;
  gap: 6px;
  font-size: 14px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const StyledButton = styled.button<Props>`
  ${commonButtonStyles}
  width: ${props => props.width || 'max-content'};

  ${props => props.small && smallButtonStyles}

  ${props =>
    props.dark &&
    css`
      background: ${({ theme }: { theme: Theme }) => theme.colors.white};
      color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
      svg {
        color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
      }

      &:hover {
        box-shadow: 0px 8px 24px rgba(17, 24, 39, 0.3);
      }

      &:active {
        background: ${({ theme }: { theme: Theme }) => theme.colors.cloudBlue};
      }

      &:disabled {
        background: ${({ theme }: { theme: Theme }) => theme.colors.marineBlue};
        color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
        svg {
          color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
        }
      }
    `}

  ${props =>
    props.variant === 'secondary' &&
    css`
      background-color: transparent;
      color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
      border: 2px solid ${({ theme }: { theme: Theme }) => theme.colors.blue};
      svg {
        color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
      }

      &:hover {
        background: transparent;
      }

      &:active {
        color: ${({ theme }: { theme: Theme }) => theme.colors.secondaryBlue};
        border: 2px solid ${({ theme }: { theme: Theme }) => theme.colors.secondaryBlue};
        background: ${({ theme }: { theme: Theme }) => theme.colors.white};
        svg {
          color: ${({ theme }: { theme: Theme }) => theme.colors.secondaryBlue};
        }
      }

      &:disabled {
        background: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
        border: 2px solid ${({ theme }: { theme: Theme }) => theme.colors.grey};
      }
    `}


    ${props =>
    props.dark &&
    props.variant === 'secondary' &&
    css`
      background: transparent;
      color: ${({ theme }: { theme: Theme }) => theme.colors.white};
      border: 2px solid ${({ theme }: { theme: Theme }) => theme.colors.white};
      svg {
        color: ${({ theme }: { theme: Theme }) => theme.colors.white};
      }

      &:hover {
        background: ${({ theme }: { theme: Theme }) => theme.colors.blue};
      }
      &:active {
        color: ${({ theme }: { theme: Theme }) => theme.colors.cloudBlue};
        border: 2px solid ${({ theme }: { theme: Theme }) => theme.colors.cloudBlue};
        svg {
          color: ${({ theme }: { theme: Theme }) => theme.colors.cloudBlue};
        }
      }

      &:disabled {
        background: transparent;
        color: ${({ theme }: { theme: Theme }) => theme.colors.marineBlue};
        border: 2px solid ${({ theme }: { theme: Theme }) => theme.colors.marineBlue};
        svg {
          color: ${({ theme }: { theme: Theme }) => theme.colors.marineBlue};
        }
      }
    `}

    ${props =>
    props.variant === 'danger' &&
    css`
      background-color: ${({ theme }: { theme: Theme }) => theme.colors.lightRed};
      color: ${({ theme }: { theme: Theme }) => theme.colors.redError};
      border: 2px solid transparent;
      svg {
        color: ${({ theme }: { theme: Theme }) => theme.colors.redError};
      }

      &:hover {
        box-shadow: 0px 16px 40px rgba(17, 24, 39, 0.1);
      }

      &:active {
        background: #ffa4a4;
      }

      &:disabled {
        background: ${({ theme }: { theme: Theme }) => theme.colors.lightGrey};
        color: ${({ theme }: { theme: Theme }) => theme.colors.grey};

        svg {
          color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
        }
      }
    `}

    ${props =>
    !props.active &&
    css`
      pointer-events: none;
      opacity: 0.3;
    `}
`;

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { children, dark, small, width, disabled, icon, variant, onClick, onMouseDown, type = 'button', active = true },
    ref
  ) => {
    return (
      <StyledButton
        type={type}
        ref={ref}
        dark={dark}
        small={small}
        disabled={disabled}
        variant={variant}
        width={width}
        onClick={onClick}
        onMouseDown={onMouseDown}
        active={active}>
        <>
          <StyledBorder />
          <TextBody variant={small ? 'small' : undefined}>{children}</TextBody>
          {icon && icon}
        </>
      </StyledButton>
    );
  }
);

export default Button;

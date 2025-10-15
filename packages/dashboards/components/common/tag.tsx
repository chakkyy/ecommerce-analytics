import React from 'react';
import styled, { css } from 'styled-components';
import { Theme } from '../../theme/theme';

interface Props {
  className?: string;
  label: string;
  variant?: 'lightOrange' | 'grey' | 'red' | 'orange' | 'blue' | 'green';
}

const commonTagStyles = css`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  border-radius: 4px;
`;

const StyledTab = styled.span<{ variant?: unknown }>`
  ${commonTagStyles}

  ${props =>
    props.variant === 'lightOrange' &&
    css`
      background: ${({ theme }: { theme: Theme }) => theme.colors.lightOrange};
      padding: 4px 10px;
    `}

    ${props =>
    props.variant === 'grey' &&
    css`
      background: ${({ theme }: { theme: Theme }) => theme.colors.lightGrey};
      padding: 4px 10px;
    `}


    ${props =>
    props.variant === 'red' &&
    css`
      background: ${({ theme }: { theme: Theme }) => theme.colors.lightRed};
      padding: 4px 10px;
    `}


    ${props =>
    props.variant === 'orange' &&
    css`
      background: ${({ theme }: { theme: Theme }) => theme.colors.orange};
      padding: 6px 12px;
    `}

    ${props =>
    props.variant === 'blue' &&
    css`
      background: ${({ theme }: { theme: Theme }) => theme.colors.cloudBlue};
      padding: 6px 12px;
    `}

    ${props =>
    props.variant === 'green' &&
    css`
      background: ${({ theme }: { theme: Theme }) => theme.colors.greenSuccess};
      padding: 6px 12px;
    `}
`;

const Tag = ({ label, className, variant }: Props) => {
  return (
    <StyledTab className={className} variant={variant}>
      {label}
    </StyledTab>
  );
};
export default Tag;

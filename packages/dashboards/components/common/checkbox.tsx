import { forwardRef } from 'react';
import styled from 'styled-components';
import CheckIcon from '@icons/check-icon';

import TextBody from '@ui/text-body';
import { Theme } from '../../theme/theme';

const StyledCheckContainer = styled.div`
  position: relative;
  max-width: 14px;
  max-height: 14px;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 2px;
  width: 14px;
  height: 14px;
`;

const StyledCheckIcon = styled(CheckIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledInput = styled.input`
  cursor: pointer;
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;

  &:focus + div {
    outline: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.marineBlue};
  }

  & + div {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.black};
    svg {
      opacity: 0;
    }
  }

  &:checked {
    & + div > svg {
      opacity: 1;
    }
  }

  &:hover + div {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.marineBlue};
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLabel = styled(TextBody)`
  padding-left: 7px;
  cursor: pointer;
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  marginTop?: number;
  allOptions?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(({ label, name, value, allOptions, ...props }, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
  };
  return (
    <StyledContainer>
      <StyledCheckContainer>
        <StyledInput
          type='checkbox'
          name={name}
          id={name}
          ref={ref as React.RefObject<HTMLInputElement>}
          {...props}
          onKeyDown={handleKeyDown}
        />
        <StyledWrapper>
          <StyledCheckIcon />
        </StyledWrapper>
      </StyledCheckContainer>
      {label && (
        <StyledLabel variant='smallLight' forwardedAs='label' htmlFor={name}>
          {label}
        </StyledLabel>
      )}
    </StyledContainer>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;

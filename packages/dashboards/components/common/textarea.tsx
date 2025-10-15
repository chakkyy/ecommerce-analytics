import styled, { css } from 'styled-components';
import React, { forwardRef } from 'react';
import TextBody from '@ui/text-body';
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

const StyledTextArea = styled.textarea<{
  disabled?: boolean;
}>`
  transition: all 0.2s ease-in-out;
  background: transparent;
  width: 100%;
  overflow-wrap: break-word;
  min-height: 98px;
  display: flex;
  border: 1px solid black;
  padding: 13.5px 20px;
  box-sizing: border-box;
  resize: none;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
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
    props.disabled &&
    css`
      cursor: not-allowed;
      color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
      border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.lightGrey} !important;
    `}
`;

type Props = {
  placeholder: string;
  isDisabled?: boolean;
  label: string;
  marginTop?: number;
};

const TextArea = forwardRef<HTMLTextAreaElement, Props>(({ marginTop = 24, label, isDisabled, ...props }, ref) => {
  return (
    <StyledContainer marginTop={marginTop}>
      <StyledLabel isDisabled={isDisabled}>{label}</StyledLabel>
      <StyledTextArea {...props} ref={ref} disabled={isDisabled} />
    </StyledContainer>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;

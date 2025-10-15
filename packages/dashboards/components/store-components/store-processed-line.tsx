import AlertIcon from '@icons/alert-icon';
import styled, { css } from 'styled-components';
import { Theme } from '../../theme/theme';

const Wrapper = styled.span<{ completeWithErrors?: boolean; error?: boolean; complete?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;

  /* color: ${props =>
    !props.completeWithErrors
      ? ({ theme }: { theme: Theme }) => theme.colors.black
      : ({ theme }: { theme: Theme }) => theme.colors.orange};
*/
  ${({ completeWithErrors }) =>
    completeWithErrors &&
    css`
      color: ${({ theme }: { theme: Theme }) => theme.colors.orange};
    `}

  ${({ error }) =>
    error &&
    css`
      color: ${({ theme }: { theme: Theme }) => theme.colors.redError};
    `}

    ${({ complete }) =>
    complete &&
    css`
      color: ${({ theme }: { theme: Theme }) => theme.colors.greenSuccess};
    `}
`;

type ProcessedLineProps = {
  completeWithErrors?: boolean;
  error?: boolean;
  complete?: boolean;
  number: string;
};
// eslint-disable-next-line import/prefer-default-export
export const StoreProcessedLine = ({ completeWithErrors, error, number, complete }: ProcessedLineProps) => {
  return (
    <Wrapper completeWithErrors={completeWithErrors} error={error} complete={complete}>
      {number} {completeWithErrors && <AlertIcon />}
    </Wrapper>
  );
};

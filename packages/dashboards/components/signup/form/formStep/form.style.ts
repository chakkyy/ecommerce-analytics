import styled from 'styled-components';

import TextBody from '@ui/text-body';
import { Theme } from '../../../../theme/theme';

export const StyledForm = styled.form`
  margin-top: 16px;
  max-width: 604px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    margin-top: 8px;
    max-width: 604px;
    width: 100%;
  }
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 32px;
    gap: 8px;
    button {
      width: 100%;
      margin-top: 16px;
    }
  }
`;

export const StyledFormTitle = styled.h4`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    font-size: 24px;
  }
`;

export const StyledFormSubtitle = styled(TextBody)``;

export const StyledButtonsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 24px;
  max-width: 604px;
  justify-content: flex-end;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    justify-content: flex-end;
    flex-direction: column-reverse;
    gap: 0px;
    button {
      margin-top: 16px;
      width: 100%;
    }
  }
`;

import TextBody from '@ui/text-body';
import { getStatus } from '@utils/orderStatuses';
import styled, { keyframes } from 'styled-components';
import { Theme } from '../../../../theme/theme';

export const StyledWrapper = styled.div`
  width: 100%;
  border: 3px solid #f9f9fb;
  border-radius: 8px;
  padding: 32px 32px 16px;
  height: 100%;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    padding: 16px;
  }
`;

export const StyledTableWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: auto;
  height: 100%;

  // TODO remove this max-height w/o breaking grid row size
  max-height: 275px;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    .infinite-scroll-component {
      overflow: auto !important;
    }
  }
`;

export const StyledHeaderWrapper = styled.div`
  margin-bottom: 24px;
`;

export const StyledTextBody = styled(TextBody)`
  font-weight: 300;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;
`;

export const StyledTHead = styled.thead`
  background: #fff;

  // TODO maybe make the head sticky? the props below doesn't work since i can't add padding to a "display: table-header-group" element
  /* padding-top: 20px; */
  /* position: sticky; */
  /* top: 0; */
`;

export const StyledTBody = styled.tbody`
  overflow-y: auto;
  overflow-x: auto;
`;

export const StyledTd = styled.td`
  padding: 19px 0;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    padding: 16px 40px 16px 0;
    p {
      font-size: 14px;
      line-height: 130%;
      min-width: 90px;
    }
  }
`;

export const StyledTr = styled.tr`
  border-bottom: 1px solid #dddddd;
  // remove the last border-bottom
  &:last-child {
    border-bottom: none;
  }
`;

export const StyledThText = styled(TextBody)`
  font-size: 14px;
  color: #4d83d0;
  font-weight: 300;
`;

export const StyledStatusWrapper = styled.div<{ variant: string }>`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  color: ${({ theme, variant }: { variant: string; theme: Theme }) => {
    switch (getStatus(variant)) {
      case 'success':
      case 'waiting':
      case 'error':
        return theme.colors.white;
      default:
        return theme.colors.darkBlue;
    }
  }};
  background: ${({ theme, variant }: { variant: string; theme: Theme }) => {
    switch (getStatus(variant)) {
      case 'success':
        return theme.colors.greenSuccess;
      case 'waiting':
        return theme.colors.orange;
      case 'error':
        return theme.colors.redError;
      default:
        return theme.colors.lightBlue;
    }
  }};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    padding: 6px 8px;
    white-space: nowrap;
  }
`;

const animateDash = keyframes`
from {
  transform: rotate(0deg)
}
to{
  transform: rotate(360deg)
}
`;

export const StyledLoaderIcon = styled.div`
  padding: 10px 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};

  animation: ${animateDash} 1s linear infinite;
`;

export const StyledNoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

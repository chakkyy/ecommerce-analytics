import { useLayout } from '@hooks/useContext';
import Tag from '@ui/tag';
import styled from 'styled-components';
import { Theme } from '../../../theme/theme';
import { LineChart } from './line/line';

const StyledWrapper = styled.div<{ isSidebarOpen: boolean }>`
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl}) {
    max-width: ${p => (p.isSidebarOpen ? '504px' : '604px')};
    align-items: ${p => !p.isSidebarOpen && 'center'};
    padding: 56px;
  }
  max-width: 648px;
  max-height: 400px;
  background: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  padding: 56px 56px 56px 84px;
  border-radius: 0px 30.0706px 30.0706px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const StyledWrapperTag = styled.div`
  position: absolute;
  z-index: 4;
  padding-left: 84px;
  top: 195px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl}) {
    padding-left: 56px;
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const MetricsLine = () => {
  const { isSidebarOpen } = useLayout();

  return (
    <>
      <StyledWrapperTag>
        <Tag label='Preview' variant='lightOrange' />
      </StyledWrapperTag>
      <StyledWrapper isSidebarOpen={isSidebarOpen}>
        <LineChart />
      </StyledWrapper>
    </>
  );
};

export default MetricsLine;

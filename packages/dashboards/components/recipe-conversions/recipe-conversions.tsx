import styled from 'styled-components';
import { useLayout } from '@hooks/useContext';
import { Theme } from '../../theme/theme';
import MetricsLine from './metric-line/metric-line';
import MetricsProducts from './metrics-products/metrics-products';

const StyledWrapper = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  gap: 80px;
  transition: all 0.2s ease-out;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    width: 100%;
    padding-top: 40px;
  }
`;

const RecipeConversionsComponent = () => {
  const { isSidebarOpen } = useLayout();

  return (
    <StyledWrapper isSidebarOpen={isSidebarOpen}>
      <MetricsLine />
      <MetricsProducts />
    </StyledWrapper>
  );
};

export default RecipeConversionsComponent;

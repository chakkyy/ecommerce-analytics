import styled from 'styled-components';
import { Theme } from '../../theme/theme';

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, auto);
  grid-gap: 24px;
  max-width: 100%;
  max-height: 100%;
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.lightGrey};
  border-radius: 24px;
  padding: 32px 32px 32px 32px;
`;

const StyledEmptyMetric = styled.div`
  background: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const StyledGridItem = styled.div<{ spanWidth: number; spanHeight: number }>`
  grid-column: span ${props => props.spanWidth};
  grid-row: span ${props => props.spanHeight};
`;

type ChildItem = {
  id: string;
  width: number;
  height: number;
  component: React.ReactNode;
};

type MetricsGridProps = {
  childItems: ChildItem[];
};

const DashboardEmptyGrid = ({ childItems }: MetricsGridProps) => {
  const totalSpaces = 28;

  const occupiedSpaces = childItems.reduce((acc, item) => acc + item.width * item.height, 0);
  const emptySpaces = totalSpaces - occupiedSpaces;

  const allChildItems = [...childItems].slice(0, totalSpaces);

  return (
    <StyledGridContainer>
      {allChildItems.map(child => (
        <StyledGridItem key={child.id} spanWidth={child.width} spanHeight={child.height}>
          {child.component}
        </StyledGridItem>
      ))}
    </StyledGridContainer>
  );
};

export default DashboardEmptyGrid;

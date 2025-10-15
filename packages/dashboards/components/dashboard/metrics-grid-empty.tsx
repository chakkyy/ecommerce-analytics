import styled from 'styled-components';
import Skeleton1 from '@misc/skeleton-1';
import Skeleton3 from '@misc/skeleton-3';
import Skeleton4 from '@misc/skeleton-4';
import Skeleton2 from '@misc/skeleton-2';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const StyledGridLayout = styled(ResponsiveGridLayout)`
  .react-grid-item:hover {
    z-index: 10;
  }
`;

const layout = [
  { i: '1', x: 0, y: 0, w: 1, h: 1 },
  { i: '2', x: 1, y: 0, w: 1, h: 1 },
  { i: '3', x: 2, y: 0, w: 1, h: 1 },
  { i: '4', x: 3, y: 0, w: 1, h: 1 },
  { i: '5', x: 0, y: 0, w: 2, h: 2 },
  { i: '6', x: 4, y: 4, w: 2, h: 2 },
  { i: '7', x: 0, y: 2, w: 1, h: 1 },
  { i: '8', x: 0, y: 5, w: 1, h: 1 },
  { i: '9', x: 0, y: 5, w: 1, h: 1 },
  { i: '10', x: 5, y: 5, w: 3, h: 3 },
  { i: '11', x: 0, y: 7, w: 2, h: 1 },
  { i: '12', x: 2, y: 7, w: 1, h: 1 },
  { i: '13', x: 5, y: 7, w: 1, h: 1 },
];
const gridBreakpoints = { lg: 1368, md: 900, sm: 996, xs: 768, xxs: 0 };
const gridCols = { lg: 4, md: 4, sm: 4, xs: 4, xxs: 1 };

const MetricsGridEmpty = () => {
  return (
    <StyledGridLayout
      cols={gridCols}
      isDraggable={false}
      breakpoints={gridBreakpoints}
      layouts={{ lg: layout, md: layout, xs: layout, xxs: layout }}>
      <div key='1'>
        <Skeleton1 />
      </div>
      <div key='2'>
        <Skeleton1 />
      </div>
      <div key='3'>
        <Skeleton1 />
      </div>
      <div key='4'>
        <Skeleton1 />
      </div>
      <div key='5'>
        <Skeleton3 />
      </div>
      <div key='6'>
        <Skeleton4 />
      </div>{' '}
      <div key='7'>
        <Skeleton1 />
      </div>
      <div key='8'>
        <Skeleton1 />
      </div>
      <div key='9'>
        <Skeleton1 />
      </div>
      <div key='10'>
        <Skeleton2 />
      </div>
      <div key='11'>
        <Skeleton1 />
      </div>
      <div key='12'>
        <Skeleton1 />
      </div>
      <div key='13'>
        <Skeleton1 />
      </div>
    </StyledGridLayout>
  );
};

export default MetricsGridEmpty;

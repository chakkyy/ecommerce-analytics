import styled from 'styled-components';
import { Responsive, WidthProvider } from 'react-grid-layout';
import TextBody from '@ui/text-body';
import React, { memo, useState } from 'react';
import { Metric, RowData } from '@interfaces/index';
import KPIMetric from '@components/dashboard/metrics/kpi';
import TableMetric from '@components/dashboard/metrics/table/table';
import { LineChart } from '@components/dashboard/metrics/line/line';
import DoughnutChart from '@components/dashboard/metrics/doughnut/doughnut';
import { useTranslation } from 'next-i18next';
import { Theme } from '../../theme/theme';

const ResponsiveGridLayout = WidthProvider(Responsive);

const StyledGridLayout = styled(ResponsiveGridLayout)`
  .react-grid-item:hover {
    z-index: 10;
  }
`;

type MetricsGridProps = {
  childItems: Array<Metric & { i: string }>;
  onItemDelete: (id: number) => void;
  selectedStores: string;
  startDate: Date;
  endDate: Date;
  setIsLoading: (id: number, b1: boolean) => void;
};

const StyledErrorMetric = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.redError};
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightRed};
  p {
    max-width: 80%;
  }
`;

const ErrorFetchingMetric = () => {
  return (
    <StyledErrorMetric>
      <TextBody>There was a problem loading this metric</TextBody>
    </StyledErrorMetric>
  );
};

const gridBreakpoints = { lg: 1368, md: 900, sm: 996, xs: 768, xxs: 0 };
const gridCols = { lg: 4, md: 4, sm: 4, xs: 4, xxs: 1 };

const MetricsGrid = memo(
  ({ childItems, onItemDelete, selectedStores, startDate, endDate, setIsLoading }: MetricsGridProps) => {
    const { t } = useTranslation(['dashboards', 'dashboard-store', 'store']);
    const [selectedMetricId, setSelectedMetricId] = useState<number | null>(null);

    return (
      <StyledGridLayout
        layouts={{
          lg: childItems,
          md: childItems,
          sm: childItems,
          xs: childItems,
          xxs: childItems,
        }}
        breakpoints={gridBreakpoints}
        cols={gridCols}
        rowHeight={115}
        isDraggable={false}>
        {childItems.map(metric => {
          switch (metric?.recipeConfig?.chartType?.name) {
            case 'KPI_CHART': {
              return (
                <div
                  key={metric.id}
                  data-grid={{
                    x: metric.positionX,
                    y: metric.positionY,
                    w: metric.spanX,
                    h: metric.spanY,
                    static: true,
                  }}>
                  <KPIMetric
                    id={metric.id}
                    title={t(metric.title)}
                    textTooltip={t(metric.textTooltip)}
                    onDelete={onItemDelete}
                    selectedMetricId={selectedMetricId}
                    onMetricSelect={setSelectedMetricId}
                    selectedStores={selectedStores}
                    recipeName={metric?.recipeConfig?.recipe?.name}
                    isFromServer
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              );
            }
            case 'TABLE_CHART': {
              return (
                <div
                  key={metric.id}
                  data-grid={{
                    x: metric.positionX,
                    y: metric.positionY,
                    w: metric.spanX,
                    h: metric.spanY,
                    static: true,
                  }}>
                  <TableMetric
                    title={t(metric.title)}
                    textTooltip={t(metric.textTooltip)}
                    data={metric.data as RowData[]}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              );
            }
            case 'LINE_CHART': {
              return (
                <div
                  key={metric.id}
                  data-grid={{
                    x: metric.positionX,
                    y: metric.positionY,
                    w: metric.spanX,
                    h: metric.spanY,
                    static: true,
                  }}>
                  <LineChart
                    id={metric.id}
                    title={t(metric.title)}
                    textTooltip={t(metric.textTooltip)}
                    selectedStores={selectedStores}
                    data={metric.data}
                    startDate={startDate}
                    endDate={endDate}
                    setIsLoading={b => setIsLoading(metric.id, b)}
                  />
                </div>
              );
            }
            case 'PIE_CHART': {
              return (
                <div
                  key={metric.id}
                  data-grid={{
                    x: metric.positionX,
                    y: metric.positionY,
                    w: metric.spanX,
                    h: metric.spanY,
                    static: true,
                  }}>
                  <DoughnutChart
                    id={metric.id}
                    title={t(metric.title)}
                    textTooltip={t(metric.textTooltip)}
                    selectedStores={selectedStores}
                    data={metric.data}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              );
            }
            default:
              return (
                <div
                  key={metric.id}
                  data-grid={{
                    x: metric.positionX,
                    y: metric.positionY,
                    w: metric.spanX,
                    h: metric.spanY,
                    static: true,
                  }}>
                  <ErrorFetchingMetric />
                </div>
              );
          }
        })}
      </StyledGridLayout>
    );
  }
);

export default MetricsGrid;

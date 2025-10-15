import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'next-i18next';
import { format } from 'date-fns';
import SkeletonLine from '@misc/skeleton-3';
import { SegmentDataItem } from '@interfaces/index';
import useGetMetric from '@hooks/api/dashboard/useGetMetric';
import useDebounce from '@hooks/useDebounce';
import { DESKTOP_INITIAL_RESOLUTION, GRAPHS_COLORS_PALETTE, getCurrentDimensions } from '@components/dashboard/utils';
import { getTranslationFromLabel } from '@utils/formatMetricWithSymbol';
import InfoTooltip from '../infoTooltip';
import { Theme } from '../../../../theme/theme';

const StyledCanvaWrapper = styled.div`
  border: 3px solid ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  border-radius: 8px;
  canvas {
    box-sizing: border-box;
  }
  height: 100%;
`;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const getOptions = (lineTitle: string, screenWidth: number): any => ({
  maintainAspectRatio: false,
  responsive: true,
  tension: 0.4,
  layout: {
    padding: {
      left: 30,
      right: 30,
      bottom: 15,
      top: 5,
    },
  },
  plugins: {
    customCanvasBackgroundColor: {
      color: '#f0f',
    },
    legend: {
      display: screenWidth > DESKTOP_INITIAL_RESOLUTION,
      position: 'bottom',
      align: 'end',
      fullSize: false,
      labels: {
        color: '#111827',
        font: {
          size: 12,
          family: 'Roboto',
          weight: 300,
          lineHeight: '15.6px',
        },
        usePointStyle: true,
        boxWidth: 5,
        boxHeight: 5,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onHover: (event: any) => {
        const chartCanvas = event.chart.canvas;
        chartCanvas.style.cursor = 'pointer';
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onLeave: (event: any) => {
        const chartCanvas = event.chart.canvas;
        chartCanvas.style.cursor = '';
      },
    },
    title: {
      display: true,
      text: lineTitle,
      align: 'start',
      padding: 0,
      color: '#111827',
      font: {
        family: 'Roboto',
        size: 14,
        weight: 400,
        lineHeight: '50px',
      },
    },
    tooltip: {
      usePointStyle: true,
      backgroundColor: '#fff',
      padding: 12,
      titleMarginBottom: 3,
      titleColor: '#7E7E7E',
      titleFont: {
        size: 12,
        lineHeight: '15.6px',
        weight: 300,
        family: 'Roboto',
      },
      bodyColor: '#111827',
      bodyFont: {
        size: 14,
        lineHeight: '18.2px',
        weight: 400,
        family: 'Roboto',
      },
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        color: '#7E7E7E',
        padding: 0,
        font: {
          family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          weight: 300,
          lineHeight: '18.2px',
          size: 10,
        },
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      min: 0,
      ticks: {
        color: '#7E7E7E',
        padding: 5,
        backgroundColor: '#f0f',
        font: {
          family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          weight: 300,
          lineHeight: '18.2px',
          size: 10,
        },
      },
    },
  },
  elements: {
    point: {
      radius: 0.01,
    },
  },
  interaction: {
    mode: 'nearest',
    intersect: false,
    axis: 'xy',
  },
});

type LineProps = {
  id: number;
  title: string;
  textTooltip: string;
  data: any;
  selectedStores?: string;
  startDate: Date;
  endDate: Date;
  setIsLoading: (b: boolean) => void;
};

const DATE_FORMAT = 'yyyy-MM-dd';
const getAllDatesBetween = (startDate: Date, endDate: Date, dateFormat: string = DATE_FORMAT) => {
  // get all dates between start and end date
  const dates = [];
  const currDate = new Date(startDate);
  const lastDate = new Date(endDate);
  for (let i = currDate; i <= lastDate; i.setDate(i.getDate() + 1)) {
    dates.push(format(new Date(i), dateFormat));
  }
  return dates;
};

const backgroundColor = GRAPHS_COLORS_PALETTE;
const borderColor = GRAPHS_COLORS_PALETTE;
const DEFAULT_DEBOUNCE = 700;

export const LineChart = memo(
  ({ id, title, textTooltip, data, selectedStores, startDate, endDate, setIsLoading }: LineProps) => {
    const { i18n } = useTranslation('segments');
    const debouncedStoreList = useDebounce(selectedStores, DEFAULT_DEBOUNCE);
    const debouncedStartDate = useDebounce(startDate, DEFAULT_DEBOUNCE);
    const debouncedEndDate = useDebounce(endDate, DEFAULT_DEBOUNCE);
    const [screenSize, setScreenSize] = useState(getCurrentDimensions());
    useEffect(() => {
      const updateDimension = () => {
        setScreenSize(getCurrentDimensions());
      };
      window.addEventListener('resize', updateDimension);

      return () => {
        window.removeEventListener('resize', updateDimension);
      };
    }, [screenSize]);

    const {
      isLoading,
      isFetching,
      data: metricData,
    } = useGetMetric({
      metricId: id,
      storeList: debouncedStoreList,
      startDate: debouncedStartDate,
      endDate: debouncedEndDate,
    });
    const labels: Set<string> = new Set();
    const datesBetween = getAllDatesBetween(startDate, endDate);
    const segments = useMemo(() => Object.keys(metricData?.value || {}), [metricData?.value]);
    const language = useMemo(() => i18n?.language || 'en', [i18n?.language]);

    const datasets = useMemo(() => {
      if (!segments) return [];
      return segments.map((segment: string, index: number) => {
        const localData = metricData?.value[segment]
          // merge orders by date
          ?.reduce((acc: SegmentDataItem[], curr: SegmentDataItem) => {
            labels.add(format(new Date(curr.createdAt), DATE_FORMAT));
            const orderIndex = acc.findIndex((item: SegmentDataItem) => {
              const date1 = new Date(Date.parse(item.createdAt));
              const date2 = new Date(Date.parse(curr.createdAt));
              return (
                date1.getDate() === date2.getDate() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getFullYear() === date2.getFullYear()
              );
            });
            if (orderIndex === -1) {
              return [...acc, curr];
            }
            acc[orderIndex].total = (parseInt(acc[orderIndex].total, 10) + parseInt(curr.total, 10)).toString();
            return acc;
          }, [])
          .sort((a: any, b: any) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          })
          .map((order: SegmentDataItem) => {
            const formattedOrder: { x: string; y: number } = {
              x: format(new Date(order.createdAt), DATE_FORMAT),
              y: parseInt(order.total, 10),
            };
            return formattedOrder;
          });

        const dataArray = [
          0, // <--- Dummy element for aligning dates with array indexes
          ...datesBetween.map((date: string) => {
            const orderIndex = localData.findIndex((item: any) => {
              return item.x === date;
            });
            if (orderIndex === -1) {
              return 0;
            }
            return parseInt(localData[orderIndex].y, 10);
          }),
        ];
        return {
          label: getTranslationFromLabel(segment, language),
          data: dataArray,
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          borderColor: borderColor[index],
          backgroundColor: backgroundColor[index],
        };
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [segments, language]);

    if (isLoading || isFetching) {
      return <SkeletonLine />;
    }

    return (
      <StyledCanvaWrapper className='chart-canva'>
        <InfoTooltip text={textTooltip} alternativeWrapper />
        {/* @ts-ignore: types are right but the error shows up idk why */}
        <Line options={getOptions(title, screenSize.width)} data={{ ...data, labels: datesBetween, datasets }} />
      </StyledCanvaWrapper>
    );
  }
);

export default LineChart;

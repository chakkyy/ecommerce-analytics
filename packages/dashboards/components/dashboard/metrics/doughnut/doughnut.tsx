import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'next-i18next';
import SkeletonDoughnut from '@misc/skeleton-4';
import useGetMetric from '@hooks/api/dashboard/useGetMetric';
import Numeral from 'numeral';
import useDebounce from '@hooks/useDebounce';
import { DESKTOP_INITIAL_RESOLUTION, GRAPHS_COLORS_PALETTE, getCurrentDimensions } from '@components/dashboard/utils';
import { getTranslationFromLabel } from '@utils/formatMetricWithSymbol';
import InfoTooltip, { Position } from '../infoTooltip';
import { Theme } from '../../../../theme/theme';

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledCanvaWrapper = styled.div`
  border: 3px solid ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  border-radius: 8px;
  canvas {
    box-sizing: border-box;
  }
  height: 100%;
`;

const DEFAULT_DEBOUNCE = 700;

const getOptions = (doughnutTitle: string, screenWidth: number): any => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: screenWidth > DESKTOP_INITIAL_RESOLUTION ? '60%' : '65%',
  layout: {
    padding: {
      left: 30,
      right: 30,
      bottom: 15,
      top: -10,
    },
    position: 'left',
  },
  plugins: {
    legend: {
      display: screenWidth > DESKTOP_INITIAL_RESOLUTION,
      position: 'right',
      align: 'center',
      fullSize: false,
      labels: {
        color: '#111827',
        font: {
          size: 10,
          family: 'Roboto',
          weight: 300,
          lineHeight: '15.6px',
        },
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
      },
    },
    title: {
      display: true,
      text: doughnutTitle,
      align: 'start',
      padding: 10,
      color: '#111827',
      font: {
        family: 'Roboto',
        size: 14,
        weight: 400,
        lineHeight: '50px', // using as a padding
      },
    },
    tooltip: {
      usePointStyle: false,
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
});

const textCenter = {
  id: 'textCenter',
  beforeDatasetsDraw(chart: any) {
    const { ctx } = chart;
    let value = chart?.getDatasetMeta(0)?.total;
    value = Numeral(value).format('0.00a');
    ctx.font = 'bold 16px Roboto';
    ctx.fillStyle = '#111827';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.padding = '10px';
    ctx.fillText(value, chart?.getDatasetMeta(0)?.data[0]?.x, chart?.getDatasetMeta(0)?.data[0]?.y);
  },
};

type DoughnutProps = {
  id: number;
  title: string;
  textTooltip: string;
  data: any;
  position?: Position;
  selectedStores?: string;
  startDate: Date;
  endDate: Date;
};

const DoughnutChart = ({
  id,
  title,
  textTooltip,
  position = 'top',
  data,
  selectedStores,
  startDate,
  endDate,
}: DoughnutProps) => {
  const { t, i18n } = useTranslation('segments');
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

  const language = useMemo(() => i18n?.language || 'en', [i18n?.language]);
  const {
    isLoading,
    isFetching,
    data: doughnutData,
  } = useGetMetric({
    metricId: id,
    storeList: debouncedStoreList,
    startDate: debouncedStartDate,
    endDate: debouncedEndDate,
  });

  const labels: string[] = Object.keys(doughnutData?.value || {});
  const dataDoughnut = labels?.map((label: string) => {
    return doughnutData?.value[label] as number;
  });
  const processedData = { ...data };
  processedData.labels = Object.keys(doughnutData?.value || {}).map((label: string) =>
    getTranslationFromLabel(label, language)
  );
  processedData.datasets = [
    {
      data: dataDoughnut,
      backgroundColor: GRAPHS_COLORS_PALETTE,
      borderColor: GRAPHS_COLORS_PALETTE,
      borderWidth: 1,
    },
  ];

  if (isLoading || isFetching) {
    return <SkeletonDoughnut />;
  }

  return (
    <StyledCanvaWrapper>
      <InfoTooltip text={textTooltip} alternativeWrapper position={position} />
      <Doughnut data={processedData} options={getOptions(title, screenSize.width)} plugins={[textCenter]} />
    </StyledCanvaWrapper>
  );
};

export default DoughnutChart;

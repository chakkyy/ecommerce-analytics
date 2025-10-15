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
import { Theme } from '../../../../theme/theme';

const StyledCanvaWrapper = styled.div`
  border: 3px solid ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  border-radius: 8px;

  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  width: 508px;
  height: 280px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl}) {
    width: 392px;
    height: 334px;
  }
  canvas {
    box-sizing: border-box;
  }
`;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Desktop',
      data: [11.3, 1, 17, 5.23, 19.02, 12.123, 1.001],
      borderColor: '#004DBC',
      backgroundColor: '#004DBC',
      pointStyle: 'circle',
      pointBorderWidth: 5,
      pointRadius: 5,
      pointHoverRadius: 5,
    },
  ],
};

export const options = {
  responsive: true,
  tension: 0.4,
  layout: {
    padding: {
      left: 24,
      right: 53,
      bottom: 0,
      top: 0,
    },
  },
  plugins: {
    customCanvasBackgroundColor: {
      color: '#f0f',
    },

    legend: {
      position: 'bottom',
      align: 'center',
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
      text: 'Conversiones',
      align: 'start',
      color: '#111827',
      padding: {
        top: 0,
        bottom: 43,
      },
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
        stepSize: 5,
        color: '#7E7E7E',
        padding: 15,
        backdropPadding: 3,
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
      pointBackgroundColor: '#FC7E00',
      pointBorderWidth: '0.2px',
      pointBorderColor: 'rgba(252, 126, 0, 0.4)',
    },
  },
  interaction: {
    mode: 'nearest',
    intersect: false,
    axis: 'xy',
  },
};

export const LineChart = () => {
  return (
    <StyledCanvaWrapper className='chart-canva'>
      {/* @ts-ignore: types are right but the error shows up idk why */}
      <Line options={options} data={data} />
    </StyledCanvaWrapper>
  );
};

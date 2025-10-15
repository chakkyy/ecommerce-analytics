import { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Button from '@ui/button';
import Header from '@ui/header';
import Sidebar from '@ui/sidebar';
import TextBody from '@ui/text-body';
import InviteIcon from '@icons/invite-icon';
import Head from 'next/head';
import LeftArrow from '@icons/left-arrow';
import MetricsGrid from '@components/dashboard/metrics-grid';
import KPIMetric from '@components/dashboard/metrics/kpi';
import TableMetric, { StyledStatusWrapper } from '@components/dashboard/metrics/table/table';
import { LineChart } from '@components/dashboard/metrics/line/line';
import DoughnutChart from '@components/dashboard/metrics/doughnut/doughnut';
import { show } from '@ebay/nice-modal-react';
import InviteToDashboardModal from '@ui/modals/invite-users-dashboard-modal';
import { useLayout } from '@hooks/useContext';
import { KPIMetric as KPIProps, Metric } from '@interfaces/index';
import { KPI_CHART } from '@interfaces/dashboard';
import { Theme } from '../../theme/theme';

const StyledDashboardLayout = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-right: 100px;
  transition: all 0.3s ease-in-out;
  padding-left: ${p => (p.isSidebarOpen ? '312px' : '174px')};
`;

const StyledTitleAndActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
  align-items: center;
`;

const StyledActions = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledLeftHeader = styled.div``;

const StyledBreadcrumb = styled.div`
  display: flex;
  gap: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  margin-bottom: 4px;
  cursor: pointer;
  width: max-content;
`;

const StyledTitle = styled.h3`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
`;

const StyledContentWrapper = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  margin-top: 40px;
  margin-bottom: 64px;
  align-items: center;
  transition: all 0.3s ease-in-out;
  width: ${p => (p.isSidebarOpen ? '70%' : '65%')};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl}) {
    width: ${p => (p.isSidebarOpen ? '90%' : '80%')};
  }
`;

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

const renderMetricComponent = (metric: Metric, t: (key: string) => string) => {
  switch (metric.metricType) {
    case KPI_CHART: {
      const metricProps = metric as KPIProps;
      return (
        <KPIMetric
          title={t(metricProps.title)}
          metricNumber={metricProps.metricNumber}
          profitPercentage={metricProps.profitPercentage}
          isProfit={metricProps.isProfit}
          textTooltip={t(metricProps.textTooltip)}
          onDelete={() => {}}
          isFromServer={metricProps.isFromServer}
        />
      );
    }
    case 'TABLE': {
      return (
        <TableMetric
          textTooltip={t(metric.textTooltip)}
          data={[
            {
              id: '#76342',
              date: '2023-02-01T23:57:23.000Z',
              price: '100,00',
              status: <StyledStatusWrapper variant='New order'>{t('METRICS.TABLE.NEW_ORDER')}</StyledStatusWrapper>,
            },
            {
              id: '#76346',
              date: '2023-02-01T23:57:23.000Z',
              price: '200,00',
              status: <StyledStatusWrapper variant='On route'>{t('METRICS.TABLE.ON_ROUTE')}</StyledStatusWrapper>,
            },
            {
              id: '#76347',
              date: '2023-02-01T23:57:23.000Z',
              price: '300,00',
              status: <StyledStatusWrapper variant='Delivered'>{t('METRICS.TABLE.DELIVERED')}</StyledStatusWrapper>,
            },
            {
              id: '#76349',
              date: '2023-02-01T23:57:23.000Z',
              price: '400,00',
              status: <StyledStatusWrapper variant='Processing'>{t('METRICS.TABLE.PROCESSING')}</StyledStatusWrapper>,
            },
            {
              id: '#76350',
              date: '2023-02-01T23:57:23.000Z',
              price: '500,00',
              status: <StyledStatusWrapper variant='Processing'>{t('METRICS.TABLE.PROCESSING')}</StyledStatusWrapper>,
            },
            {
              id: '#76351',
              date: '2023-02-01T23:57:23.000Z',
              price: '600,00',
              status: <StyledStatusWrapper variant='Processing'>{t('METRICS.TABLE.PROCESSING')}</StyledStatusWrapper>,
            },
            {
              id: '#76352',
              date: '2023-02-01T23:57:23.000Z',
              price: '700,00',
              status: <StyledStatusWrapper variant='Processing'>{t('METRICS.TABLE.PROCESSING')}</StyledStatusWrapper>,
            },
          ]}
        />
      );
    }
    case 'LINE': {
      return <LineChart textTooltip={t(metric.textTooltip)} />;
    }
    case 'DOUGHNUT': {
      return <DoughnutChart textTooltip={t(metric.textTooltip)} />;
    }
    default:
      return <ErrorFetchingMetric />;
  }
};

// TODO make a layout component that can be used in all dashboard pages
// must support: sidebar, header, dashboard title, onBack, button primary, button secondary and content with children inside
const DashboardExample = () => {
  const { t } = useTranslation('dashboards');
  const { isSidebarOpen } = useLayout();
  const { data: dashboard } = {
    data: {
      title: 'eCommerce',
      metrics: [
        {
          i: 'KPI-1',
          metricType: 'KPI_CHART',
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          minW: 1,
          maxW: 2,
          title: 'METRICS.KPI.KPI-1.TITLE',
          metricNumber: '$16.4k',
          profitPercentage: '27%',
          isProfit: true,
          textTooltip: 'METRICS.KPI.KPI-1.TEXT_TOOLTIP',
        },
        {
          i: 'KPI-2',
          metricType: 'KPI_CHART',
          x: 1,
          y: 0,
          w: 1,
          h: 1,
          minW: 1,
          maxW: 2,
          title: 'METRICS.KPI.KPI-2.TITLE',
          metricNumber: '37%',
          profitPercentage: '2%',
          isProfit: false,
          textTooltip: 'METRICS.KPI.KPI-2.TEXT_TOOLTIP',
        },
        {
          i: 'KPI-3',
          metricType: 'KPI_CHART',
          x: 2,
          y: 0,
          w: 1,
          h: 1,
          minW: 1,
          maxW: 2,
          title: 'METRICS.KPI.KPI-3.TITLE',
          metricNumber: 99100200,
          profitPercentage: '14%',
          isProfit: false,
          textTooltip: 'METRICS.KPI.KPI-3.TEXT_TOOLTIP',
          isFromServer: true,
        },
        {
          i: 'KPI-4',
          metricType: 'KPI_CHART',
          x: 3,
          y: 0,
          w: 1,
          h: 1,
          minW: 1,
          maxW: 2,
          title: 'METRICS.KPI.KPI-4.TITLE',
          metricNumber: '$9.02',
          profitPercentage: '27%',
          isProfit: true,
          textTooltip: 'METRICS.KPI.KPI-1.TEXT_TOOLTIP',
        },
        {
          i: 'LINE-1',
          metricType: 'LINE',
          x: 0,
          y: 1,
          w: 2,
          h: 2,
          minW: 2,
          maxW: 4,
          minH: 2,
          maxH: 4,
          textTooltip: 'METRICS.LINE.LINE-1.TEXT_TOOLTIP',
        },
        {
          i: 'DOUGHNUT-1',
          metricType: 'DOUGHNUT',
          x: 2,
          y: 1,
          w: 2,
          h: 2,
          minW: 2,
          maxW: 4,
          minH: 2,
          maxH: 4,
          textTooltip: 'METRICS.DOUGHNUT.DOUGHNUT-1.TEXT_TOOLTIP',
        },
        {
          i: 'KPI-5',
          metricType: 'KPI_CHART',
          x: 0,
          y: 4,
          w: 1,
          h: 1,
          minW: 1,
          maxW: 2,
          title: 'METRICS.KPI.KPI-5.TITLE',
          metricNumber: '100',
          profitPercentage: '14%',
          isProfit: false,
          textTooltip: 'METRICS.KPI.KPI-5.TEXT_TOOLTIP',
        },
        {
          i: 'TABLE-1',
          metricType: 'TABLE',
          x: 2,
          y: 4,
          w: 3,
          h: 3,
          minW: 3,
          maxW: 4,
          minH: 3,
          maxH: 7,
          textTooltip: 'METRICS.TABLE.TABLE-1.TEXT_TOOLTIP',
        },
        {
          i: 'KPI-6',
          metricType: 'KPI_CHART',
          x: 0,
          y: 5,
          w: 1,
          h: 1,
          minW: 1,
          maxW: 2,
          title: 'METRICS.KPI.KPI-6.TITLE',
          metricNumber: '$17k',
          profitPercentage: '31%',
          isProfit: true,
          textTooltip: 'METRICS.KPI.KPI-6.TEXT_TOOLTIP',
        },
        {
          i: 'KPI-7',
          metricType: 'KPI_CHART',
          x: 0,
          y: 6,
          w: 1,
          h: 1,
          minW: 1,
          maxW: 2,
          title: 'METRICS.KPI.KPI-7.TITLE',
          metricNumber: '$17k',
          profitPercentage: '17%',
          isProfit: true,
          textTooltip: 'METRICS.KPI.KPI-7.TEXT_TOOLTIP',
        },
        {
          i: 'KPI-8',
          metricType: 'KPI_CHART',
          x: 0,
          y: 7,
          w: 2,
          h: 1,
          minW: 1,
          maxW: 2,
          title: 'METRICS.KPI.KPI-8.TITLE',
          metricNumber: String(t('METRICS.KPI.KPI-8.METRIC_NUMBER')),
          profitPercentage: '27%',
          isProfit: true,
          textTooltip: 'METRICS.KPI.KPI-8.TEXT_TOOLTIP',
        },
        {
          i: 'KPI-9',
          metricType: 'KPI_CHART',
          x: 2,
          y: 7,
          w: 1,
          h: 1,
          minW: 1,
          maxW: 2,
          title: 'METRICS.KPI.KPI-9.TITLE',
          metricNumber: '73%',
          profitPercentage: '73%',
          isProfit: false,
          textTooltip: 'METRICS.KPI.KPI-9.TEXT_TOOLTIP',
        },
        {
          i: 'KPI-10',
          metricType: 'KPI_CHART',
          x: 3,
          y: 7,
          w: 1,
          h: 1,
          minW: 1,
          maxW: 2,
          title: 'METRICS.KPI.KPI-10.TITLE',
          metricNumber: '9%',
          profitPercentage: '27%',
          isProfit: true,
          textTooltip: 'METRICS.KPI.KPI-10.TEXT_TOOLTIP',
        },
      ],
    },
  };

  const initialMetrics = dashboard
    ? dashboard.metrics.map((metric: Metric) => ({ ...metric, component: renderMetricComponent(metric, t) }))
    : [];

  const [metrics, setMetrics] = useState<Metric[]>(initialMetrics);

  const handleInviteUsers = async () => {
    await show(InviteToDashboardModal);
  };

  const removeMetric = (id: number) => {
    const newMetrics = metrics.filter(metric => metric.i !== id);
    setMetrics(newMetrics);
  };

  return (
    <>
      <Head>
        <title>ecommerce | Dashboard Example</title>
        <meta name='description' content='ecommerce Dashboard' />
      </Head>
      <>
        <Header />
        <StyledDashboardLayout isSidebarOpen={isSidebarOpen}>
          <StyledTitleAndActions>
            <StyledLeftHeader>
              <Link href='/dashboards'>
                <StyledBreadcrumb>
                  <LeftArrow />
                  <TextBody>{t('BACK_TO_DASHBOARDS')}</TextBody>
                </StyledBreadcrumb>
              </Link>
              <StyledTitle>{dashboard ? t(dashboard.title) : t('DASHBOARD_TITLE')}</StyledTitle>
            </StyledLeftHeader>
            <StyledActions>
              <Link href='/new_metric'>
                <Button small>{t('ADD_METRIC')}</Button>
              </Link>
              <Button
                small
                variant='secondary'
                icon={<InviteIcon height={16} width={16} />}
                onClick={handleInviteUsers}>
                {t('INVITE_USERS')}
              </Button>
            </StyledActions>
          </StyledTitleAndActions>
          <StyledContentWrapper isSidebarOpen={isSidebarOpen}>
            <MetricsGrid childItems={metrics} onItemDelete={removeMetric} />
          </StyledContentWrapper>
        </StyledDashboardLayout>
        <Sidebar />
      </>
    </>
  );
};

export default DashboardExample;

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['dashboards', 'common'], null, ['es', 'en', 'pt'])),
    },
  };
}

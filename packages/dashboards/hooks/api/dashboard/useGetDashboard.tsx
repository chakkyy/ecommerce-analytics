import { DashboardData, Metric } from '@interfaces/index';
import { useQuery } from 'react-query';

import { GRAPHS_COLORS_PALETTE } from '@components/dashboard/utils';
import api from '../../../lib/axios';

export const GET_DASHBOARD_DATA = 'GET_DASHBOARD_DATA';

const mapKpiMetric = (metric: Metric): Metric & { recipeName: string } => {
  return {
    ...metric,
    i: String(metric.id),
    title: `METRICS.KPI.${metric.recipeConfig.recipe.name}.TITLE`,
    textTooltip: `METRICS.KPI.${metric.recipeConfig.recipe.name}.TEXT_TOOLTIP`,
    recipeName: metric.recipeConfig.recipe.name,
    metricType: metric.recipeConfig.chartType.name,
    x: metric.positionX,
    y: metric.positionY,
    w: metric.spanX,
    h: metric.spanY,
    minW: metric.spanX,
    maxW: metric.spanY,
    value: metric.value,
  };
};

const mapTableMetric = (metric: Metric): Metric => {
  return {
    ...metric,
    i: String(metric.id),
    title: `METRICS.TABLE.${metric.recipeConfig.recipe.name}.TITLE`,
    textTooltip: `METRICS.TABLE.${metric.recipeConfig.recipe.name}.TEXT_TOOLTIP`,
    metricType: metric.recipeConfig.chartType.name,
    x: metric.positionX,
    y: metric.positionY,
    w: metric.spanX,
    h: metric.spanY,
    minW: metric.spanX,
    maxW: metric.spanY,
    value: metric.value,
  };
};

const mapDougnutMetric = (metric: Metric): Metric => {
  return {
    ...metric,
    i: String(metric.id),
    title: `METRICS.DOUGHNUT.${metric.recipeConfig.recipe.name}.TITLE`,
    textTooltip: `METRICS.DOUGHNUT.${metric.recipeConfig.recipe.name}.TEXT_TOOLTIP`,
    metricType: metric.recipeConfig.chartType.name,
    x: metric.positionX,
    y: metric.positionY,
    w: metric.spanX,
    h: metric.spanY,
    minW: metric.spanX,
    maxW: metric.spanY,
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: GRAPHS_COLORS_PALETTE,
          borderColor: GRAPHS_COLORS_PALETTE,
          borderWidth: 1,
        },
      ],
    },
    value: metric.value,
  };
};

const mapLineMetric = (metric: Metric): Metric => {
  return {
    ...metric,
    i: String(metric.id),
    title: `METRICS.LINE.${metric.recipeConfig.recipe.name}.TITLE`,
    textTooltip: `METRICS.LINE.${metric.recipeConfig.recipe.name}.TEXT_TOOLTIP`,
    metricType: metric.recipeConfig.chartType.name,
    x: metric.positionX,
    y: metric.positionY,
    w: metric.spanX,
    h: metric.spanY,
    minW: metric.spanX,
    maxW: metric.spanY,
    data: {
      labels: [],
      datasets: [],
    },
  };
};

const getDashboardData = async ({ dashboardId }: { dashboardId: number }): Promise<DashboardData> => {
  const { data } = await api.get(`/companies/dashboards/${dashboardId}`);
  const dashboardData: Metric[] = data.metrics.map((metric: Metric) => {
    switch (metric.recipeConfig.chartType.name) {
      case 'KPI_CHART':
        return mapKpiMetric(metric);
      case 'TABLE_CHART':
        return mapTableMetric(metric);
      case 'LINE_CHART':
        return mapLineMetric(metric);
      case 'PIE_CHART':
        return mapDougnutMetric(metric);
      default:
        return null;
    }
  });
  return { ...data, metrics: dashboardData } as DashboardData;
};

const useGetDashboard = ({ dashboardId }: { dashboardId: number }) => {
  return useQuery([GET_DASHBOARD_DATA, dashboardId], () => getDashboardData({ dashboardId }), {
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetDashboard;

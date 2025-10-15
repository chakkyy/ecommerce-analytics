const KPI_CHART = 1;
const FILTER_TYPE_DATE = 2;
const LINE_CHART = 2;
const DOUGHNUT_CHART = 3;

export interface DashboardMetric {
  title: string;
  positionX: number;
  positionY: number;
  spanX: number;
  spanY: number;
}

export interface DashboardRecipeConfig {
  title: string;
  filterTypeDetail: string;
  recipeId: number;
  chartTypeId: number;
  filterTypeId: number;
  segmentId?: number;
}

export const initialMetricsStore: DashboardMetric[] = [
  { title: 'Total de Ventas', positionX: 0, positionY: 0, spanX: 2, spanY: 1 },
  { title: 'Ventas por metro cuadrado', positionX: 2, positionY: 0, spanX: 1, spanY: 1 },
  { title: 'Cantidad de Órdenes', positionX: 3, positionY: 0, spanX: 1, spanY: 1 },

  { title: 'Margen bruto', positionX: 0, positionY: 1, spanX: 2, spanY: 1 },
  { title: 'Rentabilidad neta', positionX: 2, positionY: 1, spanX: 1, spanY: 1 },
  { title: 'Ticket promedio', positionX: 3, positionY: 1, spanX: 1, spanY: 1 },

  { title: 'Ventas totales', positionX: 0, positionY: 2, spanX: 4, spanY: 3 },

  { title: 'Cantidad de Clientes', positionX: 0, positionY: 8, spanX: 2, spanY: 1 },
  { title: 'Total de Clientes Nuevos', positionX: 2, positionY: 8, spanX: 1, spanY: 1 },
  { title: 'Total de Clientes Recurrentes', positionX: 3, positionY: 8, spanX: 1, spanY: 1 },

  // COMMENT
  // Stretched "Inventario disponible" from spanX 1 to 2 to hide "Rotación de inventario"
  // until we or the client defines how to implement the metric correctly
  { title: 'Inventario disponible', positionX: 0, positionY: 9, spanX: 2, spanY: 1 },
  // { title: 'Rotación de inventario', positionX: 1, positionY: 9, spanX: 1, spanY: 1 },
  // END COMMENT
  { title: 'Tasa de devolución', positionX: 2, positionY: 9, spanX: 1, spanY: 1 },
  { title: 'Indice agotamiento stock', positionX: 3, positionY: 9, spanX: 1, spanY: 1 },

  { title: 'Costos Totales', positionX: 0, positionY: 5, spanX: 2, spanY: 3 },
  { title: 'Tasa de descuento', positionX: 0, positionY: 10, spanX: 2, spanY: 1 },
  { title: 'Costo de distribución', positionX: 2, positionY: 10, spanX: 2, spanY: 1 },

  { title: 'Eficiencia en la cadena de suministro', positionX: 0, positionY: 11, spanX: 4, spanY: 3 },
  { title: 'ROI', positionX: 2, positionY: 13, spanX: 4, spanY: 3 },
  { title: 'Usuarios por segmento', positionX: 2, positionY: 5, spanX: 2, spanY: 3 },
];

export const initialConfigsStore: DashboardRecipeConfig[] = [
  {
    title: 'Total de Ventas',
    filterTypeDetail: '1_MONTH',
    recipeId: 55,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Ventas por metro cuadrado',
    filterTypeDetail: '1_MONTH',
    recipeId: 37,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Cantidad de Órdenes',
    filterTypeDetail: '1_MONTH',
    recipeId: 51,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Margen bruto',
    filterTypeDetail: '1_MONTH',
    recipeId: 43,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Rentabilidad neta',
    filterTypeDetail: '1_MONTH',
    recipeId: 44,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Ticket promedio',
    filterTypeDetail: '1_MONTH',
    recipeId: 49,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Ventas totales',
    filterTypeDetail: '1_MONTH',
    recipeId: 36,
    chartTypeId: LINE_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Cantidad de Clientes',
    filterTypeDetail: '1_MONTH',
    recipeId: 50,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Cantidad de Clientes Nuevos',
    filterTypeDetail: '1_MONTH',
    recipeId: 52,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Cantidad de Clientes Existentes',
    filterTypeDetail: '1_MONTH',
    recipeId: 53,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Inventario disponible',
    filterTypeDetail: '1_MONTH',
    recipeId: 40,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Tasa de devolución',
    filterTypeDetail: '1_MONTH',
    recipeId: 48,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Indice agotamiento stock',
    filterTypeDetail: '1_MONTH',
    recipeId: 42,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Costos Totales',
    filterTypeDetail: '1_MONTH',
    recipeId: 39,
    chartTypeId: DOUGHNUT_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Tasa de descuento',
    filterTypeDetail: '1_MONTH',
    recipeId: 47,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Costo de distribución',
    filterTypeDetail: '1_MONTH',
    recipeId: 38,
    chartTypeId: KPI_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Eficiencia en la cadena de suministro',
    filterTypeDetail: '1_MONTH',
    recipeId: 41,
    chartTypeId: LINE_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'ROI',
    filterTypeDetail: '1_MONTH',
    recipeId: 45,
    chartTypeId: LINE_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
  {
    title: 'Cantidad de Clientes por segmento',
    filterTypeDetail: '1_MONTH',
    recipeId: 60,
    chartTypeId: DOUGHNUT_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
];

export const initialMetrics = [
  {
    title: 'Ingresos totales',
    positionX: 0,
    positionY: 0,
    spanX: 1,
    spanY: 1,
  },
  {
    title: 'Cantidad de Órdenes',
    positionX: 1,
    positionY: 0,
    spanX: 1,
    spanY: 1,
  },
  {
    title: 'Ticket Promedio',
    positionX: 2,
    positionY: 0,
    spanX: 1,
    spanY: 1,
  },
  {
    title: 'Ingresos por transacción',
    positionX: 3,
    positionY: 0,
    spanX: 1,
    spanY: 1,
  },
  {
    title: 'Ingresos por Segmento',
    positionX: 0,
    positionY: 1,
    spanX: 4,
    spanY: 3,
  },
  {
    title: 'Ingresos por Cliente',
    positionX: 2,
    positionY: 4,
    spanX: 2,
    spanY: 3,
  },
  {
    title: 'Sesiones',
    positionX: 0,
    positionY: 7,
    spanX: 1,
    spanY: 1,
  },
  {
    title: 'Usuarios',
    positionX: 0,
    positionY: 8,
    spanX: 1,
    spanY: 1,
  },
  {
    title: 'Referidos',
    positionX: 0,
    positionY: 9,
    spanX: 1,
    spanY: 1,
  },
  {
    title: 'Órdenes',
    positionX: 1,
    positionY: 7,
    spanX: 3,
    spanY: 3,
  },
  {
    title: 'Cantidad de Clientes por segmento',
    positionX: 0,
    positionY: 4,
    spanX: 2,
    spanY: 3,
  },
];

export const initialRecipeConfigs = [
  {
    title: 'Ingresos totales',
    filterTypeDetail: '1_MONTH',
    recipeId: 26,
    chartTypeId: KPI_CHART,
    filterTypeId: 2,
    segmentId: 1,
  },
  {
    title: 'Cantidad de Órdenes',
    filterTypeDetail: '1_MONTH',
    recipeId: 51,
    chartTypeId: KPI_CHART,
    filterTypeId: 2,
    segmentId: 1,
  },
  {
    title: 'ticket promedio',
    filterTypeDetail: '1_MONTH',
    recipeId: 30,
    chartTypeId: KPI_CHART,
    filterTypeId: 2,
    segmentId: 1,
  },
  {
    title: 'ingreso por transaccion',
    filterTypeDetail: '1_MONTH',
    recipeId: 25,
    chartTypeId: KPI_CHART,
    filterTypeId: 2,
    segmentId: 1,
  },
  {
    title: 'ingreso por segmento',
    filterTypeDetail: '1_MONTH',
    recipeId: 24,
    chartTypeId: 2,
    filterTypeId: 2,
    segmentId: 1,
  },
  {
    title: 'ingreso por cliente',
    filterTypeDetail: '1_MONTH',
    recipeId: 5,
    chartTypeId: 3,
    filterTypeId: 2,
    segmentId: 1,
  },
  {
    title: 'sesiones',
    filterTypeDetail: '1_MONTH',
    recipeId: 57,
    chartTypeId: KPI_CHART,
    filterTypeId: 2,
    segmentId: 1,
  },
  {
    title: 'usuarios',
    filterTypeDetail: '1_MONTH',
    recipeId: 56,
    chartTypeId: KPI_CHART,
    filterTypeId: 2,
    segmentId: 1,
  },
  {
    title: 'referidos',
    filterTypeDetail: '1_MONTH',
    recipeId: 58,
    chartTypeId: KPI_CHART,
    filterTypeId: 2,
    segmentId: 1,
  },
  {
    title: 'table',
    filterTypeDetail: '1_MONTH',
    recipeId: 35,
    chartTypeId: 6,
    filterTypeId: 2,
    segmentId: 1,
  },
  {
    title: 'Cantidad de Clientes por segmento',
    filterTypeDetail: '1_MONTH',
    recipeId: 60,
    chartTypeId: DOUGHNUT_CHART,
    filterTypeId: FILTER_TYPE_DATE,
  },
];

export function createInitialMetrics(dashboardId: number, metrics = initialMetrics) {
  return metrics.map(metric => {
    return {
      ...metric,
      dashboardId,
    };
  });
}

export function createInitialRecipeConfigs(
  metricIds: number[],
  recipeConfigs: DashboardRecipeConfig[] = initialRecipeConfigs
) {
  return recipeConfigs.map((recipeConfig, index) => {
    return {
      ...recipeConfig,
      metricId: metricIds[index],
    };
  });
}

import DashboardService from '@services/dashboards/dashboard';
import { createInitialMetrics, createInitialRecipeConfigs } from '@utils/createInitialMetrics';

const dashboardRepositoryMock = {
  create: jest.fn(),
  save: jest.fn().mockImplementation((dashboard: any) => dashboard),
};

const metricRepositoryMock = {
  bulkCreate: jest.fn(),
};

const recipeConfigRepositoryMock = {
  bulkCreate: jest.fn(),
};

const dashboardService = new DashboardService({} as any);

describe('DashboardService', () => {
  describe('createEmptyDashboard', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should create an empty dashboard with initial metrics and recipe configurations', async () => {
      const dashboardData = {
        id: 1,
        name: 'Test Dashboard',
        ecommerceConnectId: 1,
        creatorId: 1,
        save: jest.fn(),
      };
      const createDashboardSpy = jest.spyOn(dashboardRepositoryMock, 'create').mockResolvedValueOnce(dashboardData);

      const initialMetricsData = createInitialMetrics(dashboardData.id);
      const bulkCreateMetricsSpy = jest
        .spyOn(metricRepositoryMock, 'bulkCreate')
        .mockResolvedValueOnce(initialMetricsData);

      const initialRecipeConfigsData = createInitialRecipeConfigs(initialMetricsData.map((metric, i) => i));
      const bulkCreateRecipeConfigsSpy = jest
        .spyOn(recipeConfigRepositoryMock, 'bulkCreate')
        .mockResolvedValueOnce(initialRecipeConfigsData);

      const expectedMetricsWithRecipeConfigs = initialMetricsData.map((metric, index) => ({
        ...metric,
        recipeConfig: initialRecipeConfigsData[index],
      }));

      const emptyDashboard = await dashboardService.createEmptyDashboard(dashboardData);

      expect(emptyDashboard.metrics).toEqual(expectedMetricsWithRecipeConfigs);

      createDashboardSpy.mockRestore();
      bulkCreateMetricsSpy.mockRestore();
      bulkCreateRecipeConfigsSpy.mockRestore();
    });
  });
});

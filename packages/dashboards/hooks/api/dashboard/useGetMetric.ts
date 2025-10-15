import { DashboardData } from '@interfaces/index';
import { useQuery } from 'react-query';
import { format } from 'date-fns';

import api from '../../../lib/axios';

export const GET_METRIC_DATA = 'GET_METRIC_DATA';
export const RETRY_DELAY = 15000;
interface UseGetMetricProps {
  metricId: number;
  storeList?: string;
  startDate: Date;
  endDate: Date;
}

const getMetricData = async ({
  metricId,
  storeList,
  startDate,
  endDate,
}: UseGetMetricProps): Promise<DashboardData> => {
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(endDate, 'yyyy-MM-dd');
  const { data } = await api.get(
    `/companies/dashboards/metrics/${metricId}?storeList=${
      storeList || '*'
    }&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
  );

  return data as DashboardData;
};

const useGetMetric = ({ metricId, storeList, startDate, endDate }: UseGetMetricProps) => {
  return useQuery(
    [GET_METRIC_DATA, metricId, storeList, startDate, endDate],
    () => getMetricData({ metricId, storeList, startDate, endDate }),
    {
      retry: 5,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 1000,
      retryDelay: RETRY_DELAY,
    }
  );
};

export default useGetMetric;

import { useQuery } from 'react-query';
import api from '../../../lib/axios';

export const GET_DASHBOARDS = 'GET_DASHBOARDS';

const getDashboardsData = async () => {
  const { data } = await api.get(`/companies/dashboards`);

  return data;
};

const useGetDashboards = () => {
  return useQuery([GET_DASHBOARDS], () => getDashboardsData());
};

export default useGetDashboards;

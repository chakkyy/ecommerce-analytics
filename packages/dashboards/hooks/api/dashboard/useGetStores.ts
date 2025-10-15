import { useQuery } from 'react-query';

import api from '../../../lib/axios';

export const GET_STORE_DATA = 'GET_STORE_DATA';

const getStores = async (ecommerceConnectId: number): Promise<any> => {
  if (ecommerceConnectId === 0) return [];
  const { data } = await api.get(`/companies/stores/${ecommerceConnectId}`);
  return data;
};

const useGetStores = (ecommerceConnectId: number) => {
  return useQuery([GET_STORE_DATA, ecommerceConnectId], () => getStores(ecommerceConnectId), {
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetStores;

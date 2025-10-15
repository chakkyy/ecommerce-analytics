import { useQuery } from 'react-query';
import api from '../../../lib/axios';

export const GET_NEW_USERS_SEGMENT_DETAIL = 'GET_NEW_USERS_SEGMENT_DETAIL';

const getNewUsersSegment = async ({ ecommerceConnectId, page }: { ecommerceConnectId: number; page: number }) => {
  const { data } = await api.get(`/companies/get-new-users/${page}/${ecommerceConnectId}`);
  return data;
};

const useGetNewUsersSegment = ({ ecommerceConnectId = 0, page = 1 }: { ecommerceConnectId: number; page: number }) =>
  useQuery(
    [GET_NEW_USERS_SEGMENT_DETAIL, ecommerceConnectId, page],
    () => getNewUsersSegment({ ecommerceConnectId, page }),
    {
      refetchOnWindowFocus: false,
    }
  );

export default useGetNewUsersSegment;

import { useQuery } from 'react-query';
import api from '../../../lib/axios';

export const GET_SEGMENTS = 'GET_SEGMENTS';

const getSegments = async () => {
  const { data } = await api.get('/companies/segments');
  return data;
};

const useGetSegments = () =>
  useQuery(GET_SEGMENTS, getSegments, {
    retry: false,
    refetchOnWindowFocus: false,
  });

export default useGetSegments;

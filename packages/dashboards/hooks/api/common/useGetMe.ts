import { useQuery } from 'react-query';
import api from '../../../lib/axios';

export const GET_ME = 'GET_ME';

const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};
// @TODO type userData
const useGetMe = (callback?: (userData: any) => void) =>
  useQuery(GET_ME, getMe, {
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: userData => {
      if (callback) {
        callback(userData);
      }
    },
  });

export default useGetMe;

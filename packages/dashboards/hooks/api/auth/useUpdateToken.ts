import { useMutation } from 'react-query';
import api from '../../../lib/axios';

export const updateToken = async () => {
  const { data } = await api.post('/auth/updateToken');
  return data;
};

const useUpdateToken = () => {
  return useMutation(updateToken);
};

export default useUpdateToken;

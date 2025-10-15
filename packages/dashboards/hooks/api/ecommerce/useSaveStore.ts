import { useMutation } from 'react-query';
import api from '../../../lib/axios';

// @TODO add types
export const saveStore = async (): Promise<any> => {
  const { data } = await api.post('/companies/connectEcommerce', { strategy: 'STORE', credentials: [] });
  return data;
};

const useSaveStore = () => {
  return useMutation(saveStore);
};

export default useSaveStore;

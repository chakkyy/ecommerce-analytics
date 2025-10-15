import { useMutation } from 'react-query';
import api from '../../../lib/axios';

export const LogoutUser = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};

const useLogoutUser = () => {
  return useMutation(LogoutUser);
};

export default useLogoutUser;

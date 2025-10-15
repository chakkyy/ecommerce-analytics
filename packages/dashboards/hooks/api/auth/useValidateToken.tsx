import { useMutation } from 'react-query';
import api from '../../../lib/axios';

export const validateToken = async (payload: string) => {
  /*
   const { data } = await api.get(`/usersInvites/validate/?token=${payload}`);
  return data;
  */

  return Promise.resolve();
};

const useValidateToken = () => {
  return useMutation(validateToken);
};

export default useValidateToken;

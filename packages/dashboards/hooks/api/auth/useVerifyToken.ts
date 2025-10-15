import { useMutation } from 'react-query';
import api from '../../../lib/axios';

export const verifyToken = async () => {
  return api.get('/auth/verifyToken');
};

const useVerifyToken = () => {
  return useMutation(verifyToken);
};

export default useVerifyToken;

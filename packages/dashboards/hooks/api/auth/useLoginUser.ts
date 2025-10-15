import { UserLoginForm } from '@interfaces/index';
import { useMutation } from 'react-query';
import api from '../../../lib/axios';

export const LoginUser = async (payload: UserLoginForm) => {
  const { data } = await api.post('/auth/login', { email: payload.email, password: payload.password });
  return data;
};

const useLoginUser = () => {
  return useMutation(LoginUser);
};

export default useLoginUser;

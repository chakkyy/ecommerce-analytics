import { useMutation } from 'react-query';
import api from '../../../lib/axios';

export const saveUserInvites = async (payload: string[]) => {
  const { data } = await api.post('/usersInvites', payload);
  return data;
};

const useSaveUserInvites = () => {
  return useMutation(saveUserInvites);
};

export default useSaveUserInvites;

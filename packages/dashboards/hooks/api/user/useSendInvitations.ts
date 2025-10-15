import { useMutation } from 'react-query';
import api from '../../../lib/axios';

export const sendInvitations = async (payload: string[]) => {
  const { data } = await api.post('/users/sendInvitations', payload);
  return data;
};

const useSendInvitations = () => {
  return useMutation(sendInvitations);
};

export default useSendInvitations;

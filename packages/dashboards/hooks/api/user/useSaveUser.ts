import { PersonalDataForm } from '@interfaces/index';
import { useMutation } from 'react-query';
import api from '../../../lib/axios';

export const SaveUser = async (payload: PersonalDataForm) => {
  const { data } = await api.post('/auth/signup', payload);
  return data;
};

const useSaveUser = () => {
  return useMutation(SaveUser);
};

export default useSaveUser;

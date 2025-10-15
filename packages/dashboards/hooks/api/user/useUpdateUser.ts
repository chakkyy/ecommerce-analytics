import { UpdatePersonalDataForm } from '@interfaces/index';
import { useMutation } from 'react-query';
import api from '../../../lib/axios';
// @TODO add types
export const updateUser = async (payload: UpdatePersonalDataForm): Promise<any> => {
  const { id, ...rest } = payload;
  const { data } = await api.put(`/users/${id}`, rest);
  return data;
};

const useUpdateUser = () => {
  return useMutation(updateUser);
};

export default useUpdateUser;

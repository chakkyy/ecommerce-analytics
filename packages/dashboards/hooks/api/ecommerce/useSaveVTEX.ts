import { EcommerceCredentialsDataForm } from '@interfaces/index';
import { useMutation } from 'react-query';
import api from '../../../lib/axios';

export const SaveVtex = async (payload: EcommerceCredentialsDataForm[]) => {
  const { data } = await api.post('/companies/connectEcommerce', { strategy: 'VTEX', credentials: payload });
  return data;
};

const useSaveVTEX = () => {
  return useMutation(SaveVtex);
};

export default useSaveVTEX;

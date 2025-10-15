import { CompanyDataForm } from '@interfaces/index';
import { useMutation } from 'react-query';
import api from '../../../lib/axios';

export const SaveCompany = async (payload: CompanyDataForm) => {
  const { data } = await api.post('/companies', payload);
  return data;
};

const useSaveCompany = () => {
  return useMutation(SaveCompany);
};

export default useSaveCompany;

export const SaveCompanyLogo = async ({ payload, companyId }: { payload: FormData; companyId: number }) => {
  const { data } = await api.post(`/companies/${companyId}/logo/upload`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const useSaveCompanyLogo = () => {
  return useMutation(SaveCompanyLogo);
};

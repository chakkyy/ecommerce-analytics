import { useQuery } from 'react-query';
import { Country } from '@interfaces/index';
import api from '../../../lib/axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';

const getAllCountries = async () => {
  const { data } = await api.get('/countries');

  return data;
};

const useGetCountries = () => useQuery<Country[]>(GET_ALL_COUNTRIES, getAllCountries);

export default useGetCountries;

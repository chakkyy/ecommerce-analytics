import { useQuery } from 'react-query';
import { Sector } from '@interfaces/index';
import api from '../../../lib/axios';

export const GET_ALL_SECTOR = 'GET_ALL_SECTOR';

const getAllSectors = async () => {
  const { data } = await api.get('/sectors');
  return data;
};

const useGetSectors = () => useQuery<Sector[]>(GET_ALL_SECTOR, getAllSectors);

export default useGetSectors;

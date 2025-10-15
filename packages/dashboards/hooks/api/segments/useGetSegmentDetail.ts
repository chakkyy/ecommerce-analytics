import { useQuery } from 'react-query';
import api from '../../../lib/axios';

export const GET_SEGMENTS_DETAIL = 'GET_SEGMENTS_DETAIL';

const getSegmentDetail = async ({ segmentId, page }: { segmentId: number; page: number }) => {
  const { data } = await api.get(`/companies/segments/${segmentId}/${page}`);
  return data;
};

const useGetSegmentsDetail = ({ segmentId, page = 1 }: { segmentId: number; page: number }) =>
  useQuery([GET_SEGMENTS_DETAIL, segmentId, page], () => getSegmentDetail({ segmentId, page }), {
    refetchOnWindowFocus: false,
  });

export default useGetSegmentsDetail;

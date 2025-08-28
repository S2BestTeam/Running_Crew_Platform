import { useQuery } from '@tanstack/react-query';
import { reqGetGlobalFreeFeedDetail } from '../api/GlobalFree/globalFreeApi';

export default function useGetGlobalFreeBoardDetailQuery({ freeId, enabled = true }) {
  const fid = Number(freeId);

  return useQuery({
    queryKey: ['freeBoardDetail', fid],
    enabled: enabled && Number.isFinite(fid),
    queryFn: async () => {
      const res = await reqGetGlobalFreeFeedDetail(fid);
      return res.data;
    },
    staleTime: 0,                // 항상 stale 취급
    refetchOnMount: "always",    // 마운트 때마다 네트워크 요청
    refetchOnWindowFocus: false, // 원치 않으면 true로
  });
}

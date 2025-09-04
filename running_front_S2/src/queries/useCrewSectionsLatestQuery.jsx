import { useQuery } from "@tanstack/react-query";
import { reqGetSectionsLatest } from "../api/Crew/crewApi";

export default function useCrewSectionsLatestQuery(crewId) {
  return useQuery({
    queryKey: ["crewSectionsLatest", crewId],
    enabled: !!crewId,
    queryFn: async () => {
      const res = await reqGetSectionsLatest(crewId);
      const b = res?.data?.body || {};
      const toTs = (v) => (v ? Date.parse(v) : 0);
      return {
        members: toTs(b.members),
        gatherings: toTs(b.gatherings),
        freeBoards: toTs(b.freeBoards),
        albums: toTs(b.albums),
        notices: toTs(b.notices),
      };
    },
    // NEW 뱃지는 분 단위로 변할 수 있으니, 너무 무거워지지 않게 적당히 폴링
    staleTime: 30_000,        // 30s
    refetchInterval: 60_000,  // 60s 간격으로 최신화
  });
}
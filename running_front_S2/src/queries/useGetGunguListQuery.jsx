import { useQuery } from "@tanstack/react-query";
import { reqGunguList } from "../api/Gungu/gungu";

function useGetGunguListQuery() {
  return useQuery({
    queryKey: ["gunguList"],
    queryFn: async () => {
      // API 응답 형태에 맞춰 정규화해도 좋고 그대로 리턴해도 OK
      const res = await reqGunguList();
      return res;
    },
    staleTime: 60 * 1000,
  });
}

export default useGetGunguListQuery;
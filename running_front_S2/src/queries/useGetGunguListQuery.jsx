import { useQuery } from "@tanstack/react-query";
import { reqGunguList } from "../api/useReqList";

const useGetGunguListQuery = () => {
  return useQuery({
    queryKey: ["gunguList"],
    queryFn: reqGunguList,
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });
};

export default useGetGunguListQuery;
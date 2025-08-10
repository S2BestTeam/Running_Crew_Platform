import { useQuery } from "@tanstack/react-query";
import { reqGunguList } from "../api/useReqList";

const useGetGunguListQuery = () => {
  return useQuery({
    queryKey: ["gunguList"],
    queryFn: reqGunguList,
<<<<<<< HEAD
    staleTime: 1000 * 60 * 5,
=======
    staleTime: 1000 * 60 * 5, // 5분 캐시
>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업
  });
};

export default useGetGunguListQuery;
import { useQuery } from "@tanstack/react-query"
import { reqMyCrews } from "../api/User/userApi";

function useGetMyCrewsQuery(userId) {
  return useQuery({
    queryKey: ["myCrews", userId],
    queryFn: async () => {
      const res = await reqMyCrews(userId);
      return res.data;
    }
  })
}

export default useGetMyCrewsQuery;
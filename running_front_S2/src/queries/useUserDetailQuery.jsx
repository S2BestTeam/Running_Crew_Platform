import { useQuery } from "@tanstack/react-query";
import { reqGetMemberDetail } from "../api/Crew/crewApi";

export default function useUserDetailQuery({ crewId, userId }) {
  return useQuery({
    queryKey: ["userDetail", crewId, userId],
    queryFn: async () => {
      const res = await reqGetMemberDetail({ crewId, userId });
      return res?.data?.body;
    },
    enabled: !!crewId && !!userId,
  });
}
